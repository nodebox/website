---
layout: default
section: blog
title: Blog
---

{% for post in collections.blog %}
  {% include "post.html" %}
{% endfor %}
