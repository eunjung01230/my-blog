---
layout: default
title: Projects
permalink: /projects/
---

{%- comment -%}
  프로젝트 목록은 _data/projects.yml 하나만 보고 만든다.
  프로젝트를 추가할 때는 projects.yml 에 항목을 넣고
  projects/<slug>.md 를 하나 만들면 된다.
{%- endcomment -%}

<div class="page-center">

<section class="page-head">

  <h1 class="page-title">Projects</h1>

  <p class="page-meta">진행한 프로젝트와 개발 과정 기록을 모아둡니다.</p>

</section>


{%- if site.data.projects and site.data.projects.size > 0 -%}
<div class="project-list">
  {%- for project in site.data.projects -%}
  <article class="project-card">
    <h2 class="project-card-title">
      <a href="{{ '/projects/' | append: project.slug | append: '/' | relative_url }}">{{ project.label }}</a>
    </h2>
    <p class="project-card-summary">
      <a href="{{ '/projects/' | append: project.slug | append: '/' | relative_url }}">프로젝트 기록 보기 &rarr;</a>
    </p>
  </article>
  {%- endfor -%}
</div>
{%- else -%}
<p class="empty-message">아직 등록된 프로젝트가 없습니다.</p>
{%- endif -%}

</div>
