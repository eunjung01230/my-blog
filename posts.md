---
layout: default
title: Posts
permalink: /posts/
---

{%- comment -%}
  일반 글(_posts)과 프로젝트 글(_project_posts)을 합쳐 최신순으로 보여준다.
{%- endcomment -%}
{%- assign all_entries = site.posts | concat: site.project_posts | sort: "date" | reverse -%}

<div class="page-center">

<section class="page-head page-head-with-action">

  <div class="page-head-text">
    <h1 class="page-title">Posts</h1>
    <p class="page-meta">전체 기록 {{ all_entries | size }}개</p>
  </div>

  <a class="page-action" href="{{ '/write/' | relative_url }}?type=post">포스트 추가 +</a>

</section>


<div class="post-list">
  {%- for post in all_entries -%}
    {% include post-card.html post=post %}
  {%- endfor -%}
</div>

</div>
