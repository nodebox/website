---
categories: blog
layout: blog
title: Import MIDI files into NodeBox 3
thumb: midimport-thumb.png
images:
  - gallery/midimport-psy-gangnam-style.png
  - gallery/midimport-988-v07.png
  - gallery/midimport-table.png
  - gallery/midimport-network.png
---
For a recent [data visualisation workshop in The Hague](/blog/2012/11/09/workshop-the-hague), we needed a way to import MIDI files into NodeBox 3.

MIDI has some "interesting" properties: each note is stored as two separate "on" and "off" events that need to be matched up to find the duration. Getting this right is non-trivial; that's why this work might be interesting to other people as well.

MIDI data comes into NodeBox as a standard table (similar to CSV data), and individual columns can be selected using the [lookup node](/node/reference/data/lookup.html).

[Download the script.](https://github.com/fdb/midimport/archive/master.zip)
