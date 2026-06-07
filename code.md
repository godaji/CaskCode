---
layout: "default"
title: "💻 Code — 직접 만든 것"
description: "보드가 직접 개발한 소프트웨어·사이드프로젝트·코드 이야기."
permalink: "/code/"
---

<span id="code"></span>
## 💻 Code — 직접 만든 것
*보드가 직접 개발한 소프트웨어·사이드프로젝트·코드 이야기.*


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
<div class="empty">아직 글이 없어요 — <code>_drafts/dev-예시.md</code> 를 복사해 <code>_posts/</code>에 저장하면 여기 자동 표시.</div>
{% endif %}
