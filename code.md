---
layout: "default"
title: "💻 Code — 직접 만든 것"
description: "CaskCode가 직접 개발한 소프트웨어·사이드프로젝트·코드 이야기와 위스키 데이터 분석."
permalink: "/code/"
---

<span id="code"></span>
## 💻 Code — 직접 만든 것
*CaskCode가 직접 개발한 소프트웨어·사이드프로젝트·코드 이야기와 위스키 데이터 분석.*


### 💻 개발
*직접 만든 소프트웨어·사이드프로젝트·코드 이야기*

{% assign items = site.posts | where_exp: "p", "p.categories contains 'dev'" %}
{% if items.size > 0 %}
<ul class="archive">
{% for p in items %}
  <li><span class="when">{{ p.date | date: "%Y-%m-%d" }}</span>
  <a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
{% endfor %}
</ul>
{% else %}
<div class="empty">아직 글이 없습니다.</div>
{% endif %}


### 📊 데이터 분석
*가격·수상·트렌드를 코드로 파헤친다*

{% assign items = site.posts | where_exp: "p", "p.categories contains 'data'" %}
{% if items.size > 0 %}
<ul class="archive">
{% for p in items %}
  <li><span class="when">{{ p.date | date: "%Y-%m-%d" }}</span>
  <a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
{% endfor %}
</ul>
{% else %}
<div class="empty">아직 글이 없습니다.</div>
{% endif %}
