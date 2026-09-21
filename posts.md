---
layout: default
title: Posts
permalink: /posts/
---

<section class="page-head">

  <h1 class="page-title">Posts</h1>

  <p class="page-meta">전체 기록 {{ site.posts | size }}개</p>

</section>


<div class="post-list">
  {%- for post in site.posts -%}
    {% include post-card.html post=post %}
  {%- endfor -%}
</div>
