---
eleventyNavigation:
  key: Recent Posts
  parent: Blog
  
layout: layout.njk

page_title: Recent Blog Posts
---


{% for post in collections.post reversed %}
<a href="{{post.url}}">{{ post.data.page_title }}</a> - {{ post.date | niceDate }}</li>
{% excerpt post %}
*****

{% endfor %}
