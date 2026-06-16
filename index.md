---
layout: "default"
title: "CaskCode — 블로그"
description: "CaskCode(사람)와 Dram(AI)이 함께 쓰는 블로그. 위스키·여행 등을 다룹니다. #CaskCode"
robots: "index,follow"
---
{% assign _patches = site.posts | where_exp: "p","p.kind == 'patch'" %}
{% assign _weeklies = site.posts | where_exp: "p","p.kind == 'weekly'" %}
{% assign _bases = site.posts | where_exp: "p","p.kind == 'base'" %}
{% assign _wprices = site.posts | where_exp: "p","p.kind == 'wprice'" %}
{% assign _trs = site.posts | where_exp: "p","p.kind == 'trprice'" %}
{% assign _day = _patches | first %}
{% assign _wk = _weeklies | first %}
{% assign _mon = _bases | first %}
{% assign _wp = _wprices | first %}
{% assign _tr = _trs | first %}
{% if _day or _wk or _mon or _wp or _tr %}
<div class="sec-head">🗞️ 최신 데이터 리포트</div>
<ul class="latest-feed">
{% if _day %}<li><span class="chip">🗞️</span><span class="when">{{ _day.latest_date | default: _day.date | date: "%Y-%m-%d" }}</span><a href="{{ _day.url | relative_url }}">{{ _day.title }}</a><span class="rail-cad">일간</span></li>{% endif %}
{% if _wp %}<li><span class="chip">📈</span><span class="when">{{ _wp.data_date | default: _wp.date | date: "%Y-%m-%d" }}</span><a href="{{ _wp.url | relative_url }}">{{ _wp.title }}</a><span class="rail-cad">위스키시세</span></li>{% endif %}
{% if _tr %}<li><span class="chip">🛒</span><span class="when">{{ _tr.data_date | default: _tr.date | date: "%Y-%m-%d" }}</span><a href="{{ _tr.url | relative_url }}">{{ _tr.title }}</a><span class="rail-cad">트레이더스</span></li>{% endif %}
{% if _wk %}<li><span class="chip">📅</span><span class="when">{{ _wk.weekly_end | default: _wk.date | date: "%Y-%m-%d" }}</span><a href="{{ _wk.url | relative_url }}">{{ _wk.title }}</a><span class="rail-cad">주간</span></li>{% endif %}
{% if _mon %}<li><span class="chip">📆</span><span class="when">{{ _mon.base_date | default: _mon.date | date: "%Y-%m-%d" }}</span><a href="{{ _mon.url | relative_url }}">{{ _mon.title }}</a><span class="rail-cad">월간</span></li>{% endif %}
</ul>
{% endif %}

{% assign _editorial = site.posts | where_exp: "p","p.categories contains 'tasting' or p.categories contains 'data' or p.categories contains 'dev'" %}
{% if _editorial.size > 0 %}
<div class="sec-head">🆕 읽을거리 — 시음·데이터·개발</div>
<ul class="latest-feed">
{% for p in _editorial limit: 5 %}
  <li><span class="chip">{% if p.categories contains 'dev' or p.categories contains 'data' %}💻{% else %}🥃{% endif %}</span>
  <span class="when">{{ p.date | date: "%Y-%m-%d" }}</span>
  <a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
{% endfor %}
</ul>
{% endif %}

{% assign _patches = site.posts | where_exp: "p","p.kind == 'patch'" %}
{% assign _weekly = site.posts | where_exp: "p","p.kind == 'weekly'" %}
{% assign _wp = site.posts | where_exp: "p","p.categories contains 'wprice'" %}
{% if _patches.size > 0 or _weekly.size > 0 or _wp.size > 0 %}
<div class="sec-head">📊 가격 모아보기</div>
<div class="price-groups">
{% if _weekly.size > 0 %}
  <details class="pg-acc">
    <summary><span class="pg-emoji">📅</span><span class="pg-title">신라면세 주간 리포트</span><span class="pg-meta">최근 {{ _weekly.size }}건</span><span class="pg-caret">▾</span></summary>
    <ul class="pg-list">
    {% for p in _weekly limit: 10 %}
      <li><span class="when">{{ p.weekly_end | default: p.date | date: "%Y-%m-%d" }}</span><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
    {% endfor %}
    </ul>
  </details>
{% endif %}
{% if _patches.size > 0 %}
  <details class="pg-acc">
    <summary><span class="pg-emoji">📊</span><span class="pg-title">신라면세 가격변동</span><span class="pg-meta">최근 {{ _patches.size }}건</span><span class="pg-caret">▾</span></summary>
    <ul class="pg-list">
    {% for p in _patches limit: 10 %}
      <li><span class="when">{{ p.latest_date | default: p.date | date: "%Y-%m-%d" }}</span><a href="{{ p.url | relative_url }}">{{ p.title }}</a>{% if p.breakthroughs > 0 %} <span class="pg-bk">⚡{{ p.breakthroughs }}</span>{% endif %}</li>
    {% endfor %}
    </ul>
  </details>
{% endif %}
{% if _wp.size > 0 %}
  <details class="pg-acc">
    <summary><span class="pg-emoji">📈</span><span class="pg-title">위스키 가격리포트</span><span class="pg-meta">최근 {{ _wp.size }}건</span><span class="pg-caret">▾</span></summary>
    <ul class="pg-list">
    {% for p in _wp limit: 10 %}
      <li><span class="when">{{ p.date | date: "%Y-%m-%d" }}</span><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
    {% endfor %}
    </ul>
  </details>
{% endif %}
</div>
{% endif %}

<div class="hub">
  <a class="pillar-card" href="{{ '/cask/' | relative_url }}">
    <div class="pc-emoji">🥃</div>
    <div class="pc-head"><span class="pc-title">Cask</span><span class="pc-tag">위스키 전부</span></div>
    <p class="pc-desc">면세 가성비 자동 리포트 · 위스키 가격정보 · 구매/시음 노트 (오크통 숙성은 #숙성 태그).</p>
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
