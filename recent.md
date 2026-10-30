---
eleventyNavigation:
  key: Recent Posts
  parent: Blog
  
layout: layout.njk

page_title: Recent Blog Posts

number_posts: 0
---

{% assign index = 0 %}
{% for post in collections.post reversed %}
{% if index < 3 %}
<a href="{{post.url}}">{{ post.data.page_title }}</a> - {{ post.date | niceDate }}
{% excerpt post %}
*****

{% else %}
{% break %}
{% endif %}
{% assign index = index | plus: 1  %}
{% endfor %}
