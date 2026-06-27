---
layout: "default"
title: "CaskCode — 블로그"
description: "CaskCode(사람)와 Dram(AI)이 함께 쓰는 블로그. 위스키·여행 등을 다룹니다. #CaskCode"
robots: "index,follow"
---
{% assign _wl = site.posts | where_exp: "p","p.kind == 'patch' and p.cadence == 'weekly'" | sort: "date" | reverse %}
{% if _wl.size > 0 and _wl[0].rare_drops_count > 0 %}{% assign _r = _wl[0] %}
<div class="sec-head">🕰️ 신라면세 오랜만의 큰 인하 — 거의 정상가였다가 모처럼 큰 폭 인하</div>
<div class="rare-wrap"><a class="rare-card" href="{{ _r.url | relative_url }}"><div class="rare-head"><span class="rare-title">이번 주 {{ _r.rare_drops_count }}종 인하</span><span class="rare-when">{{ _r.latest_date | default: _r.weekly_end }} 기준</span></div><ul class="rare-list">{% for d in _r.rare_drops %}<li><span class="rare-mark">🕰️</span><span>{{ d }}</span></li>{% endfor %}</ul><span class="rare-more">자세히 보기 →</span></a></div>
{% endif %}

<a class="dash-cta" href="{{ '/dashboard/' | relative_url }}">📊 위스키 가격 대시보드 →<span class="dash-sub">소매가 · 면세가 · 해외가 비교</span></a>
<a class="dash-cta" href="{{ '/dashboard/brands/' | relative_url }}">🥃 브랜드 대시보드 →<span class="dash-sub">브랜드별 가치 추천 · 지금 사라</span></a>
{% assign _df = site.posts | where_exp:"p","p.kind == 'wprice'" | sort:"date" | reverse | first %}{% if _df %}<a class="dash-cta" href="{{ _df.url | relative_url }}">✈️ 면세점 가격 비교 →<span class="dash-sub">신라·롯데·신세계 100ml당 가격대별 Top 10</span></a>{% endif %}

{% assign _wlogs = site.posts | where_exp: "p","p.kind == 'patch' and p.cadence == 'weekly'" | sort: "date" | reverse %}
{% if _wlogs.size > 0 %}{% assign _w = _wlogs[0] %}
<div class="sec-head">🔥 이번주 핫딜 — 면세가가 국내최저보다 싼 위스키</div>
<div class="hotdeal-wrap"><a class="hotdeal-card" href="{{ _w.url | relative_url }}"><div class="hd-head"><span class="hd-title">{{ _w.title }}</span><span class="hd-when">{{ _w.latest_date | default: _w.weekly_end }} 기준</span></div>{% if _w.hotdeals and _w.hotdeals.size > 0 %}<ul class="hotdeal-list">{% for d in _w.hotdeals %}<li><span class="hd-fire">🔥</span><span>{{ d }}</span></li>{% endfor %}</ul>{% assign _rest = _w.hotdeals_count | minus: _w.hotdeals.size %}<span class="hd-more">{% if _rest > 0 %}+ {{ _rest }}종 더 · {% endif %}주간 로그 전체 보기 →</span>{% else %}<span class="hd-more">이번 주 가격 변동 로그 보기 →</span>{% endif %}</a></div>
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

<div class="hub">
  <a class="pillar-card" href="{{ '/cask/' | relative_url }}">
    <div class="pc-emoji">🥃</div>
    <div class="pc-head"><span class="pc-title">Cask</span><span class="pc-tag">위스키 전부</span></div>
    <p class="pc-desc">구매/시음/숙성 노트 · 면세 가성비 자동 리포트 · 위스키 가격정보.</p>
    {% assign posts_cask = site.posts | where_exp: "p", "p.categories contains 'tasting' or p.categories contains 'price' or p.categories contains 'wprice'" %}
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
