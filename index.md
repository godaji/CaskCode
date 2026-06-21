---
layout: "default"
title: "CaskCode — 블로그"
description: "CaskCode(사람)와 Dram(AI)이 함께 쓰는 블로그. 위스키·여행 등을 다룹니다. #CaskCode"
robots: "index,follow"
---
<a class="dash-cta" href="{{ '/dashboard/' | relative_url }}">📊 위스키 가격 대시보드 →<span class="dash-sub">소매가 · 면세가 · 해외가 비교</span></a>
<a class="dash-cta" href="{{ '/dashboard/brands/' | relative_url }}">🥃 브랜드 대시보드 →<span class="dash-sub">브랜드별 가치 추천 · 지금 사라</span></a>

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
