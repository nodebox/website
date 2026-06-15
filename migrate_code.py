#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# ///
"""Phase 2 migration: turn the legacy NodeBox 1 PHP-wiki dump under
``code/index.php/`` into static pages at ``code/<Name>.html``.

For every real page we keep only the "juicy bit" (the ``<div class="inside">``
content), strip the embedded PHP, rewrite internal links / asset paths to clean
``/code/<Name>`` URLs, and re-wrap it in a faithful reproduction of the original
NodeBox 1 chrome (header, navigation, footer + default.css).

The 36 broken pages whose filenames contain ``?`` (Share?p=N pagination and
search snapshots full of PHP ``Notice: Undefined`` errors) are skipped.

Run from the repository root:  ``uv run migrate_code.py``
"""

from __future__ import annotations

import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "code" / "index.php"
OUT = ROOT / "code"

PAGE_TEMPLATE = """\
<html>

<head>
<title>NodeBox | {title}</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta http-equiv="imagetoolbar" content="no" />
<meta name="description" content="" />
<meta name="keywords" content="NodeBox, {keywords}" />
<link rel="canonical" href="https://www.nodebox.net/code/{slug}" />
<link type="text/css" rel="stylesheet" media="screen" href="/media/css/nbar.css">

<script type="text/javascript" src="/code/js/pop.js"></script>
<script type="text/javascript" src="/code/js/confirm.js"></script>
<link href="/code/css/default.css" rel="stylesheet" type="text/css" />
<link href="/code/css/print.css" rel="stylesheet" type="text/css" media="print" />
</head>

<body id="body">
<div class="nbar">
  <ol>
    <li><a class="node" href="/code/Home">NodeBox 1<span class="nbar-arrow"></span></a>
      <ol class="nbar-dropdown">
        <li><a href="/">Homepage</a></li>
        <li><a href="/node/">NodeBox 3<small>Node-based app for generative design and data visualization</small></a></li>
        <li><a href="/opengl/">NodeBox OpenGL<small>Hardware-accelerated cross-platform graphics library</small></a></li>
        <li><a href="/code/Home">NodeBox 1<small>Generate 2D visuals using Python code (Mac OS X only)</small></a></li>
      </ol>
    </li>
    <li><a class="gallery" href="/gallery/">Gallery</a></li>
    <li><a class="documentation" href="/code/Tutorial">Documentation</a></li>
    <li><a class="forum" href="http://support.nodebox.net/discussions">Forum</a></li>
    <li><a class="blog" href="/blog/">Blog</a></li>
  </ol>
</div>


<div id="all">
<div id="header_and_navigation">

<div id="header">
<a href="/code/Home"><img id="header_image" src="/code/g/header-small.jpg" width="800" /></a></div>

<div id="title">
<a href="/code/Home"><h1>NodeBox</h1>
<strong><em>Create visual output with Python programming code</em></strong>
</a></div>

<div id="contextual">
<div id="languages">

</div>

<div id="search">
<form id="sf" method="get">
<input type="text" id="q" name="q" value="" />
<a href="javascript:document.getElementById('sf').submit();">GO</a>
</form>
</div>

</div>

<div id="navigation">
<div id="navigation_public">
<a href="/code/Home">Home</a>
<a href="/code/Download">Download</a>
<a href="/code/Reference">Reference</a>
<a href="/code/Tutorial">Tutorial</a>
<a href="/code/Library">Library</a>
<a href="/code/Gallery">Gallery</a>
<a href="/code/About">About</a>
</div>
</div>

</div>

<div id="content">

<div id="nodebox-link">
<a href="/code/Home"><img src="/code/g/transparent.gif" /></a>
</div>

<div class="inside">
{content}
</div>

</div>

<div id="footer">
{footer}
</div>
<img src="/code/g/footer.jpg" style="border:0" class="footer" width="800" height="334" />

</div>

<script>
try{{e=document.getElementsByTagName("span");for(i=0;i<e.length;i++){{if(e[i].className=="header_image"){{src=e[i].getElementsByTagName("img")[0].src;document.getElementById("header_image").src=src;break;}}}}}}catch(e){{}}
</script>
</body>

</html>
"""

COPYRIGHT = (
    '&copy; 2004-2012 <a href="http://www.emrg.be/" class="noexternal">'
    "Experimental Media Research Group</a>"
)


def extract_title(text: str) -> str:
    m = re.search(r"<title>(.*?)</title>", text, re.S)
    if not m:
        return ""
    title = html.unescape(m.group(1).strip())
    if title.startswith("NodeBox | "):
        title = title[len("NodeBox | ") :]
    elif title == "NodeBox":
        title = ""
    return title.strip()


def extract_lastmod(text: str) -> str:
    m = re.search(r"Last modified:\s*(.*?)\s*\|", text)
    if m:
        return f"Last modified: {m.group(1).strip()} | {COPYRIGHT}"
    return COPYRIGHT


def extract_inside(text: str) -> str | None:
    """Slice the content between the two landmarks every page shares:
    the opening ``<div class="inside">`` and the ``<div id="footer">`` block.
    The trailing ``</div></div>`` (closing .inside and #content) is dropped."""
    start = text.find('<div class="inside">')
    if start == -1:
        return None
    start += len('<div class="inside">')
    end = text.find('<div id="footer">', start)
    if end == -1:
        return None
    inside = text[start:end]
    # Strip the two closing divs (.inside + #content) and surrounding whitespace.
    inside = re.sub(r"\s*</div>\s*</div>\s*$", "", inside)
    return inside.strip()


def clean_content(content: str, name: str) -> str:
    # Drop every embedded PHP fragment (<? ... ?>): the do_name() guard and the
    # comment-form include.
    content = re.sub(r"<\?.*?\?>", "", content, flags=re.S)

    # The do_name() guard wrapped an <h3>Name</h3> heading that should NOT show
    # on Home (the original hid it there). Every other page keeps its heading.
    if name == "Home":
        content = re.sub(r"^\s*<h3>\s*Home\s*</h3>", "", content, count=1)

    # --- Rewrite links and asset paths to clean, root-absolute /code/ URLs. ---
    # Site-level assets two dirs up (../../media/...) live at the site root.
    content = content.replace('="../../', '="/')
    # Everything else one dir up (../data, ../g, ../js) is under /code/.
    content = content.replace('="../', '="/code/')
    # Normalise absolute references back to the legacy site onto /code/...
    content = re.sub(
        r'="https?://(?:www\.)?nodebox\.net/code/index\.php/', '="/code/', content
    )
    content = re.sub(
        r'="https?://(?:www\.)?nodebox\.net/code/', '="/code/', content
    )
    content = content.replace('="/code/index.php/', '="/code/')

    # Bare relative page links (Foo.html, shared_*.html) -> extensionless /code/Foo.
    content = re.sub(
        r'href="(?!https?:|/|javascript:|#|mailto:|\.)([^"]+?)\.html"',
        r'href="/code/\1"',
        content,
    )

    # The original httrack dump appended ".html" to a few non-HTML asset URLs
    # (e.g. an <embed> pointing at Vampyr.m4v.html). Strip it back to the real file.
    content = re.sub(
        r'((?:src|href|value)="[^"]*\.(?:m4v|mov|mp4|mp3|wav|aif|aiff|zip|pdf|py|'
        r'ndbx|csv|jpe?g|png|gif|svg|mng|mpg|avi))\.html"',
        r'\1"',
        content,
        flags=re.I,
    )

    return content.strip()


def main() -> None:
    written = skipped_junk = errors = 0
    no_inside: list[str] = []

    skipped_share = 0
    for path in sorted(SRC.glob("*.html")):
        name = path.name[: -len(".html")]
        if "?" in path.name:
            skipped_junk += 1
            continue
        # The old NodeBox 1 community forum is long dead and full of broken
        # links; drop its landing page and every shared_* snippet.
        if name == "Share" or name.startswith("shared_"):
            skipped_share += 1
            continue

        raw = path.read_bytes().decode("utf-8", errors="replace")
        title = extract_title(raw)
        inside = extract_inside(raw)
        if inside is None:
            no_inside.append(path.name)
            errors += 1
            continue

        page = PAGE_TEMPLATE.format(
            title=html.escape(title, quote=True),
            keywords=html.escape(title, quote=True),
            slug=name,
            content=clean_content(inside, name),
            footer=extract_lastmod(raw),
        )
        (OUT / path.name).write_text(page, encoding="utf-8")
        written += 1

    print(f"Wrote {written} pages to {OUT}")
    print(f"Skipped {skipped_junk} junk (?) pages")
    print(f"Skipped {skipped_share} dead community-forum (Share/shared_*) pages")
    if no_inside:
        print(f"WARNING: {len(no_inside)} pages had no content div:")
        for n in no_inside:
            print(f"  - {n}")


if __name__ == "__main__":
    main()
