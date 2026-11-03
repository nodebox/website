---
categories: blog
layout: blog
title: NodeBox 3 The Hague Workshop
thumb: workshop-2012-the-hague-thumb.png
images:
  - gallery/workshop-2012-the-hague-1.png
  - gallery/workshop-2012-the-hague-2.png
  - gallery/workshop-2012-the-hague-3.png
  - gallery/workshop-2012-the-hague-4.png
---
We regularly teach NodeBox workshops to students and professional designers. This allows us to evaluate our software and discover issues and areas of improvement. This week we held a data visualisation workshop at the [Royal Academy of Art, The Hague](http://www.kabk.nl/) for a small but enthusiastic group of 3rd- and 4th year students.

Below are the final results. To see the process you can visit the [workshop blog](http://workshops.nodebox.net/2012-the-hague/).


Goldberg Variations
-------------------
<div class="by">Anton Sovetov</div>

Anton wanted to visualize the musical structure of J.S. Bach's Goldberg variations. Using MIDI music files from [Dave's J.S. Bach Page](http://jsbach.net/midi/midi_goldbergvariations.html), and a custom "midimport" node we created, he designed a visualisation of the classical music pieces.

Based on the structure of the music he produced a "hyphenated" layout, cutting up the music piece where it made sense to make it work better with the vertical format of the poster. The backgrounds of each piece represent the tonality of the piece, and the design also contains information on timing and structure.


Studio Dumbar Internship Report
-------------------------------
<div class="by">Roey Tsemah</div>

During his internship at [Studio Dumbar](http://studiodumbar.com/), Roey Tsemah meticulously registered his days: which clients he worked for and for how long, how creative the task was, and how much coffee he needed to get through the day.

With his personal [lifelog](http://en.wikipedia.org/wiki/Lifelog) data in hand, he proceeded to visualise it in NodeBox. Each day is represented by a pie chart shape showing the clients he worked for and in which proportion, and how creative he was doing it.


Shipwrecks of California
-------------------------
<div class="by">Jan Aulbach</div>

Jan already had a dataset: for a different course he had acquired data of all shipwrecks on the coast of California from 1836 until 1988. The data was analyzed first in [Google Fusion Tables](http://tables.googlelabs.com), then imported into NodeBox.

Using this table he created a timeline with a strip for each year showing the amount of devastation caused: a combination of the *amount* of ships crashed, and the *size*, or *tonage* of the ship.

Jan had easily the most complex network, with multiple levels of nesting, custom nodes for calculate running totals, and lookup tables for colors.


Measuring Happy Planets
-----------------------
<div class="by">Jodie Hew</div>

Jodie's was interested in happiness. Specifically, the correlation of happiness and other factors such as population size and ecological footprint.

She acquired data from [Happy Planet Index](http://www.happyplanetindex.org/) and visualized the different factors together in NodeBox. She iterated on a number of designs before finally settling on an effective and straightforward visualisation showing the happiness of countries in relation to their population.


Summary
-------
NodeBox drives on feedback of students. We use their experiences and frustrations to improve the software and make it more accessible and useful. Through questionnaires, screen recordings and depth interviews we discover if people unfamiliar with generative tools can be effective and productive. 

In February of this year we did the very first [NodeBox 3 masterclass in Antwerp](/blog/2012/02/29/masterclass-antwerp). This laid bare a number of fundamental issues with more complex assignments that were hard to solve. We figured out a way to solve them and this workshop was a test to see if our solution worked. We were very happy to discover that our system provided a comprehensive, easy-to-use system to build complex networks.

Starting in January, we'll be working on integrating hardware interfaces and image processing to the software during the [Conduit research project](http://www.emrg.be/projects/conduit.html). We look forward to testing these new capabilities in future workshops.

