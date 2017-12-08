---
layout:       page
title:	      'Tags'
permalink:    /tags/
description:  'Procure os assuntos pelas tags.'
published:    true
---

<div class="tags">
{% assign tags_list = site.tags %}
  {% if tags_list.first[0] == null %}
  {% for tag in tags_list %}
    <a href="#{{ tag | slugify }}">{{ tag }}</a>
  {% endfor %}
  {% else %}
  {% for tag in tags_list %}
    <a href="#{{ tag[0] | slugify }}">{{ tag[0] }}</a>
  {% endfor %}
  {% endif %}
{% assign tags_list = nil %}
</div>

<hr class="separator">

{% for tag in site.tags  %}
  <span class="tag-title" id="{{ tag[0] | slugify }}">{{ tag[0] | remove: ',' }}</span>
  <ul class="post-list">
    {% assign pages_list = tag[1] %}
    {% for post in pages_list reversed %}
      {% if post.title != null %}
	{% if group == null or group == post.group %}
	  <li>
	    <span class="entry-date">
	    <time datetime="{{ post.date | date_to_xmlschema }}" itemprop="datePublished">{{ post.date | date: "%Y-%m-%d" }}</time></span>
	    &nbsp;&nbsp;&nbsp;&nbsp;
	    <a href="{{ post.url | relative_url }}">
	      {{ post.title }}
	    </a>
	  </li>
      {% endif %}
      {% endif %}
    {% endfor %}
    {% assign pages_list = nil %}
    {% assign group = nil %}
  </ul>
  <hr class="separator">
{% endfor %}
