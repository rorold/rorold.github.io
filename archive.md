---
eleventyNavigation:
  key: Archive
  parent: Blog

pagination:
  data: collections.post
  size: 3
  alias: posts
  reverse: true
  
layout: layout.njk

page_title: Blog Archive
---

{% for post in posts %}
<a href="{{post.url}}">{{ post.data.page_title }}</a> - {{ post.date | niceDate }}
{% excerpt post %}
*****

{% endfor %}

{% if collections.post.size > 3 %}
{% if pagination.href.previous %} <a href=" {{ pagination.href.previous }}">Previous</a> {% else %} Previous {% endif %} / {% if pagination.href.next %} <a href=" {{ pagination.href.next }}">Next</a> {% else %} Next {% endif %}
{% endif %}
