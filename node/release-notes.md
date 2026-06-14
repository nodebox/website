---
layout: default
title: NodeBox 3 Release Notes
section: node
---
Version 3.1.0 (14 June 2026)
-------------------------------
* NodeBox is now a **native Apple Silicon (arm64)** application — it no longer runs through Rosetta and will keep working on macOS releases after Apple removes Rosetta. The bundled Java runtime, ffmpeg, and native libraries are all native arm64.
* **Intel Macs:** this release is Apple Silicon only. Intel Mac users should stay on [v3.0.52](https://github.com/nodebox/nodebox/releases/download/v3.0.52/NodeBox-3.0.52.dmg).
* macOS and Windows builds are now produced, signed, and notarized reproducibly via GitHub Actions.

Version 3.0.52 (15 January 2021)
-------------------------------
* You can now export movies under Mac OS Catalina or later.
* Option drag bug has been fixed.

This one took a *long* time because of changes to the build process. A huge shout-out to John Cartan and the NodeBox community for their support! ❤️

Version 3.0.51 (8 January 2018)
-------------------------------
* Don't create connection if output and input are the same.

Version 3.0.50 (13 November 2017)
---------------------------
* When dragging a connection, you can now drag the connection line over the entire node, instead of just the inputs.
* We've increased the size of the output port hitbox, so it's easier to start a connection.
* The `import_text` node imports a plain text file, split by lines.
* The `make_table` node creates a new table out of a number of lists and a set of column headers.
* We fixed a bug that would manifest when deleting a node while dragging it.

Version 3.0.49 (28 September 2017)
---------------------------
* Fix annoying errors when dragging nodes in the network view.
* Cleanup build warnings.

Version 3.0.48 (29 June 2017)
---------------------------
* Add option to elide quotes in CSV export.
* Exported CSV files retain key ordering.
* "," is the default delimter for CSV export.

Version 3.0.47 (15 June 2017)
---------------------------
* CSV Export.
* Concatenate node now has 7 ports.
* Windows build is now built automatically using AppVeyor.

Version 3.0.46 (2 May 2017)
---------------------------
* Small UI Tweaks to avoid weird crashes.
* Add line-level debug info on stack traces.
* Use standalone version of Jython to avoid packaging ZIP files.
* Still supports OpenJDK 1.7 (bundled JRE is 1.8.0_131).

Version 3.0.45 (30 May 2016)
---------------------------
* Line-based nodes now have correct strokes again.
* Enable OS X native fullscreen mode.
* Upgrade to Clojure 1.8.
* Fix issues with the stack node.
* Improved the characterAt and subString nodes.

Version 3.0.44 (8 Dec 2015)
---------------------------
* OS X uses Java FX packaging, which should solve launch issues people were having.
* Improved SVG import.
* Copy node now uses percentages for scaling (like the scale node).
* Handles in full-screen mode.
* SVG export works better on non-US machines.

Version 3.0.43 (17 Feb 2015)
----------------------------
* OS X: Fix movie export
* Use High-DPI icons
* Add keys node.

Version 3.0.42 (20 Jan 2015)
----------------------------
* OS X: Compatible with OS X 10.10 Yosemite
* OS X bundles its own version of Java
* Windows: upgrade Java to 1.8
* Increase available memory (OS X / Windows)

Version 3.0.39 (27 Mar 2014)
----------------------------
* Colors can be imported as hexadecimal values (e.g. #334455 or #ccc).
* Faster PDF export thanks to a new version of iText.
* Upgraded to Clojure 1.6.
* The round node correctly rounds values.

Version 3.0.38 (24 Jan 2014)
----------------------------
* Add round_segments node.
* Access to external audio through the mic line-in.
* Improved SVG handling.
* Some cosmetic user interface changes.

Version 3.0.37 (1 Nov 2013)
---------------------------
* Unified export: all export features now support the canvasWidth/Height/X/Y values in document settings.
* The viewer can show export bounds.

Version 3.0.36 (3 Sep 2013)
----------------------------
* Support for high-resolution screens.
* Nodes can have comments.
* Better icons.
* General bug-fixes.

Version 3.0.35 (29 Apr 2013)
----------------------------
* Add built-in examples.

Version 3.0.34 (14 Mar 2013)
----------------------------
* Add the [stack node](/node/reference/corevector/stack.html).
* Add the [filter data node](/node/reference/data/filter_data.html).

Version 3.0.33 (24 Feb 2013)
----------------------------
* Add full-screen support.
* Nice GUI for device support.
* Audio analysis is built in.
* More icons.
* Lookup node can do nested lookups using the period (e.g. "bounds.x")
* Distinct node can optionally use a lookup key.
* Various code cleanups.

Version 3.0.32 (4 Feb 2013)
---------------------------
* Fix errors in network view.
* Fix errors in HTTP get node.
* The export viewer can capture mouse events.
* Data sheet is faster.

Version 3.0.31 (3 Feb 2013)
---------------------------
* Experimental support for external devices (over OSC).
* Experimental support for network requests + JSON parsing.
* More robust multi-threaded render.
* Fix bug with spaces in paths.

Version 3.0.30 (29 Jan 2013)
----------------------------
* Subnetworks always render the root node, making working with subnetworks more logical.
* Performance improvements in node processing + rendering.
* New list icons.
* New viewer implementation, removing dependency on the (obsolete) Piccolo library.
* Optimize point memory usage.
* Nodes for string manipulation (thanks to [Dave Addison](https://github.com/djaddison)).
* Clean up confusion between nodes and networks.

Version 3.0.29 (17 Dec 2012)
----------------------------
* We've dropped the "a" in the version number: we think NodeBox 3 is stable enough to drop the "alpha" tag.
* Network view: alt-dragging a node now copies and moves it.
* Zooming: Use Cmd+plus and Cmd+minus to zoom in/out.
* Cmd+P and Cmd+Shift+P play/pause and rewind the animation.
* You can pick the image format when exporting.
* Added a [running total](/node/reference/math/running_total.html) node.
* The [snap node](/node/reference/corevector/snap.html) now returns correct results for curved paths.
* The [line node](/node/reference/corevector/line.html) allows you to specify the amount of points.
* You can choose whether to set the fill / stroke properties in the colorize node.
* Transparent colors are easier to set.
* Right-click a node and choose "Help" to go to the documentation page for that node.
* More robust CSV parsing.

Version 3.0a28 (15 Nov 2012)
----------------------------
* Fix movie export.
* Made executing the network faster by caching function retrieval.
* Expose the root node which makes creating custom nodes easier.

Version 3.0a27 (7 Nov 2012)
---------------------------
* Fix viewer bug where zooming in would make the content dissappear.

Version 3.0a26 (6 Nov 2012)
---------------------------
* Copy node returns a list of geometries.
* Readme points to nodebox.net (instead of beta.nodebox.net).

Version 3.0a25 (4 Nov 2012)
---------------------------
* Big "clean-up" release: we've consolidated nodes, fixed port names and added better reference documentation.
* Remove various libraries that will be bundled separately (L-systems, packing)
* The [repeat node](/node/reference/list/repeat.html) allows per-item repetition.
* File upgrades require less code, making migrations easier.
* Add the [zip_map node](/node/reference/list/zip_map.html).
* Various improvements to the color picker.

Version 3.0a24 (8 Oct 2012)
---------------------------
* Better node descriptions makes finding a node easier.
* Fix bugs with subnetwork creation.
* The [csv node](/node/reference/data/import_csv.html) can accept various CSV "dialects".
* The [delete node](/node/refernce/corevector/delete.html) can now handle Geometry and Path objects, as well as a single list of Point values.
* Nodes that take in geometry can also take in a list of points.
* Double clicking ndbx files will open them on Windows.
* Add the [skew node](/node/reference/corevector/skew.html).

Version 3.0a23 (27 Sep 2012)
----------------------------
* Better support for nested lists.
* Add categories to the node selection dialog.
* Random now looks ["more random"](http://blog.42.nl/articles/when-random-isnt-as-random-as-expected).
* Add document properties dialog, useful for setting canvas width / height.
* Rename `delete_bounding` to [delete node](/node/reference/corevector/delete.html).
* Renaming a node now updates the references of published ports on the parent network.
* String ports can accept any kind of input.
* Add a [pi node](/node/reference/math/pi.html) and [e node](/node/reference/math/e.html).
* Re-enable handles.
* Hide ports that accept lists in parameter pane.
* Create "value" nodes for [string](/node/reference/string/string.html), [color](/node/reference/color/color.html), [number](/node/reference/math/number.html), [integer](/node/reference/math/integer.html), [boolean](/node/reference/math/boolean.html), [point](/node/reference/corevector/point.html).
* Selected nodes can be grouped into a network automatically.
* Add [floor](/node/reference/math/floor.html), [ceil](/node/reference/math/ceil.html), [wave](/node/reference/math/wave.html) and [pow](/node/reference/math/pow.html) nodes.
