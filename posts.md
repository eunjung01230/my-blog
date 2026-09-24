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
    <div class="page-meta-row">
      <p class="page-meta">전체 기록 {{ all_entries | size }}개</p>
      {% include post-sort.html count=all_entries.size %}
    </div>
  </div>

  <a class="page-action" href="{{ '/write/' | relative_url }}?type=post">포스트 추가 +</a>

</section>


{% include post-list.html entries=all_entries empty="아직 작성된 글이 없습니다." %}

</div>
