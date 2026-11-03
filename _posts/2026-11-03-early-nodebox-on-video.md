---
categories: blog
layout: blog
title: Early NodeBox on video
thumb: early-videos-thumb.png
date: 2026-11-03T13:00:00+01:00
---

The old NodeBox servers had a folder of short screen recordings from 2006 to 2010. Most of them were never linked from a page. Here are five of them, converted from QuickTime so they play in a browser.

## NodeBox/Server, 2006

<video controls preload="none" poster="/media/blog/early-videos/nobs.jpg" src="/media/blog/early-videos/nobs.mp4"></video>

The first NodeBox server. A web page shows a form for a NodeBox 1 script, with a slider for every variable. Press Render and the server runs the script and shows the result: a greeting, a business card with circles, and a word drawn as a ball of scribbles. Tom De Smedt wrote on the forum in 2007 that we had been "playing with the idea of a 'NodeBox server' for some time". The idea came back twice, in 2010 and in [NodeBox On Demand](/blog/2026/11/03/nodebox-on-demand) in 2013.

## Movies in Core Image, 2007

<video controls preload="none" poster="/media/blog/early-videos/qt-coreimage1.jpg" src="/media/blog/early-videos/qt-coreimage1.mp4"></video>

NodeBox 1 on the Mac could read the frames of a QuickTime movie and send them through Core Image, the Mac's image processing library. Here the frames of a movie are bent by a distortion filter while they play.

## Editing the copy node, 2009

<video controls preload="none" poster="/media/blog/early-videos/teaser-copy-node.jpg" src="/media/blog/early-videos/teaser-copy-node.mp4"></video>

An early test build of NodeBox 2, from June 2009, with a network of two nodes: a rectangle and a copy node. The copy node is written in Python, and its code is visible in the source pane. Changing the code or the values while the network runs changes the result immediately, and the same two nodes draw a spiral, a sunburst and a spirograph. (The original recording had a soundtrack, which we removed.)

## Animation with expressions, 2009

<video controls preload="none" poster="/media/blog/early-videos/nb2-animation-1.jpg" src="/media/blog/early-videos/nb2-animation-1.mp4"></video>

NodeBox 2 in December 2009. A parameter can hold an expression that refers to the current frame, such as `math.sin(FRAME/10)*100`. When you drag through the timeline, NodeBox only renders the nodes that use the frame number, and the nodes that depend on them. You can read why we later dropped expressions in [What happened to NodeBox 2](/blog/2026/11/03/what-happened-to-nodebox-2).

## NodeBoxServer, 2010

<video controls preload="none" poster="/media/blog/early-videos/simplecopy.jpg" src="/media/blog/early-videos/simplecopy.mp4"></video>

The second server, for NodeBox 2. It reads a network and builds a page with a slider or color field for every port of every node. Dragging a slider renders the network again on the server. Only this recording survives; the code of this server isn't in any of our backups.
