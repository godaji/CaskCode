---
layout: "default"
title: "CaskCode — 블로그"
description: "마음은 개발자, 취미는 위스키. 바이브코딩으로 위스키 가격·리뷰·데이터를 직접 분석해 공유하는 블로그. #CaskCode"
---
<p class="sub">마음은 개발자, 취미는 위스키. 바이브코딩으로 위스키 가격·리뷰·데이터를 직접 분석해 공유하는 블로그. #CaskCode</p>

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


<span id="cask"></span>
## 🥃 Cask — 위스키 전부
*면세 가성비 자동 리포트 · 시음 노트 · 위스키 데이터 분석 (오크통 숙성은 `#숙성` 태그).*


### 🏷️ 이달의 면세 가성비
*데이터로 고른 면세 위스키 본편 — 국내최저 돌파 (자동 생성)*

{% assign bases = site.posts | where_exp: "p", "p.kind == 'base'" %}
{% assign patches = site.posts | where_exp: "p", "p.kind == 'patch'" %}
{% if bases.size > 0 %}
<ul class="archive">
{% for p in bases %}
  <li><span class="when">{{ p.base_date | default: p.date | date: "%Y-%m-%d" }}</span>
  <a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
{% endfor %}
</ul>
{% else %}
<div class="empty">아직 본편이 없습니다.</div>
{% endif %}

### 🗞️ 가격 패치 아카이브
*직전 대비 가격 변동 — 국내최저 돌파 알림 (자동 생성)*
{% if patches.size > 0 %}
<ul class="archive">
{% for p in patches %}
  <li><span class="when">{{ p.latest_date | default: p.date | date: "%Y-%m-%d" }}</span>
  <a href="{{ p.url | relative_url }}">{{ p.title }}</a>
  {% if p.cadence == 'instant' %}<span class="badge instant">⚡ 돌파</span>{% else %}<span class="badge digest">다이제스트</span>{% endif %}
  {% if p.breakthroughs > 0 %}<span class="sub">· 국내최저 돌파 {{ p.breakthroughs }}건</span>{% endif %}</li>
{% endfor %}
</ul>
{% else %}
<div class="empty">아직 패치가 없습니다.</div>
{% endif %}


### 🥃 시음 노트
*실제로 마셔본 기록 (오크통 숙성 실험은 `#숙성` 태그)*

{% assign items = site.posts | where_exp: "p", "p.categories contains 'tasting'" %}
{% if items.size > 0 %}
<ul class="archive">
{% for p in items %}
  <li><span class="when">{{ p.date | date: "%Y-%m-%d" }}</span>
  <a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
{% endfor %}
</ul>
{% else %}
<div class="empty">아직 글이 없어요 — <code>_drafts/tasting-예시.md</code> 를 복사해 <code>_posts/</code>에 저장하면 여기 자동 표시.</div>
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
<div class="empty">아직 글이 없어요 — <code>_drafts/data-예시.md</code> 를 복사해 <code>_posts/</code>에 저장하면 여기 자동 표시.</div>
{% endif %}


> 📓 **일기**·🛢️ **숙성**은 따로 칸을 두지 않습니다 — 위스키 산 이야기·여정·느낀점은
> **`#일기`**, 오크통 숙성·블렌딩 실험은 **`#숙성`** 태그로 Cask 글에 답니다
> (예: 시음 일기 = Cask 글 + `tags: [일기]`).


{% assign known = "price,tasting,data,dev" | split: "," %}
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
