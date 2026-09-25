---
layout: post
title: "Figma 기초 — 처음 화면을 만들기 전에 알아야 할 것들"
date: 2026-09-25 09:56:00 +0900
categories: design
learningOrder: 20
tags:
  - figma
  - frame
  - auto-layout
  - component
  - prototype
---

지난 글에서는 개발자가 왜 Figma를 배우려고 하는지 정리했다.

처음에는 화면을 조금 더 예쁘게 만들기 위한 도구라고 생각했지만, 직접 프로젝트를 만들다 보니 Figma는 **코드를 작성하기 전에 화면의 구조와 흐름을 정리하는 도구**에 더 가까웠다.

그렇다면 이제 실제로 Figma를 열어볼 차례다.

그런데 처음 Figma를 열었을 때는 생각보다 바로 뭔가를 만들기 어려웠다.

화면에는 여러 메뉴가 있고,

왼쪽에는 레이어가 있고,

오른쪽에는 수많은 설정이 보이고,

Frame, Section, Component, Auto Layout처럼 처음 보는 용어도 계속 나온다.

처음에는 이런 생각이 들었다.

```text
그래서 뭘 먼저 해야 하지?
```

하지만 하나씩 사용해보니 처음부터 모든 기능을 알 필요는 없었다.

내가 웹이나 앱 화면을 만들기 위해 우선 이해해야 했던 것은 크게 다음 정도였다.

```text
Canvas
↓
Frame
↓
Layer
↓
Section
↓
Auto Layout
↓
Component
↓
Prototype
```

이번 글에서는 이 개념들을 중심으로 Figma의 기본 구조를 정리해보려고 한다.

---

## 1. Canvas — 모든 작업이 시작되는 공간

Figma 파일을 열면 가장 넓게 보이는 공간이 있다.

여기에 화면도 만들고,

버튼도 만들고,

이미지도 배치한다.

이 공간을 **Canvas**라고 생각하면 된다.

처음에는 Canvas 자체를 하나의 화면이라고 생각하기 쉬운데, 실제로는 그렇지 않다.

Canvas는 여러 화면을 펼쳐놓는 작업 공간에 가깝다.

예를 들어 앱을 만든다면 하나의 Canvas 안에

```text
로그인 화면

홈 화면

상세 화면

설정 화면

프로필 화면
```

을 전부 놓을 수 있다.

개발로 비유하면 하나의 웹페이지라기보다는

```text
프로젝트 작업 공간
```

에 조금 더 가깝다.

---

## 2. Frame — 실제 화면을 만드는 가장 기본적인 단위

Figma를 시작하면서 가장 먼저 확실하게 이해해야 했던 것은 **Frame**이었다.

Frame은 여러 요소를 담을 수 있는 컨테이너다.

[Figma 공식 문서](https://help.figma.com/hc/en-us/articles/360041539473-Frames-in-Figma-Design)에서도 Frame을 디자인을 구성하는 기본적인 컨테이너로 설명하고 있으며, Frame 안에 다른 Frame을 중첩해서 사용할 수도 있다.

예를 들어 모바일 홈 화면을 하나 만든다면

```text
Frame
└─ Home
```

을 만들고,

그 안에

```text
Home Frame
├─ Header
├─ Search
├─ Banner
├─ Content
└─ Bottom Navigation
```

같은 요소들을 배치할 수 있다.

개발하면서 보던 구조와 비교하면 이해하기 쉬웠다.

```html
<div class="page">
  <header></header>
  <main></main>
  <nav></nav>
</div>
```

Figma에서도 비슷하게

```text
Home Frame
├─ Header Frame
├─ Main Frame
└─ Navigation Frame
```

처럼 부모와 자식 구조를 만들 수 있다.

그래서 나는 Frame을 처음 이해할 때

> **화면이면서 동시에 다른 요소를 담는 컨테이너**

라고 생각했다.

---

## Frame과 Rectangle은 다르다

처음에는 이것도 조금 헷갈렸다.

화면에 사각형을 하나 그리고 크기를 휴대폰 화면처럼 만들면

```text
이것도 Frame 아닌가?
```

싶었다.

겉으로 보면 비슷하다.

하지만 역할은 다르다.

Rectangle은 기본적으로 하나의 도형이다.

반면 Frame은 내부에 다른 요소를 넣고 관리할 수 있는 컨테이너이며 Auto Layout, Layout Guide, Prototype 같은 기능과도 연결된다.

그래서 화면 구조를 만들 때는 보통

```text
Rectangle
```

이 아니라

```text
Frame
```

을 사용한다.

Rectangle은

```text
배경
이미지 영역
장식 요소
단순 도형
```

같은 곳에서 사용할 수 있다.

---

## Frame 안에 Frame을 넣을 수 있다

Frame을 이해하면서 중요했던 부분이 하나 더 있었다.

Frame은 한 번만 사용하는 것이 아니다.

예를 들어 홈 화면 전체가 하나의 Frame이라고 해도 그 안에 또 Frame을 만들 수 있다.

```text
Home
│
├─ Header
│
├─ User Info
│
├─ Benefit Card
│  ├─ Brand
│  ├─ Stamp
│  └─ Button
│
└─ Navigation
```

여기서

```text
Home
Benefit Card
Navigation
```

모두 Frame이 될 수 있다.

처음에는

> Frame을 왜 이렇게 많이 만들지?

라는 생각이 들 수도 있다.

하지만 나중에 Auto Layout이나 반응형 화면을 만들기 시작하면 이런 구조가 중요해진다.

개발에서도 모든 요소를 하나의 `div` 안에 무작정 넣기보다 의미 있는 단위로 묶는 것과 비슷했다.

---

## 3. Layer — 화면을 이루는 각각의 요소

Figma 왼쪽을 보면 내가 만든 요소들이 목록처럼 나타난다.

이것이 **Layers** 영역이다.

예를 들어 화면에

* 제목
* 설명
* 이미지
* 버튼

을 만들었다면 Layers에도 각각의 요소가 나타난다.

```text
Home
├─ Title
├─ Description
├─ Image
└─ Start Button
```

Figma의 Frame도 하나의 Layer이고, Text나 Shape 같은 요소도 각각 Layer로 관리된다.

처음에는 그냥

```text
Rectangle 31
Frame 22
Text 17
Group 8
```

처럼 자동 생성된 이름을 그대로 둔 적도 있었다.

몇 개 없을 때는 크게 문제가 되지 않는다.

하지만 화면이 늘어나면 바로 문제가 생긴다.

```text
Frame 142가 뭐였지?

Rectangle 83은 어디에 있는 거지?
```

이런 상황이 된다.

그래서 가능하면

```text
Frame 18
```

보다

```text
Login Form
```

처럼 역할이 보이는 이름을 사용하는 게 좋았다.

예를 들어

```text
Home
├─ Header
├─ Search Bar
├─ Cafe List
│  ├─ Cafe Card
│  ├─ Cafe Card
│  └─ Cafe Card
└─ Bottom Navigation
```

처럼 만들어두면 화면 구조도 훨씬 이해하기 쉬워진다.

개발에서 변수명을 정리하는 것과 비슷했다.

```javascript
const a = ...
```

보다

```javascript
const cafeList = ...
```

가 나중에 보기 좋은 것과 같다.

---

## 4. Group과 Frame 중 무엇을 사용해야 할까

Figma에는 여러 요소를 묶을 수 있는 **Group**도 있다.

처음에는 Frame과 Group이 비슷해 보여서 헷갈렸다.

둘 다 여러 요소를 묶을 수 있기 때문이다.

하지만 실제로 사용해보니 역할이 조금 달랐다.

Group은 말 그대로

> 여러 요소를 잠깐 하나처럼 묶는 것

에 가깝다.

반면 Frame은 내부 요소를 가지는 **구조적인 컨테이너**에 가깝다.

특히 Auto Layout 같은 기능을 사용할 때는 Frame이 중심이 된다. Figma의 Auto Layout은 Frame을 기반으로 동작한다.

그래서 화면 구조를 만들 때는 단순히

```text
여러 개 선택
→ Group
```

으로 끝내기보다

```text
이 요소들이 하나의 UI 단위인가?
```

를 생각하게 됐다.

예를 들어

```text
아이콘 + 사용자 이름
```

이 하나의 프로필 영역이라면

```text
Profile Frame
├─ Icon
└─ Username
```

처럼 만드는 식이다.

---

## 5. Section — 여러 화면을 묶어서 정리하기

Frame을 여러 개 만들기 시작하면 Canvas가 금방 복잡해진다.

```text
로그인
회원가입
홈
검색
상세
설정
프로필
수정
결과
```

이런 화면들이 계속 늘어난다.

이럴 때 사용할 수 있는 것이 **Section**이다.

Section은 관련 있는 Frame이나 디자인 요소들을 큰 영역으로 묶어 정리하는 용도로 사용할 수 있다. [Figma](https://help.figma.com/hc/en-us/articles/9771500257687-Organize-your-canvas-with-sections)에서도 사용자 흐름이나 관련 화면을 하나의 Section으로 묶는 방식을 안내하고 있다.

예를 들어

```text
[로그인]

Login
Sign Up
Password Reset
```

```text
[메인]

Home
Search
Detail
```

```text
[마이페이지]

Profile
Settings
Edit
```

처럼 정리할 수 있다.

Frame이

```text
실제 화면
```

이라면 Section은

```text
관련 화면들을 정리하는 큰 묶음
```

이라고 생각하니 이해하기 쉬웠다.

---

## Section과 Frame의 차이

처음에는 둘 다 영역을 만들 수 있어서 비슷해 보였다.

나는 이렇게 구분했다.

```text
Section
└─ 화면들을 정리

Frame
└─ 실제 화면이나 UI 구조를 제작
```

예를 들어

```text
AUTH Section
├─ Login Frame
├─ Signup Frame
└─ Password Reset Frame
```

처럼 사용하는 것이다.

프로젝트 화면이 적을 때는 Section의 필요성을 잘 느끼지 못한다.

하지만 화면이 10개, 20개로 늘어나기 시작하면 상당히 편해진다.

---

## 6. 왼쪽은 구조, 오른쪽은 속성

Figma를 처음 열었을 때 인터페이스가 복잡해 보였지만 결국 자주 보는 곳은 크게 나눌 수 있었다.

```text
왼쪽
→ 무엇이 있는가

가운데
→ 실제 화면

오른쪽
→ 선택한 요소를 어떻게 설정할 것인가
```

왼쪽에서는 Layer 구조를 보고,

가운데 Canvas에서 요소를 선택하고 배치하고,

오른쪽에서는 선택한 요소의

```text
크기
위치
색상
테두리
간격
정렬
Auto Layout
```

등을 조정한다.

예를 들어 버튼을 선택하면 오른쪽에서

```text
Width
Height
Fill
Stroke
Corner Radius
```

같은 값을 조절할 수 있다.

처음부터 오른쪽에 있는 모든 옵션을 이해하려고 할 필요는 없었다.

필요할 때 하나씩 사용하면 됐다.

---

## 7. Auto Layout — Figma를 배우면서 특히 중요했던 기능

Figma 기초에서 하나만 제대로 익히라고 한다면 나는 **Auto Layout**을 먼저 꼽을 것 같다.

처음에는 이 기능이 왜 필요한지 잘 몰랐다.

그냥 버튼 하나를 만든다고 생각해보자.

```text
┌────────────┐
│   로그인   │
└────────────┘
```

처음에는

```text
Rectangle 만들기
↓
Text 올리기
↓
가운데 맞추기
```

로 만들 수 있다.

문제는 글자가 바뀌었을 때다.

```text
로그인
```

이

```text
Google 계정으로 로그인
```

으로 길어진다면 기존 사각형 크기가 맞지 않을 수 있다.

그러면 다시

```text
Rectangle 늘리기
Text 위치 조절
가운데 정렬
```

을 해야 한다.

Auto Layout을 사용하면 이 과정을 훨씬 자연스럽게 관리할 수 있다.

Figma의 Auto Layout은 콘텐츠가 변경될 때 요소의 배치, 간격, 크기가 자동으로 대응하도록 만드는 기능이며, 현재는 세로·가로·그리드 흐름을 지원한다.

---

## Auto Layout을 개발로 생각하면 이해하기 쉬웠다

나는 Auto Layout을 처음 이해할 때 CSS의 Flexbox와 연결해서 생각했다.

예를 들어

```css
display: flex;
flex-direction: column;
gap: 16px;
padding: 20px;
```

같은 코드를 자주 사용한다.

Figma Auto Layout에도 비슷한 개념이 있다.

```text
Direction / Flow
Gap
Padding
Alignment
```

즉,

```text
세로로 배치할지

가로로 배치할지

요소 사이를 얼마나 띄울지

바깥쪽에 여백을 얼마나 줄지

어디에 정렬할지
```

를 설정할 수 있다.

예를 들어 카드가

```text
카페 이름
거리
보유 혜택
길찾기 버튼
```

으로 이루어져 있다면 Auto Layout을 이용해

```text
Cafe Card
│
├─ Cafe Name
│
├─ Distance
│
├─ Benefit
│
└─ Navigation Button
```

을 세로 방향으로 배치할 수 있다.

그리고 요소 사이의 간격을

```text
12px
```

로 설정하면 일일이 각각 위치를 조정할 필요가 없다.

---

## Shift + A

Auto Layout을 사용하면서 자주 쓰게 되는 단축키도 있다.

```text
Shift + A
```

요소들을 선택하고 `Shift + A`를 누르면 Auto Layout을 적용할 수 있다. [Figma 공식 도움말](https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout)에서도 같은 단축키를 안내하고 있다.

처음 Figma를 배울 때 모든 단축키를 외울 필요는 없지만 이것만큼은 사용 빈도가 높았다.

```text
요소 선택
↓
Shift + A
↓
간격과 방향 설정
```

이 흐름을 반복하게 된다.

---

## 8. Fixed / Hug / Fill

Auto Layout을 사용하면 처음 보는 또 다른 단어들이 등장한다.

대표적인 것이

```text
Fixed
Hug
Fill
```

이다.

처음에는 이름만 보고 무슨 뜻인지 잘 이해되지 않았다.

하지만 간단히 생각하면 된다.

### Fixed

크기를 고정한다.

```text
Width = 320px
```

처럼 정해진 크기를 유지한다.

---

### Hug contents

내용물에 맞춰 크기가 변한다.

버튼을 예로 들면

```text
[ 확인 ]
```

보다

```text
[ Google 계정으로 계속하기 ]
```

가 더 길다.

Hug를 사용하면 텍스트에 맞춰 버튼 크기가 늘어날 수 있다.

---

### Fill container

부모 공간에서 사용할 수 있는 영역을 채운다.

웹에서 생각하면

```css
width: 100%;
```

와 비슷한 상황을 떠올리면 이해하기 편했다.

Figma Auto Layout에서는 부모와 자식의 크기 관계를 Fixed, Hug, Fill 등의 방식으로 설정할 수 있다.

---

## Auto Layout을 중첩해서 사용한다

처음에는 Auto Layout 하나만 적용하면 화면 전체가 자동으로 정리되는 줄 알았다.

실제로는 그렇지 않았다.

Auto Layout 안에 또 Auto Layout이 들어가는 경우가 많다.

예를 들어 카페 카드 하나만 해도

```text
Cafe Card
│
├─ Top
│  ├─ Logo
│  └─ Cafe Info
│
├─ Benefit Info
│
└─ Buttons
   ├─ Detail
   └─ Navigation
```

처럼 구성할 수 있다.

여기서

```text
Cafe Card
```

는 세로 Auto Layout,

```text
Top
```

은 가로 Auto Layout,

```text
Buttons
```

도 가로 Auto Layout

형태가 될 수 있다.

개발에서

```html
<div class="card">
  <div class="top"></div>
  <div class="info"></div>
  <div class="buttons"></div>
</div>
```

처럼 컨테이너 안에 또 컨테이너를 만드는 것과 비슷했다.

---

## 9. Layout Guide — 화면 정렬의 기준 만들기

화면을 만들다 보면 이런 문제가 생긴다.

```text
제목은 왼쪽에서 24px

카드는 20px

버튼은 28px
```

눈으로 맞추다 보니 미세하게 정렬이 달라진다.

이럴 때 화면 전체의 기준을 잡는 데 사용할 수 있는 것이 **Layout Guide**다.

참고로 예전 Figma 자료에서는 `Layout Grid`라는 표현을 많이 볼 수 있는데, Figma는 2025년 5월 해당 기능의 명칭을 `Layout Guide`로 변경했다. Auto Layout의 Grid와는 별개의 기능이다.

Layout Guide를 사용하면

```text
Column
Row
Grid
```

같은 기준선을 화면에 표시해서 요소들을 일정하게 정렬할 수 있다.

예를 들어 웹 화면을 만들면서

```text
왼쪽과 오른쪽 여백
콘텐츠 영역
컬럼 간격
```

의 기준을 만들 수 있다.

처음부터 복잡한 Grid System을 공부할 필요는 없더라도,

```text
화면 요소가 아무 위치에나 놓이는 것은 아니다.
```

라는 개념을 이해하는 데 도움이 됐다.

---

## 10. Component — 반복되는 UI를 하나로 관리하기

화면을 여러 개 만들다 보면 같은 요소가 반복된다.

대표적으로

```text
버튼
카드
상단 바
하단 내비게이션
입력창
```

같은 것들이다.

예를 들어 화면 10개에 같은 버튼이 있다고 해보자.

각 버튼을 따로 만들어두면 나중에

```text
버튼 모서리를 8px에서 12px로 변경
```

하려고 할 때 10개를 모두 수정해야 할 수도 있다.

이럴 때 사용할 수 있는 것이 **Component**다.

Figma의 Component는 반복해서 사용할 수 있는 UI 요소를 만들고 재사용하기 위한 기능이다.

개발자 입장에서는 이름부터 익숙하다.

React에서도

```jsx
<Button />
```

같은 컴포넌트를 만든다.

Figma에서도 비슷하게

```text
Button Component
```

를 만들고 여러 화면에서 재사용할 수 있다.

---

## Main Component와 Instance

Component를 만들면 원본이 생긴다.

그리고 그 원본을 복사해 여러 곳에서 사용할 수 있다.

개념적으로 보면

```text
Main Component
     │
     ├─ Instance
     ├─ Instance
     ├─ Instance
     └─ Instance
```

와 같은 구조다.

예를 들어

```text
Primary Button
```

이라는 Component를 만들어 놓으면

```text
로그인
저장하기
다음
확인
```

같은 버튼에 같은 디자인을 재사용할 수 있다.

그러면서 각각의 텍스트는 다르게 보여줄 수도 있다.

이 구조를 보면서 React Component와 상당히 비슷하다고 느꼈다.

```jsx
<Button>로그인</Button>
<Button>저장하기</Button>
<Button>다음</Button>
```

디자인과 개발에서 반복되는 UI를 관리하는 생각 자체가 비슷했다.

---

## 그렇다고 처음부터 Component를 너무 많이 만들 필요는 없었다

Component가 좋다고 해서 화면에 있는 모든 것을 Component로 만들 필요는 없다.

처음에는

```text
반복되는가?

여러 화면에서 사용하는가?

나중에 한 번에 수정할 가능성이 있는가?
```

정도를 기준으로 판단하면 충분했다.

예를 들어 프로젝트 전체에서 여러 번 사용하는

```text
Button
Input
Card
Navigation
```

은 Component로 만들 가치가 높다.

반대로 특정 화면에 한 번만 나오는 장식 요소까지 처음부터 전부 Component로 만들면 오히려 관리가 복잡해질 수 있다.

---

## 11. Prototype — 실제 화면 이동을 연결해보기

Figma에서 화면을 만들고 나면 화면끼리 연결할 수도 있다.

이것이 **Prototype**이다.

예를 들어

```text
Login
↓
Home
↓
Detail
↓
Result
```

화면을 만들었다면

로그인 버튼을 눌렀을 때 Home으로,

카드를 눌렀을 때 Detail로 이동하게 연결할 수 있다.

실제 백엔드 기능이 구현된 것은 아니지만 사용자 입장에서는 화면을 직접 눌러보면서 흐름을 확인할 수 있다.

Frame은 이런 Prototype 제작의 기본 단위로 사용되며, Section도 사용자 흐름을 정리하고 Prototype 이동 대상으로 활용할 수 있다.

이 기능이 좋았던 이유는

```text
화면을 보기만 하는 것
```

과

```text
실제로 눌러보는 것
```

이 꽤 다르기 때문이다.

정적인 디자인에서는 괜찮아 보였는데 실제로 눌러보면

```text
뒤로 갈 방법이 없다.

버튼을 어디서 눌러야 할지 모르겠다.

같은 화면을 계속 왕복한다.

한 작업을 하는데 화면을 너무 많이 이동한다.
```

같은 문제를 발견할 수 있다.

이 부분은 나중에 실제 시연 후 UI 문제를 다루는 글에서도 다시 정리하려고 한다.

---

## 12. 처음에는 완벽하게 만들 필요가 없다

Figma를 처음 배우면서 가장 쉽게 빠질 수 있는 함정은

```text
처음부터 제대로 디자인해야 한다.
```

라고 생각하는 것이었다.

버튼 크기,

글꼴,

색상,

그리드,

Component,

Auto Layout,

Prototype

전부 완벽하게 만들어야 할 것처럼 느껴진다.

하지만 처음부터 그렇게 할 필요는 없었다.

처음에는 오히려

```text
화면이 무엇이 필요한가?
```

부터 정리하는 것이 더 중요했다.

예를 들어 첫 번째 단계에서는

```text
┌─────────────────┐
│      LOGO       │
│                 │
│     서비스 설명   │
│                 │
│   [ 시작하기 ]   │
│                 │
└─────────────────┘
```

정도로 만들어도 된다.

이 단계에서는 색상이 예쁜지보다

```text
서비스 이름

설명

시작 버튼
```

이 필요한지를 판단하는 것이 먼저다.

---

## 내가 생각하는 Figma 초보자의 학습 순서

처음부터 기능을 하나씩 전부 공부하는 방식보다 직접 작은 화면을 만들어보는 방식이 이해하기 쉬웠다.

나는 다음 정도 순서가 적당하다고 생각한다.

```text
1. Frame 만들기

2. Text와 Shape 넣기

3. Layer 구조 확인하기

4. Frame 안에 Frame 만들기

5. Auto Layout 적용하기

6. Gap / Padding 조절하기

7. Fixed / Hug / Fill 이해하기

8. 반복되는 UI를 Component로 만들기

9. 여러 화면을 Section으로 정리하기

10. Prototype으로 화면 연결하기
```

이 정도를 한 번 직접 해보면 Figma 화면을 보는 것 자체가 훨씬 덜 낯설어진다.

---

## 개발자라서 오히려 이해하기 쉬운 부분도 있었다

처음에는 디자인 도구라서 완전히 새로운 것을 배우는 느낌일 거라고 생각했다.

그런데 실제로 사용해보니 개발하면서 이미 접했던 개념과 비슷한 부분이 많았다.

| Figma          | 개발에서 떠올린 개념         |
| -------------- | ------------------- |
| Frame          | Container / div     |
| Parent / Child | DOM 구조              |
| Auto Layout    | Flexbox / Layout    |
| Gap            | CSS gap             |
| Padding        | CSS padding         |
| Component      | React Component     |
| Instance       | Component 재사용       |
| Fill           | width: 100%와 비슷한 개념 |
| Layer          | 요소 구조               |
| Prototype      | 화면 이동 흐름            |

물론 완전히 같은 기능은 아니다.

하지만 이런 식으로 연결해서 생각하니 훨씬 이해하기 쉬웠다.

---

## Figma 기초에서 가장 중요하게 느낀 것

처음에는 Figma 기능을 얼마나 많이 아느냐가 중요하다고 생각했다.

하지만 지금은 조금 다르게 생각한다.

단축키를 많이 외우는 것보다

```text
왜 Frame으로 묶는지

왜 Auto Layout을 쓰는지

왜 Component로 만드는지
```

를 이해하는 것이 더 중요했다.

결국 모두 같은 목적을 가지고 있었다.

> **화면이 커지고 수정이 반복되더라도 관리하기 쉽게 만드는 것**

이건 개발에서도 똑같았다.

처음에는 한 파일에 코드를 모두 넣어도 돌아간다.

하지만 프로젝트가 커지면 구조가 필요하다.

Figma도 비슷했다.

화면 하나를 그냥 그리는 것은 어렵지 않다.

하지만 화면이 10개, 20개가 되고 계속 수정하기 시작하면

```text
Frame

Auto Layout

Component

Section
```

같은 구조가 왜 필요한지 알게 된다.

---

## 내가 처음 연습한다면

지금 다시 처음부터 Figma를 연습한다면 거창한 앱을 만들려고 하지 않을 것 같다.

로그인 화면 하나면 충분하다.

```text
Login Frame
│
├─ Logo
│
├─ Title
│
├─ Login Form
│  ├─ Email Input
│  └─ Password Input
│
└─ Login Button
```

이 화면 하나를 만들면서

```text
Frame 생성

Text 작성

레이어 이름 변경

Auto Layout 적용

Padding 설정

Gap 설정

Button Component 생성
```

까지 해보는 것이다.

그리고 회원가입 화면을 하나 더 만든다.

```text
Login
↓
Signup
```

마지막으로 Prototype에서 두 화면을 연결한다.

이 정도만 해도 Figma의 기본적인 작업 흐름을 한 번 경험할 수 있다.

---

## 마무리

처음 Figma를 열었을 때는 기능이 너무 많아 보였다.

하지만 내가 개발 프로젝트 화면을 만들기 위해 당장 알아야 하는 것은 생각보다 많지 않았다.

가장 먼저 기억할 것은 다음 정도다.

```text
Canvas
→ 모든 작업이 이루어지는 공간

Frame
→ 화면과 UI를 구성하는 기본 컨테이너

Layer
→ 화면을 구성하는 각각의 요소

Section
→ 관련 있는 화면들을 정리하는 영역

Auto Layout
→ 요소의 배치와 간격을 자동으로 관리

Component
→ 반복되는 UI를 재사용

Prototype
→ 화면 사이의 이동 흐름을 확인
```

그리고 이 개념들은 각각 따로 떨어진 기능이 아니었다.

```text
Section
│
├─ Frame
│  ├─ Component
│  │  └─ Auto Layout
│  └─ Component
│
└─ Frame
   └─ Component
```

처럼 서로 연결되어 있었다.

Figma를 잘하기 위해 모든 기능을 외우는 것보다,

이 구조를 이해하고 직접 작은 화면 하나를 만들어보는 것이 먼저라고 생각한다.

나 역시 아직 디자인을 전문적으로 하는 것이 목표는 아니다.

내가 만들 서비스를 직접 설계하고,

코드를 작성하기 전에 화면 구조를 정리하고,

그 디자인을 실제 개발까지 연결할 수 있을 정도가 우선 목표다.

그리고 Figma를 조금씩 사용하기 시작하면서 무료 계정과 일반 계정만 있는 줄 알았는데, 학생이 활용할 수 있는 교육용 플랜도 있다는 것을 알게 됐다.

다음 글에서는 내가 학교 계정을 가지고 있는 학생 입장에서 확인하게 된 **Figma 교육 계정과 교육용 혜택을 어떻게 활용할 수 있는지** 정리해보려고 한다.
