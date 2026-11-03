---
layout: base
section: blog
title: Blog
templateEngineOverride: liquid
---
<div class="journal-page-heading"><h1>Blog</h1><p>Experiments, workshops, and ideas from the NodeBox community.</p></div>
<div class="posts journal-posts">
{% for post in collections.blog %}
  {% include "post.html" %}
{% endfor %}
</div>
