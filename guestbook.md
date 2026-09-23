---
layout: default
title: 방명록
permalink: /guestbook/
---

{%- comment -%}
  방명록 (Giscus).
  글은 GitHub Discussions 에 저장되고, 작성은 GitHub 로그인 후 할 수 있다.
  mapping="specific" + 고정 term + strict 로, 페이지 주소와 상관없이 항상 같은 Discussion 하나에 연결된다.
  설정값은 _config.yml 의 giscus 에서 관리한다.
{%- endcomment -%}
{%- assign giscus = site.giscus -%}

<section class="page-head">

  <h1 class="page-title">방명록</h1>

  <p class="page-meta">블로그에 들른 이야기를 남겨 주세요. GitHub 계정으로 로그인하면 글을 쓸 수 있습니다.</p>

</section>


<div class="guestbook-page">

  {%- assign giscus_ready = false -%}
  {%- if giscus.repo and giscus.repo != "" and giscus.repo_id and giscus.repo_id != "" -%}
    {%- if giscus.category and giscus.category != "" and giscus.category_id and giscus.category_id != "" -%}
      {%- assign giscus_ready = true -%}
    {%- endif -%}
  {%- endif -%}

  {%- if giscus_ready -%}
  <div class="giscus"></div>
  <script src="https://giscus.app/client.js"
          data-repo="{{ giscus.repo | escape }}"
          data-repo-id="{{ giscus.repo_id | escape }}"
          data-category="{{ giscus.category | escape }}"
          data-category-id="{{ giscus.category_id | escape }}"
          data-mapping="specific"
          data-term="{{ giscus.term | default: 'Guestbook' | escape }}"
          data-strict="1"
          data-reactions-enabled="1"
          data-emit-metadata="0"
          data-input-position="top"
          data-theme="light"
          data-lang="ko"
          data-loading="lazy"
          crossorigin="anonymous"
          async>
  </script>
  {%- else -%}
  <p class="guestbook-pending">방명록 준비 중입니다.</p>
  {%- endif -%}

</div>
