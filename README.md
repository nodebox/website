nodebox.net
===========
This is the NodeBox website.


Frameworks
----------
We use the following awesome technologies to create the website:

* [Eleventy][] - Transforms templates and Markdown into a static site.
* [Normalize][] - An alternative to CSS reset which keeps sane browser defaults and makes them consistent across browsers.
* [Skeleton][] - A responsive CSS grid that scales nicely to mobile sizes.


Installing
----------
Install [Node.js][] (version 24 or newer; see `.nvmrc`), then:

    npm install


Running
-------
To preview the website locally:

    npm run dev

To build the static site into `_site/`:

    npm run build


Deployment
----------
The site is deployed to [Cloudflare Pages][cfpages]. Connect the repository and
configure the project with:

* **Build command:** `npm run build`
* **Build output directory:** `_site`
* **Node version:** pinned by `.nvmrc` (24)

Cloudflare Pages rebuilds and publishes on every push to `master`. Extensionless
URLs (e.g. `/node/documentation/tutorial/getting-started`) are served from the
matching `.html` file automatically, and `/foo.html` is 301-redirected to `/foo`.

The legacy NodeBox 1 wiki lives under `/code/<Name>` as static pages, regenerated
from the original `code/index.php/` PHP dump by `migrate_code.py` (run once; kept
for reference). Old `/code/index.php/<Name>` URLs are 301-redirected to
`/code/<Name>` by `_redirects`. The dead community forum (the `Share` page and
every `shared_*` snippet) was dropped; its old URLs redirect to `/code/Home`.
A few inline images that the original site only
referenced by absolute URL were never captured in the dump and are gone upstream
too, so those thumbnails 404 (recoverable only from the Wayback Machine).


Reference documentation
-----------------------
The node reference pages under `node/reference/` are generated from the NodeBox
libraries by `autoref.py` (which uses `ndbx.py`). Run it from a checkout that
sits next to a `nodebox` repository to regenerate them.


Writing documentation
---------------------
We use Mac to capture screenshots. If you capture full-screen windows, turn off shadows. In the Terminal, type:

    defaults write com.apple.screencapture disable-shadow -bool true
    killall SystemUIServer


License
-------
Text & images on this blog are licensed under the [Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License][cc].

[Eleventy]: https://www.11ty.dev/
[Normalize]: https://github.com/jonathantneal/normalize.css
[Skeleton]: http://www.getskeleton.com/
[Node.js]: https://nodejs.org/
[cfpages]: https://pages.cloudflare.com/
[cc]: http://creativecommons.org/licenses/by-nc-nd/3.0/
