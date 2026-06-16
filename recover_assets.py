#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# ///
"""Crawl the built _site/, find every broken local reference, and (optionally)
recover missing images/assets from the Wayback Machine into the source tree.

  uv run recover_assets.py            # dry run: report broken refs only
  uv run recover_assets.py --recover  # also download missing assets from Wayback

Recovered files are written to the SOURCE tree (so they persist across builds);
re-run `npm run build` afterwards. The original site was nodebox.net, so a
missing /code/data/media/x.jpg is looked up at nodebox.net/code/data/media/x.jpg.
"""

from __future__ import annotations

import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

SITE = Path("_site")
ROOT = Path(".")
RECOVER = "--recover" in sys.argv

ASSET_EXTS = {
    "jpg", "jpeg", "png", "gif", "svg", "ico", "webp", "bmp",
    "css", "js", "pdf", "zip", "mov", "m4v", "mp4", "mp3", "wav",
    "ndbx", "csv", "py", "txt", "xml", "json", "tif", "tiff", "dmg", "sit",
}
IMAGE_EXTS = {"jpg", "jpeg", "png", "gif", "svg", "webp", "bmp", "ico"}
ATTR_RE = re.compile(r'(?:src|href)\s*=\s*"([^"]+)"')


def ext_of(path: str) -> str:
    base = path.rsplit("/", 1)[-1]
    return base.rsplit(".", 1)[-1].lower() if "." in base else ""


def resolve(url: str, page: Path) -> str | None:
    """Map a referenced URL to a site-root-relative path (no leading slash),
    or None if it is external / non-local / not worth checking."""
    url = url.split("#", 1)[0].split("?", 1)[0].strip()
    if not url:
        return None
    low = url.lower()
    if low.startswith(("http://", "https://", "//", "mailto:", "javascript:", "data:", "tel:")):
        return None
    url = urllib.parse.unquote(url)
    if url.startswith("/"):
        rel = url[1:]
    else:
        # relative to the page's directory within _site
        base = page.parent.relative_to(SITE)
        rel = str((base / url)).replace("\\", "/")
    # normalise ../ and ./
    parts: list[str] = []
    for seg in rel.split("/"):
        if seg in ("", "."):
            continue
        if seg == "..":
            if parts:
                parts.pop()
        else:
            parts.append(seg)
    return "/".join(parts)


def exists_in_site(rel: str) -> bool:
    p = SITE / rel
    if p.exists():
        return True
    # extensionless page or directory served as index.html / <name>.html
    if (SITE / f"{rel}.html").exists():
        return True
    if (SITE / rel / "index.html").exists():
        return True
    return False


FETCH_DELAY = 0.4  # polite pacing between requests (seconds)


def _get(url: str, timeout: int) -> bytes | None:
    """GET with retry + exponential backoff. None on a real 404/403,
    raises nothing — throttling (429/5xx/timeouts) is retried."""
    backoff = 5.0
    for _ in range(6):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=timeout) as r:
                blob = r.read()
            if blob:
                return blob
        except urllib.error.HTTPError as e:
            if e.code in (404, 403):
                return None
        except Exception:
            pass
        time.sleep(backoff)
        backoff = min(backoff * 2, 90)
    return None


def wayback_fetch(rel: str) -> bytes | None:
    """Return archived bytes for nodebox.net/<rel>, or None if not archived.

    Uses the CDX index to find a real HTTP-200 capture (the original site
    served these only under https://www.nodebox.net/, so the bare-host URL
    yields only 301 redirects). Then fetches that exact snapshot's raw bytes
    via `web/<timestamp>id_/<original-url>`."""
    cdx = (
        "https://web.archive.org/cdx/search/cdx?url="
        + urllib.parse.quote(f"nodebox.net/{rel}", safe="")
        + "&output=json&filter=statuscode:200&collapse=digest&limit=8"
    )
    raw = _get(cdx, 45)
    if not raw:
        return None
    try:
        rows = json.loads(raw)
    except Exception:
        return None
    if not rows or len(rows) < 2:
        return None
    header, data = rows[0], rows[1:]
    ti, oi = header.index("timestamp"), header.index("original")
    mi = header.index("mimetype") if "mimetype" in header else None
    # Prefer a non-HTML capture (the actual asset), else take the first 200.
    pick = data[0]
    if mi is not None:
        for row in data:
            if not row[mi].startswith("text/html"):
                pick = row
                break
    snapshot = f"https://web.archive.org/web/{pick[ti]}id_/{pick[oi]}"
    return _get(snapshot, 60)


def valid_asset(blob: bytes, ext: str) -> bool:
    if not blob:
        return False
    if ext in IMAGE_EXTS:
        return blob[:3] == b"\xff\xd8\xff" or blob[:8] == b"\x89PNG\r\n\x1a\n" or \
            blob[:6] in (b"GIF87a", b"GIF89a") or blob[:4] == b"RIFF" or \
            blob.lstrip()[:5] == b"<?xml" or blob.lstrip()[:4] == b"<svg"
    # Non-image asset: just make sure Wayback didn't hand back an HTML error page.
    head = blob.lstrip()[:64].lower()
    return not (head.startswith(b"<!doctype html") or head.startswith(b"<html"))


def main() -> None:
    if not SITE.exists():
        sys.exit("Run `npm run build` first — _site/ not found.")

    refs: dict[str, set[str]] = {}
    for page in SITE.rglob("*.html"):
        text = page.read_bytes().decode("utf-8", "replace")
        for m in ATTR_RE.finditer(text):
            rel = resolve(m.group(1), page)
            if rel:
                refs.setdefault(rel, set()).add(str(page.relative_to(SITE)))

    broken_assets, broken_pages = [], []
    for rel in sorted(refs):
        if exists_in_site(rel):
            continue
        (broken_assets if ext_of(rel) in ASSET_EXTS else broken_pages).append(rel)

    print(f"Scanned {sum(1 for _ in SITE.rglob('*.html'))} pages")
    print(f"Distinct local references: {len(refs)}")
    print(f"Broken asset references:   {len(broken_assets)}")
    print(f"Broken page/link references: {len(broken_pages)}")

    missing_images = [r for r in broken_assets if ext_of(r) in IMAGE_EXTS]
    other_assets = [r for r in broken_assets if ext_of(r) not in IMAGE_EXTS]
    print(f"  of which images: {len(missing_images)}  | other assets: {len(other_assets)}")
    to_recover = broken_assets

    Path("/tmp/broken_assets.txt").write_text("\n".join(broken_assets) + "\n")
    Path("/tmp/broken_pages.txt").write_text("\n".join(broken_pages) + "\n")
    print("Wrote /tmp/broken_assets.txt and /tmp/broken_pages.txt")

    if other_assets:
        print("\nNon-image broken assets (sample):")
        for r in other_assets[:20]:
            print(f"  {r}")

    if not RECOVER:
        print("\n(dry run — pass --recover to download missing images from Wayback)")
        return

    print(f"\nRecovering {len(to_recover)} assets from the Wayback Machine…")
    recovered = failed = 0

    def work(rel: str) -> tuple[str, bool]:
        dest = ROOT / rel
        if dest.exists():
            return rel, True
        time.sleep(FETCH_DELAY)
        blob = wayback_fetch(rel)
        if valid_asset(blob, ext_of(rel)):
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(blob)
            return rel, True
        return rel, False

    still_missing = []
    with ThreadPoolExecutor(max_workers=2) as pool:
        for i, (rel, ok) in enumerate(pool.map(work, to_recover), 1):
            if ok:
                recovered += 1
            else:
                failed += 1
                still_missing.append(rel)
            if i % 25 == 0 or i == len(to_recover):
                print(f"  {i}/{len(to_recover)}  recovered={recovered} failed={failed}")

    Path("/tmp/still_missing.txt").write_text("\n".join(still_missing) + "\n")
    print(f"\nDone: recovered {recovered}, still missing {failed}")
    print("Still-missing list: /tmp/still_missing.txt")


if __name__ == "__main__":
    main()
