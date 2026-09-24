---
layout: post
title: "Node.js와 npm 개발환경 구축하기"
date: 2026-09-24 22:40:00 +0900
categories: dev-setup
learningOrder: 50
tags:
  - nodejs
  - npm
  - lts
  - windows
---

앞선 글에서는 VS Code를 설치하고 첫 HTML 파일을 만들어 브라우저에서 실행해봤다.

이제 코드를 작성할 프로그램은 준비됐다.

현재 개발환경을 간단히 보면 다음과 같다.

```text
코드 작성
→ VS Code

코드 변경 기록
→ Git

Git을 화면으로 관리
→ SourceTree

코드를 인터넷에 저장
→ GitHub
```

그런데 JavaScript 파일을 하나 만들고 VS Code 터미널에서 다음과 같이 실행하려고 하면 어떻게 될까?

```bash
node app.js
```

Node.js를 아직 설치하지 않았다면 `node`라는 명령어를 찾을 수 없다는 오류가 발생한다.

이유는 간단하다.

**VS Code는 코드를 작성하는 프로그램이고, Node.js는 JavaScript를 실행하는 환경이기 때문이다.**

이번 글에서는 이 차이부터 하나씩 알아본다.

최종 목표는 다음과 같다.

```text
Node.js가 무엇인지 이해
↓
npm이 무엇인지 이해
↓
Node.js와 npm의 관계 이해
↓
LTS 버전 선택
↓
Node.js 설치
↓
PATH 확인
↓
node -v
↓
npm -v
↓
VS Code에서 JavaScript 파일 작성
↓
node로 직접 실행
```

설치 버튼만 누르고 끝내는 것이 아니라,

> **VS Code에서 작성한 JavaScript 파일을 내 컴퓨터에서 직접 실행할 수 있는 상태**

까지 만드는 것이 목표다.

---

## 1. JavaScript는 원래 어디에서 실행될까?

Node.js를 이해하려면 먼저 JavaScript가 원래 어디에서 사용되었는지 알아야 한다.

JavaScript는 웹 브라우저에서 동작하는 프로그래밍 언어로 시작했다.

예를 들어 웹사이트에서

```text
버튼을 클릭한다

메뉴가 열린다

이미지가 바뀐다

입력값을 확인한다

페이지 일부가 실시간으로 변경된다
```

같은 동작을 구현할 때 JavaScript를 사용할 수 있다.

예를 들어 다음과 같은 코드가 있다고 해보자.

```javascript
console.log("Hello JavaScript");
```

HTML 파일에서 JavaScript를 연결하고 Chrome이나 Edge 같은 브라우저를 열면 브라우저가 JavaScript를 실행할 수 있다.

즉, 처음에는 대략 다음 구조였다.

```text
JavaScript 코드

↓

Chrome / Edge 등의 브라우저

↓

JavaScript 실행
```

---

## 2. 브라우저가 JavaScript를 실행할 수 있는 이유

브라우저 안에는 JavaScript 코드를 해석하고 실행하는 엔진이 들어 있다.

예를 들어 Chrome은 **V8 JavaScript Engine**을 사용한다.

그래서 브라우저에 JavaScript를 전달하면 브라우저가 코드를 실행할 수 있다.

하지만 여기서 문제가 하나 있다.

> 브라우저를 열지 않고도 JavaScript를 실행하고 싶다면 어떻게 해야 할까?

예를 들어 터미널에서 바로

```bash
node app.js
```

처럼 실행하고 싶을 수 있다.

바로 이때 Node.js를 사용한다.

---

## 3. Node.js란?

Node.js는 간단히 말하면

> **JavaScript를 브라우저 밖에서도 실행할 수 있게 해주는 JavaScript 실행 환경**

이다.

[Node.js 공식 사이트](https://nodejs.org/en) 역시 Node.js를 서버, 웹 앱, 명령행 도구, 스크립트 등을 만드는 데 사용할 수 있는 JavaScript 런타임으로 설명한다.

처음에는 `런타임(Runtime)`이라는 단어가 어렵게 느껴질 수 있다.

아주 단순하게 생각하면 된다.

```text
JavaScript 코드를

실제로 실행할 수 있도록 만들어주는 환경
```

이다.

---

## 4. Runtime이란?

Runtime은 프로그램이 실제로 실행되는 환경을 의미한다.

예를 들어 JavaScript 파일이 하나 있다고 하자.

```javascript
console.log("Hello");
```

이 파일은 그냥 글자로 적힌 코드다.

파일 자체가 혼자서 실행되는 것은 아니다.

누군가 이 코드를 읽고 실행해야 한다.

브라우저에서는 브라우저가 그 역할을 한다.

```text
JavaScript
↓
Browser
↓
실행
```

Node.js를 설치하면 브라우저 없이도 가능하다.

```text
JavaScript
↓
Node.js
↓
실행
```

따라서 Node.js를 **JavaScript Runtime**이라고 부른다.

---

## 5. VS Code와 Node.js의 차이

초보자라면 여기서 반드시 구분하고 넘어가는 것이 좋다.

VS Code와 Node.js는 완전히 다른 역할을 한다.

### VS Code

코드를 작성한다.

```text
VS Code
→ Editor
→ 코드 작성
```

### Node.js

JavaScript 코드를 실행한다.

```text
Node.js
→ Runtime
→ JavaScript 실행
```

두 프로그램을 연결하면 이렇게 된다.

```text
VS Code

app.js 작성

↓

Node.js

app.js 실행
```

즉,

```text
VS Code를 설치했다
=
JavaScript를 작성할 수 있다
```

와

```text
Node.js를 설치했다
=
JavaScript를 컴퓨터에서 실행할 수 있다
```

는 서로 다른 의미다.

---

## 6. 그러면 브라우저가 있는데 Node.js는 왜 필요할까?

단순한 웹 페이지의 JavaScript만 작성한다면 브라우저에서도 실행할 수 있다.

하지만 현대적인 웹 개발에서는 JavaScript가 브라우저 안에서만 사용되지 않는다.

Node.js를 설치하면 다음과 같은 작업을 할 수 있다.

```text
JavaScript 파일을 터미널에서 실행

웹 서버 개발

개발용 스크립트 실행

npm 사용

React 프로젝트 실행

Next.js 프로젝트 실행

개발 도구 실행
```

특히 앞으로 React나 Next.js 같은 프론트엔드 기술을 공부한다면 Node.js를 자주 사용하게 된다.

---

## 7. React를 쓰는데 왜 Node.js가 필요할까?

이 부분도 처음에는 헷갈린다.

React로 만든 최종 JavaScript 코드는 브라우저에서 실행될 수 있다.

하지만 **개발 과정**에서는 여러 도구가 필요하다.

예를 들어

```text
개발 서버 실행

패키지 설치

코드 변환

빌드

테스트

개발 명령어 실행
```

같은 작업을 Node.js 환경에서 수행하는 경우가 많다.

그래서 React 프로젝트를 실행할 때 다음과 같은 명령어를 자주 보게 된다.

```bash
npm install
```

```bash
npm run dev
```

이 명령어들을 사용하려면 Node.js와 npm 환경이 필요하다.

---

## 8. Node.js를 설치하면 무엇이 생길까?

일반적인 Node.js 설치를 완료하면 대표적으로 두 가지 명령어를 사용할 수 있게 된다.

```text
node

npm
```

역할은 다르다.

```text
node
→ JavaScript 실행

npm
→ JavaScript 패키지 관리
```

이 차이를 이해하는 것이 이번 글에서 매우 중요하다.

---

## 9. npm이란?

npm은 Node.js 프로젝트에서 사용하는 **패키지 관리자(Package Manager)**다.

npm이라는 이름은 개발 과정에서 굉장히 자주 보게 된다.

예를 들어

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

같은 명령어다.

처음에는 npm을

> **JavaScript 프로젝트에서 필요한 외부 프로그램이나 라이브러리를 설치하고 관리하는 도구**

라고 이해하면 된다.

---

## 10. Package란?

npm을 이해하려면 Package라는 개념부터 알아야 한다.

개발을 하다 보면 모든 기능을 처음부터 직접 만들지는 않는다.

이미 다른 개발자들이 만들어놓은 기능을 가져와 사용할 수 있다.

예를 들어

```text
날짜 처리

HTTP 요청

UI 기능

코드 검사

코드 포맷팅

웹 프레임워크
```

같은 기능을 패키지 형태로 사용할 수 있다.

즉,

```text
Package

=

다른 프로젝트에서 가져와 사용할 수 있도록
정리된 코드와 관련 정보
```

정도로 이해하면 된다.

---

## 11. npm은 패키지를 어디에서 가져올까?

npm은 패키지를 설치하고 관리할 때 npm Registry라는 저장소를 사용할 수 있다.

개발자가

```bash
npm install 패키지이름
```

같은 명령어를 입력하면 npm이 필요한 패키지를 찾아 프로젝트에 설치한다.

예를 들어 개념적으로 보면

```text
내 프로젝트

↓

npm install

↓

npm Registry

↓

필요한 Package 다운로드

↓

내 프로젝트에 추가
```

와 같은 흐름이다.

[npm 공식 문서](https://docs.npmjs.com/about-npm)에서도 npm CLI를 통해 공개 또는 비공개 npm Registry의 패키지를 설치하고 관리할 수 있다고 설명한다.

---

## 12. Node.js와 npm은 같은 프로그램일까?

아니다.

역할이 다르다.

다시 비교해보자.

| 구분 | Node.js | npm |
|------|------|------|
| 종류 | JavaScript Runtime | Package Manager |
| 역할 | JavaScript 실행 | 패키지 설치·관리 |
| 대표 명령어 | `node` | `npm` |
| 예시 | `node app.js` | `npm install` |

간단하게 기억하면 된다.

```text
Node.js
→ 실행

npm
→ 관리
```

---

## 13. 그런데 왜 Node.js를 설치하면 npm도 생길까?

Windows나 macOS에서 일반적인 Node.js 설치 프로그램으로 Node.js를 설치하면 npm도 함께 설치된다.

[npm 공식 문서](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) 역시 Node.js와 npm을 함께 설치하는 방법을 안내하고 있다.

그래서 일반적으로

```text
Node.js 설치

↓

node 명령어 사용 가능

+

npm 명령어 사용 가능
```

상태가 된다.

즉 npm 사이트에서 npm을 따로 찾아 설치할 필요가 없는 경우가 대부분이다.

---

## 14. Node.js 버전은 하나가 아니다

Node.js 다운로드 페이지에 들어가면 여러 버전이 존재한다.

예를 들어 현재 시점에는

```text
Node.js 26

Node.js 24

Node.js 22
```

같은 여러 버전을 볼 수 있다.

모든 버전의 상태도 똑같지 않다.

대표적으로

```text
Current

LTS

EOL
```

같은 표시가 있다.

이 차이를 알아야 어떤 버전을 설치할지 결정할 수 있다.

---

## 15. Current란?

Current는 비교적 최신 기능을 먼저 사용할 수 있는 현재 개발 릴리스 계열이다.

최신 기능을 빠르게 경험할 수 있지만 일반적인 학습이나 안정적인 프로젝트에서는 보통 LTS 버전을 우선 고려한다.

2026년 9월 24일 기준 [Node.js 공식 릴리스 정보](https://nodejs.org/en/about/previous-releases)에서는 **Node.js 26이 Current**로 표시되어 있다.

---

## 16. LTS란?

LTS는

**Long-Term Support**

의 약자다.

우리말로 하면 **장기 지원 버전** 정도로 이해할 수 있다.

[Node.js 공식 릴리스 정책](https://nodejs.org/en/about/previous-releases)에서는 LTS 버전을 장기간 지원하고, 프로덕션 애플리케이션에는 Active LTS 또는 Maintenance LTS 버전을 사용할 것을 권장한다.

처음 개발환경을 구축하는 사람이라면 일반적으로 **LTS 버전**을 선택하는 것이 이해하기 쉽다.

---

## 17. 2026년 9월 기준 어떤 버전을 설치할까?

이 글을 작성하는 **2026년 9월 24일 기준**으로 [Node.js 공식 릴리스 페이지](https://nodejs.org/en/about/previous-releases)에서는 다음과 같이 표시된다.

```text
Node.js 26
→ Current

Node.js 24
→ LTS

Node.js 22
→ LTS
```

Node.js 24의 코드명은 `Krypton`이며 현재 LTS 상태다.

따라서 이번 글에서는 **Node.js 24 LTS**를 기준으로 진행한다.

2026년 9월 현재 Node.js 24 계열의 [최신 공식 릴리스](https://nodejs.org/en/blog/release/v24.21.0)는 `v24.21.0`이며 Windows x64용 MSI 설치 파일도 제공된다.

다만 나중에 이 글을 읽는 시점에는 버전이 바뀌어 있을 수 있다.

그때는 숫자를 그대로 따라가기보다

```text
LTS 표시가 붙어 있는 버전
```

을 확인하는 것이 중요하다.

---

## 18. EOL은 무엇일까?

EOL은

**End of Life**

의 약자다.

지원이 끝난 버전이라는 의미다.

예를 들어 [Node.js 공식 릴리스 정보](https://nodejs.org/en/about/previous-releases)에서는 과거 버전 중 지원이 종료된 버전을 `EOL`로 표시한다.

초보자가 새 개발환경을 구성하면서 특별한 이유 없이 EOL 버전을 새로 설치할 필요는 없다.

단, 기존 프로젝트에서

```text
이 프로젝트는 Node.js 20 사용
```

처럼 특정 버전을 요구한다면 이야기가 달라진다.

그 프로젝트의 요구 버전을 따라야 한다.

---

## 19. 무조건 최신 버전이 가장 좋은 것은 아니다

프로그램을 설치할 때 흔히

> 숫자가 가장 큰 버전이 제일 좋은 거 아닌가?

라고 생각할 수 있다.

개발환경에서는 항상 그렇지는 않다.

예를 들어

```text
가장 최신 Current 버전
```

보다

```text
프로젝트에서 검증된 LTS 버전
```

을 사용하는 것이 더 적절한 경우가 있다.

특히 팀 프로젝트에서는 개인이 마음대로 최신 버전을 선택하기보다 프로젝트에서 정한 Node.js 버전을 맞추는 것이 중요하다.

---

## 20. 프로젝트마다 Node.js 버전이 다를 수도 있다

예를 들어 프로젝트 A는

```text
Node.js 22
```

를 사용하고,

프로젝트 B는

```text
Node.js 24
```

를 사용할 수도 있다.

그래서 실무나 여러 프로젝트를 동시에 진행하면 Node.js 버전을 쉽게 바꿀 수 있는 **Version Manager**를 사용하기도 한다.

대표적으로

```text
nvm

nvm-windows

fnm
```

같은 도구가 있다.

[npm 공식 문서](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) 역시 Node.js와 npm 설치 시 버전 관리자를 사용하는 방식을 권장하고 있으며 Windows에서는 nvm-windows 같은 도구를 소개한다.

---

## 21. 그런데 왜 이번에는 Version Manager를 바로 쓰지 않을까?

Version Manager는 매우 유용하다.

하지만 처음 Node.js를 배우는 단계에서

```text
Node.js

npm

PATH

Version Manager

Node Version
```

개념을 한꺼번에 배우면 오히려 복잡해질 수 있다.

이번 글의 목표는 우선

> **Node.js가 무엇이고, 설치하면 어떤 일이 일어나는지 직접 확인하는 것**

이다.

그래서 Windows의 공식 Node.js Installer를 사용한다.

나중에 여러 프로젝트에서 서로 다른 Node.js 버전을 사용하게 된다면 Version Manager를 별도로 도입하면 된다.

단, [npm 공식 문서](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)는 장기적으로는 Version Manager 사용을 권장한다는 점도 알아두자.

---

## 22. 설치 전 기존 Node.js 확인하기

새 프로그램을 설치하기 전에 이미 설치되어 있는지 확인하는 습관을 들이면 좋다.

앞선 글에서 설치한 VS Code를 실행한다.

프로젝트와 관계없는 새 터미널을 열거나 Git Bash를 사용할 수도 있다.

터미널에서 다음을 입력한다.

```bash
node -v
```

또는

```bash
node --version
```

---

## 23. 이미 설치되어 있다면

다음과 같이 버전이 나온다면 Node.js가 이미 설치되어 있는 것이다.

```text
v24.21.0
```

물론 실제 버전 숫자는 다를 수 있다.

이 경우 무조건 다시 설치하지 말고 현재 버전을 먼저 확인한다.

```text
현재 버전이 무엇인가?

프로젝트에서 요구하는 버전은 무엇인가?

왜 다시 설치하려고 하는가?
```

를 먼저 확인하는 것이 좋다.

---

## 24. 설치되어 있지 않다면

Windows에서는 환경에 따라 다음과 비슷한 오류가 나올 수 있다.

```text
'node'은(는) 내부 또는 외부 명령...
```

Git Bash에서는

```text
node: command not found
```

처럼 나타날 수 있다.

현재는 아직 설치 전이므로 정상이다.

이제 Node.js를 설치한다.

---

## 25. Node.js 공식 사이트 접속하기

인터넷 검색창에 다음처럼 검색한다.

```text
Node.js
```

또는

```text
Node.js download
```

가능하면 [Node.js 공식 사이트](https://nodejs.org/en/download)에서 다운로드한다.

공식 다운로드 페이지에서는 현재 지원되는 여러 Node.js 버전과 설치 방법을 제공한다.

---

## 26. 다운로드 페이지에서 확인할 것

다운로드 페이지에 들어가면 버전 번호와 상태를 확인한다.

이번 글 작성 시점 기준으로는

```text
v24.x
LTS
```

계열을 선택한다.

앞으로 버전이 바뀐다면 숫자가 아니라

```text
LTS
```

표시를 확인한다.

---

## 27. Windows x64와 ARM64

Windows 설치 파일을 선택할 때

```text
x64

ARM64
```

같은 표현을 볼 수 있다.

대부분의 일반 Intel 또는 AMD Windows PC는 x64를 사용하는 경우가 많다.

ARM 기반 Windows PC를 사용한다면 ARM64 버전이 필요할 수 있다.

현재 Node.js 24 LTS는 Windows용 x64와 ARM64 설치 파일을 모두 제공한다.

---

## 28. 내 Windows가 x64인지 확인하기

확실하지 않다면 Windows에서

```text
설정
→ 시스템
→ 정보
```

로 이동한다.

`시스템 종류`를 확인한다.

예를 들어

```text
64비트 운영 체제
x64 기반 프로세서
```

라고 되어 있다면 x64 설치 파일을 사용하면 된다.

ARM 기반 프로세서라면 ARM64 버전을 확인한다.

---

## 29. MSI란?

Windows Node.js 설치 파일은 보통 `.msi` 형식으로 제공된다.

예를 들어 현재 Node.js 24.21.0 x64 설치 파일은 다음과 같은 이름이다.

```text
node-v24.21.0-x64.msi
```

[Node.js 공식 배포 목록](https://nodejs.org/dist/v24.21.0/)에서도 해당 Windows x64 MSI 설치 파일을 제공하고 있다.

MSI는 Windows에서 프로그램을 설치할 때 사용하는 설치 패키지 형식이다.

다운로드한 `.msi` 파일을 실행하면 설치 마법사가 시작된다.

---

## 30. 설치 프로그램 실행하기

다운로드한 Node.js MSI 파일을 실행한다.

Windows에서 다음과 같은 보안 확인이 나타날 수 있다.

```text
이 앱이 디바이스를 변경하도록 허용하시겠습니까?
```

공식 Node.js 사이트에서 받은 설치 파일이 맞는지 확인하고 진행한다.

Node.js Setup 화면이 나타난다.

---

## 31. 설치 시작

처음 화면에서는 보통 설치를 시작하는 안내가 나온다.

```text
Next
```

를 선택한다.

설치 버전에 따라 화면 구성이나 문구가 조금 다를 수 있다.

중요한 것은 화면을 무조건 넘기기보다 **어떤 옵션을 설치하고 있는지 확인하는 것**이다.

---

## 32. License Agreement

라이선스 동의 화면이 나타난다.

내용을 확인하고 동의해야 다음 단계로 진행할 수 있다.

동의 후

```text
Next
```

를 선택한다.

---

## 33. 설치 위치

Node.js를 어디에 설치할지 선택하는 화면이 나타난다.

Windows x64 Installer에서는 일반적으로 다음과 비슷한 기본 위치를 사용할 수 있다.

```text
C:\Program Files\nodejs\
```

특별한 이유가 없다면 기본 경로를 사용하는 것이 좋다.

처음 개발환경을 구축할 때 프로그램 설치 위치를 무작정 변경하면 나중에 경로를 찾기 어려울 수 있다.

---

## 34. Custom Setup

설치할 구성 요소를 선택하는 화면이 나타날 수 있다.

버전에 따라 표현은 달라질 수 있지만 Node.js와 관련된 여러 구성 요소가 표시된다.

일반적인 초보자 환경에서는 기본 선택값을 유지하면 된다.

특히 Node.js와 npm이 정상적으로 설치되는 구성을 유지한다.

---

## 35. PATH와 관련된 옵션

설치 과정에서 PATH에 추가하는 기능이 포함되어 있다.

이 설정이 중요하다.

왜냐하면 설치 후 터미널에서

```bash
node
```

또는

```bash
npm
```

이라고 입력했을 때 Windows가 해당 프로그램을 찾아야 하기 때문이다.

---

## 36. PATH 다시 이해하기

앞선 VS Code 글에서도 PATH를 봤다.

이번에는 Node.js 기준으로 다시 보자.

Node.js가

```text
C:\Program Files\nodejs\
```

에 설치되어 있다고 가정한다.

터미널에서

```bash
node -v
```

를 입력한다.

Windows는 다음과 같은 일을 한다.

```text
node 명령어 입력

↓

Windows가 PATH 확인

↓

C:\Program Files\nodejs\ 확인

↓

node.exe 발견

↓

Node.js 실행
```

즉 PATH는

> **명령어를 입력했을 때 실행할 프로그램의 위치를 Windows가 찾을 수 있도록 알려주는 경로 목록**

이라고 이해하면 된다.

---

## 37. PATH가 없으면 어떻게 될까?

Node.js 파일 자체는 컴퓨터에 존재하지만 Windows가 위치를 모르는 상황이 생길 수 있다.

그러면 터미널에서

```bash
node -v
```

를 입력해도

```text
node 명령어를 찾을 수 없음
```

과 비슷한 오류가 난다.

즉,

```text
설치됨
```

과

```text
터미널에서 명령어 사용 가능
```

은 항상 완전히 같은 의미는 아니다.

PATH가 연결되어 있어야 한다.

---

## 38. Tools for Native Modules 옵션은 무엇일까?

Node.js 설치 과정에서 버전에 따라 추가 개발 도구를 자동 설치하는 옵션이 보일 수 있다.

예를 들어 Native Module을 빌드하는 데 필요한 도구와 관련된 선택지가 나타날 수 있다.

처음 JavaScript를 실행하고 기본 npm 패키지를 사용하는 단계에서는 반드시 필요한 것은 아니다.

특정 npm 패키지가 네이티브 빌드 환경을 요구할 때 필요한 경우가 있다.

따라서 무슨 용도인지 모른 채 추가 도구를 모두 설치하기보다는 현재 학습 목적에 필요한 기본 Node.js 환경부터 구축해도 된다.

---

## 39. 설치 진행

설정 확인이 끝났다면

```text
Install
```

을 선택한다.

Windows가 관리자 권한을 요청하면 설치 파일을 다시 확인한 뒤 허용한다.

설치가 완료될 때까지 진행한다.

마지막 화면에서

```text
Finish
```

를 선택한다.

---

## 40. 설치 직후 가장 먼저 할 일

Node.js 설치가 끝났다고 바로 다음 공부로 넘어가지 않는다.

**정상적으로 설치됐는지 확인하는 과정이 반드시 필요하다.**

순서는 다음과 같다.

```text
설치 완료

↓

기존 터미널 종료

↓

새 터미널 실행

↓

node -v

↓

npm -v
```

---

## 41. 기존 VS Code 터미널을 닫아야 하는 이유

Node.js 설치 전부터 VS Code나 Git Bash가 실행 중이었다면 기존 터미널은 새 PATH 정보를 제대로 반영하지 못할 수 있다.

따라서 설치 후에는

```text
VS Code Terminal 종료
```

또는

```text
VS Code 재실행
```

을 해주는 것이 좋다.

Git Bash나 PowerShell 역시 새로 실행한다.

---

## 42. Node.js 버전 확인하기

새 터미널을 연다.

다음 명령어를 입력한다.

```bash
node -v
```

또는

```bash
node --version
```

정상적으로 설치되었다면 다음과 비슷한 결과가 나온다.

```text
v24.21.0
```

이 글 작성 시점의 Node.js 24 최신 LTS 계열을 설치했다면 위와 같은 버전을 볼 수 있지만, 설치 시점에 따라 숫자는 달라질 수 있다.

중요한 것은 `v` 뒤에 버전 번호가 정상적으로 출력된다는 것이다.

---

## 43. `node -v`의 `-v`는 무엇일까?

`-v`는 일반적으로 Version을 뜻하는 짧은 옵션으로 사용된다.

즉,

```bash
node -v
```

는

> 현재 설치된 Node.js 버전을 보여줘

라는 뜻으로 이해하면 된다.

앞으로 다른 프로그램에서도 자주 보게 된다.

예:

```bash
git --version
```

```bash
npm -v
```

```bash
java -version
```

---

## 44. npm 버전 확인하기

이번에는 다음을 입력한다.

```bash
npm -v
```

또는

```bash
npm --version
```

정상적으로 설치되었다면 npm 버전이 출력된다.

예를 들어 [Node.js 24.21.0 공식 배포본](https://nodejs.org/en/blog/release/v24.21.0)에는 npm 11.19.0이 포함되어 있다.

따라서 설치 환경에 따라 다음과 비슷하게 볼 수 있다.

```text
11.19.0
```

버전 번호가 이 글과 다르더라도 반드시 오류라는 뜻은 아니다.

---

## 45. Node.js와 npm 버전은 숫자가 같지 않다

예를 들어

```text
Node.js
v24.21.0
```

이라고 해서 npm도

```text
24.21.0
```

인 것은 아니다.

두 프로그램은 서로 다른 버전 체계를 사용한다.

예를 들어

```text
Node.js
24.x

npm
11.x
```

처럼 전혀 다른 숫자가 나올 수 있다.

정상이다.

---

## 46. 최종적으로 두 명령어가 모두 되어야 한다

설치 확인의 핵심은 다음이다.

```bash
node -v
```

정상.

그리고

```bash
npm -v
```

정상.

즉,

```text
Node.js 설치 완료
+
npm 설치 완료
```

상태다.

---

## 47. `node` 명령어가 안 될 때

설치 후 다음과 비슷한 오류가 날 수 있다.

```text
'node'은(는) 내부 또는 외부 명령...
```

또는 Git Bash에서

```text
node: command not found
```

가 나타날 수 있다.

가장 먼저 다음 순서대로 확인한다.

```text
1. Node.js 설치가 실제로 끝났는가?

2. 기존 터미널을 닫았는가?

3. 새 터미널을 열었는가?

4. VS Code를 재시작했는가?

5. PATH가 정상적으로 등록됐는가?
```

---

## 48. Windows PATH 직접 확인하기

여전히 `node`를 찾지 못한다면 Windows 환경변수를 확인할 수 있다.

Windows 검색에서

```text
환경 변수
```

를 검색한다.

다음과 비슷한 메뉴로 이동한다.

```text
시스템 환경 변수 편집

↓

환경 변수
```

`Path` 항목을 확인한다.

일반적인 Installer 환경에서는 다음과 비슷한 Node.js 경로가 포함될 수 있다.

```text
C:\Program Files\nodejs\
```

경로는 설치 방법에 따라 다를 수 있다.

무조건 이 경로를 직접 추가하기 전에 실제 Node.js 설치 위치를 확인한다.

---

## 49. npm만 안 될 때

`node -v`는 정상인데

```bash
npm -v
```

만 실패하는 경우도 있을 수 있다.

이 경우 오류 메시지를 먼저 읽는다.

단순히 npm을 찾지 못하는 오류인지,

PowerShell 보안 정책과 관련된 오류인지,

PATH 문제인지

구분해야 한다.

---

## 50. PowerShell에서 `npm.ps1` 오류가 날 수 있다

Windows PowerShell 환경에서는 경우에 따라 npm을 실행했을 때 스크립트 실행 정책과 관련된 오류가 나타날 수 있다.

예를 들어 메시지에

```text
npm.ps1
```

또는

```text
running scripts is disabled
```

같은 내용이 보일 수 있다.

이 경우 Node.js 자체가 설치되지 않은 문제와는 다르다.

PowerShell의 스크립트 실행 정책과 관련된 문제일 수 있다.

---

## 51. 이때 무작정 보안 설정부터 바꾸지 않기

인터넷 검색 결과를 보고 바로 Windows의 실행 정책을 크게 완화하지 않는 것이 좋다.

우선 다른 터미널에서 npm이 정상적으로 동작하는지 확인한다.

예를 들어 VS Code Terminal에서 Git Bash를 열고

```bash
npm -v
```

를 실행한다.

또는 Command Prompt에서 확인한다.

Node.js와 npm 자체가 정상적으로 설치되어 있는지 먼저 구분한다.

보안 정책을 변경해야 한다면 해당 설정의 의미를 이해한 뒤 필요한 범위에서 변경하는 것이 좋다.

---

## 52. Node.js 자체를 직접 실행해보기

버전 번호가 나왔다고 끝내지 말고 실제 JavaScript를 실행해보자.

가장 간단한 방법은 Node.js의 대화형 환경을 사용하는 것이다.

터미널에 다음만 입력한다.

```bash
node
```

Enter를 누른다.

---

## 53. Node REPL이란?

`node`만 입력하면 Node.js의 REPL 환경으로 들어갈 수 있다.

REPL은

```text
Read
Evaluate
Print
Loop
```

의 약자다.

처음에는

> **JavaScript 코드를 한 줄씩 직접 입력하고 바로 결과를 확인할 수 있는 Node.js 실행 화면**

이라고 이해하면 된다.

---

## 54. REPL에서 첫 JavaScript 실행

`node`를 입력한 뒤 다음을 입력한다.

```javascript
console.log("Hello Node.js");
```

Enter를 누른다.

다음과 같이 출력된다.

```text
Hello Node.js
```

이 결과가 보인다면 Node.js가 실제로 JavaScript를 실행하고 있다는 뜻이다.

---

## 55. 간단한 계산도 해보기

다음처럼 입력한다.

```javascript
1 + 2
```

결과:

```text
3
```

또는

```javascript
const name = "Node.js"
```

입력 후

```javascript
name
```

을 입력하면 값을 확인할 수 있다.

---

## 56. REPL에서 나가기

REPL을 종료하려면 다음을 입력할 수 있다.

```text
.exit
```

또는 환경에 따라 `Ctrl + C`를 두 번 사용해 종료할 수도 있다.

터미널의 일반 명령어 입력 화면으로 돌아오면 된다.

---

## 57. 이제 실제 JavaScript 파일을 실행해보자

REPL은 간단한 테스트에 편리하지만 실제 개발에서는 `.js` 파일을 작성해서 실행하는 경우가 많다.

앞선 글에서 설치한 VS Code를 사용한다.

먼저 연습용 폴더를 하나 만든다.

예를 들어

```text
node-study
```

라는 폴더를 만든다.

---

## 58. 프로젝트 폴더 열기

VS Code에서

```text
File
→ Open Folder
```

를 선택한다.

앞에서 만든

```text
node-study
```

폴더를 연다.

또는 Git Bash에서 해당 위치로 이동한 뒤

```bash
code .
```

을 사용해도 된다.

---

## 59. JavaScript 파일 만들기

Explorer에서 새 파일을 만든다.

파일 이름은

```text
hello.js
```

로 한다.

여기서 `.js`는 JavaScript 파일 확장자다.

---

## 60. 첫 JavaScript 작성하기

`hello.js`에 다음 코드를 입력한다.

```javascript
console.log("Hello Node.js!");
```

저장한다.

Windows에서는

```text
Ctrl + S
```

를 사용한다.

---

## 61. VS Code 터미널 열기

VS Code에서

```text
Terminal
→ New Terminal
```

을 선택한다.

또는

```text
Ctrl + `
```

를 사용할 수 있다.

터미널이 열리면 현재 위치를 확인한다.

Git Bash를 사용한다면

```bash
pwd
```

를 사용할 수 있다.

현재 경로의 마지막이

```text
node-study
```

인지 확인한다.

---

## 62. 파일이 있는지 확인하기

Git Bash에서는 다음을 입력한다.

```bash
ls
```

다음 파일이 보이면 된다.

```text
hello.js
```

PowerShell이라면 `dir` 또는 `ls`를 사용할 수도 있다.

---

## 63. 첫 JavaScript 파일 실행하기

이제 다음 명령어를 입력한다.

```bash
node hello.js
```

결과:

```text
Hello Node.js!
```

이 문장이 출력된다면 첫 Node.js 프로그램 실행에 성공한 것이다.

---

## 64. `node hello.js`는 무슨 뜻일까?

명령어를 나눠보면 간단하다.

```text
node
→ Node.js로 실행

hello.js
→ 실행할 JavaScript 파일
```

즉,

```bash
node hello.js
```

는

> Node.js를 이용해서 `hello.js` 파일을 실행해줘

라는 의미다.

---

## 65. 지금 컴퓨터 안에서는 무슨 일이 일어났을까?

전체 과정을 보면 다음과 같다.

```text
VS Code

↓

hello.js 작성

↓

파일 저장

↓

Terminal

↓

node hello.js

↓

Node.js가 hello.js 읽기

↓

JavaScript 실행

↓

결과 출력
```

이 흐름을 이해하는 것이 중요하다.

---

## 66. 코드를 조금 더 작성해보기

`hello.js`를 다음처럼 수정한다.

```javascript
const name = "Node.js";

console.log("Hello " + name);
console.log(10 + 20);
```

저장한다.

다시 실행한다.

```bash
node hello.js
```

결과는 다음과 비슷하다.

```text
Hello Node.js
30
```

Node.js가 JavaScript 파일을 위에서부터 실행한 것이다.

---

## 67. 코드를 수정하면 다시 실행해야 한다

Node.js가 자동으로 파일 변경을 항상 다시 실행해주는 것은 아니다.

코드를 수정했다면 일반적인 `node hello.js` 실행에서는 다시 명령어를 실행한다.

```text
코드 수정

↓

Ctrl + S

↓

node hello.js

↓

새 결과 확인
```

개발 과정에서는 파일 변경을 감지해 자동으로 서버를 다시 실행해주는 도구를 사용하기도 하지만 지금은 기본 동작부터 이해한다.

---

## 68. 저장하지 않으면 왜 이전 결과가 나올까?

VS Code Editor에서 코드를 수정해도 아직 파일로 저장되지 않았다면 Node.js는 디스크에 저장된 이전 파일을 읽을 수 있다.

따라서

```text
코드 수정했는데 결과가 그대로다
```

라는 상황이 생기면 먼저

```text
Ctrl + S
```

로 저장했는지 확인한다.

이 습관은 앞으로도 매우 중요하다.

---

## 69. `node hello.js`를 다른 폴더에서 실행하면?

현재 위치에 `hello.js`가 없는데

```bash
node hello.js
```

를 실행하면 Node.js가 해당 파일을 찾지 못할 수 있다.

따라서 항상 터미널의 현재 위치를 확인하는 것이 중요하다.

예:

```text
node-study
├─ hello.js
```

라면 터미널도 `node-study` 위치에 있는 것이 가장 이해하기 쉽다.

---

## 70. 현재 위치가 왜 그렇게 중요할까?

앞으로 npm과 Git을 사용하면 대부분 명령어가 **현재 폴더**를 기준으로 동작한다.

예를 들어

```bash
npm install
```

```bash
git status
```

```bash
node hello.js
```

모두 현재 위치가 중요하다.

따라서 개발 초기부터

> **명령어를 실행하기 전에 내가 어느 폴더에 있는지 확인하는 습관**

을 들이는 것이 좋다.

---

## 71. npm도 실제로 동작하는지 확인하기

앞에서는

```bash
npm -v
```

로 버전만 확인했다.

조금 더 확인하고 싶다면 현재 `node-study` 폴더에서 다음을 사용할 수 있다.

```bash
npm init
```

이 명령어는 Node.js 프로젝트의 기본 정보를 설정하는 과정을 시작한다.

하지만 지금은 npm 프로젝트 구성 자체를 깊게 공부하는 단계는 아니다.

따라서 개념만 알아두자.

---

## 72. `npm init`은 무엇을 만들까?

일반적으로 npm 프로젝트를 초기화하면

```text
package.json
```

이라는 파일이 만들어진다.

`package.json`은 Node.js/JavaScript 프로젝트에서 매우 중요한 파일이다.

예를 들어 프로젝트의

```text
이름

버전

사용하는 패키지

실행 명령어

프로젝트 정보
```

등을 관리하는 데 사용된다.

---

## 73. package.json은 npm 자체일까?

아니다.

`package.json`은 프로젝트의 정보를 담는 JSON 파일이다.

npm은 이 파일을 읽고 필요한 패키지나 실행 명령을 처리한다.

관계를 보면 다음과 같다.

```text
npm

↓

package.json 확인

↓

프로젝트 정보와 패키지 정보 사용
```

앞으로 React나 Next.js 프로젝트를 만들면 `package.json`을 매우 자주 보게 된다.

---

## 74. `npm init -y`

질문 과정을 생략하고 기본값으로 `package.json`을 만들고 싶다면 다음 명령어를 사용할 수 있다.

```bash
npm init -y
```

연습용 `node-study` 폴더에서 실행해봐도 된다.

실행 후 Explorer를 확인하면

```text
package.json
```

파일이 생긴 것을 볼 수 있다.

---

## 75. package.json 열어보기

파일 내용은 환경과 npm 버전에 따라 다를 수 있지만 대략 다음과 비슷하다.

```json
{
  "name": "node-study",
  "version": "1.0.0",
  "main": "hello.js"
}
```

모든 항목을 지금 이해할 필요는 없다.

중요한 것은

> npm을 사용하는 JavaScript 프로젝트에서는 `package.json`이라는 파일을 자주 만나게 된다

는 점이다.

---

## 76. npm install은 무엇일까?

앞으로 가장 자주 사용할 npm 명령어 중 하나다.

```bash
npm install
```

또는

```bash
npm install 패키지이름
```

형태로 사용한다.

간단하게 말하면

```text
프로젝트에 필요한 패키지를 설치
```

하는 명령어다.

---

## 77. 예를 들어 React 프로젝트에서는

나중에 GitHub에서 React 프로젝트를 clone했다고 해보자.

폴더에는

```text
package.json
```

이 있지만 실제 패키지 파일은 Git에 올라가 있지 않을 수 있다.

이때

```bash
npm install
```

을 실행하면 `package.json` 등의 정보를 바탕으로 필요한 패키지를 설치한다.

이것이 팀 프로젝트에서

```text
clone한 다음 npm install 하세요
```

라는 말을 듣는 이유다.

---

## 78. node_modules란?

npm으로 패키지를 설치하면 프로젝트에

```text
node_modules
```

라는 폴더가 생기는 경우가 많다.

이곳에는 프로젝트에서 사용하는 수많은 패키지가 들어간다.

구조를 간단하게 보면 다음과 같다.

```text
my-project
├─ package.json
├─ package-lock.json
└─ node_modules
```

---

## 79. node_modules는 왜 그렇게 클까?

하나의 패키지가 또 다른 패키지를 사용할 수 있다.

그 패키지가 다시 다른 패키지에 의존할 수도 있다.

그래서 몇 개의 패키지만 설치했다고 생각했는데 `node_modules` 안에는 많은 파일이 생길 수 있다.

처음 보면

> 내가 이렇게 많이 설치했나?

싶을 수 있지만 자연스러운 경우가 많다.

---

## 80. node_modules를 GitHub에 올릴까?

일반적인 Node.js 프로젝트에서는 `node_modules`를 Git Repository에 직접 올리지 않는 경우가 많다.

왜냐하면 필요한 패키지 정보가 `package.json`과 lock 파일 등에 기록되어 있고,

다른 개발자는

```bash
npm install
```

을 통해 다시 설치할 수 있기 때문이다.

그래서 `.gitignore`에

```text
node_modules/
```

를 넣는 경우가 매우 많다.

이 내용은 실제 Node.js 프로젝트와 Git을 함께 사용할 때 더 자세히 다룬다.

---

## 81. npm과 Node.js의 관계 다시 보기

지금까지의 관계를 한 번 정리해보자.

```text
Node.js

JavaScript 실행 환경

↓

node hello.js
```

그리고

```text
npm

JavaScript 패키지 관리자

↓

npm install
```

둘을 합치면 다음과 같다.

```text
Node.js 개발환경

├─ node
│  └─ JavaScript 실행
│
└─ npm
   └─ Package 관리
```

---

## 82. npm은 JavaScript를 실행하는 프로그램이 아니다

예를 들어

```bash
node hello.js
```

는 Node.js에게 JavaScript 파일을 직접 실행하도록 요청한다.

반면

```bash
npm run dev
```

같은 명령어는 `package.json`에 정의된 스크립트를 npm이 찾아 실행하는 것이다.

즉 두 명령어는 같은 역할이 아니다.

---

## 83. 앞으로 자주 보게 될 npm 명령어

아직 외울 필요는 없다.

역할 정도만 알아두자.

```bash
npm install
```

프로젝트에 필요한 패키지를 설치할 때 사용한다.

```bash
npm install 패키지이름
```

특정 패키지를 추가한다.

```bash
npm run dev
```

프로젝트에 정의된 개발용 명령어를 실행한다.

```bash
npm run build
```

프로젝트에 정의된 빌드 명령을 실행한다.

단, `dev`나 `build`라는 script가 실제 `package.json`에 정의되어 있어야 한다.

---

## 84. 모든 프로젝트에서 `npm run dev`가 되는 것은 아니다

처음에는 이것도 많이 헷갈린다.

인터넷에서

```bash
npm run dev
```

를 보고 아무 폴더에서 입력한다고 실행되는 것이 아니다.

해당 프로젝트의 `package.json` 안에

```text
dev
```

스크립트가 정의되어 있어야 한다.

즉,

```text
npm 자체에 dev라는 고정 기능이 있는 것
```

이 아니다.

프로젝트에서 정의한 명령어를 npm이 실행해주는 것이다.

---

## 85. npm install도 아무 폴더에서 하지 않기

`npm install`은 현재 프로젝트를 기준으로 동작한다.

따라서 프로젝트 위치를 확인하지 않고 명령어를 실행하면 원하지 않는 위치에 파일이 생성될 수 있다.

앞으로 npm 명령어를 입력하기 전에

```text
현재 터미널 위치

현재 프로젝트 이름

package.json 존재 여부
```

를 확인하는 습관을 들이는 것이 좋다.

---

## 86. VS Code를 다시 연결해서 생각해보자

이제 VS Code와 Node.js, npm의 역할이 모두 나왔다.

관계는 다음과 같다.

```text
VS Code
↓
코드 작성
↓
hello.js

       ↓

Node.js
↓
JavaScript 실행

       +

npm
↓
Package 관리
```

VS Code가 Node.js를 포함하는 것이 아니다.

Node.js가 VS Code를 포함하는 것도 아니다.

각각 별도의 프로그램이 서로 협력하는 것이다.

---

## 87. Git까지 연결하면

현재까지 설치한 개발 도구를 모두 연결하면 다음과 같다.

```text
VS Code
코드 작성

↓

Node.js
JavaScript 실행

↓

npm
Package 관리

↓

Git
변경 기록

↓

SourceTree
Git GUI 관리

↓

GitHub
Remote Repository 저장
```

실제로는 모든 프로그램이 일렬로 동작하는 것은 아니지만 각각 어떤 역할을 담당하는지 이해하기 위한 그림이다.

---

## 88. Node.js 프로젝트의 기본 흐름 미리 보기

나중에는 다음과 같은 흐름을 자주 보게 된다.

```text
GitHub에서 프로젝트 Clone

↓

VS Code로 프로젝트 열기

↓

Node.js 버전 확인

↓

npm install

↓

필요한 Package 설치

↓

npm run dev

↓

개발 서버 실행

↓

코드 수정
```

이번 Node.js 설치가 이후 React나 Next.js 프로젝트를 실행하는 기반이 된다.

---

## 89. Node 버전을 프로젝트마다 확인하는 이유

어떤 프로젝트를 실행했는데 다음과 같은 문제가 생길 수 있다.

```text
내 컴퓨터에서는 실행 안 됨

팀원 컴퓨터에서는 실행됨
```

원인은 여러 가지가 있지만 Node.js 버전 차이도 그중 하나가 될 수 있다.

그래서 프로젝트를 처음 받으면

```bash
node -v
```

를 확인하는 습관이 좋다.

---

## 90. package.json에서 Node 버전을 요구할 수도 있다

프로젝트에 따라 `package.json`이나 다른 설정 파일에서 사용할 Node.js 버전을 명시하기도 한다.

예를 들어 개념적으로

```text
Node 24 이상 필요
```

같은 조건을 둘 수 있다.

또는

```text
.nvmrc
```

같은 파일을 이용해 프로젝트에서 사용할 Node 버전을 관리하기도 한다.

이런 파일은 Version Manager를 사용할 때 특히 유용하다.

지금 단계에서는

> **프로젝트마다 필요한 Node.js 버전이 다를 수 있다**

는 사실만 기억해두면 된다.

---

## 91. Node.js 업데이트는 무조건 바로 해야 할까?

항상 그렇지는 않다.

개인 연습 프로젝트에서는 지원되는 최신 LTS로 업데이트하기 쉬울 수 있다.

하지만 팀 프로젝트를 진행 중이라면 팀이 사용하는 버전과 맞춰야 한다.

예를 들어 팀 전체가

```text
Node.js 24
```

를 사용하는데 혼자 갑자기 다른 주요 버전으로 바꾸면 환경 차이가 생길 수 있다.

따라서 프로젝트에서는

```text
최신인가?
```

보다

```text
프로젝트에서 요구하는 버전인가?
```

가 더 중요할 수 있다.

---

## 92. 설치한 Node.js 위치 확인하기

Windows에서 Node.js가 어디에 있는지 확인하고 싶다면 Command Prompt나 PowerShell에서 다음 명령어를 사용할 수 있다.

```bash
where node
```

환경에 따라 다음과 비슷한 결과가 나온다.

```text
C:\Program Files\nodejs\node.exe
```

Git Bash에서는

```bash
which node
```

를 사용할 수 있다.

예:

```text
/c/Program Files/nodejs/node
```

이 명령어는 PATH에서 실제 어떤 Node.js 실행 파일이 선택되는지 확인할 때 유용하다.

---

## 93. npm 위치도 확인할 수 있다

Command Prompt에서는

```bash
where npm
```

Git Bash에서는

```bash
which npm
```

을 사용할 수 있다.

나중에 Node.js를 여러 버전 설치했는데 예상과 다른 버전이 실행되는 경우 이런 명령어로 실제 실행 위치를 확인할 수 있다.

---

## 94. 여러 Node.js가 설치되면 왜 문제가 생길까?

예를 들어 컴퓨터에 Node.js가 두 군데 설치되어 있다고 해보자.

```text
Node A

Node B
```

PATH 순서에 따라 터미널에서 `node`라고 입력했을 때 둘 중 하나가 실행된다.

그래서

> 나는 Node 24를 설치했는데 왜 Node 22가 나오지?

같은 상황이 생길 수 있다.

이런 문제를 줄이고 여러 버전을 편하게 관리하기 위해 Version Manager를 사용하는 것이다.

---

## 95. 지금은 Node.js를 하나만 설치하고 시작

현재는 처음 개발환경을 구축하고 있으므로 복잡하게 여러 버전을 설치하지 않는다.

이번 글에서는

```text
Node.js 24 LTS

하나 설치

↓

node -v 확인

↓

npm -v 확인
```

정도로 환경을 단순하게 유지한다.

나중에 여러 프로젝트를 동시에 관리하게 되면 Version Manager로 발전시키면 된다.

---

## 96. Node.js를 설치했다고 서버가 자동으로 실행되는 것은 아니다

Node.js를

```text
서버 프로그램
```

이라고만 이해하는 경우도 있다.

정확히는 Node.js는 JavaScript Runtime이다.

Node.js를 이용해서 서버 프로그램을 **만들 수 있는 것**이다.

즉,

```text
Node.js 설치

=

웹 서버가 자동으로 생김
```

이 아니다.

JavaScript로 서버 코드를 작성하고 Node.js로 실행해야 한다.

---

## 97. Node.js와 Tomcat은 같은 것일까?

뒤에서 Tomcat도 설치할 예정이다.

둘 다 서버 개발 과정에서 등장하기 때문에 헷갈릴 수 있다.

이번 단계에서는 아주 단순하게만 구분한다.

```text
Node.js
→ JavaScript 실행 환경
```

```text
Tomcat
→ Java 웹 애플리케이션을 실행하는 서블릿 컨테이너
```

JavaScript 개발과 Java 웹 개발 환경이 다르기 때문에 사용하는 도구도 다르다.

Tomcat은 이후 별도의 글에서 자세히 다룬다.

---

## 98. Node.js와 JDK도 다르다

다음 Dev Setup에서 JDK를 설치할 예정이다.

역할을 비교하면 다음과 같다.

```text
JavaScript

↓

Node.js

↓

실행
```

그리고

```text
Java

↓

JDK의 개발 도구와 Java 실행 환경

↓

컴파일 / 실행
```

즉 프로그래밍 언어와 실행 환경이 다르다.

---

## 99. 자주 생기는 문제 — 버전이 안 나온다

다시 정리해보자.

```bash
node -v
```

가 안 되면

```text
Node.js 설치 여부

터미널 재시작

VS Code 재시작

PATH

실제 node.exe 위치
```

를 확인한다.

---

## 100. 자주 생기는 문제 — npm만 안 된다

```bash
node -v
```

는 성공하지만

```bash
npm -v
```

가 실패한다면 오류 문장을 그대로 읽는다.

특히

```text
npm.ps1

execution policy
```

같은 문구가 있는지 확인한다.

Node 설치 문제인지 PowerShell 설정 문제인지 구분한다.

---

## 101. 자주 생기는 문제 — 파일을 찾을 수 없다

다음 명령어에서

```bash
node hello.js
```

파일을 찾을 수 없다는 오류가 발생하면 가장 먼저 현재 폴더를 확인한다.

```text
현재 Terminal 위치

↓

hello.js가 실제로 있는 위치
```

두 위치가 맞아야 한다.

---

## 102. 자주 생기는 문제 — 코드 수정이 반영되지 않는다

다음을 확인한다.

```text
Ctrl + S로 저장했는가?

올바른 hello.js를 수정했는가?

터미널이 올바른 프로젝트에 있는가?

node hello.js를 다시 실행했는가?
```

비슷한 이름의 파일을 여러 개 만들면 다른 파일을 실행하는 실수도 생길 수 있다.

---

## 103. 자주 생기는 문제 — VS Code에서만 안 된다

외부 Git Bash나 Command Prompt를 새로 열어

```bash
node -v
```

와

```bash
npm -v
```

를 확인한다.

외부 터미널에서는 정상인데 VS Code에서만 안 된다면 VS Code가 설치 전 환경을 유지하고 있을 수 있다.

VS Code를 완전히 종료했다가 다시 실행한다.

---

## 104. 자주 생기는 문제 — 최신 버전인데 프로젝트가 안 된다

Node.js가 가장 최신이라고 해서 모든 프로젝트와 호환되는 것은 아니다.

프로젝트 문서에서

```text
Node version

Requirements

Prerequisites
```

같은 항목을 확인한다.

프로젝트가 특정 버전을 요구한다면 해당 버전을 사용하는 것이 우선이다.

---

## 105. 오늘 사용한 명령어 정리

Node.js 버전 확인:

```bash
node -v
```

또는

```bash
node --version
```

npm 버전 확인:

```bash
npm -v
```

또는

```bash
npm --version
```

Node.js REPL 실행:

```bash
node
```

JavaScript 파일 실행:

```bash
node hello.js
```

npm 프로젝트 초기화:

```bash
npm init
```

기본값으로 프로젝트 초기화:

```bash
npm init -y
```

Windows에서 Node 위치 확인:

```bash
where node
```

Windows에서 npm 위치 확인:

```bash
where npm
```

Git Bash에서 Node 위치 확인:

```bash
which node
```

Git Bash에서 npm 위치 확인:

```bash
which npm
```

---

## 106. 지금 당장 외워야 할 명령어

앞의 명령어를 모두 외울 필요는 없다.

이번 글에서 가장 중요한 것은 딱 세 가지다.

```bash
node -v
```

```bash
npm -v
```

```bash
node 파일이름.js
```

즉,

```text
설치 확인

↓

npm 확인

↓

JavaScript 실행
```

흐름을 기억하면 된다.

---

## 107. 최종 점검 체크리스트

하나씩 확인해보자.

```text
□ Node.js가 무엇인지 설명할 수 있다

□ VS Code와 Node.js의 차이를 알고 있다

□ Node.js와 npm의 차이를 알고 있다

□ LTS가 무엇인지 알고 있다

□ Current와 LTS가 다르다는 것을 알고 있다

□ 공식 Node.js 사이트에서 설치 파일을 받았다

□ Windows 환경에 맞는 설치 파일을 선택했다

□ Node.js를 설치했다

□ 설치 후 터미널을 다시 열었다

□ node -v가 정상 출력된다

□ npm -v가 정상 출력된다

□ VS Code에서도 node -v가 동작한다

□ VS Code에서도 npm -v가 동작한다

□ node REPL에서 JavaScript를 실행해봤다

□ hello.js 파일을 만들었다

□ node hello.js로 실행했다

□ 코드 수정 후 저장하고 다시 실행했다

□ package.json이 무엇인지 대략 알고 있다

□ npm install이 무엇을 하는지 대략 알고 있다
```

여기까지 모두 확인했다면 기본적인 Node.js와 npm 개발환경 구축은 완료됐다.

---

## 108. 이번 글의 핵심 다시 정리

가장 먼저 Node.js다.

```text
Node.js

=

JavaScript Runtime

=

JavaScript를 브라우저 밖에서도
실행할 수 있게 해주는 환경
```

다음은 npm이다.

```text
npm

=

Package Manager

=

JavaScript 프로젝트에서
패키지를 설치하고 관리하는 도구
```

둘의 관계는 다음과 같다.

```text
Node.js
├─ JavaScript 실행
└─ node 명령어

npm
├─ Package 관리
└─ npm 명령어
```

---

## 109. VS Code까지 연결해서 보기

```text
VS Code

hello.js 작성

↓

Ctrl + S

↓

VS Code Terminal

↓

node hello.js

↓

Node.js

↓

JavaScript 실행

↓

결과 출력
```

패키지가 필요한 프로젝트라면 npm까지 추가된다.

```text
VS Code

↓

JavaScript 프로젝트

↓

npm

필요한 Package 설치

↓

Node.js

프로그램 실행
```

---

## 110. 지금까지 구축한 개발환경

이번 글까지 진행하면 현재 컴퓨터에는 다음 환경이 만들어져 있다.

```text
개발환경

├─ 코드 작성
│  └─ VS Code
│
├─ JavaScript 실행
│  └─ Node.js
│
├─ JavaScript Package 관리
│  └─ npm
│
├─ 버전 관리
│  ├─ Git
│  ├─ Git Bash
│  └─ SourceTree
│
└─ Remote Repository
   └─ GitHub
```

처음 00편에서 봤던 개발환경 구조가 하나씩 실제 프로그램으로 채워지고 있다.

---

## 111. 다음은 Java 개발환경이다

지금까지는 JavaScript를 실행할 수 있는 환경을 만들었다.

다음 단계에서는 Java를 실행하고 개발할 수 있는 환경을 만든다.

JavaScript에서는

```text
JavaScript

↓

Node.js

↓

실행
```

이었다면,

Java에서는 새로운 개념들이 등장한다.

```text
Java

↓

JDK

↓

javac로 컴파일

↓

java로 실행
```

그리고 다음과 같은 내용을 다루게 된다.

```text
Java란?

↓

JDK란?

↓

JRE와 JDK의 차이

↓

JDK 21 설치

↓

JAVA_HOME

↓

PATH

↓

java -version

↓

javac -version

↓

첫 Java 프로그램 실행
```

---

## 정리

이번 글에서는 Node.js와 npm의 개념부터 실제 설치와 실행까지 진행했다.

전체 흐름을 다시 보면 다음과 같다.

```text
Node.js 역할 이해

↓

npm 역할 이해

↓

Node.js와 npm 차이 이해

↓

Current / LTS 이해

↓

Node.js LTS 선택

↓

Windows Installer 다운로드

↓

Node.js 설치

↓

PATH 연결

↓

새 터미널 실행

↓

node -v

↓

npm -v

↓

node REPL 테스트

↓

VS Code에서 hello.js 작성

↓

node hello.js

↓

첫 JavaScript 실행 성공
```

처음에는 Node.js와 npm이 한 세트처럼 보여 같은 프로그램이라고 생각하기 쉽다.

하지만 둘의 역할은 분명히 다르다.

```text
Node.js
→ JavaScript를 실행한다.

npm
→ JavaScript 프로젝트의 패키지를 관리한다.
```

그리고 VS Code까지 함께 보면 더 명확하다.

```text
VS Code
→ 작성

Node.js
→ 실행

npm
→ 패키지 관리
```

이 세 가지 역할을 구분할 수 있다면 이후 React나 Next.js 프로젝트를 접했을 때도

```bash
npm install
```

```bash
npm run dev
```

같은 명령어가 왜 필요한지 훨씬 이해하기 쉬워진다.

이제 JavaScript 개발을 위한 기본 실행 환경까지 준비됐다.

다음 Dev Setup에서는 **JDK 21을 설치하고 Java 개발환경을 구축**한다.

```text
Dev Setup

00 개발환경 구축 전체 가이드
   ↓

01 Git & GitHub 개발환경 구축
   ↓

02 SourceTree 설치 및 GitHub 연결
   ↓

03 VS Code 설치와 초기 개발환경 설정
   ↓

04 Node.js와 npm 개발환경 구축  ← 현재
   ↓

05 JDK 21 개발환경 구축
   ↓

06 IntelliJ IDEA 개발환경 구축
   ↓

07 Tomcat 개발환경 구축
   ↓

08 새 PC에서 개발환경 다시 구축하기
```

이제 컴퓨터에서

```bash
node -v
npm -v
```

두 명령어가 정상적으로 동작하고,

```bash
node hello.js
```

로 직접 JavaScript 파일까지 실행된다면 **Node.js와 npm 개발환경 구축은 완료**다.

---

## 더 학습하면 좋은 개념

- **package-lock.json과 Semantic Versioning** — 80장에서 말한 "lock 파일"의 정체다. `^1.2.3` 같은 버전 범위와 lock 파일이 함께 동작해야 팀원 모두가 같은 패키지 버전을 설치할 수 있다.
- **npx** — npm과 함께 설치되는 도구로, 패키지를 전역 설치하지 않고 바로 실행할 수 있다. React·Next.js 프로젝트를 처음 만들 때 자주 보게 된다.
- **CommonJS와 ES Modules** — Node.js에서 파일을 나눠 불러오는 두 방식(`require` / `import`)이다. `package.json`의 `"type"` 값에 따라 동작이 달라져서, 파일을 여러 개로 나누기 시작하면 바로 만나게 된다.
- **이벤트 루프와 비동기 I/O** — Node.js가 하나의 스레드로도 많은 요청을 처리하는 원리다. 96장의 "Node.js로 서버를 만든다"가 어떻게 가능한지 이해하는 출발점이다.
- **Version Manager와 `engines` 필드** — 20·90장에서 미뤄 둔 nvm-windows·fnm과, `package.json`에 필요한 Node 버전을 적는 `engines` 필드다. 여러 프로젝트를 오가기 시작하면 필요해진다.

## 참고 자료

- [Node.js 공식 사이트](https://nodejs.org/en)
- [Node.js - Download](https://nodejs.org/en/download)
- [Node.js - Previous Releases (릴리스 상태와 LTS 정책)](https://nodejs.org/en/about/previous-releases)
- [Node.js - v24.21.0 릴리스 노트](https://nodejs.org/en/blog/release/v24.21.0)
- [Node.js 배포 목록 - v24.21.0](https://nodejs.org/dist/v24.21.0/)
- [Node.js Docs - REPL](https://nodejs.org/api/repl.html)
- [npm Docs - About npm](https://docs.npmjs.com/about-npm)
- [npm Docs - Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [npm Docs - package.json](https://docs.npmjs.com/cli/configuring-npm/package-json)
- [npm Docs - npm init](https://docs.npmjs.com/cli/commands/npm-init)
- [npm Docs - npm install](https://docs.npmjs.com/cli/commands/npm-install)
- [npm Docs - npm run](https://docs.npmjs.com/cli/commands/npm-run)
- [Microsoft Learn - about_Execution_Policies](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies)
- [nvm-windows (GitHub)](https://github.com/nvm-windows/nvm)
