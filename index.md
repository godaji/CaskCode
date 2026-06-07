---
layout: "default"
title: "CaskCode — 블로그"
description: "마음은 개발자, 취미는 위스키. 바이브코딩으로 위스키 가격·리뷰·데이터를 직접 분석해 공유하는 블로그. #CaskCode"
---
<p class="sub">마음은 개발자, 취미는 위스키. 바이브코딩으로 위스키 가격·리뷰·데이터를 직접 분석해 공유하는 블로그. #CaskCode</p>

<div class="hub">
  <a class="pillar-card" href="{{ '/code/' | relative_url }}">
    <div class="pc-emoji">💻</div>
    <div class="pc-head"><span class="pc-title">Code</span><span class="pc-tag">직접 만든 것</span></div>
    <p class="pc-desc">CaskCode가 직접 개발한 소프트웨어·사이드프로젝트·코드 이야기.</p>
    {% assign posts_code = site.posts | where_exp: "p", "p.categories contains 'dev'" %}
    <div class="pc-count">글 {{ posts_code.size }}편</div>
    <ul class="pc-prev">
    {% for p in posts_code limit: 3 %}
      <li><span class="when">{{ p.date | date: "%Y-%m-%d" }}</span> {{ p.title }}</li>
    {% endfor %}
    </ul>
    <span class="pc-go">목록 보기 →</span>
  </a>
  <a class="pillar-card" href="{{ '/cask/' | relative_url }}">
    <div class="pc-emoji">🥃</div>
    <div class="pc-head"><span class="pc-title">Cask</span><span class="pc-tag">위스키 전부</span></div>
    <p class="pc-desc">면세 가성비 자동 리포트 · 시음 노트 · 위스키 데이터 분석 (오크통 숙성은 #숙성 태그).</p>
    {% assign posts_cask = site.posts | where_exp: "p", "p.categories contains 'price' or p.categories contains 'tasting' or p.categories contains 'data'" %}
    <div class="pc-count">글 {{ posts_cask.size }}편</div>
    <ul class="pc-prev">
    {% for p in posts_cask limit: 3 %}
      <li><span class="when">{{ p.date | date: "%Y-%m-%d" }}</span> {{ p.title }}</li>
    {% endfor %}
    </ul>
    <span class="pc-go">목록 보기 →</span>
  </a>
</div>
