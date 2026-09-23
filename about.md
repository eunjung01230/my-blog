---
layout: default
title: About
permalink: /about/
---

<div class="page-center">

{%- comment -%}
  소개 편집: 이 페이지의 원본 파일(page.path = about.md)을 GitHub 편집 화면으로 연다.
{%- endcomment -%}
<section class="page-head page-head-with-action">

  <div class="page-head-text">
    <h1 class="page-title">About</h1>
  </div>

  <a class="page-action"
     href="https://github.com/{{ site.write.repo }}/edit/{{ site.write.branch | default: 'main' }}/{{ page.path }}"
     target="_blank" rel="noopener">소개 편집</a>

</section>

<div class="page-body">

  <p>
    개발하면서 배우고, 헷갈리고, 해결한 과정을 기록합니다.
  </p>

  <p class="page-note">
    상세 소개는 추후 작성할 예정입니다.
  </p>

</div>

</div>
