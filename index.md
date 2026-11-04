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
      <div class="hero-actions"><a class="action-primary" href="/download/">Download <span aria-hidden="true">↓</span></a><a class="text-link" href="/node/documentation/">Documentation <span aria-hidden="true">↗</span></a><a class="text-link" href="https://nodebox.live/">NodeBox Live <span aria-hidden="true">↗</span></a></div>
    </div>
    <figure class="hero-figure"><img src="/media/node/features-nodes.png" alt="The NodeBox 3 editor, with a network of connected nodes and its generated graphics." width="1100" height="800" fetchpriority="high"></figure>
  </div>
</section>
<section class="showcase section-shell" aria-label="Examples">
  <div class="example-index" role="tablist" aria-label="Examples" aria-orientation="vertical">{% for ex in examples %}<button type="button" role="tab" id="tab-{{ ex.id }}" aria-controls="example-{{ ex.id }}" aria-selected="{% if forloop.first %}true{% else %}false{% endif %}"{% unless forloop.first %} tabindex="-1"{% endunless %}><span class="entry-title">{{ ex.category }}</span><span class="example-nodes">{% for n in ex.nodes %}<img src="/media/design/icons/nodes/{{ n }}.svg" alt="" title="{{ n }}" width="32" height="32">{% endfor %}<span class="sr-only">Nodes: {{ ex.nodes | join: ", " }}</span></span></button>{% endfor %}</div>
  <div class="example-panels">{% for ex in examples %}{% if forloop.first %}{% render "example-panel.html", ex: ex, tabbed: true %}{% else %}{% render "example-panel.html", ex: ex, tabbed: true, hidden: true %}{% endif %}{% endfor %}</div>
</section>
<section class="idea-section section-shell" aria-labelledby="idea-title">
  <div class="idea-heading"><h2 id="idea-title">How NodeBox works</h2><p>Each node performs one operation. Connect them into a network to describe how a design is made. The network stays editable, so you can change the process as well as the result.</p></div>
  <div class="operation-grid">
    <div><img src="/media/design/icons/grid.svg" alt="" width="84" height="84"><h3>Data</h3><p>Read a spreadsheet, generate a sequence of numbers, or arrange points on a grid.</p></div>
    <div><img src="/media/design/icons/rotate.svg" alt="" width="84" height="84"><h3>Geometry</h3><p>Draw paths, work with text, and combine, rotate or reshape what you have made.</p></div>
    <div><img src="/media/design/icons/scatter.svg" alt="" width="84" height="84"><h3>Variation</h3><p>Use repetition, randomness and changing values to produce variations from the same network.</p></div>
  </div>
</section>
<section class="software-section section-shell" id="software" aria-labelledby="software-title">
  <div class="idea-heading"><h2 id="software-title">NodeBox 3 and NodeBox Live</h2><p>Both build designs from connected nodes. NodeBox 3 is an application you install. NodeBox Live runs in your browser, where your projects can be shared and embedded.</p></div>
  <div class="editions">
    <article class="edition">
      <img src="/node/documentation/using/math-lissajous.png" alt="The NodeBox 3 editor showing a Lissajous pattern and the network of nodes that draws it." width="1100" height="800" loading="lazy">
      <h3 class="entry-title">NodeBox 3</h3>
      <p>The desktop application for Mac, Windows and Linux. It includes a library of nodes for working with graphics, text and data.</p>
      <div class="hero-actions"><a class="action-primary" href="/download/">Download <span aria-hidden="true">↓</span></a><a class="text-link" href="/node/">About NodeBox 3 ↗</a></div>
    </article>
    <article class="edition">
      <img src="/media/design/software/nodebox-live.jpg" alt="NodeBox Live in a browser, with a network that reads a CSV file and the chart it draws." width="1200" height="883" loading="lazy">
      <h3 class="entry-title">NodeBox Live</h3>
      <p>The web application. Work with CSV and JSON data or a web API, write your own nodes in JavaScript, and share projects with other people.</p>
      <div class="hero-actions"><a class="action-primary" href="https://nodebox.live/">Open NodeBox Live <span aria-hidden="true">↗</span></a><a class="text-link" href="/blog/2026/11/03/maak-nodebox-in-the-browser">How it began ↗</a></div>
    </article>
  </div>
  <div class="table-scroll" tabindex="0" role="region" aria-label="Differences between NodeBox 3 and NodeBox Live">
    <table class="compare">
      <thead><tr><td></td><th scope="col">NodeBox 3</th><th scope="col">NodeBox Live</th></tr></thead>
      <tbody>
        <tr><th scope="row">Runs</th><td>As an application on Mac, Windows and Linux.</td><td>In your browser. Nothing to install.</td></tr>
        <tr><th scope="row">Output</th><td>PDF files, image sequences and movies.</td><td>Interactive graphics that run on web pages.</td></tr>
        <tr><th scope="row">Your own nodes</th><td>Written in Java, Python or Clojure.</td><td>Written in JavaScript, in the editor.</td></tr>
        <tr><th scope="row">Sharing</th><td>Documents are .ndbx files that you send around.</td><td>Projects are shared online, and others can remix them.</td></tr>
        <tr><th scope="row">Getting started</th><td><a href="/download/">Download</a> and follow the <a href="/node/documentation/tutorial/getting-started.html">first tutorial</a>.</td><td><a href="https://nodebox.live/users/create">Sign up</a>. Help and examples are built into the editor.</td></tr>
      </tbody>
    </table>
  </div>
</section>
<section class="works-section section-shell" aria-labelledby="works-title">
  <h2 id="works-title">Made with NodeBox</h2>
  <div class="works-grid">
  {% for work in works %}
    <figure class="work">
      <img src="{{ work.image }}" alt="{{ work.alt }}" width="{{ work.width }}" height="{{ work.height }}" loading="lazy">
      <figcaption><h3 class="entry-title">{{ work.title }}</h3><p>{{ work.by }}. Made with {{ work.made }}.</p></figcaption>
    </figure>
  {% endfor %}
  </div>
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
