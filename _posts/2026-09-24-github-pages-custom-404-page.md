---
layout: post
title: "404 페이지도 직접 만들 수 있을까? GitHub Pages의 404 페이지 꾸미기"
date: 2026-09-24 22:05:00 +0900
categories: deployment
learningOrder: 20
tags:
  - github-pages
  - jekyll
  - 404
  - baseurl
---

## 들어가며

블로그의 페이지를 하나씩 꾸미면서 홈, 포스트, 카테고리 같은 정상적인 화면만 생각하고 있었다.

그러다 문득 존재하지 않는 주소로 들어갔을 때 나오는 **404 페이지**도 직접 만들 수 있는지 궁금해졌다.

결론부터 말하면 가능하다. GitHub Pages에서도 **커스텀 404 페이지**를 만들 수 있다.

이 글은 GitHub Pages에서 404 페이지가 어떤 규칙으로 동작하는지, 프로젝트 사이트에서는 무엇을 조심해야 하는지 공부한 내용을 정리한 노트다. 설명은 GitHub Docs와 Jekyll 공식 문서를 기준으로 확인했다.

---

## 404가 뭘까?

웹사이트에서 존재하지 않는 주소에 접근하면 흔히 보는 것이

```text
404 Not Found
```

이다.

404는 HTTP **상태 코드**다. MDN에서는 서버가 요청한 자원을 찾을 수 없다는 뜻으로 설명한다.

이 블로그로 예를 들면, 실제 카테고리 주소는

```text
/my-blog/categories/git/
```

인데 사용자가

```text
/my-blog/categories/gitt/
```

처럼 잘못 입력하면 404가 된다.

404가 생기는 경우를 정리하면 이 정도다.

| 경우 | 예 |
|------|------|
| 주소를 잘못 입력 | `git`을 `gitt`로 입력 |
| 페이지가 삭제됨 | 예전 글을 지웠는데 링크가 남아 있음 |
| 주소가 바뀜 | 카테고리나 파일 이름을 바꿔 글 URL이 달라짐 |
| 내부 링크 오류 | 경로를 잘못 적은 링크 |

보통은 단순한 오류 화면이라고 생각하기 쉽다.

하지만 블로그를 운영하는 입장에서는 이 페이지도 **사용자가 실제로 보게 되는 화면**이다.

---

## GitHub Pages에서 만드는 규칙

GitHub Docs에 따르면 사이트의 **게시 소스(publishing source)**에 다음 파일 중 하나를 만들면 커스텀 404 페이지로 쓰인다.

| 파일 | 필요한 것 |
|------|------|
| `404.html` | 파일만 있으면 된다 |
| `404.md` | 머리말에 `permalink: /404.html`을 지정한다 |

Markdown으로 만들 때는 이렇게 쓴다.

```yaml
---
permalink: /404.html
---
```

그 아래에 404 페이지에 보여줄 내용을 작성하면 된다.

`404.md`에 permalink가 필요한 이유는 결과 파일 이름 때문이다.

GitHub Pages가 찾는 것은 빌드 결과물의 `404.html`이다. Markdown 파일은 Jekyll이 HTML로 바꾸는데, permalink를 지정해 두면 결과 파일이 정확히 `/404.html` 위치에 만들어진다.

즉 GitHub가 기본으로 보여주는 오류 화면만 쓸 필요는 없다.

### 화면은 바뀌어도 상태 코드는 404다

공부하면서 하나 더 확인한 부분이 있다.

커스텀 404 페이지를 만들어도 **응답 상태 코드는 그대로 404**다.

이 블로그의 없는 주소에 요청을 보내 보면 화면은 블로그 디자인의 404 페이지가 나오지만, 상태 코드는 `404`로 돌아온다.

```text
보이는 화면  → 블로그 디자인에 맞춘 404 페이지
상태 코드    → 404
```

사람에게는 친절한 안내 화면을 보여주면서도, 브라우저와 검색엔진에는 "이 주소에는 페이지가 없다"는 정보가 정확하게 전달된다는 뜻이다.

---

## 404 페이지에는 무엇을 넣어야 할까?

404 페이지에서 중요한 것은

> 잘못된 페이지입니다.

라고 알려주는 것보다 사용자가 **다음에 어디로 갈 수 있는지 알려주는 것**이라고 생각했다.

기본 구성은 이 정도면 된다.

```text
404

페이지를 찾을 수 없습니다.

[홈으로]
[전체 글 보기]
[카테고리 보기]
```

조금 더 발전시키면

```text
최근 작성한 글
추천 포스트
검색
이전 페이지로 이동
```

같은 기능도 생각해볼 수 있다.

404 페이지를 **막다른 길로 만들지 않는 것**이 핵심이다.

---

## 정적 블로그인데 기능도 넣을 수 있을까?

이 블로그는 GitHub Pages 기반의 정적 사이트다.

그렇다고 404 페이지에 아무 기능도 넣을 수 없는 것은 아니다.

다만 서버 애플리케이션처럼 요청이 올 때마다 서버가 데이터를 처리하는 것은 아니라서, 무엇이 **언제** 동작하는지 나눠서 생각해야 했다.

| 도구 | 동작 시점 | 404 페이지에서 할 수 있는 것 |
|------|------|------|
| HTML / CSS | 파일 그대로 | 안내 문구, 버튼, 블로그와 같은 디자인 |
| Jekyll / Liquid | 빌드할 때 한 번 | 최근 글 목록, 카테고리 링크 같은 글 정보 출력 |
| JavaScript | 방문자 브라우저에서 | 이전 페이지로 이동, 간단한 검색 같은 동작 |

예를 들어 404 페이지에 "최근 글 5개"를 Liquid로 넣으면, 그 목록은 **빌드한 시점의 글 목록**이다.

새 글을 올리면 다시 빌드되면서 목록도 갱신되지만, 방문자가 들어올 때마다 새로 계산하는 것은 아니다.

GitHub Pages는 저장소 파일을 웹사이트로 게시하는 정적 호스팅이고 Jekyll을 기본으로 지원하기 때문에, 이 세 가지 조합으로 충분히 쓸 만한 404 페이지를 만들 수 있다.

---

## 프로젝트 사이트에서는 경로를 조심해야 한다

GitHub Pages 사이트는 주소 형태가 두 가지다.

| 종류 | 주소 형태 | 사이트 루트 |
|------|------|------|
| 사용자 사이트 | `username.github.io/` | `/` |
| 프로젝트 사이트 | `username.github.io/my-blog/` | `/my-blog/` |

이 블로그는 저장소 이름이 경로에 들어가는 **프로젝트 사이트**다.

이때 404 페이지의 홈 링크를

```html
<a href="/">홈</a>
```

처럼 쓰면 블로그 홈(`/my-blog/`)이 아니라 계정 사이트의 루트(`username.github.io/`)로 이동한다.

그래서 Jekyll에서는 `_config.yml`의 `baseurl`과 `relative_url` 필터를 써서 내부 링크를 만든다.

```yaml
# _config.yml
baseurl: "/my-blog"
```

`relative_url`은 주소 앞에 `baseurl`을 붙여 준다.

| 작성한 값 | `relative_url`을 거친 결과 |
|------|------|
| `/` | `/my-blog/` |
| `/posts/` | `/my-blog/posts/` |

404 페이지는 특히 이 부분을 확인해야 한다.

정상 페이지는 정해진 주소에서만 열리지만, 404 페이지는 `/my-blog/아무-주소`, `/my-blog/a/b/c/`처럼 **어떤 깊이의 잘못된 경로에서든** 열린다.

그래서 `../index.html` 같은 상대 경로도 위치에 따라 결과가 달라진다. `baseurl` 기준의 절대 경로로 만들어 두는 편이 안전하다.

---

## 이 블로그의 404 페이지

공부한 내용을 바탕으로 이 블로그에도 커스텀 404 페이지를 만들어 두었다.

현재 `404.html`의 주요 부분은 다음과 같다. (주석과 일부 설정은 생략했다.)

{% raw %}
```html
---
layout: default
title: 페이지를 찾을 수 없습니다
permalink: /404.html
noindex: true
---

<div class="page-center">
<section class="page-head">
  <h1 class="page-title">페이지를 찾을 수 없습니다</h1>
</section>
<div class="page-body">
  <p>
    주소가 바뀌었거나 삭제된 페이지일 수 있습니다.
  </p>
  <p>
    <a class="page-action" href="{{ '/' | relative_url }}">홈으로 이동</a>
  </p>
</div>
</div>
```
{% endraw %}

공부한 내용과 연결해 보면 이렇다.

| 설정 | 의미 |
|------|------|
| `layout: default` | 다른 페이지와 같은 레이아웃을 써서 디자인이 동떨어지지 않는다 |
| `permalink: /404.html` | 결과 파일이 정확히 `/404.html`에 만들어진다 |
| `noindex: true` | 이 블로그의 레이아웃이 `robots` 메타 태그를 넣어 검색엔진이 수집하지 않게 한다 |
| `relative_url` | 어떤 잘못된 경로에서 열려도 홈 링크가 `/my-blog/`로 간다 |

지금은 **홈으로 이동** 버튼 하나만 있다.

위에서 정리한 전체 글 보기, 카테고리, 최근 글 같은 구성은 아직 넣지 않았다. 필요해지면 Liquid로 빌드 시점의 글 목록을 붙이는 방식부터 검토해 보려고 한다.

직접 확인해 보려면 일부러 없는 주소로 들어가 보면 된다.

**404 페이지 확인:** [eunjung01230.github.io/my-blog/없는-페이지](https://eunjung01230.github.io/my-blog/%EC%97%86%EB%8A%94-%ED%8E%98%EC%9D%B4%EC%A7%80)

---

## 정리

| 궁금했던 것 | 정리한 내용 |
|------|------|
| GitHub Pages에서도 404를 바꿀 수 있나? | 게시 소스에 `404.html` 또는 `404.md`(+ `permalink: /404.html`)를 두면 된다 |
| 커스텀 페이지면 404가 아닌 건가? | 화면만 바뀌고 상태 코드는 그대로 404다 |
| 정적 사이트에서 기능을 넣을 수 있나? | HTML/CSS, 빌드 시점의 Liquid, 브라우저의 JavaScript로 나눠서 넣는다 |
| 링크는 어떻게 만들어야 하나? | 프로젝트 사이트에서는 `baseurl`과 `relative_url`을 써야 홈으로 제대로 간다 |

404 페이지는 사람들이 일부러 찾아가는 페이지는 아니다.

하지만 글이 많아지고 URL이 바뀌거나 예전 링크가 남기 시작하면 언젠가는 방문자가 보게 된다.

그때

```text
404 Not Found
```

만 보여주는 것과

```text
페이지를 찾을 수 없습니다.
홈이나 다른 글로 이동해보세요.
```

라고 안내하는 것은 꽤 큰 차이가 있다.

favicon이나 OG 이미지처럼 쉽게 놓치는 요소와 함께, **404 페이지도 사이트의 한 화면으로 챙겨야 한다**는 것을 이번에 정리할 수 있었다.

---

## 더 학습하면 좋은 개념

- **HTTP 상태 코드 (404, 410)** — 404는 "찾을 수 없음", 410은 "영구히 삭제됨"이다. 페이지를 지웠을 때 어떤 코드가 더 정확한지 구분할 수 있다.
- **소프트 404 (soft 404)** — 화면에는 "없는 페이지"라고 보이지만 상태 코드는 200으로 응답하는 경우다. 커스텀 404를 만들 때 상태 코드까지 확인해야 하는 이유와 연결된다.
- **리디렉션과 jekyll-redirect-from** — 글 주소를 바꿀 때 404를 만들지 않고 새 주소로 보내는 방법이다. GitHub Pages가 지원하는 Jekyll 플러그인 중 하나다.
- **Jekyll permalink** — 글과 페이지의 결과 주소가 어떻게 정해지는지 알면, 카테고리나 파일 이름을 바꿀 때 주소가 왜 바뀌는지 이해할 수 있다.
- **robots 메타 태그 (noindex)** — 검색엔진에 수집하지 말아야 할 페이지를 알려주는 방법이다. 404 페이지나 작성용 페이지처럼 검색 결과에 나올 필요가 없는 페이지에 쓴다.

## 참고 자료

- [GitHub Docs - Creating a custom 404 page for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)
- [GitHub Docs - About GitHub Pages and Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll)
- [MDN - 404 Not Found](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/404)
- [MDN - 410 Gone](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/410)
- [Jekyll Docs - Liquid Filters (relative_url)](https://jekyllrb.com/docs/liquid/filters/)
- [Jekyll Docs - Permalinks](https://jekyllrb.com/docs/permalinks/)
