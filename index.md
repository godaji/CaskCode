---
layout: "default"
title: "CaskCode — 블로그"
description: "마음은 개발자, 취미는 위스키. 바이브코딩으로 위스키 가격·리뷰·데이터를 직접 분석해 공유하는 블로그. #CaskCode"
---
<p class="sub">마음은 개발자, 취미는 위스키. 바이브코딩으로 위스키 가격·리뷰·데이터를 직접 분석해 공유하는 블로그. #CaskCode</p>

{% assign _bases = site.posts | where_exp: "p","p.kind == 'base'" %}
{% assign _pin = _bases | first %}
{% if _pin %}
<div class="pin">
  <span class="badge pin-badge">🏆 이번 달 면세 가성비</span>
  <a class="pin-title" href="{{ _pin.url | relative_url }}">{{ _pin.title }}</a>
  <span class="pin-date">{{ _pin.base_date | default: _pin.date | date: "%Y-%m-%d" }}</span>
</div>
{% endif %}

{% assign _patches = site.posts | where_exp: "p","p.kind == 'patch'" %}
{% assign _patch = _patches | first %}
{% if _patch %}
<div class="patch-strip">
  {% if _patch.breakthroughs > 0 %}<span class="ps-flag">⚡ 국내최저 돌파 {{ _patch.breakthroughs }}건</span>{% else %}<span class="ps-flag">⚡ 다이제스트</span>{% endif %}
  <span class="ps-date">· {{ _patch.latest_date }}</span>
  <a class="ps-title" href="{{ _patch.url | relative_url }}">{{ _patch.title }}</a>
</div>
{% endif %}

{% if site.posts.size > 0 %}
<ul class="latest-feed">
{% for p in site.posts limit: 5 %}
  <li><span class="chip">{% if p.categories contains 'dev' or p.categories contains 'data' %}💻{% else %}🥃{% endif %}</span>
  <span class="when">{{ p.date | date: "%Y-%m-%d" }}</span>
  <a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
{% endfor %}
</ul>
{% endif %}

<div class="hub">
  <a class="pillar-card" href="{{ '/cask/' | relative_url }}">
    <div class="pc-emoji">🥃</div>
    <div class="pc-head"><span class="pc-title">Cask</span><span class="pc-tag">위스키 전부</span></div>
    <p class="pc-desc">면세 가성비 자동 리포트 · 위스키 가격정보 · 시음 노트 (오크통 숙성은 #숙성 태그).</p>
    {% assign posts_cask = site.posts | where_exp: "p", "p.categories contains 'price' or p.categories contains 'wprice' or p.categories contains 'tasting'" %}
    <div class="pc-count">글 {{ posts_cask.size }}편</div>
    <ul class="pc-prev">
    {% for p in posts_cask limit: 3 %}
      <li><span class="when">{{ p.date | date: "%Y-%m-%d" }}</span> {{ p.title }}</li>
    {% endfor %}
    </ul>
    <span class="pc-go">목록 보기 →</span>
  </a>
  <a class="pillar-card" href="{{ '/code/' | relative_url }}">
    <div class="pc-emoji">💻</div>
    <div class="pc-head"><span class="pc-title">Code</span><span class="pc-tag">직접 만든 것</span></div>
    <p class="pc-desc">CaskCode가 직접 개발한 소프트웨어·사이드프로젝트·코드 이야기와 위스키 데이터 분석.</p>
    {% assign posts_code = site.posts | where_exp: "p", "p.categories contains 'dev' or p.categories contains 'data'" %}
    <div class="pc-count">글 {{ posts_code.size }}편</div>
    <ul class="pc-prev">
    {% for p in posts_code limit: 3 %}
      <li><span class="when">{{ p.date | date: "%Y-%m-%d" }}</span> {{ p.title }}</li>
    {% endfor %}
    </ul>
    <span class="pc-go">목록 보기 →</span>
  </a>
</div>
