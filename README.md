nodebox.net
===========
This is the NodeBox website.


Frameworks
----------
We use the following awesome technologies to create the website:

* [Jekyll][] - Transform dynamic content into a static site.
* [Normalize][] - An alternative to CSS reset which keeps sane browser defaults and makes them consistent across browsers.
* [Skeleton][] - A responsive CSS grid that scales nicely to mobile sizes.


Installing on Mac
-----------------
Install [Xcode][] first.

    sudo gem update --system
    sudo gem install jekyll github-markdown
    sudo easy_install pygments


Installing on Ubuntu
--------------------

    sudo apt-get install ruby rubygems python-setuptools
    sudo gem install rubygems-update
    sudo gem install jekyll github-markdown
    sudo easy_install pygments


Running
-------
To preview the website locally:

    bundle exec jekyll serve

Deployment is automatic: GitHub Pages rebuilds and publishes the site on every push to `master`.


Writing documentation
---------------------
We use Mac to capture screenshots. If you capture full-screen windows, turn off shadows. In the Terminal, type:

    defaults write com.apple.screencapture disable-shadow -bool true
    killall SystemUIServer


License
-------
Text & images on this blog are licensed under the [Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License][cc].

[Jekyll]: http://github.com/mojombo/jekyll
[Normalize]: https://github.com/jonathantneal/normalize.css
[Skeleton]: http://www.getskeleton.com/
[Xcode]: http://itunes.apple.com/us/app/xcode/id422352214
[cc]: http://creativecommons.org/licenses/by-nc-nd/3.0/
