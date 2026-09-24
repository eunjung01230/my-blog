---
layout: post
title: "VS Code 설치와 초기 개발환경 설정하기"
date: 2026-09-24 22:35:00 +0900
categories: dev-setup
learningOrder: 40
tags:
  - vscode
  - live-server
  - prettier
  - windows
---

앞선 Dev Setup에서는 Git과 GitHub를 설치하고 SourceTree까지 연결했다.

이제 코드를 기록하고 관리할 환경은 어느 정도 준비됐다.

하지만 아직 가장 중요한 것이 남아 있다.

바로 **코드를 작성할 프로그램**이다.

메모장에서도 코드를 작성할 수는 있다.

예를 들어 다음 HTML 코드는 메모장에서도 작성할 수 있다.

```html
<h1>Hello</h1>
```

하지만 실제 개발을 하다 보면 단순히 글자를 입력하는 것만으로는 부족하다.

파일과 폴더가 많아지고,

코드가 길어지고,

터미널에서 명령어를 실행해야 하며,

Git으로 변경 사항을 확인하고,

문법 오류를 찾아야 하고,

필요한 개발 기능을 추가해야 한다.

이런 작업을 편하게 할 수 있도록 도와주는 프로그램이 **코드 에디터(Code Editor)**다.

이번 글에서는 그중 가장 많이 사용되는 도구 중 하나인 **Visual Studio Code**, 줄여서 **VS Code**를 설치한다.

이번 글의 목표는 다음과 같다.

```text
VS Code 역할 이해
↓
VS Code 설치
↓
PATH 확인
↓
프로젝트 폴더 열기
↓
VS Code 화면 이해
↓
통합 터미널 사용
↓
Git 동작 확인
↓
기본 설정
↓
확장 프로그램 설치
↓
첫 HTML 파일 작성
↓
브라우저에서 실행
```

단순히 프로그램 설치 버튼만 누르고 끝내는 것이 아니라,

> **앞으로 개발 공부에 실제로 사용할 수 있는 상태**

까지 만드는 것이 목표다.

---

## 1. VS Code란?

VS Code의 정식 이름은

**Visual Studio Code**

다.

Microsoft에서 개발하는 코드 편집기다.

HTML, CSS, JavaScript뿐만 아니라 다양한 프로그래밍 언어와 개발 환경에서 사용할 수 있다.

VS Code는 기본 편집 기능 외에도 터미널, Git 연동, 디버깅, 확장 프로그램 등을 지원한다.

처음에는 간단하게

> **개발자가 코드를 작성하고 관리하기 편하게 만들어주는 프로그램**

이라고 생각하면 된다.

---

## 2. 메모장과 VS Code는 무엇이 다를까?

메모장에서도 코드를 작성할 수 있다.

예를 들어 다음 코드를 메모장에 입력하고

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Hello</h1>
</body>
</html>
```

`index.html`이라는 이름으로 저장할 수도 있다.

하지만 VS Code에서는 코드를 작성할 때 훨씬 많은 도움을 받을 수 있다.

예를 들어

```text
문법에 따라 글자 색상 표시

자동 완성

파일과 폴더 관리

여러 파일 동시에 열기

코드 검색

터미널 사용

Git 변경 사항 확인

확장 프로그램 사용

디버깅
```

등의 기능을 사용할 수 있다.

따라서

```text
메모장
→ 텍스트 작성 도구

VS Code
→ 개발을 위한 코드 편집 환경
```

정도로 구분하면 된다.

---

## 3. VS Code와 Visual Studio는 다르다

초보자일 때 자주 헷갈리는 이름이 있다.

```text
Visual Studio Code

Visual Studio
```

둘 다 Microsoft에서 제공하지만 서로 다른 프로그램이다.

이번에 설치할 것은

```text
Visual Studio Code
```

다.

보통 줄여서

```text
VS Code
```

라고 부른다.

Visual Studio는 보다 무거운 통합 개발 환경이고 C#, .NET 등의 개발에서 많이 사용된다.

따라서 검색할 때도

```text
VS Code
```

또는

```text
Visual Studio Code
```

라고 검색하는 것이 좋다.

---

## 4. VS Code와 IntelliJ도 다른 프로그램이다

이번 Dev Setup 뒤쪽에서는 IntelliJ IDEA도 설치할 예정이다.

그렇다면 이런 의문이 생길 수 있다.

> VS Code를 설치했는데 IntelliJ는 왜 또 설치하지?

둘 다 코드를 작성할 수 있지만 자주 사용하는 분야와 제공하는 기능에서 차이가 있다.

이번 시리즈에서는 대략 다음처럼 사용한다.

```text
HTML
CSS
JavaScript
React
Next.js
Markdown
JSON

→ VS Code
```

그리고

```text
Java
Spring
Spring Boot

→ IntelliJ IDEA
```

물론 반드시 이렇게 사용해야 하는 것은 아니다.

VS Code에서도 Java를 개발할 수 있고 IntelliJ에서도 웹 관련 파일을 작성할 수 있다.

하지만 처음 공부할 때는 도구의 대표적인 사용 영역을 나눠 생각하면 이해하기 쉽다.

---

## 5. IDE와 코드 에디터는 무엇이 다를까?

앞으로 개발 공부를 하다 보면 **IDE**라는 단어도 자주 보게 된다.

IDE는

**Integrated Development Environment**

의 약자다.

우리말로는 **통합 개발 환경**이라고 한다.

코드 작성뿐 아니라

```text
코드 실행
디버깅
프로젝트 관리
빌드
테스트
개발 도구 연결
```

같은 여러 기능을 하나의 프로그램 안에서 제공한다.

IntelliJ IDEA는 대표적인 IDE다.

VS Code는 기본적으로 가벼운 코드 에디터에서 시작하지만 확장 프로그램을 설치해서 다양한 개발 기능을 추가할 수 있다.

그래서 처음에는 다음 정도로 이해하면 충분하다.

```text
VS Code
→ 필요한 기능을 추가해서 사용하는 코드 편집기

IntelliJ IDEA
→ Java 개발 기능이 많이 통합된 IDE
```

---

## 6. VS Code에서 앞으로 하게 될 일

앞으로 웹 개발을 공부하면서 VS Code에서는 다음과 같은 작업을 하게 된다.

```text
HTML 작성
CSS 작성
JavaScript 작성
React 프로젝트 수정
Next.js 프로젝트 수정

터미널 명령어 실행

Git 상태 확인

파일 생성 및 삭제

폴더 구조 확인

검색 및 코드 수정

확장 프로그램 사용
```

따라서 VS Code 화면과 기본 기능은 한 번 제대로 익혀두는 것이 좋다.

---

## 7. VS Code 다운로드하기

이제 실제로 설치해보자.

이 글에서는 **Windows 기준**으로 진행한다.

인터넷 검색창에서 다음처럼 검색한다.

```text
VS Code
```

또는

```text
Visual Studio Code download
```

검색 결과에서 Microsoft의 [VS Code 공식 사이트](https://code.visualstudio.com/download)로 이동한다.

가능하면 개발 도구는 공식 홈페이지에서 다운로드하는 습관을 들이는 것이 좋다.

---

## 8. Windows 설치 방식

VS Code의 Windows 설치 파일에는 대표적으로 다음과 같은 방식이 있다.

```text
User Setup

System Setup

ZIP
```

처음 보면 무엇을 선택해야 하는지 헷갈릴 수 있다.

---

## 9. User Setup

일반적인 개인 PC라면 **User Setup**으로 시작하기 편하다.

[VS Code 공식 문서](https://code.visualstudio.com/docs/setup/windows)에서도 대부분의 Windows 사용자에게 User Setup을 권장하고 있다.

User Setup은 현재 Windows 사용자 계정에 설치되고 일반적으로 관리자 권한 없이 설치할 수 있다.

설치 위치는 일반적으로 다음 계열이다.

```text
C:\Users\사용자이름\AppData\Local\Programs\Microsoft VS Code
```

개인 노트북에서 혼자 사용하는 경우라면 이 방식으로 충분하다.

---

## 10. System Setup

System Setup은 해당 PC의 여러 Windows 사용자가 VS Code를 사용할 수 있도록 설치하는 방식이다.

일반적으로 관리자 권한이 필요하다.

예를 들어 가족이나 여러 사용자가 같은 컴퓨터 계정을 나눠 사용하는 환경에서는 고려할 수 있다.

하지만 개인 개발용 컴퓨터라면 굳이 System Setup을 선택할 필요는 없다.

이번 글에서는 **User Setup 기준**으로 진행한다.

---

## 11. ZIP 버전은 무엇일까?

설치 프로그램을 사용하지 않고 압축 파일을 받아 직접 실행하는 방식도 있다.

하지만 ZIP 방식은 업데이트나 PATH 등의 초기 설정을 직접 챙겨야 할 부분이 늘어날 수 있다.

처음 설치하는 사람이라면 일반적인 Installer 방식을 사용하는 것이 편하다.

---

## 12. 설치 파일 실행하기

다운로드한 파일은 보통 다음과 비슷한 이름이다.

```text
VSCodeUserSetup-x64-버전.exe
```

정확한 버전 번호는 설치 시기에 따라 달라질 수 있다.

파일을 실행한다.

라이선스 동의 화면이 나오면 내용을 확인한 뒤 동의하고 다음으로 진행한다.

---

## 13. 설치 위치 확인하기

설치 경로를 선택하는 화면이 나온다.

특별한 이유가 없다면 기본 경로를 그대로 사용한다.

처음 개발환경을 구축할 때는 프로그램을 특별한 경로로 옮기기보다 기본 설치 경로를 사용하는 것이 관리하기 편하다.

```text
기본 설치 경로 유지
↓
다음
```

으로 진행한다.

---

## 14. 시작 메뉴 폴더

시작 메뉴에 Visual Studio Code 바로가기를 만들지 설정하는 단계가 나타날 수 있다.

특별한 이유가 없다면 기본값으로 진행하면 된다.

---

## 15. 추가 작업 선택 화면

설치 과정에서 여러 추가 옵션이 나타날 수 있다.

버전에 따라 문구가 달라질 수 있지만 대략 다음과 같은 항목을 볼 수 있다.

```text
바탕 화면 아이콘 만들기

파일의 마우스 오른쪽 메뉴에
Code로 열기 추가

폴더의 마우스 오른쪽 메뉴에
Code로 열기 추가

지원되는 파일 형식의 편집기로 등록

PATH에 추가
```

여기에서 초보자가 특히 알아둘 것은 **PATH**다.

---

## 16. PATH란?

앞선 Git 설치 글에서도 PATH를 잠깐 봤다.

PATH는 컴퓨터가 프로그램의 실행 파일 위치를 찾을 때 사용하는 환경변수다.

예를 들어 터미널에서

```bash
code
```

라는 명령어를 입력했다고 해보자.

Windows는

> code라는 프로그램이 어디 있지?

라고 찾아야 한다.

VS Code 실행 파일의 위치가 PATH에 등록되어 있으면 Windows가 VS Code를 찾아 실행할 수 있다.

구조를 단순하게 보면 다음과 같다.

```text
터미널

code 입력
↓
Windows가 PATH 확인
↓
VS Code 위치 발견
↓
VS Code 실행
```

---

## 17. VS Code 설치와 PATH

현재 VS Code의 Windows Installer는 설치 과정에서 VS Code의 `code` 명령을 PATH에 추가한다.

[공식 문서](https://code.visualstudio.com/docs/setup/windows)에서도 설치 후 새로운 콘솔을 열고 `code .` 명령을 사용할 수 있다고 안내한다.

따라서 정상적으로 Installer를 사용했다면 일반적으로 별도로 Windows 환경변수 창을 열어서 VS Code 경로를 직접 입력할 필요는 없다.

---

## 18. PATH 변경 후 터미널을 다시 열어야 하는 이유

설치를 끝낸 뒤 이미 열려 있던 Git Bash나 PowerShell에서 바로

```bash
code
```

를 실행하면 명령어를 찾지 못하는 경우가 있다.

이유는 기존에 실행 중인 터미널이 설치 전 PATH 정보를 가지고 있을 수 있기 때문이다.

이럴 때는

```text
기존 터미널 종료

↓

새 터미널 실행
```

을 먼저 해본다.

[공식 문서](https://code.visualstudio.com/docs/setup/windows)도 설치 후 콘솔을 다시 시작한 다음 `code .`을 실행하도록 안내한다.

---

## 19. 설치 완료하기

설정 확인이 끝났다면 설치를 진행한다.

설치가 완료되면

```text
Launch Visual Studio Code
```

와 비슷한 실행 옵션이 나타날 수 있다.

체크된 상태로 완료하면 VS Code가 바로 실행된다.

---

## 20. VS Code 첫 화면

VS Code를 처음 실행하면 Welcome 화면이 나타날 수 있다.

버전에 따라 화면 구성은 달라질 수 있지만 기본적으로 다음과 같은 기능을 찾을 수 있다.

```text
새 파일 만들기

폴더 열기

최근 프로젝트 열기

설정

확장 프로그램
```

처음에는 메뉴가 많아 보이지만 자주 사용하는 영역은 몇 가지뿐이다.

---

## 21. VS Code 화면 구조

기본 화면은 크게 다음과 같이 생각하면 된다.

```text
┌──────────────────────────────────────┐
│ 메뉴                                 │
├────┬───────────┬─────────────────────┤
│    │           │                     │
│ A  │ Explorer  │      Editor         │
│ c  │           │                     │
│ t  │           │                     │
│ i  │           │                     │
│ v  │           │                     │
│ i  │           │                     │
│ t  │           │                     │
│ y  │           │                     │
├────┴───────────┴─────────────────────┤
│ Terminal / Problems / Output         │
├──────────────────────────────────────┤
│ Status Bar                           │
└──────────────────────────────────────┘
```

각 영역을 하나씩 알아보자.

---

## 22. Activity Bar

VS Code 가장 왼쪽에 세로로 아이콘들이 있는 부분이다.

대표적으로 다음 기능이 있다.

```text
Explorer

Search

Source Control

Run and Debug

Extensions
```

처음에는 전부 사용할 필요는 없다.

우선 기억할 것은 세 가지다.

```text
Explorer
→ 파일 관리

Source Control
→ Git 관리

Extensions
→ 확장 프로그램
```

---

## 23. Explorer

Explorer는 현재 프로젝트의 파일과 폴더를 보여주는 영역이다.

예를 들어 웹 프로젝트가 다음과 같이 있다면

```text
my-project
├─ index.html
├─ style.css
└─ app.js
```

Explorer에서도 비슷한 구조로 볼 수 있다.

파일을 클릭하면 오른쪽 Editor 영역에서 파일이 열린다.

---

## 24. Editor

실제로 코드를 작성하는 영역이다.

예를 들어 `index.html` 파일을 클릭하면

```html
<h1>Hello</h1>
```

같은 코드를 Editor에 작성한다.

여러 파일을 열면 상단에 탭이 생긴다.

```text
index.html | style.css | app.js
```

웹 개발에서는 여러 파일을 오가며 수정할 일이 많기 때문에 탭 기능을 자주 사용하게 된다.

---

## 25. Status Bar

VS Code 가장 아래쪽에 있는 상태 표시줄이다.

현재 상황에 따라 여러 정보가 표시된다.

예를 들어

```text
현재 Git branch

파일 줄/열 위치

파일 인코딩

언어 모드

오류 개수
```

등을 볼 수 있다.

앞으로 Git을 연결한 프로젝트에서는 이곳에서 현재 branch 이름도 자주 확인하게 된다.

---

## 26. 프로젝트는 파일 하나보다 폴더로 열기

VS Code를 사용할 때 중요한 습관이 하나 있다.

파일 하나만 따로 여는 것보다 **프로젝트 폴더 전체를 여는 것**이다.

예를 들어 다음 프로젝트가 있다고 해보자.

```text
my-web
├─ index.html
├─ style.css
└─ app.js
```

`index.html`만 VS Code로 여는 것보다

```text
my-web 폴더
```

자체를 VS Code에서 여는 것이 좋다.

그러면 Explorer에서 프로젝트 구조 전체를 볼 수 있고 터미널 역시 해당 프로젝트 위치에서 사용하기 편하다.

---

## 27. 연습용 폴더 만들기

이번 글에서 사용할 폴더를 하나 만든다.

예를 들어 문서나 원하는 개발 폴더 아래에

```text
vscode-test
```

라는 폴더를 만든다.

예:

```text
Documents
└─ vscode-test
```

아직 파일은 없어도 된다.

---

## 28. VS Code에서 폴더 열기

VS Code에서

```text
File
→ Open Folder
```

를 선택한다.

앞에서 만든

```text
vscode-test
```

폴더를 선택한다.

이제 Explorer에 해당 폴더가 표시된다.

---

## 29. Workspace Trust가 나타난다면?

처음 어떤 폴더를 열면 해당 폴더의 작성자를 신뢰하는지 묻는 메시지가 나타날 수 있다.

VS Code에는 [**Workspace Trust**](https://code.visualstudio.com/docs/editing/workspaces/workspace-trust)라는 보안 기능이 있다.

모르는 사람이 만든 프로젝트에는 실행될 수 있는 설정이나 코드가 포함되어 있을 수 있기 때문이다.

직접 방금 만든

```text
vscode-test
```

폴더라면 내가 만든 폴더이므로 신뢰할 수 있다.

하지만 인터넷에서 받은 정체를 모르는 프로젝트라면 무조건 신뢰하지 말고 내용을 확인하는 것이 좋다.

---

## 30. PATH가 정상인지 확인하기

앞에서 PATH 이야기를 했으니 실제로 확인해보자.

VS Code를 잠시 닫아도 된다.

새 Git Bash나 PowerShell을 실행한다.

다음 명령어를 입력한다.

```bash
code --version
```

정상적으로 설정되어 있다면 VS Code 버전 정보가 출력된다.

정확한 숫자는 설치 시기에 따라 다르다.

중요한 것은

```text
명령어를 찾을 수 없음
```

같은 오류 없이 버전이 출력되는 것이다.

---

## 31. `code .` 사용해보기

이 명령어는 앞으로 매우 유용하게 사용하게 된다.

Git Bash나 PowerShell에서 `vscode-test` 폴더로 이동한다.

예를 들어 Git Bash라면 자신의 환경에 맞게 다음처럼 이동할 수 있다.

```bash
cd ~/Documents/vscode-test
```

현재 위치를 확인한다.

Git Bash에서는

```bash
pwd
```

를 사용할 수 있다.

그다음 입력한다.

```bash
code .
```

여기서

```text
code
```

는 VS Code를 실행한다는 뜻이고

```text
.
```

은 **현재 폴더**를 뜻한다.

즉,

```bash
code .
```

은

> 현재 내가 있는 폴더를 VS Code로 열어라

라는 의미다.

[VS Code 공식 CLI 문서](https://code.visualstudio.com/docs/configure/command-line)에서도 프로젝트 폴더에서 `code .`을 실행해 현재 폴더를 여는 방식을 안내한다.

---

## 32. `code .`이 왜 편할까?

개발을 하다 보면 터미널에서 이미 프로젝트 폴더에 들어가 있는 경우가 많다.

예를 들어

```bash
cd cup-pick
```

으로 프로젝트에 들어갔다고 해보자.

그 상태에서

```bash
code .
```

만 입력하면 해당 프로젝트를 바로 VS Code로 열 수 있다.

즉,

```text
파일 탐색기 실행

↓

프로젝트 폴더 찾기

↓

마우스 오른쪽 버튼

↓

VS Code로 열기
```

과정을 거치지 않아도 된다.

---

## 33. `code`를 찾을 수 없다고 나오면?

예를 들어 다음과 비슷한 오류가 발생할 수 있다.

```text
'code' is not recognized...
```

또는

```text
code: command not found
```

가장 먼저 확인할 것은 다음이다.

```text
1. VS Code 설치가 완료됐는가?

2. 기존 터미널을 닫았는가?

3. 새 터미널을 열었는가?

4. Installer 방식으로 정상 설치했는가?
```

우선 터미널을 전부 종료하고 새로 실행한 뒤 다시

```bash
code --version
```

을 확인한다.

그래도 안 된다면 VS Code를 다시 설치하면서 PATH 관련 설정을 확인한다.

---

## 34. VS Code 통합 터미널

VS Code의 큰 장점 중 하나는 프로그램을 나가지 않고 바로 터미널을 사용할 수 있다는 것이다.

이를 **Integrated Terminal**, 즉 **통합 터미널**이라고 한다.

[VS Code 공식 문서](https://code.visualstudio.com/docs/terminal/basics)에서도 에디터 내부 터미널에서 Git 등의 명령어를 일반 터미널과 동일하게 사용할 수 있다고 설명한다.

---

## 35. 터미널 열기

상단 메뉴에서

```text
Terminal
→ New Terminal
```

을 선택한다.

또는

```text
View
→ Terminal
```

을 사용할 수 있다.

Windows에서는 단축키로

```text
Ctrl + `
```

를 사용할 수도 있다.

여기서 `는 숫자 1 왼쪽에 있는 백틱 키다.

---

## 36. VS Code 터미널은 새로운 종류의 터미널일까?

아니다.

VS Code는 컴퓨터에 설치된 Shell을 내부에서 실행해준다.

Windows에서는 환경에 따라 다음과 같은 것을 사용할 수 있다.

```text
PowerShell

Command Prompt

Git Bash

WSL
```

VS Code는 설치된 Shell을 터미널 프로필로 사용할 수 있다.

즉,

```text
VS Code Terminal
```

이라는 완전히 새로운 명령어 체계가 있는 것이 아니다.

---

## 37. Shell이란?

Shell은 사용자가 입력한 명령어를 해석해서 운영체제에 전달하는 프로그램이다.

예를 들어

```bash
git status
```

라고 입력하면 Shell이 명령어를 해석하고 Git 프로그램을 실행한다.

처음에는 다음처럼 이해하면 충분하다.

```text
Terminal
→ 명령어를 입력하는 화면

Shell
→ 그 명령어를 해석하는 프로그램
```

---

## 38. Git Bash를 VS Code에서도 사용할 수 있다

앞선 Git 글에서 Git Bash를 설치했다.

VS Code에서도 Git Bash를 터미널로 선택할 수 있다.

터미널 오른쪽의 프로필 선택 메뉴를 열면 환경에 따라

```text
PowerShell

Command Prompt

Git Bash
```

등이 나타날 수 있다.

`Git Bash`를 선택하면 VS Code 내부에서도 익숙한 Git Bash 명령어를 사용할 수 있다.

---

## 39. 기본 터미널을 꼭 Git Bash로 바꿔야 할까?

반드시 그럴 필요는 없다.

PowerShell에서도 Git이 PATH에 정상 등록되어 있다면

```bash
git status
```

같은 명령어를 사용할 수 있다.

따라서

```text
PowerShell이 잘못된 것

Git Bash가 무조건 정답
```

인 것은 아니다.

처음 공부할 때는 자신이 수업이나 학습 자료에서 주로 사용하는 Shell 하나를 정해서 익숙해지는 것이 좋다.

---

## 40. 터미널의 현재 위치 확인하기

VS Code에서 `vscode-test` 폴더 전체를 열고 터미널을 실행한다.

Git Bash를 사용한다면

```bash
pwd
```

를 입력한다.

현재 경로의 마지막이

```text
vscode-test
```

인지 확인한다.

VS Code의 통합 터미널은 일반적으로 현재 열려 있는 workspace 폴더를 기준으로 시작한다.

이것이 폴더 단위로 프로젝트를 여는 것이 편한 이유 중 하나다.

---

## 41. Git도 정상적으로 되는지 확인하기

앞에서 Git을 설치했기 때문에 VS Code 터미널에서도 확인해보자.

```bash
git --version
```

Git 버전이 나오면 된다.

앞으로는 별도의 Git Bash 창을 열지 않고 VS Code 안에서

```bash
git status
git add
git commit
git push
```

같은 명령어를 사용할 수도 있다.

---

## 42. VS Code와 Git의 관계

VS Code 안에서 Git 명령어가 실행된다고 해서 VS Code가 Git 자체인 것은 아니다.

관계는 다음과 같다.

```text
VS Code

└─ 통합 터미널
      ↓
     Git
```

그리고 VS Code 자체에도 Source Control 화면이 있어 Git의 변경 내용을 시각적으로 확인할 수 있다.

즉 앞으로는 Git을 여러 방식으로 사용할 수 있다.

```text
Git Bash
→ CLI

SourceTree
→ Git GUI

VS Code Source Control
→ 에디터 안에서 Git 관리
```

모두 같은 Git Repository를 대상으로 작업할 수 있다.

---

## 43. VS Code 기본 설정 열기

VS Code 왼쪽 아래의 톱니바퀴 버튼을 누른다.

```text
Manage
→ Settings
```

또는 단축키

```text
Ctrl + ,
```

를 사용할 수 있다.

설정 화면에서는 검색창을 이용해 원하는 설정을 찾을 수 있다.

---

## 44. 설정을 처음부터 너무 많이 바꾸지 않기

VS Code는 설정할 수 있는 항목이 매우 많다.

처음 시작하면 인터넷에서

```text
개발자가 반드시 해야 할 VS Code 설정 50가지
```

같은 글을 보고 한꺼번에 적용하고 싶을 수 있다.

하지만 처음에는 추천하지 않는다.

무엇을 바꿨는지 모르는 상태에서 설정을 많이 변경하면 나중에 문제가 생겼을 때 원인을 찾기 어렵다.

우선 기본 설정을 사용하고 실제로 불편함을 느끼는 항목만 하나씩 바꾸는 것이 좋다.

---

## 45. Auto Save

기본적으로 파일을 수정한 뒤 저장하려면

```text
Ctrl + S
```

를 누른다.

VS Code에는 자동 저장 기능도 있다.

설정에서

```text
Auto Save
```

를 검색하면 찾을 수 있다.

대표적으로

```text
off

afterDelay

onFocusChange

onWindowChange
```

같은 방식이 있다.

처음에는 직접 저장하는 습관을 익히기 위해 기본 상태를 사용해도 충분하다.

나중에 자동 저장이 편하다고 느껴지면 켜면 된다.

---

## 46. Font Size

코드 글자가 너무 작거나 크다면

```text
Font Size
```

를 검색해서 조절할 수 있다.

코드 가독성이 중요하기 때문에 자신의 모니터와 시력에 맞게 설정하면 된다.

정답이 있는 값은 아니다.

---

## 47. Word Wrap

코드 한 줄이 너무 길어 화면 오른쪽으로 계속 이어지는 경우가 있다.

이때

```text
Word Wrap
```

기능을 사용할 수 있다.

Word Wrap을 켜면 긴 줄이 화면 너비에 맞게 여러 줄처럼 표시된다.

실제 파일에 줄바꿈 문자가 추가되는 것과 화면상 줄을 접어 보여주는 것은 다른 개념이다.

---

## 48. Tab Size

코드 들여쓰기에 사용되는 크기도 설정할 수 있다.

웹 프로젝트에서는 흔히 2칸이나 4칸을 사용하는데, 프로젝트마다 규칙이 다를 수 있다.

처음부터 자신의 취향으로 모든 프로젝트 설정을 강제하기보다 프로젝트의 기존 코드 스타일을 따르는 습관이 좋다.

---

## 49. Settings UI와 settings.json

VS Code 설정은 화면에서 바꿀 수도 있고 JSON 파일로 직접 수정할 수도 있다.

초보자라면 우선 Settings 화면을 사용하는 것을 추천한다.

나중에 설정에 익숙해지면

```json
{
    "editor.fontSize": 16
}
```

같은 `settings.json` 설정도 사용하게 된다.

지금은

```text
설정 화면에서 검색
→ 원하는 옵션 변경
```

정도만 익혀도 충분하다.

---

## 50. Command Palette란?

VS Code를 사용하면서 매우 자주 만나게 되는 기능이 **Command Palette**다.

Windows에서는

```text
Ctrl + Shift + P
```

를 누르면 열린다.

Command Palette에서는 VS Code의 여러 명령을 검색해서 실행할 수 있다.

예를 들어

```text
Format Document

Configure Display Language

Git: Clone

Terminal: Select Default Profile
```

등을 검색할 수 있다.

메뉴 위치를 모를 때도 Command Palette에서 기능 이름을 검색하면 찾기 쉽다.

---

## 51. 확장 프로그램이란?

VS Code의 핵심 특징 중 하나가 **Extensions**, 즉 확장 프로그램이다.

확장 프로그램을 설치하면 VS Code에 새로운 기능을 추가할 수 있다.

예를 들어

```text
코드 포맷팅

새로운 프로그래밍 언어 지원

디버깅

테마

서버 실행

Git 관련 기능
```

등을 추가할 수 있다.

[VS Code 공식 문서](https://code.visualstudio.com/docs/configure/extensions/extension-marketplace)도 Extensions를 통해 언어, 디버거, 개발 도구 등을 추가할 수 있다고 설명한다.

---

## 52. Extensions 화면 열기

왼쪽 Activity Bar에서 블록처럼 생긴 Extensions 아이콘을 선택한다.

또는 단축키

```text
Ctrl + Shift + X
```

를 사용한다.

검색창이 나타난다.

원하는 확장 프로그램 이름을 입력하면 된다.

---

## 53. 아무 확장 프로그램이나 설치하면 안 되는 이유

VS Code Marketplace에는 매우 많은 확장 프로그램이 있다.

하지만 기능이 많다고 무조건 좋은 것은 아니다.

확장 프로그램도 프로그램 코드이기 때문에 필요하지 않은 확장을 지나치게 설치하면

```text
VS Code가 무거워질 수 있고

확장끼리 충돌할 수 있고

설정이 복잡해질 수 있고

보안 위험도 고려해야 한다
```

VS Code는 서드파티 확장 설치 시 [게시자를 신뢰하는지 확인하는 절차](https://code.visualstudio.com/docs/configure/extensions/extension-runtime-security)도 제공하고 있다.

따라서 설치할 때는

```text
확장 프로그램 이름

Publisher

무슨 기능인지

정말 필요한지
```

를 확인하는 습관을 들이는 것이 좋다.

---

## 54. 처음부터 확장 프로그램을 많이 설치하지 않기

현재 단계에서는 최소한으로 시작한다.

추천 구성은 다음 정도다.

```text
선택 1
Korean Language Pack

선택 2
Live Server

선택 3
Prettier - Code formatter
```

모두 반드시 설치해야 하는 것은 아니다.

각각 역할을 이해한 뒤 필요한 것만 설치한다.

---

## 55. Korean Language Pack

VS Code 메뉴를 한국어로 보고 싶다면 Microsoft에서 제공하는 한국어 언어 팩을 사용할 수 있다.

Extensions에서

```text
Korean Language Pack
```

을 검색한다.

정확한 확장은

```text
Korean Language Pack for Visual Studio Code
```

다.

[VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-ko)에 Microsoft의 한국어 UI 언어 팩이 제공되어 있다.

설치 후 표시 언어를 변경하면 메뉴를 한국어로 사용할 수 있다.

---

## 56. 영어 UI와 한국어 UI 중 무엇이 좋을까?

정답은 없다.

처음에는 한국어 UI가 이해하기 편할 수 있다.

하지만 개발 관련 검색 결과나 공식 문서는 영어 메뉴 이름을 사용하는 경우가 많다.

예를 들어

```text
파일 탐색기
```

보다

```text
Explorer
```

라는 이름으로 설명된 자료가 많을 수 있다.

그래서 개인적으로는 기능 이름을 영어로도 함께 알아두는 것이 좋다.

예:

```text
탐색기
Explorer

확장
Extensions

소스 제어
Source Control

터미널
Terminal
```

---

## 57. Live Server

HTML과 CSS를 처음 공부할 때 편리하게 사용할 수 있는 확장 프로그램이다.

Extensions에서

```text
Live Server
```

를 검색한다.

`Ritwick Dey`가 배포한 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)는 로컬 개발 서버와 자동 새로고침 기능을 제공한다.

설치 후 HTML 파일을 열고

```text
Open with Live Server
```

또는 하단의

```text
Go Live
```

를 사용해 브라우저에서 페이지를 확인할 수 있다.

---

## 58. Live Server를 왜 사용할까?

HTML 파일은 브라우저에서 직접 열 수도 있다.

예를 들어

```text
index.html
```

을 더블 클릭하면 Chrome 등의 브라우저에서 열 수 있다.

하지만 코드를 수정할 때마다 브라우저를 새로고침해야 한다.

Live Server를 사용하면 로컬 서버를 실행해서 개발 중인 페이지를 브라우저에서 보기 편해진다.

대략적인 구조는 다음과 같다.

```text
VS Code에서 HTML 수정
↓
파일 저장
↓
Live Server가 변경 감지
↓
브라우저 화면 갱신
```

초기 HTML/CSS 학습에서 편리하다.

---

## 59. Prettier - Code formatter

코드 형식을 정리해주는 대표적인 확장 프로그램이다.

Extensions에서

```text
Prettier - Code formatter
```

를 검색한다.

[공식 확장](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) ID는

```text
esbenp.prettier-vscode
```

이며 JavaScript, TypeScript, HTML, CSS, JSON, Markdown 등 여러 형식을 지원한다.

---

## 60. Formatter란?

Formatter는 코드를 일정한 형식으로 정리해주는 도구다.

예를 들어 다음처럼 작성했다고 해보자.

```javascript
const name="Purum";console.log(name);
```

Formatter를 사용하면 설정에 따라 다음처럼 보기 좋은 형태로 정리할 수 있다.

```javascript
const name = "Purum";
console.log(name);
```

코드 기능 자체를 만드는 도구가 아니라 **코드 모양을 일정하게 정리하는 도구**다.

---

## 61. Prettier는 지금 꼭 필요한가?

필수는 아니다.

처음 HTML을 작성하는 단계라면 VS Code 기본 기능만으로도 충분하다.

다만 앞으로

```text
HTML
CSS
JavaScript
React
Next.js
```

를 공부한다면 자주 만나게 되는 도구이므로 이름과 역할 정도는 알아두면 좋다.

팀 프로젝트에서는 프로젝트 내부의 Prettier 설정을 따르는 경우도 많다.

따라서 처음부터 자신의 설정을 과하게 변경하지 않는 것이 좋다.

---

## 62. 확장 프로그램을 설치했다고 무조건 동작하는 것은 아니다

일부 확장 프로그램은 설치만 하면 바로 동작하지만 일부는 추가 설정이 필요하다.

예를 들어 Prettier를 항상 기본 Formatter로 사용하려면 별도 설정이 필요할 수 있다.

따라서

```text
Extension 설치
=
모든 설정 완료
```

라고 생각하면 안 된다.

확장 프로그램마다 사용법을 확인해야 한다.

---

## 63. 첫 프로젝트 만들기

이제 실제 파일을 작성해보자.

앞에서 만든

```text
vscode-test
```

폴더가 VS Code에서 열려 있는지 확인한다.

Explorer에는 아직 아무 파일이 없을 수 있다.

---

## 64. 첫 HTML 파일 만들기

Explorer에서 새 파일 버튼을 누른다.

파일 이름을 다음과 같이 입력한다.

```text
index.html
```

여기서 중요한 것이 확장자다.

```text
index
```

만 입력하는 것이 아니라

```text
index.html
```

이라고 입력한다.

`.html`을 통해 VS Code와 운영체제가 이 파일을 HTML 문서로 인식할 수 있다.

---

## 65. index는 특별한 이름일까?

웹 프로젝트에서는 첫 페이지 파일 이름으로 `index.html`을 자주 사용한다.

웹 서버가 특정 경로의 기본 문서를 찾을 때 `index.html`을 사용하는 구성이 흔하기 때문이다.

하지만 HTML 파일 이름이 반드시 index여야 하는 것은 아니다.

예를 들어

```text
about.html

login.html

profile.html
```

처럼 다른 이름도 사용할 수 있다.

이번에는 관례적으로 많이 사용하는 `index.html`을 사용한다.

---

## 66. HTML 코드 작성하기

`index.html`에 다음 코드를 입력한다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VS Code Test</title>
</head>
<body>
    <h1>VS Code 설치 완료!</h1>
    <p>첫 HTML 파일을 실행했습니다.</p>
</body>
</html>
```

처음에는 각 태그의 의미를 모두 몰라도 괜찮다.

이번 글의 목적은 HTML 공부가 아니라 VS Code 개발환경이 정상적으로 동작하는지 확인하는 것이다.

---

## 67. 파일 저장하기

Windows에서는

```text
Ctrl + S
```

를 눌러 저장한다.

파일 이름 옆에 표시되던 수정 상태 표시가 사라지는지 확인한다.

개발하다 보면 저장하지 않고

> 왜 브라우저에 수정 내용이 안 나오지?

라고 생각하는 경우가 많다.

따라서 초반에는 저장 여부를 항상 확인하는 습관을 들이는 것이 좋다.

---

## 68. HTML은 VS Code가 실행하는 걸까?

여기서 개념 하나를 정확히 구분하자.

VS Code는 기본적으로 **HTML 코드를 작성하는 프로그램**이다.

HTML을 화면으로 표현하는 것은 브라우저가 담당한다.

```text
HTML 작성

↓

VS Code

↓

HTML 파일 저장

↓

Chrome / Edge 등의 Browser

↓

웹 페이지 표시
```

즉,

```text
VS Code
→ 코드 작성

Browser
→ HTML 해석 및 화면 표시
```

라고 생각하면 된다.

---

## 69. 첫 번째 방법 — HTML 파일 직접 열기

가장 단순한 방법부터 확인해보자.

Windows 파일 탐색기에서

```text
vscode-test
```

폴더로 들어간다.

그 안의

```text
index.html
```

을 더블 클릭한다.

기본 웹 브라우저가 열리고 다음 문구가 보이는지 확인한다.

```text
VS Code 설치 완료!

첫 HTML 파일을 실행했습니다.
```

보인다면 HTML 파일 자체는 정상적으로 작성된 것이다.

---

## 70. 주소를 확인해보자

직접 HTML 파일을 열었다면 브라우저 주소가 다음과 비슷하게 보일 수 있다.

```text
file:///C:/...
```

이것은 웹 서버를 통해 접속한 것이 아니라 컴퓨터에 있는 파일을 브라우저가 직접 연 것이다.

HTML 공부 초기에는 이 방식도 가능하다.

하지만 앞으로 웹 개발을 하면서는 로컬 서버를 사용하는 경우가 많아진다.

그래서 Live Server도 사용해본다.

---

## 71. Live Server로 실행하기

Live Server를 설치했다면 VS Code로 돌아온다.

`index.html` 파일을 열어둔다.

환경에 따라 다음 방식 중 하나를 사용할 수 있다.

```text
index.html에서 마우스 오른쪽 버튼

→ Open with Live Server
```

또는 VS Code 아래쪽 상태 표시줄에서

```text
Go Live
```

를 선택한다.

브라우저가 자동으로 열린다.

---

## 72. localhost가 나타날 수 있다

Live Server를 사용하면 브라우저 주소가 다음과 비슷하게 나타날 수 있다.

```text
http://127.0.0.1:5500/
```

또는 설정에 따라 localhost 계열 주소를 사용할 수 있다.

Live Server는 로컬 개발 서버를 실행한다.

여기서

```text
127.0.0.1
```

은 현재 내 컴퓨터를 가리키는 주소다.

`localhost`와 비슷한 개념으로 이해하면 된다.

---

## 73. 5500은 무엇일까?

주소에서

```text
:5500
```

처럼 콜론 뒤에 숫자가 붙어 있을 수 있다.

이 숫자를 **Port**, 즉 포트 번호라고 한다.

처음에는 이렇게 생각하면 된다.

```text
내 컴퓨터
127.0.0.1

↓

그 안에서 실행 중인 특정 프로그램으로 들어가는 문 번호
5500
```

포트에 대해서는 서버와 백엔드를 공부하면서 더 자세히 다루게 된다.

Live Server의 포트는 환경이나 설정에 따라 다른 번호가 사용될 수도 있다.

따라서 반드시 5500이어야 하는 것은 아니다.

---

## 74. HTML 내용을 수정해보기

VS Code에서 다음 부분을 찾는다.

```html
<h1>VS Code 설치 완료!</h1>
```

다음처럼 바꿔본다.

```html
<h1>Hello VS Code!</h1>
```

저장한다.

```text
Ctrl + S
```

Live Server가 정상적으로 동작한다면 브라우저 화면도 갱신된다.

이제

```text
Hello VS Code!
```

가 보이면 된다.

---

## 75. 첫 실행의 전체 구조

방금 한 작업을 정리하면 다음과 같다.

```text
vscode-test 폴더 생성

↓

VS Code에서 폴더 열기

↓

index.html 생성

↓

HTML 코드 작성

↓

Ctrl + S

↓

Live Server 실행

↓

브라우저에서 확인

↓

코드 수정

↓

저장

↓

브라우저에서 변경 확인
```

앞으로 HTML과 CSS를 공부할 때 이 흐름을 반복하게 된다.

---

## 76. Explorer에서 새 폴더도 만들어보기

프로젝트가 커지면 파일만 있는 것이 아니라 여러 폴더가 생긴다.

예를 들어 다음 구조를 만들 수 있다.

```text
vscode-test
├─ index.html
├─ css
└─ js
```

Explorer에서 새 폴더 버튼을 누르고

```text
css
```

폴더를 만든다.

다시

```text
js
```

폴더를 만든다.

이제 VS Code에서 프로젝트 구조를 관리하는 방식도 조금 이해할 수 있다.

---

## 77. 파일 이름과 확장자

개발할 때 파일 이름 뒤에는 확장자가 붙는다.

예를 들어

```text
index.html
```

의

```text
.html
```

이 확장자다.

대표적으로 앞으로 만나게 될 파일은 다음과 같다.

| 확장자 | 용도 |
|------|------|
| `.html` | HTML 문서 |
| `.css` | 스타일 |
| `.js` | JavaScript |
| `.json` | JSON 데이터/설정 |
| `.md` | Markdown 문서 |
| `.java` | Java 코드 |
| `.py` | Python 코드 |

VS Code는 확장자를 보고 어떤 언어인지 판단해서 문법 색상이나 기능을 제공한다.

---

## 78. VS Code 오른쪽 아래의 언어 모드

파일을 열면 오른쪽 아래에

```text
HTML
```

같은 표시가 보일 수 있다.

VS Code가 현재 파일을 HTML로 인식하고 있다는 뜻이다.

`style.css`를 열면

```text
CSS
```

`app.js`를 열면

```text
JavaScript
```

로 표시된다.

파일 확장자를 정확하게 작성하는 것이 중요한 이유 중 하나다.

---

## 79. 파일이 `index.html.txt`가 되지 않도록 주의

Windows에서 파일 확장자를 숨기는 설정을 사용하면 초보자가 이런 실수를 할 수 있다.

```text
index.html.txt
```

눈에는 `index.html`처럼 보이는 경우도 있다.

VS Code 안에서 파일을 만들면 이런 실수를 줄이기 쉽다.

가능하면 Explorer에서

```text
index.html
```

처럼 정확한 이름으로 직접 생성한다.

---

## 80. VS Code에서 Git 상태 확인하기

앞선 글에서 Git을 설치했다.

이번에는 연습 폴더를 Git Repository로 만들어 VS Code에서 어떻게 보이는지도 간단히 확인해보자.

터미널에서 다음 명령어를 실행한다.

```bash
git init
```

그리고

```bash
git status
```

를 실행한다.

`index.html` 등이 Git이 아직 추적하지 않는 파일로 나타날 수 있다.

---

## 81. Source Control 열기

VS Code 왼쪽 Activity Bar에서 Source Control 아이콘을 선택한다.

현재 변경된 파일이 표시될 수 있다.

예를 들어

```text
index.html
```

이 보인다.

Git Bash에서

```bash
git status
```

로 확인했던 내용을 VS Code 화면에서도 확인할 수 있는 것이다.

VS Code에는 Git 변경 검토, Stage, Commit 등의 [기본 Source Control 기능](https://code.visualstudio.com/docs/sourcecontrol/overview)이 포함되어 있다.

---

## 82. SourceTree와 VS Code Git은 무엇이 다를까?

앞선 글에서는 SourceTree를 설치했다.

이제 Git을 세 가지 방식으로 볼 수 있다.

```text
Git Bash

git status
git add
git commit
git push
```

```text
SourceTree

GUI로 Git 관리
```

```text
VS Code

코드를 작성하면서
Source Control에서 Git 상태 확인
```

셋 중 하나만 사용해야 하는 것은 아니다.

상황에 따라 같이 사용할 수 있다.

---

## 83. 같은 Repository를 여러 프로그램에서 열어도 될까?

가능하다.

예를 들어

```text
cup-pick
```

프로젝트를

```text
VS Code에서 코드 작성

SourceTree에서 Git 확인

Git Bash에서 명령어 실행
```

처럼 사용할 수 있다.

세 프로그램이 각각 다른 Git Repository를 만드는 것이 아니다.

모두 같은 프로젝트 폴더 안의 Git 정보를 보고 있는 것이다.

---

## 84. VS Code는 코드를 저장하는 곳이 아니다

이것도 초보자일 때 헷갈릴 수 있다.

VS Code에 파일을 작성했다고 해서 파일이 VS Code 내부에 저장되는 것은 아니다.

실제 파일은 컴퓨터의 폴더에 저장된다.

예를 들어

```text
C:\Users\...\Documents\vscode-test
```

안에

```text
index.html
```

이 존재한다.

VS Code는 그 파일을 열고 편집하는 프로그램이다.

즉,

```text
내 컴퓨터
└─ vscode-test
   └─ index.html
        ↑
        │
      VS Code
      편집
```

관계다.

---

## 85. VS Code를 삭제하면 코드도 사라질까?

일반적으로 VS Code 프로그램을 삭제한다고 프로젝트 파일까지 자동으로 삭제되는 것은 아니다.

프로젝트 파일은 별도 폴더에 저장되어 있기 때문이다.

예를 들어

```text
VS Code 프로그램
```

과

```text
Documents\vscode-test
```

는 다른 대상이다.

다만 파일이나 프로그램을 삭제할 때는 항상 실제 삭제 경로를 확인하는 습관이 중요하다.

---

## 86. 프로젝트를 어디에 저장하는 것이 좋을까?

처음에는 프로젝트 폴더를 한 곳에 모아두면 관리하기 쉽다.

예를 들어

```text
C:\Users\사용자이름\projects
```

같은 폴더를 하나 만들고

```text
projects
├─ html-study
├─ javascript-study
├─ git-test
└─ my-blog
```

처럼 정리할 수 있다.

반드시 이 이름을 써야 하는 것은 아니다.

중요한 것은

> 내가 프로젝트를 어디에 저장했는지 항상 알 수 있도록 일정한 기준을 정하는 것

이다.

---

## 87. 바탕화면에 프로젝트를 계속 만드는 것은?

처음에는 편해서 바탕화면에 프로젝트를 만들기 쉽다.

하지만 프로젝트가 많아지면

```text
test
test2
html
html-final
project
project2
```

처럼 정리가 어려워질 수 있다.

따라서 개발 공부를 계속할 예정이라면 별도의 개발 폴더를 만들어두는 것도 좋다.

예:

```text
C:\dev
```

또는

```text
C:\Users\사용자이름\projects
```

---

## 88. 파일 경로에 대해 알아둘 점

개발 도구에 따라 경로에

```text
한글

공백

특수문자
```

가 포함된 경우 일부 오래된 도구나 스크립트에서 문제가 발생하는 경우가 있다.

현대적인 도구들은 대부분 이를 잘 처리하지만 처음 개발환경을 만들 때는 단순한 경로를 사용하는 것도 관리에 도움이 된다.

예:

```text
C:\dev\my-project
```

다만

> 무조건 한글 경로를 사용하면 오류가 난다

고 단정할 필요는 없다.

프로젝트와 도구에 따라 다르다.

---

## 89. VS Code에서 파일 검색하기

프로젝트가 커지면 Explorer만으로 파일을 찾기 어려워진다.

왼쪽의 Search 기능을 사용하면 프로젝트 전체에서 특정 단어나 코드를 검색할 수 있다.

예를 들어 프로젝트 전체에서

```text
login
```

이라는 단어가 어디에 있는지 찾을 수 있다.

앞으로 규모가 커질수록 자주 사용하는 기능이다.

---

## 90. 빠른 파일 열기

파일이 많아지면 Explorer에서 폴더를 계속 펼치는 것보다 파일 이름으로 검색해서 여는 것이 빠르다.

Windows에서는

```text
Ctrl + P
```

를 누르고 파일 이름을 입력하면 빠르게 파일을 찾을 수 있다.

예를 들어

```text
index
```

를 입력해 `index.html`을 찾을 수 있다.

---

## 91. 여러 파일에서 같은 이름을 바꾸기 전에 주의

VS Code에는 검색과 치환 기능도 있다.

하지만 프로젝트 전체 바꾸기를 잘못 사용하면 많은 파일이 한 번에 수정될 수 있다.

처음에는

```text
어떤 범위가 변경되는가?
```

를 확인하고 사용하는 것이 좋다.

Git을 함께 사용하는 이유 중 하나도 이런 대규모 변경을 기록하고 확인하기 위해서다.

---

## 92. 저장되지 않은 파일 확인하기

파일을 수정한 뒤 저장하지 않으면 탭에서 저장되지 않은 상태를 나타내는 표시가 나타날 수 있다.

코드를 실행하기 전에

```text
Ctrl + S
```

로 저장하는 습관을 들인다.

특히 처음 개발을 공부할 때

> 코드를 고쳤는데 왜 결과가 안 바뀌지?

라는 문제의 원인이 단순히 저장하지 않은 것인 경우도 많다.

---

## 93. VS Code를 관리자 권한으로 항상 실행해야 할까?

일반적인 개발 작업에서는 매번 관리자 권한으로 실행할 필요가 없다.

필요한 경우에만 관리자 권한이 필요한 작업을 별도로 수행하는 것이 좋다.

VS Code User Setup은 일반 사용자 계정에서 사용하는 흐름을 기본으로 한다.

무조건 모든 개발 프로그램을 관리자 권한으로 실행하는 습관은 만들지 않는 것이 좋다.

---

## 94. 설정을 바꾸다 이상해졌다면?

VS Code에서는 설정 검색을 통해 자신이 변경한 값을 다시 되돌릴 수 있다.

어떤 설정을 바꿨는지 기억하지 못하면 문제가 생기기 쉽기 때문에 처음에는 최소한의 설정만 변경하는 것을 다시 권장한다.

앞으로 경험이 쌓이면

```text
User Settings

Workspace Settings

Profiles

Settings Sync
```

같은 기능도 사용하게 된다.

지금은 아직 다룰 필요가 없다.

---

## 95. User Settings와 Workspace Settings

개념만 간단히 알아두자.

**User Settings**

```text
내 VS Code 전체에 적용되는 설정
```

**Workspace Settings**

```text
특정 프로젝트에만 적용되는 설정
```

이다.

예를 들어 모든 프로젝트의 글씨 크기는 User Settings에 둘 수 있다.

반면 특정 팀 프로젝트에서만 사용하는 formatter 설정은 Workspace 설정으로 관리할 수 있다.

처음에는 설정 범위를 모르고 변경하지 않도록 이것만 기억해두면 된다.

---

## 96. Extension을 프로젝트마다 다르게 쓰는 방법도 있다

VS Code에는 Profile 기능 등을 이용해 작업 종류에 따라 설정과 Extensions 구성을 나누는 방법도 있다.

예를 들어 나중에는

```text
Frontend Profile

Java Profile

Python Profile
```

처럼 나눌 수도 있다.

하지만 아직은 프로젝트가 많지 않으므로 기본 환경 하나로 시작해도 충분하다.

---

## 97. VS Code 업데이트

VS Code는 지속적으로 업데이트된다.

따라서 몇 달 전 블로그나 영상과 현재 화면이 조금 다를 수 있다.

Windows Installer 버전은 일반적으로 업데이트 기능을 제공한다.

설치 화면이나 메뉴 위치가 이 글과 조금 다르더라도

```text
무슨 기능을 찾고 있는지
```

를 기준으로 확인하는 것이 좋다.

---

## 98. 오늘 배운 핵심 명령어

이번 글에서 처음 사용한 VS Code 관련 명령어는 많지 않다.

VS Code 버전 확인:

```bash
code --version
```

현재 폴더를 VS Code로 열기:

```bash
code .
```

Git 설치 확인:

```bash
git --version
```

현재 Git Repository 상태 확인:

```bash
git status
```

연습용 Repository 생성:

```bash
git init
```

앞으로 Node.js를 설치하면 VS Code 터미널에서 더 많은 명령어를 실행하게 된다.

---

## 99. VS Code 초기 설정 체크리스트

지금까지 한 작업을 하나씩 확인해보자.

```text
□ VS Code 공식 사이트에서 설치 파일을 받았다

□ Windows User Setup으로 설치했다

□ 설치가 정상적으로 완료됐다

□ 새 터미널을 실행했다

□ code --version이 정상적으로 출력된다

□ 연습용 프로젝트 폴더를 만들었다

□ VS Code에서 폴더 전체를 열었다

□ Explorer 위치를 확인했다

□ Editor 위치를 확인했다

□ Terminal을 열었다

□ VS Code Terminal에서 git --version을 확인했다

□ Extensions 화면을 열어봤다

□ 필요한 확장 프로그램만 설치했다

□ index.html 파일을 생성했다

□ HTML 코드를 작성했다

□ Ctrl + S로 저장했다

□ 브라우저에서 HTML을 확인했다

□ Live Server로 HTML을 실행해봤다

□ 코드를 수정하고 브라우저에서 변경을 확인했다
```

모두 완료했다면 VS Code의 기본 개발환경은 만들어진 것이다.

---

## 100. 자주 생기는 문제 정리

### `code` 명령어가 안 된다

먼저 기존 터미널을 완전히 종료하고 다시 연다.

그다음

```bash
code --version
```

을 확인한다.

그래도 되지 않으면 설치 및 PATH 설정을 다시 확인한다.

### Git 명령어가 VS Code Terminal에서 안 된다

앞선 Git 설치가 정상적으로 되었는지 외부 Git Bash에서 확인한다.

```bash
git --version
```

외부에서도 안 된다면 Git 설치 또는 PATH 문제일 가능성이 있다.

### Git Bash가 VS Code Terminal 목록에 없다

Git이 제대로 설치되어 있는지 확인한다.

그다음 VS Code를 재시작해본다.

환경에 따라 Terminal Profile에서 Git Bash를 직접 선택해야 할 수 있다.

### Live Server 버튼이 없다

먼저 Extensions에서 Live Server가 설치되어 있는지 확인한다.

그리고 HTML 파일이 열려 있는지도 확인한다.

필요하다면 VS Code를 다시 시작한다.

### 브라우저 화면이 바뀌지 않는다

가장 먼저 파일을 저장했는지 확인한다.

```text
Ctrl + S
```

그다음 Live Server가 계속 실행 중인지 확인한다.

### HTML 코드에 색상이 안 들어간다

파일 이름이 정확히

```text
index.html
```

인지 확인한다.

오른쪽 아래 언어 모드가

```text
HTML
```

인지도 확인한다.

### 파일을 수정했는데 VS Code에서 못 찾겠다

현재 VS Code에서 어떤 폴더를 열었는지 Explorer 가장 위의 프로젝트 이름을 확인한다.

비슷한 이름의 프로젝트를 여러 개 만들었다면 다른 폴더를 열고 있을 수 있다.

---

## 101. 초보자가 VS Code를 사용할 때 기억할 것

처음에는 단축키를 모두 외울 필요가 없다.

우선 다음 정도만 익혀도 충분하다.

```text
Ctrl + S
→ 저장

Ctrl + Shift + P
→ Command Palette

Ctrl + Shift + X
→ Extensions

Ctrl + `
→ Terminal

Ctrl + P
→ 파일 빠르게 찾기

Ctrl + ,
→ Settings
```

반복해서 사용하다 보면 자연스럽게 외워진다.

---

## 102. VS Code에서 가장 중요한 습관

VS Code의 기능을 많이 아는 것보다 다음 습관이 더 중요하다.

```text
프로젝트 폴더 전체를 연다

↓

현재 어떤 프로젝트인지 확인한다

↓

파일 이름과 경로를 확인한다

↓

코드를 수정한다

↓

저장한다

↓

터미널의 현재 위치를 확인한다

↓

실행한다

↓

결과를 확인한다
```

특히 **현재 어떤 폴더에서 작업하고 있는지 확인하는 습관**은 이후 Git, Node.js, npm, React, Next.js를 사용할 때도 계속 중요하다.

---

## 103. 지금까지의 Dev Setup 연결하기

현재까지 설치한 프로그램을 연결해보자.

먼저 Git이 있다.

```text
Git
→ 코드 변경 기록 관리
```

GitHub가 있다.

```text
GitHub
→ Git Repository를 인터넷에 저장
```

SourceTree가 있다.

```text
SourceTree
→ Git을 GUI로 관리
```

그리고 이번에 VS Code가 추가됐다.

```text
VS Code
→ 코드 작성
```

전체 흐름은 다음과 같다.

```text
VS Code
코드 작성

↓

Git
변경 기록

↓

SourceTree / VS Code Source Control
Git 상태 확인

↓

GitHub
Remote Repository에 저장
```

이제 실제 개발 작업에 가까운 환경이 만들어지기 시작했다.

---

## 104. 아직 JavaScript 파일을 Node.js로 실행하지 않는 이유

VS Code에서는 JavaScript 파일도 작성할 수 있다.

하지만 다음과 같이 터미널에서 실행하려면

```bash
node app.js
```

`node`라는 실행 환경이 필요하다.

현재는 아직 Node.js를 설치하지 않았다.

따라서 지금 바로

```bash
node -v
```

를 입력했을 때 Node.js가 설치되어 있지 않다면 명령어가 실행되지 않는 것이 정상이다.

다음 Dev Setup에서 바로 이 부분을 해결한다.

---

## 105. VS Code와 Node.js는 역할이 다르다

다음 글로 넘어가기 전에 이 부분을 꼭 구분해두자.

VS Code는 JavaScript 코드를 **작성**할 수 있다.

```text
VS Code
→ 코드 작성
```

Node.js는 JavaScript를 컴퓨터에서 **실행**할 수 있게 해준다.

```text
Node.js
→ JavaScript 실행
```

즉,

```text
VS Code에서 app.js 작성

↓

Node.js로 app.js 실행
```

이라는 관계다.

VS Code를 설치했다고 Node.js까지 자동으로 설치되는 것은 아니다.

---

## 정리

이번 글에서는 VS Code를 설치하고 실제 개발에 사용할 수 있도록 기본 환경을 구성했다.

전체 과정을 다시 보면 다음과 같다.

```text
VS Code 역할 이해

↓

Windows용 VS Code 설치

↓

PATH 확인

↓

code --version

↓

프로젝트 폴더 생성

↓

VS Code에서 폴더 열기

↓

Explorer / Editor 확인

↓

통합 Terminal 실행

↓

Git 명령어 확인

↓

기본 설정 확인

↓

Extensions 이해

↓

Live Server 등 필요한 확장 설치

↓

index.html 생성

↓

HTML 작성

↓

브라우저 실행

↓

Live Server 실행

↓

수정 결과 확인
```

이번 글에서 가장 중요한 개념은 세 가지다.

첫 번째,

```text
VS Code는 코드를 작성하고 관리하는 도구다.
```

두 번째,

```text
프로젝트는 가능하면 파일 하나가 아니라
폴더 전체를 VS Code로 연다.
```

세 번째,

```text
VS Code 안의 Terminal을 이용하면
코드를 작성하다가 바로 명령어를 실행할 수 있다.
```

현재 개발환경은 이제 다음과 같이 구성됐다.

```text
개발환경

├─ 코드 작성
│  └─ VS Code
│
├─ 버전 관리
│  ├─ Git
│  ├─ Git Bash
│  └─ SourceTree
│
└─ 원격 저장소
   └─ GitHub
```

하지만 JavaScript 프로젝트를 본격적으로 실행하려면 아직 하나가 더 필요하다.

바로 **Node.js**다.

다음 글에서는 Node.js와 npm이 무엇인지 알아보고,

```text
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

터미널에서 직접 실행
```

까지 진행한다.

```text
Dev Setup

00 개발환경 구축 전체 가이드
   ↓

01 Git & GitHub 개발환경 구축
   ↓

02 SourceTree 설치 및 GitHub 연결
   ↓

03 VS Code 설치와 초기 개발환경 설정  ← 현재
   ↓

04 Node.js와 npm 개발환경 구축
   ↓

05 JDK 21 개발환경 구축
   ↓

06 IntelliJ IDEA 개발환경 구축
   ↓

07 Tomcat 개발환경 구축
   ↓

08 새 PC에서 개발환경 다시 구축하기
```

이제 **코드를 작성할 장소까지 준비됐다.**

다음 단계부터는 VS Code에서 작성한 코드를 실제 실행 환경과 연결해본다.

---

## 더 학습하면 좋은 개념

- **Emmet** — VS Code에 기본으로 들어 있는 HTML·CSS 약어 확장 기능이다. `!` 한 글자로 66장의 HTML 기본 골격을 만들 수 있어서 HTML을 공부하기 시작하면 바로 쓰게 된다.
- **`file://`과 로컬 서버(`http://`)의 차이** — 70장에서 본 두 주소 방식이다. JavaScript 모듈이나 `fetch`를 쓰기 시작하면 `file://`에서는 막히는 기능이 생기기 때문에, Live Server 같은 로컬 서버가 필요한 이유를 이해할 수 있다.
- **EditorConfig와 Prettier 설정 파일** — 48장과 61장에서 말한 "프로젝트의 코드 스타일"을 파일로 정해 두는 방법이다. 팀원마다 에디터 설정이 달라도 같은 형식을 유지할 수 있다.
- **VS Code 디버거 (Run and Debug)** — 22장 Activity Bar에 있던 기능이다. `console.log`만으로 찾기 어려운 버그를 중단점으로 따라가 볼 수 있어서 Node.js를 설치한 다음에 익히면 좋다.
- **Profiles와 Settings Sync** — 94·96장에서 미뤄 둔 기능이다. 새 PC에서 설정과 확장을 그대로 옮길 수 있어서 08편 "새 PC에서 개발환경 다시 구축하기"와도 이어진다.

## 참고 자료

- [Visual Studio Code - Download](https://code.visualstudio.com/download)
- [VS Code Docs - Installing Visual Studio Code on Windows](https://code.visualstudio.com/docs/setup/windows)
- [VS Code Docs - Command Line Interface (CLI)](https://code.visualstudio.com/docs/configure/command-line)
- [VS Code Docs - Terminal Basics](https://code.visualstudio.com/docs/terminal/basics)
- [VS Code Docs - Terminal Profiles](https://code.visualstudio.com/docs/terminal/profiles)
- [VS Code Docs - Workspace Trust](https://code.visualstudio.com/docs/editing/workspaces/workspace-trust)
- [VS Code Docs - User and workspace settings](https://code.visualstudio.com/docs/configure/settings)
- [VS Code Docs - Profiles](https://code.visualstudio.com/docs/configure/profiles)
- [VS Code Docs - Extension Marketplace](https://code.visualstudio.com/docs/configure/extensions/extension-marketplace)
- [VS Code Docs - Extension runtime security](https://code.visualstudio.com/docs/configure/extensions/extension-runtime-security)
- [VS Code Docs - Source control in VS Code](https://code.visualstudio.com/docs/sourcecontrol/overview)
- [VS Code Marketplace - Korean Language Pack for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-ko)
- [VS Code Marketplace - Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [VS Code Marketplace - Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
