---
layout: default
section: gallery
title: Gallery
---
{% for post in collections.gallery %}
  {% include "post.html" %}
{% endfor %}
