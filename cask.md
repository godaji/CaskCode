---
layout: "default"
title: "🥃 Cask — 위스키 전부"
description: "면세 가성비 자동 리포트 · 위스키 가격정보 · 구매/시음 노트 (오크통 숙성은 `#숙성` 태그)."
permalink: "/cask/"
robots: "index,follow"
---

<span id="cask"></span>
## 🥃 Cask — 위스키 전부
*면세 가성비 자동 리포트 · 위스키 가격정보 · 구매/시음 노트 (오크통 숙성은 `#숙성` 태그).*


### 🏷️ 신라면세 위스키 정보
*면세 가성비 본편 + 가격 패치 — 국내최저 돌파 (자동 생성)*

{% assign bases = site.posts | where_exp: "p", "p.kind == 'base'" %}
{% assign patches = site.posts | where_exp: "p", "p.kind == 'patch'" %}
{% if bases.size > 0 or patches.size > 0 %}
<ul class="archive">
{% for p in bases %}
  <li><span class="when">{{ p.base_date | default: p.date | date: "%Y-%m-%d" }}</span>
  <a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
{% endfor %}
{% for p in patches %}
  <li><span class="when">{{ p.latest_date | default: p.date | date: "%Y-%m-%d" }}</span>
  <a href="{{ p.url | relative_url }}">{{ p.title }}</a>
  {% if p.cadence == 'instant' %}<span class="badge instant">⚡ 돌파</span>{% else %}<span class="badge digest">다이제스트</span>{% endif %}
  {% if p.breakthroughs > 0 %}<span class="sub">· 국내최저 돌파 {{ p.breakthroughs }}건</span>{% endif %}</li>
{% endfor %}
</ul>
{% else %}
<div class="empty">아직 글이 없습니다.</div>
{% endif %}


### 💰 위스키 가격정보
*국내·해외 위스키 시세 — 트레이더스·코스트코·데일리샷·홍콩·일본 비교*

{% assign items = site.posts | where_exp: "p", "p.categories contains 'wprice'" %}
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


### 🥃 구매/시음 노트
*사서 마셔본 기록 — 구매 노트 + 시음 (오크통 숙성 실험은 `#숙성` 태그)*

{% assign items = site.posts | where_exp: "p", "p.categories contains 'tasting'" %}
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


> 📓 **일기**·🛢️ **숙성**은 따로 칸을 두지 않습니다 — 위스키 산 이야기·여정·느낀점은
> **`#일기`**, 오크통 숙성·블렌딩 실험은 **`#숙성`** 태그로 Cask 글에 답니다
> (예: 시음 일기 = Cask 글 + `tags: [일기]`).


{% assign known = "price,wprice,tasting,data,dev" | split: "," %}
{% capture _extras %}{% for cat in site.categories %}{% unless known contains cat[0] %}{{ cat[0] }},{% endunless %}{% endfor %}{% endcapture %}
{% if _extras != "" %}
## 🗂️ 기타 카테고리
{% for cat in site.categories %}{% unless known contains cat[0] %}
### {{ cat[0] }}
<ul class="archive">
{% for p in cat[1] %}
  <li><span class="when">{{ p.date | date: "%Y-%m-%d" }}</span>
  <a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
{% endfor %}
</ul>
{% endunless %}{% endfor %}
{% endif %}
