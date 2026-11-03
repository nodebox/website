---
layout: base
section: blog
title: Blog
---
<div id="page-title" class="sixteen columns">
  <h1>Blog</h1>
</div>

<div class="sixteen columns">
<div class="posts">
{% for post in collections.blog %}
  {% include "post.html" %}
{% endfor %}
</div>
</div>
