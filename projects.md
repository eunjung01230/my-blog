---
layout: default
title: Projects
permalink: /projects/
---

<section class="page-head">

  <h1 class="page-title">Projects</h1>

  <p class="page-meta">
    진행한 프로젝트와 개발 과정 기록을 모아두는 공간입니다.
  </p>

</section>


{%- comment -%}
  프로젝트 데이터는 아직 없다.
  _data/projects.yml 을 만들면 아래 목록이 자동으로 채워진다.
{%- endcomment -%}

{%- if site.data.projects and site.data.projects.size > 0 -%}
<div class="project-list">
  {%- for project in site.data.projects -%}
  <article class="project-card">
    <h2 class="project-card-title">
      {%- if project.url -%}
      <a href="{{ project.url }}">{{ project.name }}</a>
      {%- else -%}
      {{ project.name }}
      {%- endif -%}
    </h2>
    {%- if project.period -%}
    <p class="project-card-period">{{ project.period }}</p>
    {%- endif -%}
    {%- if project.summary -%}
    <p class="project-card-summary">{{ project.summary }}</p>
    {%- endif -%}
    {%- if project.stack and project.stack.size > 0 -%}
    <ul class="project-card-stack">
      {%- for item in project.stack -%}
      <li>{{ item }}</li>
      {%- endfor -%}
    </ul>
    {%- endif -%}
  </article>
  {%- endfor -%}
</div>
{%- else -%}
<p class="empty-message">아직 등록된 프로젝트가 없습니다.</p>
{%- endif -%}
