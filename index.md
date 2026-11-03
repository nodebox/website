---
layout: base
title: NodeBox
section: home
templateEngineOverride: liquid
---
<section class="workshop-hero" aria-labelledby="hero-title">
  <div class="hero-layout">
    <div class="hero-intro">
      <h1 id="hero-title">Generative<br>design with<br><em>nodes.</em></h1>
      <p>NodeBox is an open-source tool for generative graphics and data visualization. Connect operations, change their parameters, and export the result.</p>
      <div class="hero-actions"><a class="action-primary" href="/download/">Download <span aria-hidden="true">↓</span></a><a class="text-link" href="/node/documentation/">Documentation <span aria-hidden="true">↗</span></a></div>
    </div>
    <figure class="hero-playground">
      <div class="artwork-stage" id="artwork-stage"><img src="/media/design/possibilities.svg" alt="A woven surface made from intersecting curved blue and navy paths." width="800" height="700" fetchpriority="high"></div>
      <figcaption class="artwork-controls"><label for="bend">Bend</label><input id="bend" type="range" min="0" max="100" value="50" step="1" aria-valuetext="50 percent bend" disabled aria-describedby="bend-note"><output for="bend" id="bend-value">50%</output><span id="bend-note" class="sr-only">Change the curvature of the surface. Use the arrow keys to adjust.</span><a href="/media/design/possibilities.ndbx" download>Download this example</a><span class="sr-only" id="artwork-status" role="status"></span></figcaption>
    </figure>
  </div>
</section>
<section class="idea-section section-shell" aria-labelledby="idea-title">
  <div class="idea-heading"><h2 id="idea-title">How NodeBox works</h2><p>Each node performs one operation. Connect them into a network to describe how a design is made. The network stays editable, so you can change the process as well as the result.</p></div>
  <div class="operation-grid">
    <div><img src="/media/design/icons/grid.svg" alt="" width="84" height="84"><h3>Data</h3><p>Read a spreadsheet, generate a sequence of numbers, or arrange points on a grid.</p></div>
    <div><img src="/media/design/icons/rotate.svg" alt="" width="84" height="84"><h3>Geometry</h3><p>Draw paths, work with text, and combine, rotate or reshape what you have made.</p></div>
    <div><img src="/media/design/icons/scatter.svg" alt="" width="84" height="84"><h3>Variation</h3><p>Use repetition, randomness and changing values to produce variations from the same network.</p></div>
  </div>
</section>
<section class="software-section section-shell" aria-labelledby="software-title">
  <div class="software-layout"><div class="software-intro"><h2 id="software-title">NodeBox 3</h2><p>The desktop application for Mac, Windows and Linux. It includes a library of nodes for working with graphics, text and data.</p><a class="action-primary" href="/download/">Download <span aria-hidden="true">↓</span></a><a class="text-link software-docs" href="/node/">More about NodeBox 3 ↗</a></div><figure class="software-figure"><img src="/media/node/features-nodes.png" alt="The NodeBox 3 editor, with a network of connected nodes and its generated graphics." width="1100" height="800" loading="lazy"><figcaption><a href="/node/documentation/tutorial/getting-started.html">Getting started with NodeBox 3 ↗</a></figcaption></figure></div>
</section>
<section class="journal-section section-shell" aria-labelledby="journal-title">
  <div class="journal-heading"><h2 id="journal-title">Blog</h2><a class="text-link" href="/blog/">All posts ↗</a></div>
  <div class="posts home-posts">
  {% for post in collections.blog limit: 3 %}
    {% include "post.html" %}
  {% endfor %}
  </div>
</section>
<section class="community-section section-shell" aria-labelledby="community-title">
  <div class="community-mark" aria-hidden="true"><img src="/media/design/nodebox-mark.svg" alt="" width="150" height="150"></div><div><h2 id="community-title">The NodeBox forum</h2><p>Share your work, ask questions, and discuss NodeBox with other users and its developers.</p><a class="text-link" href="https://forum.nodebox.net/">Visit the forum <span aria-hidden="true">↗</span></a></div>
</section>
<section class="newsletter-section section-shell" aria-labelledby="newsletter-title">
  <div><h2 id="newsletter-title">Newsletter</h2><p>Receive NodeBox news by email.</p></div>
  <form action="https://nodebox.us7.list-manage.com/subscribe/post?u=18183e7289984568ad8565df3&amp;id=6b928876d6" method="post" target="_blank">
    <label class="sr-only" for="newsletter-email">Email address</label><input id="newsletter-email" type="email" name="EMAIL" autocomplete="email" placeholder="Your email address" required>
    <div class="newsletter-trap" aria-hidden="true"><label>Leave this field empty<input type="text" name="b_18183e7289984568ad8565df3_6b928876d6" tabindex="-1" value="" autocomplete="off"></label></div>
    <button type="submit">Subscribe <span aria-hidden="true">↗</span></button>
  </form>
</section>
