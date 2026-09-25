---
layout: post
title: "SourceTree 설치하고 GitHub 연결하기"
date: 2026-09-24 22:33:00 +0900
categories: dev-setup
learningOrder: 30
tags:
  - sourcetree
  - git
  - github
  - git-gui
---

앞선 글에서는 Git을 설치하고 GitHub Repository를 만든 뒤, Git Bash에서 직접 명령어를 사용해 파일을 GitHub에 올려봤다.

대략 이런 흐름이었다.

```text
파일 수정
↓
git add
↓
git commit
↓
git push
↓
GitHub
```

Git을 처음 사용할 때는 이 과정 자체보다 명령어가 더 어렵게 느껴질 수 있다.

```bash
git status
git add .
git commit -m "first commit"
git push
```

명령어 하나하나가 무슨 뜻인지 알아야 하고,

현재 어떤 branch에 있는지,

어떤 파일이 변경됐는지,

commit이 어디까지 올라갔는지

터미널의 글자를 보고 판단해야 한다.

Git을 제대로 배우려면 결국 이런 명령어의 의미를 알아야 한다.

하지만 Git에는 명령어만 있는 것은 아니다.

Git의 상태를 화면으로 보여주고 버튼으로 조작할 수 있게 해주는 **Git GUI 프로그램**도 있다.

그중 하나가 **SourceTree**다.

이번 글에서는 SourceTree가 왜 필요한지부터 시작해서 다음 과정까지 직접 진행한다.

```text
SourceTree가 무엇인지 이해
↓
Git GUI 개념 이해
↓
SourceTree 설치
↓
내 컴퓨터의 Git 연결 확인
↓
GitHub 계정 연결
↓
GitHub Repository 확인
↓
기존 Local Repository 열기
↓
변경 사항 확인
↓
SourceTree가 정상적으로 Git을 사용하는지 확인
```

이번 글의 목표는 단순히 SourceTree를 설치하는 것이 아니다.

> **Git Bash에서 했던 Git 작업이 SourceTree에서는 어떻게 보이는지 연결해서 이해하는 것**

이 목표다.

---

## 1. SourceTree란?

SourceTree는 Atlassian에서 제공하는 Git GUI 클라이언트다.

Git Repository를 화면으로 확인하고 관리할 수 있게 해주는 프로그램이다.

[Atlassian 역시](https://www.sourcetreeapp.com/) SourceTree를 Windows와 macOS에서 사용할 수 있는 Git GUI 클라이언트로 소개하고 있다.

Git Bash에서는 다음처럼 명령어를 직접 입력한다.

```bash
git status
```

```bash
git add .
```

```bash
git commit -m "update README"
```

```bash
git push
```

SourceTree에서는 같은 Git 작업을 화면을 보면서 할 수 있다.

대략적인 관계는 다음과 같다.

```text
Git 명령어
        ↕
SourceTree 화면

git status
↔ 변경된 파일 목록

git add
↔ Stage에 파일 추가

git commit
↔ Commit 버튼

git push
↔ Push 버튼

git pull
↔ Pull 버튼

git branch
↔ Branch 목록
```

즉 SourceTree가 새로운 버전 관리 방식을 제공하는 것은 아니다.

**실제 버전 관리는 Git이 담당하고 SourceTree는 Git을 화면에서 조작할 수 있도록 도와준다.**

---

## 2. GUI란?

SourceTree를 설명할 때 자주 등장하는 단어가 있다.

**GUI**

다.

GUI는

**Graphical User Interface**

의 약자다.

쉽게 말하면

> 글자로 명령어를 입력하는 대신 버튼, 메뉴, 창 같은 화면 요소를 보면서 프로그램을 조작하는 방식

이다.

예를 들어 Windows에서 파일을 삭제할 때를 생각해보자.

우리는 보통 파일을 선택한 뒤

```text
마우스 오른쪽 버튼
→ 삭제
```

를 사용한다.

화면을 보면서 조작한다.

이것이 GUI 방식이다.

반면 명령어를 사용해서 파일을 삭제할 수도 있다.

Git도 똑같다.

### CLI 방식

터미널에서 명령어를 입력한다.

```bash
git status
```

```bash
git add .
```

```bash
git commit -m "update"
```

```bash
git push
```

이런 방식을 보통 **CLI**라고 한다.

CLI는

**Command Line Interface**

의 약자다.

### GUI 방식

SourceTree에서는 버튼과 화면을 사용한다.

```text
변경된 파일 선택
↓
Stage
↓
Commit 메시지 입력
↓
Commit 버튼
↓
Push 버튼
```

결국 결과는 비슷하다.

```text
CLI

git add
git commit
git push

        ↕

GUI

Stage
Commit
Push
```

Git의 기능을 다른 방식으로 사용하는 것이다.

---

## 3. SourceTree를 사용하면 Git을 몰라도 될까?

여기서 중요한 점이 있다.

SourceTree를 설치했다고 해서 Git을 공부할 필요가 없어지는 것은 아니다.

SourceTree에서

```text
Commit
Push
Pull
Fetch
Branch
Merge
```

같은 버튼을 누르게 되는데,

각 버튼이 무엇을 하는지 모르면 결국 문제가 발생했을 때 해결하기 어렵다.

예를 들어 SourceTree에서

```text
Push
```

버튼을 눌렀다고 해보자.

이 동작은 결국 Git의

```bash
git push
```

와 연결된다.

따라서 가장 좋은 방법은

```text
Git 개념을 이해한다
+
SourceTree로 화면에서 확인한다
```

이다.

이번 시리즈에서도 이 방식으로 진행한다.

---

## 4. SourceTree는 왜 사용할까?

Git Bash만으로 Git을 충분히 사용할 수 있는데 굳이 SourceTree를 설치하는 이유는 무엇일까?

가장 큰 장점은 **Git의 현재 상태를 눈으로 확인하기 쉽다는 것**이다.

### 변경된 파일을 보기 쉽다

Git Bash에서는

```bash
git status
```

를 입력해서 변경된 파일을 확인한다.

SourceTree에서는 변경된 파일 목록이 화면에 표시된다.

예를 들어

```text
README.md
app.js
style.css
```

세 파일이 수정됐다면 어떤 파일이 변경됐는지 화면에서 바로 확인할 수 있다.

### 어떤 코드가 바뀌었는지 보기 쉽다

SourceTree에서는 파일을 선택하면 변경된 부분을 비교해서 볼 수 있다.

예를 들어 기존 코드가

```javascript
console.log("Hello");
```

였는데

```javascript
console.log("Hello Git");
```

로 바뀌었다면 변경된 부분을 화면에서 확인할 수 있다.

이를 보통 **diff**라고 한다.

쉽게 말하면

> 이전 코드와 현재 코드의 차이

다.

### Commit 기록을 보기 쉽다

Git에는 수많은 commit이 쌓인다.

예를 들어

```text
회원가입 기능 추가
↓
로그인 기능 추가
↓
로그인 오류 수정
↓
디자인 수정
↓
README 업데이트
```

Git Bash에서도 확인할 수 있지만 SourceTree에서는 commit 그래프를 통해 흐름을 시각적으로 볼 수 있다.

### Branch 구조를 보기 쉽다

프로젝트가 커지면 branch를 여러 개 사용한다.

예를 들어

```text
main
│
├─ feat/login
│
├─ feat/signup
│
└─ fix/header
```

처럼 작업할 수 있다.

SourceTree에서는 이런 branch 이동과 commit 흐름을 화면에서 확인할 수 있다.

초보자에게는 특히 이 시각적인 부분이 Git 구조를 이해하는 데 도움이 된다.

---

## 5. SourceTree가 Git을 대신하는 것은 아니다

이 부분은 꼭 기억해두는 것이 좋다.

```text
Git
=
실제 버전 관리 시스템
```

```text
SourceTree
=
Git을 조작하는 프로그램
```

이다.

관계를 다시 정리하면 다음과 같다.

```text
프로젝트 파일

      ↓

Git
변경 기록 관리

      ↑

SourceTree
Git을 GUI로 조작
```

SourceTree가 없어도 Git은 사용할 수 있다.

하지만 Git이 전혀 없다면 SourceTree가 Git 기능을 수행하려면 사용할 Git 실행 환경이 필요하다.

앞선 01편에서 Git을 먼저 설치한 이유도 이 때문이다.

---

## 6. 지금까지의 개발환경

현재까지 Dev Setup에서 만든 환경은 다음과 같다.

```text
내 컴퓨터

├─ Git
│  └─ 코드 변경 기록 관리
│
├─ Git Bash
│  └─ 명령어로 Git 사용
│
└─ GitHub
   └─ Remote Repository 저장
```

이번 글이 끝나면 다음과 같이 된다.

```text
내 컴퓨터

├─ Git
│  └─ 코드 변경 기록 관리
│
├─ Git Bash
│  └─ CLI로 Git 사용
│
├─ SourceTree
│  └─ GUI로 Git 사용
│
└─ GitHub
   └─ Remote Repository 저장
```

즉 Git을 사용할 수 있는 방법이 하나 더 생기는 것이다.

---

## 7. 설치 전에 Git부터 확인하기

SourceTree를 설치하기 전에 앞선 글에서 설치한 Git이 정상적으로 동작하는지 다시 확인한다.

Git Bash를 실행한다.

다음 명령어를 입력한다.

```bash
git --version
```

정상적으로 설치되어 있다면 다음과 비슷한 결과가 나온다.

```text
git version 2.xx.x.windows.x
```

버전 번호는 설치 시기에 따라 다를 수 있다.

중요한 것은

```text
git version
```

이 정상적으로 출력되는 것이다.

---

## 8. Git 사용자 정보도 확인하기

앞선 글에서 설정했던 사용자 이름과 이메일도 확인한다.

```bash
git config --global user.name
```

그리고

```bash
git config --global user.email
```

을 입력한다.

설정한 값이 출력되면 된다.

예를 들어

```text
eunjung01230
example@gmail.com
```

처럼 표시될 수 있다.

SourceTree를 사용한다고 해서 기존 Git 설정이 사라지는 것이 아니다.

같은 컴퓨터의 Git을 사용한다면 Git Bash에서 설정한 Git 환경을 함께 사용하게 된다.

---

## 9. SourceTree 다운로드하기

이제 SourceTree를 설치한다.

인터넷 검색창에서 다음과 같이 검색한다.

```text
SourceTree
```

또는

```text
SourceTree download
```

[공식 Atlassian SourceTree 사이트](https://www.sourcetreeapp.com/)로 이동한다.

SourceTree는 공식적으로 Windows와 macOS용 다운로드를 제공한다.

Windows를 사용하고 있다면 Windows용 설치 파일을 다운로드한다.

SourceTree의 설치 화면이나 파일 이름은 버전에 따라 달라질 수 있다.

따라서 이 글의 화면과 완전히 같지 않더라도 이상한 것은 아니다.

---

## 10. 반드시 공식 사이트에서 다운로드하기

개발 도구는 가능하면 공식 사이트에서 다운로드하는 습관을 들이는 것이 좋다.

검색 결과에 여러 다운로드 사이트가 나타날 수 있지만

```text
SourceTree
→ Atlassian 공식 사이트
```

에서 다운로드하는 것을 권장한다.

프로그램 버전이 오래됐거나 설치 파일이 변조된 비공식 다운로드 사이트를 굳이 사용할 이유가 없다.

---

## 11. SourceTree 설치 파일 실행하기

다운로드한 설치 파일을 실행한다.

Windows 보안 창이 나타나면 프로그램 게시자와 파일 출처를 확인한 뒤 진행한다.

설치 방식은 SourceTree 버전에 따라 조금씩 달라질 수 있다.

[Atlassian 공식 설치 안내](https://confluence.atlassian.com/get-started-with-sourcetree/install-sourcetree-847359094.html)에서도 설치 프로그램을 내려받아 실행하고 초기 설정을 진행하도록 안내하고 있다.

초기 설치 중 약관 동의나 Atlassian 계정과 관련된 화면이 나타날 수도 있다.

버전에 따라 초기 화면 구성이 달라질 수 있으므로 실제 화면의 안내를 확인하면서 진행한다.

---

## 12. Atlassian 계정과 GitHub 계정은 다르다

SourceTree를 처음 사용하면 계정이 여러 개 등장해서 헷갈릴 수 있다.

대표적으로

```text
Atlassian 계정
GitHub 계정
```

이 있다.

두 계정은 같은 것이 아니다.

### Atlassian 계정

SourceTree를 만든 회사가 Atlassian이다.

SourceTree 초기 설정이나 Atlassian 서비스 사용 과정에서 Atlassian 계정을 사용할 수 있다.

### GitHub 계정

GitHub Repository를 사용하기 위한 계정이다.

예를 들어

```text
github.com/eunjung01230
```

같은 GitHub 프로필이 있다면 이 GitHub 계정을 SourceTree에 연결한다.

따라서 구조는 다음처럼 생각하면 된다.

```text
SourceTree
→ Atlassian이 만든 프로그램

GitHub
→ Git Repository를 저장하는 별도 서비스
```

둘은 서로 다른 서비스다.

---

## 13. 설치 중 Git 관련 선택지가 나오면?

SourceTree에서는 Git을 이용해야 한다.

환경이나 버전에 따라 SourceTree가 사용할 Git에 관한 선택지가 나타날 수 있다.

보통 생각할 수 있는 방식은 다음 두 가지다.

```text
System Git
```

또는

```text
Embedded Git
```

이다.

---

## 14. System Git이란?

System Git은 이미 내 Windows에 설치되어 있는 Git이다.

앞선 글에서 직접 Git for Windows를 설치했다면 그 Git을 의미한다.

예를 들어 일반적인 설치 환경에서는 Git이 다음과 같은 위치에 존재할 수 있다.

```text
C:\Program Files\Git
```

SourceTree는 시스템에 설치된 Git을 찾아 사용할 수 있다. [Atlassian 문서](https://support.atlassian.com/sourcetree/kb/using-embedded-git-or-system-git-in-sourcetree/)에도 SourceTree가 시스템에 설치된 Git을 찾아 사용하도록 구성할 수 있다는 설명이 있다.

이번 시리즈에서는 앞선 01편에서 이미 Git을 설치했기 때문에 가능하면 **기존에 설치한 Git을 사용하는 흐름**으로 이해하면 된다.

---

## 15. Embedded Git이란?

일부 SourceTree 환경에서는 SourceTree가 자체적으로 포함하거나 관리하는 Git을 사용할 수도 있다.

이를 보통 Embedded Git이라고 표현한다.

쉽게 구분하면 다음과 같다.

```text
System Git
→ 내가 직접 설치한 Git

Embedded Git
→ SourceTree 쪽에서 사용하는 Git
```

초보자 입장에서는 둘 다 Git이기 때문에 처음에는 헷갈릴 수 있다.

이번 시리즈에서는

```text
앞에서 Git 설치
↓
SourceTree가 그 Git을 GUI로 사용
```

이라는 흐름을 기준으로 이해한다.

---

## 16. SourceTree 설치 완료

설치 과정을 마치고 SourceTree를 실행한다.

정상적으로 실행되면 Repository를 추가하거나 기존 Repository를 볼 수 있는 초기 화면이 나타난다.

화면 구성이나 버튼 위치는 SourceTree 버전에 따라 다를 수 있다.

따라서 메뉴 이름이 조금 다르더라도 당황할 필요는 없다.

중요한 것은 다음 세 가지다.

```text
1. Git이 정상적으로 연결되어 있는가?

2. GitHub 계정이 연결되어 있는가?

3. Repository를 SourceTree에서 열 수 있는가?
```

이 세 가지를 순서대로 확인한다.

---

## 17. SourceTree가 어떤 Git을 사용하는지 확인하기

SourceTree 설정 메뉴를 연다.

Windows 버전에서는 일반적으로

```text
Tools
→ Options
```

형태의 설정 메뉴를 찾을 수 있다.

버전에 따라 메뉴 이름이나 위치는 조금 달라질 수 있다.

Git 관련 설정을 찾는다.

여기에서 SourceTree가 사용하는 Git 버전이나 Git 위치를 확인할 수 있다.

앞선 글에서 설치한 Git이 정상적으로 잡혀 있다면 별도로 변경할 필요가 없다.

---

## 18. Git 연결 확인에서 가장 중요한 것

Git Bash에서

```bash
git --version
```

이 정상적으로 출력되고,

SourceTree에서도 Git을 사용할 수 있는 상태라면 기본 준비가 된 것이다.

즉,

```text
Git 설치
      ↓
SourceTree
      ↓
Git 기능 사용 가능
```

상태다.

---

## 19. GitHub 계정을 SourceTree에 연결하는 이유

Git과 SourceTree만 연결했다고 해서 GitHub Repository 목록이 자동으로 모두 나타나는 것은 아니다.

GitHub는 별도의 원격 Git 호스팅 서비스다.

SourceTree에서 GitHub 계정을 연결하면 GitHub의 Repository를 찾고 관리하기 편해진다.

[Atlassian 공식 가이드](https://confluence.atlassian.com/get-started-with-sourcetree/connect-your-bitbucket-or-github-account-847359096.html)에서도 원격 Repository를 SourceTree에 추가하려면 GitHub나 Bitbucket과 같은 호스팅 계정을 연결하는 절차를 안내하고 있다.

구조를 보면 다음과 같다.

```text
SourceTree
   ↓
Git
   ↓
Local Repository

SourceTree
   ↓
GitHub 계정
   ↓
Remote Repository
```

---

## 20. GitHub 계정 연결 메뉴 찾기

SourceTree에서 계정 설정 메뉴로 이동한다.

SourceTree 버전에 따라 위치가 조금 달라질 수 있지만 [Atlassian 공식 가이드](https://confluence.atlassian.com/get-started-with-sourcetree/connect-your-bitbucket-or-github-account-847359096.html)에서는 Accounts 메뉴에서 계정을 추가하도록 안내하고 있다.

설정 화면에서

```text
Accounts
```

또는 인증과 관련된 메뉴를 찾는다.

그다음

```text
Add
```

와 비슷한 계정 추가 버튼을 선택한다.

---

## 21. Host에서 GitHub 선택하기

계정을 추가할 때 어떤 서비스를 사용할지 선택하는 항목이 나타난다.

여기에서

```text
GitHub
```

를 선택한다.

다른 선택지로 Bitbucket 등이 나타날 수 있다.

하지만 이번에는 GitHub를 사용할 것이므로 GitHub를 선택한다.

```text
Host
→ GitHub
```

---

## 22. Authentication이란?

GitHub 계정을 연결할 때 **Authentication**이라는 단어를 볼 수 있다.

Authentication은 우리말로 **인증**이다.

쉽게 말하면

> 정말 이 GitHub 계정의 주인이 맞는지 확인하는 과정

이다.

GitHub Repository에는 아무나 코드를 올릴 수 있으면 안 된다.

따라서 SourceTree에서 GitHub에 접근하려고 하면 GitHub가 사용자를 확인해야 한다.

---

## 23. OAuth란?

GitHub 계정을 연결할 때 OAuth라는 인증 방식이 표시될 수 있다.

처음 보면 어려워 보이지만 원리를 아주 간단하게 생각하면 된다.

예전처럼

```text
SourceTree 안에
GitHub 비밀번호 직접 입력
```

하는 것이 아니라,

```text
SourceTree
↓
브라우저에서 GitHub 로그인
↓
GitHub가 사용자 인증
↓
SourceTree에 접근 권한 허용
```

과 같은 방식으로 인증할 수 있다.

[Atlassian은 SourceTree의 계정 인증에 OAuth와 Credential Manager를 지원해왔다.](https://support.atlassian.com/sourcetree/kb/sourcetree-for-windows-1100-authentication-and-accounts-updates/)

초보자라면 특별한 이유가 없다면 SourceTree에서 제공하는 기본 인증 방식을 그대로 사용하는 것이 편하다.

---

## 24. GitHub 연결 시작하기

GitHub를 Host로 선택했다면 인증 방식은 기본값을 우선 사용한다.

[Atlassian의 공식 연결 가이드](https://confluence.atlassian.com/get-started-with-sourcetree/connect-your-bitbucket-or-github-account-847359096.html) 역시 GitHub를 선택한 후 기본 인증 방식을 유지하고 계정 연결을 진행하도록 안내한다.

화면에

```text
Connect Account
```

또는 비슷한 버튼이 있다면 선택한다.

그러면 기본 브라우저가 열릴 수 있다.

---

## 25. 브라우저에서 GitHub 로그인

브라우저에 GitHub 로그인 화면이 나타난다면 자신이 사용할 GitHub 계정으로 로그인한다.

예를 들어

```text
GitHub Username
→ eunjung01230
```

계정을 SourceTree와 연결하려면 해당 계정으로 로그인해야 한다.

이미 브라우저에서 GitHub에 로그인되어 있다면 별도의 로그인 화면 없이 권한 확인 화면이 나타날 수도 있다.

---

## 26. 계정을 잘못 선택하지 않기

GitHub 계정을 여러 개 사용하는 경우 특히 주의한다.

예를 들어

```text
개인 GitHub 계정
학교 GitHub 계정
개발용 GitHub 계정
```

을 모두 사용한다면 SourceTree에서 어떤 계정에 연결하고 있는지 확인한다.

잘못된 계정을 연결하면 나중에 Repository 권한 문제로

```text
왜 이 저장소가 안 보이지?

왜 push 권한이 없다고 하지?
```

같은 상황이 발생할 수 있다.

---

## 27. GitHub 권한 승인 화면

GitHub에서 SourceTree가 계정에 접근하는 것을 허용할지 묻는 화면이 나타날 수 있다.

서비스 이름과 요청 내용을 확인한다.

정상적인 SourceTree 연결 과정이라면 승인 후 SourceTree로 돌아온다.

인증이 성공하면 SourceTree의 Accounts 목록에 GitHub 계정이 표시된다.

---

## 28. 연결이 끝났는지 확인하기

Accounts 화면에서 다음과 같은 정보가 보이는지 확인한다.

```text
Host
→ GitHub

Account
→ 내 GitHub 계정

Authentication
→ 연결된 인증 방식
```

버전에 따라 표시 방식은 다를 수 있다.

중요한 것은 GitHub 계정이 Accounts 목록에 존재하는 것이다.

---

## 29. HTTPS와 SSH 선택

GitHub Repository를 연결할 때 HTTPS와 SSH라는 방식을 볼 수 있다.

[Atlassian의 계정 연결 가이드](https://confluence.atlassian.com/get-started-with-sourcetree/connect-your-bitbucket-or-github-account-847359096.html)에서도 HTTPS 또는 SSH 중 연결 방식을 선택할 수 있다고 안내한다.

앞선 Git 환경 구축 글에서는 초보자가 시작하기 쉬운 HTTPS 방식을 사용했다.

이번에도 같은 흐름으로 진행한다.

---

## 30. HTTPS 방식

Repository 주소가 다음과 같이 생겼다.

```text
https://github.com/username/repository.git
```

예를 들어

```text
https://github.com/eunjung01230/git-test.git
```

같은 형태다.

HTTPS는 Credential Manager나 브라우저 인증과 함께 사용하기 편하다.

---

## 31. SSH 방식

SSH 주소는 다음처럼 생긴다.

```text
git@github.com:username/repository.git
```

SSH를 사용하려면 일반적으로 SSH Key를 생성하고 GitHub에 등록하는 과정을 거친다.

[SourceTree 공식 가이드](https://confluence.atlassian.com/get-started-with-sourcetree/connect-your-bitbucket-or-github-account-847359096.html)에서도 SSH를 사용할 경우 SSH Key 설정이 별도로 필요하다고 안내한다.

아직 SSH를 따로 설정하지 않았다면 이번에는 HTTPS를 사용하면 된다.

---

## 32. 계정 연결과 Repository 연결은 다르다

이 부분도 초보자가 자주 헷갈린다.

GitHub 계정을 SourceTree에 추가했다고 해서 내 컴퓨터에 모든 Repository가 자동으로 다운로드되는 것은 아니다.

```text
GitHub 계정 연결

≠

Repository 다운로드
```

계정 연결은

```text
SourceTree가
내 GitHub 계정에 접근할 수 있음
```

이라는 의미다.

실제 프로젝트를 사용하려면 Repository를

```text
Clone
```

하거나 이미 내 컴퓨터에 존재하는 Repository를

```text
Add / Open
```

해야 한다.

---

## 33. Repository를 여는 방법은 크게 두 가지

SourceTree에서 Repository를 사용하는 상황은 크게 두 가지다.

### 경우 1

GitHub에는 Repository가 있지만 내 컴퓨터에는 없다.

```text
GitHub
○

Local
X
```

이 경우

```text
Clone
```

을 사용한다.

### 경우 2

이미 내 컴퓨터에 Git Repository가 있다.

```text
GitHub
○

Local
○
```

이 경우 기존 Local Repository를 SourceTree에 추가하면 된다.

앞선 01편에서 `git-test`를 직접 만들었기 때문에 이번에는 두 번째 경우부터 해본다.

---

## 34. 기존 Local Repository 열기

앞선 글에서 만든 폴더를 기억해보자.

예를 들어

```text
git-test
```

라는 폴더를 만들었다.

그리고 안에서

```bash
git init
```

을 실행했다.

따라서 이 폴더는 이미 Git Repository다.

```text
git-test

├─ README.md
└─ .git
```

`.git`은 숨김 폴더이므로 Windows 탐색기에서는 기본적으로 보이지 않을 수 있다.

---

## 35. SourceTree에서 Local Repository 추가하기

SourceTree 초기 화면에서

```text
Add
```

또는

```text
Add Working Copy
```

처럼 기존 Repository를 추가하는 기능을 찾는다.

버전에 따라 정확한 이름은 달라질 수 있다.

Repository를 선택하는 창이 나타나면 앞선 글에서 만든

```text
git-test
```

폴더를 선택한다.

주의할 점은 파일 하나를 선택하는 것이 아니라 **Git Repository 폴더 자체를 선택하는 것**이다.

---

## 36. 일반 폴더와 Git Repository 차이

모든 폴더를 SourceTree에 추가할 수 있는 것은 아니다.

Git Repository에는 일반적으로 `.git` 영역이 있다.

앞에서

```bash
git init
```

을 실행하면서 만들어졌다.

즉,

```text
일반 폴더

↓

git init

↓

Git Repository

↓

SourceTree에서 Git Repository로 인식
```

이라는 흐름이다.

---

## 37. Repository가 정상적으로 열렸다면?

Repository를 열면 SourceTree 화면에 여러 영역이 나타난다.

처음에는 버튼과 메뉴가 많아서 복잡하게 느껴질 수 있다.

모든 기능을 지금 알아야 하는 것은 아니다.

우선 다음 항목만 찾으면 된다.

```text
File Status

History / Log

Branches

Remotes

Push

Pull
```

버전에 따라 이름과 위치는 조금 다를 수 있다.

---

## 38. File Status

File Status는 현재 변경된 파일 상태를 확인하는 곳이다.

Git Bash의

```bash
git status
```

와 연결해서 생각하면 쉽다.

```text
Git Bash

git status

        ↕

SourceTree

File Status
```

파일을 수정하면 이곳에 표시된다.

---

## 39. History

History 또는 Log에서는 Git commit 기록을 볼 수 있다.

앞선 글에서 다음과 같은 commit을 만들었다.

```bash
git commit -m "first commit"
```

SourceTree의 History를 보면 이 commit이 나타나야 한다.

예를 들어

```text
first commit
```

이라는 메시지가 보이면 된다.

즉 SourceTree가 새로운 기록을 만든 것이 아니라 **기존 Git Repository에 있던 commit을 읽어서 보여주는 것**이다.

---

## 40. Branches

Branches 영역에서는 Repository의 branch를 확인한다.

앞선 글에서 `main`을 사용했다면 다음과 같이 보일 수 있다.

```text
Branches

└─ main
```

Git Bash에서 확인하면

```bash
git branch
```

와 비슷한 역할이다.

```text
git branch

      ↕

SourceTree Branches
```

---

## 41. Remotes

Remotes는 연결된 원격 Repository를 보여주는 영역이다.

앞선 글에서 다음 명령어를 사용했다.

```bash
git remote add origin https://github.com/사용자이름/git-test.git
```

따라서 SourceTree에서도

```text
Remotes

└─ origin
```

같은 항목을 확인할 수 있다.

즉 Git Bash에서 만든 Remote 설정을 SourceTree가 그대로 읽고 있는 것이다.

---

## 42. origin 다시 이해하기

`origin`은 GitHub 자체를 뜻하는 특별한 명령어가 아니다.

Remote Repository에 붙인 이름이다.

앞선 글에서 GitHub Repository를 등록하면서

```bash
git remote add origin ...
```

이라고 했기 때문에 `origin`이라는 이름이 생긴 것이다.

```text
origin
↓
GitHub의 git-test Repository
```

라고 연결해서 이해하면 된다.

---

## 43. SourceTree에서 Remote URL 확인하기

`origin` 관련 설정을 열어보면 Repository URL을 확인할 수 있다.

앞선 글에서 HTTPS를 사용했다면 다음과 비슷하다.

```text
https://github.com/사용자이름/git-test.git
```

내가 만든 GitHub Repository 주소와 동일한지 확인한다.

잘못된 주소가 연결되어 있으면 엉뚱한 Repository로 push할 수 있으므로 확인하는 습관을 들이는 것이 좋다.

---

## 44. Git Bash와 비교해보기

Git Bash에서 다음 명령어를 실행한다.

```bash
git remote -v
```

다음과 비슷하게 나온다.

```text
origin  https://github.com/사용자이름/git-test.git (fetch)
origin  https://github.com/사용자이름/git-test.git (push)
```

SourceTree에서도 같은 `origin` URL이 보인다면 같은 Git Repository 설정을 보고 있다는 뜻이다.

---

## 45. 이제 실제로 파일을 하나 수정해보기

SourceTree가 정상적으로 Git을 읽고 있는지 확인하기 위해 파일을 하나 수정해본다.

`README.md` 파일을 메모장이나 다른 편집기로 연다.

기존 내용이

```markdown
# Git Test
```

였다면 아래 한 줄을 추가한다.

```markdown
# Git Test

SourceTree 연결 테스트
```

파일을 저장한다.

---

## 46. SourceTree로 돌아오기

SourceTree로 돌아오면 File Status 영역에

```text
README.md
```

가 변경된 파일로 나타나는지 확인한다.

나타난다면 SourceTree가 Git Repository의 변경 사항을 정상적으로 감지하고 있는 것이다.

Git Bash에서 보면 같은 상황은

```bash
git status
```

로 확인한다.

즉,

```text
README.md 수정

       ↓

Git이 변경 감지

       ↓

Git Bash
git status

또는

SourceTree
File Status
```

둘 다 같은 상태를 보는 것이다.

---

## 47. Diff 확인하기

SourceTree에서 `README.md`를 선택한다.

변경 전과 변경 후의 차이가 표시된다.

예를 들어 추가된

```text
SourceTree 연결 테스트
```

부분이 표시될 수 있다.

이것이 Git에서 말하는 **diff**다.

쉽게 말하면

> 파일에서 정확히 무엇이 바뀌었는지 보여주는 비교 화면

이다.

실제 프로젝트에서 commit하기 전에 diff를 확인하는 습관은 매우 중요하다.

---

## 48. 왜 Diff를 확인해야 할까?

예를 들어 내가 버튼 하나만 수정했다고 생각했는데 실제로는

```text
app.js
style.css
.env
config.json
```

같은 여러 파일이 변경되어 있을 수 있다.

그 상태에서 무조건 전부 commit하면 원하지 않는 파일까지 Git 기록에 들어갈 수 있다.

따라서 commit 전에

```text
어떤 파일이 바뀌었는지
↓
어떤 코드가 바뀌었는지
```

확인하는 것이 좋다.

SourceTree는 이 과정을 화면에서 보기 쉽게 해준다.

---

## 49. Unstaged와 Staged

SourceTree를 사용하면 다음과 같은 개념을 볼 수 있다.

```text
Unstaged files
```

그리고

```text
Staged files
```

처음에는 무슨 뜻인지 이해하기 어렵다.

Git Bash와 연결하면 쉽다.

### Unstaged

파일을 수정했지만 아직

```bash
git add
```

하지 않은 상태다.

```text
파일 수정
↓
Unstaged
```

### Staged

```bash
git add
```

를 해서 다음 commit에 포함할 준비가 된 상태다.

```text
파일 수정
↓
git add
↓
Staged
```

즉 SourceTree에서는 화면으로 이 두 상태를 나눠 보여준다.

---

## 50. Stage 해보기

변경된 `README.md` 파일을 Stage 영역으로 이동시킨다.

체크박스나 Stage 버튼 등 화면 방식은 버전에 따라 다를 수 있다.

이 작업은 Git Bash의

```bash
git add README.md
```

와 같은 역할을 한다.

정리하면

```text
SourceTree

README.md 선택
↓
Stage

          =

Git Bash

git add README.md
```

이다.

---

## 51. Commit 메시지 작성하기

파일을 Stage했다면 commit 메시지를 입력하는 영역을 찾는다.

예를 들어

```text
test SourceTree connection
```

또는

```text
docs: update README
```

처럼 작성할 수 있다.

그다음 Commit 버튼을 누른다.

이 작업은 Git Bash의

```bash
git commit -m "docs: update README"
```

와 같은 역할이다.

---

## 52. Commit했다고 GitHub에 올라간 것은 아니다

앞선 글에서도 중요하게 다뤘던 부분이다.

SourceTree에서도 똑같다.

Commit 버튼을 눌렀다고 바로 GitHub에 업로드되는 것이 아니다.

```text
Commit
→ Local Git에 기록

Push
→ GitHub에 전송
```

이다.

즉,

```text
Commit
≠
Push
```

다.

---

## 53. SourceTree에서 Push하기

Commit을 완료했다면 상단의

```text
Push
```

버튼을 찾는다.

Push를 누르면 어떤 Remote와 branch로 보낼지 선택하는 화면이 나타날 수 있다.

앞선 글 기준으로는

```text
Remote
→ origin

Local branch
→ main

Remote branch
→ main
```

과 연결되는 구조다.

확인한 뒤 Push를 진행한다.

---

## 54. Push는 어떤 Git 명령어일까?

Git Bash에서는 앞서 다음 명령어를 사용했다.

```bash
git push
```

또는 최초 연결에서는

```bash
git push -u origin main
```

을 사용했다.

SourceTree의 Push 버튼 역시 결국 Git의 push 동작을 실행한다.

```text
SourceTree Push 버튼

        ↓

Git push

        ↓

GitHub
```

이라고 이해하면 된다.

---

## 55. GitHub에서 결과 확인하기

브라우저에서 GitHub의 `git-test` Repository를 연다.

페이지를 새로고침한다.

README 내용에

```text
SourceTree 연결 테스트
```

가 추가되었는지 확인한다.

새로운 commit도 확인한다.

예를 들어

```text
docs: update README
```

라는 commit 메시지가 GitHub에 보이면 된다.

그러면 다음 전체 흐름이 성공한 것이다.

```text
README 수정

↓

SourceTree에서 변경 감지

↓

Stage

↓

Commit

↓

Push

↓

GitHub 반영
```

---

## 56. SourceTree 연결 최종 확인

이제 SourceTree 환경이 정상적으로 구성됐는지 확인해보자.

먼저 SourceTree에서 Repository를 열 수 있어야 한다.

```text
git-test
```

가 정상적으로 보여야 한다.

### Git 확인

SourceTree가 Git을 사용할 수 있어야 한다.

Git Bash에서도

```bash
git --version
```

이 정상적으로 동작한다.

### Commit 기록 확인

SourceTree History에서 앞서 만든 commit들이 보여야 한다.

```text
first commit

docs: update README
```

같은 기록을 확인한다.

### Branch 확인

Branches 영역에서

```text
main
```

을 확인한다.

### Remote 확인

Remotes 영역에서

```text
origin
```

을 확인한다.

### GitHub 반영 확인

SourceTree에서 Push한 내용이 GitHub Repository에 나타나야 한다.

여기까지 모두 정상이라면 SourceTree와 GitHub 연결이 완료된 것이다.

---

## 57. GitHub에 있는 Repository를 처음 가져오려면?

이번에는 앞선 글에서 이미 Local Repository를 만들어놓았기 때문에 기존 Repository를 SourceTree에 추가했다.

하지만 새로운 컴퓨터에서는 상황이 다를 수 있다.

예를 들어 GitHub에는 프로젝트가 있지만 새 컴퓨터에는 아무것도 없다고 해보자.

```text
GitHub

cup-pick
○

새 PC

cup-pick
X
```

이때 사용하는 것이 **Clone**이다.

Atlassian 역시 [SourceTree 시작 가이드](https://confluence.atlassian.com/get-started-with-sourcetree/clone-a-remote-repository-847359098.html)에서 Remote Repository의 복사본을 컴퓨터에 만들기 위해 Clone을 사용하는 흐름을 제공한다.

---

## 58. Clone이란?

Clone은 원격 Git Repository를 내 컴퓨터로 처음 복사해오는 작업이다.

```text
GitHub Repository

      ↓ Clone

내 컴퓨터

프로젝트 폴더
+
Git 기록
```

단순히 파일만 다운로드하는 것과는 조금 다르다.

Git Repository의 구조와 기록까지 함께 가져온다.

---

## 59. SourceTree에서 Clone하기

SourceTree에서

```text
Clone
```

또는

```text
Clone from URL
```

과 비슷한 메뉴를 찾는다.

보통 다음 정보가 필요하다.

```text
Source URL

Destination Path
```

---

## 60. Source URL

Source URL은 가져올 GitHub Repository 주소다.

예를 들어

```text
https://github.com/사용자이름/git-test.git
```

이다.

GitHub Repository에서 HTTPS URL을 복사하면 된다.

---

## 61. Destination Path

Destination Path는 내 컴퓨터 어디에 프로젝트를 저장할 것인지 정하는 위치다.

예를 들어

```text
C:\Users\사용자이름\Documents\git-test
```

같은 위치가 될 수 있다.

즉,

```text
Source URL
→ 어디에서 가져올까?

Destination Path
→ 내 컴퓨터 어디에 저장할까?
```

로 이해하면 된다.

---

## 62. Clone 후에는 무엇이 생길까?

Clone이 정상적으로 끝나면 내 컴퓨터에 Repository 폴더가 만들어진다.

```text
git-test

├─ README.md
├─ 프로젝트 파일
└─ .git
```

그리고 SourceTree에도 Repository가 등록되어 바로 확인할 수 있다.

---

## 63. Clone과 Download ZIP 차이

GitHub에는 Repository를 ZIP 파일로 다운로드하는 기능도 있다.

그렇다면 Clone과 무엇이 다를까?

ZIP은 주로 현재 파일을 내려받는 것에 가깝다.

반면 Clone은 Git Repository를 가져오는 작업이다.

```text
Download ZIP

→ 파일 다운로드
```

```text
git clone

→ Git Repository 복제
→ Git 기록 연결
→ Remote 설정
```

앞으로 계속 개발할 프로젝트라면 일반적으로 Clone해서 사용하는 것이 자연스럽다.

---

## 64. 이미 Clone한 Repository를 또 Clone하면?

이미 내 컴퓨터에 같은 프로젝트가 존재한다면 무작정 다시 Clone할 필요는 없다.

예를 들어 이미

```text
C:\projects\cup-pick
```

이 있는데 다시 Clone하면

```text
cup-pick
cup-pick2
cup-pick-new
```

처럼 같은 프로젝트 복사본이 여러 개 생겨 혼란스러워질 수 있다.

먼저 기존 Repository가 있는지 확인한다.

있다면 SourceTree의

```text
Add existing repository
```

방식을 사용하면 된다.

---

## 65. SourceTree에 계정을 연결했는데 Repository가 안 보일 때

가장 먼저 GitHub 웹사이트에서 해당 Repository가 실제로 내 계정에 보이는지 확인한다.

그다음 SourceTree에 연결한 GitHub 계정이 맞는지 확인한다.

GitHub 계정을 여러 개 사용한다면 특히 중요하다.

```text
SourceTree 계정 A

GitHub Repository는 계정 B
```

상태라면 접근 권한이 없을 수 있다.

---

## 66. Private Repository가 안 보일 때

Private Repository는 접근 권한이 있는 계정에서만 볼 수 있다.

따라서 다음을 확인한다.

```text
□ 올바른 GitHub 계정인가?

□ 해당 Repository에 접근 권한이 있는가?

□ GitHub 인증이 정상적으로 완료됐는가?
```

팀 Repository라면 조직 또는 Repository에서 계정에 권한이 부여됐는지도 확인해야 한다.

---

## 67. GitHub 비밀번호를 넣었는데 인증이 안 되는 경우

오래된 블로그나 영상을 보면 SourceTree에 GitHub 사용자 이름과 비밀번호를 직접 입력하는 방식이 나올 수 있다.

하지만 현재 GitHub 인증 방식은 예전의 단순 계정 비밀번호 기반 Git 인증과 다르다.

따라서 최신 SourceTree에서는 가능한 경우 SourceTree가 제공하는 OAuth나 Credential Manager 기반 인증 흐름을 사용하는 것이 편하다. [Atlassian 공식 자료](https://support.atlassian.com/sourcetree/kb/sourcetree-for-windows-1100-authentication-and-accounts-updates/)에서도 OAuth와 Windows Credential Manager 지원을 설명하고 있다.

오래된 자료의 화면이 현재와 다르다고 해서 내 SourceTree가 잘못 설치된 것은 아닐 수 있다.

---

## 68. SourceTree 화면이 블로그와 다른 경우

SourceTree는 버전에 따라 화면이 바뀔 수 있다.

예를 들어 이 글에서는

```text
Accounts
Add
Clone
Push
```

라는 이름으로 설명했지만

실제 버전에서는 버튼 위치나 일부 문구가 다를 수 있다.

이런 개발 프로그램 설치 글을 볼 때는 화면을 그대로 외우기보다

```text
무슨 작업을 하려는지
```

를 기준으로 찾는 것이 좋다.

예를 들어 GitHub 계정을 연결하려는 상황이라면

```text
Accounts
Authentication
Hosting
```

같은 관련 메뉴를 찾아본다.

---

## 69. SourceTree에서는 Terminal이 필요 없을까?

SourceTree로 대부분의 Git 작업을 할 수 있지만 터미널을 완전히 버릴 필요는 없다.

개발 과정에서는 종종 Git 상태를 빠르게 확인하기 위해 다음과 같은 명령어를 사용한다.

```bash
git status
```

```bash
git branch
```

```bash
git remote -v
```

그리고 Git 오류가 발생했을 때 터미널에 출력되는 메시지가 문제를 해결하는 데 중요한 단서가 되기도 한다.

따라서

```text
SourceTree만 사용
```

보다

```text
SourceTree
+
Git Bash
```

를 같이 사용하는 것이 좋다.

---

## 70. Git Bash와 SourceTree 비교

지금까지 배운 내용을 한 번에 비교해보자.

| 작업 | Git Bash | SourceTree |
|------|------|------|
| 현재 상태 확인 | `git status` | File Status |
| 파일 Stage | `git add` | Stage |
| Commit | `git commit` | Commit |
| Push | `git push` | Push |
| Pull | `git pull` | Pull |
| Branch 확인 | `git branch` | Branches |
| Remote 확인 | `git remote -v` | Remotes |
| Commit 기록 | `git log` | History / Log |
| 변경 내용 확인 | `git diff` | Diff 화면 |

이 표를 보면 SourceTree가 완전히 새로운 기능을 제공하는 프로그램이 아니라는 것을 알 수 있다.

Git의 동작을 화면으로 보여주는 것이다.

---

## 71. SourceTree를 사용하면서 꼭 확인할 세 가지

SourceTree에서 Commit이나 Push를 누르기 전에 최소한 다음 세 가지를 확인하는 습관을 들이면 좋다.

### 첫 번째

**현재 어떤 Repository인가?**

```text
cup-pick인가?

my-blog인가?

학교 과제 Repository인가?
```

잘못된 Repository에서 작업하면 엉뚱한 프로젝트를 수정할 수 있다.

### 두 번째

**현재 어떤 Branch인가?**

```text
main인가?

develop인가?

내 feature branch인가?
```

특히 팀 프로젝트에서는 중요하다.

### 세 번째

**어떤 파일을 Commit하는가?**

```text
원하는 파일만 포함되어 있는가?

.env 같은 민감한 파일은 없는가?

실수로 큰 파일이 포함되지 않았는가?
```

Commit 전에 File Status와 diff를 확인한다.

---

## 72. SourceTree에서 바로 main 작업을 해도 될까?

개인 연습 Repository에서는 가능하다.

하지만 팀 프로젝트에서는 보통 별도의 branch에서 작업하는 경우가 많다.

예를 들어

```text
main

↓

feat/login

↓

Commit

↓

Push

↓

Pull Request

↓

main Merge
```

같은 방식이다.

이번 글의 목적은 SourceTree 환경 구축이므로 branch 전략까지 깊게 들어가지는 않는다.

branch와 Pull Request는 Git & GitHub 학습 글에서 별도로 다룬다.

---

## 73. SourceTree가 편해도 무조건 버튼부터 누르지 않기

GUI 도구의 단점 중 하나는 버튼을 쉽게 누를 수 있다는 점이다.

예를 들어

```text
Pull
Push
Merge
Reset
Discard
```

등의 버튼이 모두 화면에 있다.

하지만 어떤 동작인지 모른 채 누르면 작업 내용에 영향을 줄 수 있다.

특히 다음 기능은 의미를 이해한 뒤 사용하는 것이 좋다.

```text
Reset
Discard
Force Push
Rebase
```

Git을 처음 공부하는 단계에서는 모르는 기능을 임의로 누르기보다 먼저 기능을 확인한다.

---

## 74. SourceTree에서 비밀번호나 키를 캡처해서 공유하지 않기

GitHub 연결 문제를 질문하다 보면 인증 화면을 캡처해서 다른 사람에게 보여주고 싶을 수 있다.

이때 다음 정보는 외부에 그대로 공개하지 않는 것이 좋다.

```text
Access Token

Personal Access Token

SSH Private Key

비밀번호

인증 코드

Secret
```

오류 화면을 공유할 때도 민감한 정보가 포함되어 있는지 먼저 확인한다.

Repository URL 자체는 공개 Repository라면 일반적으로 공개 정보지만 Private Repository나 회사 내부 주소라면 공유에 주의한다.

---

## 75. 연결 상태를 Git Bash에서도 확인하기

GUI만 보고 끝내지 말고 Git Bash에서도 같은 Repository를 확인해보자.

Repository 폴더에서 Git Bash를 연다.

다음 명령어를 실행한다.

```bash
git status
```

정상적인 상태라면 현재 branch와 작업 상태가 나온다.

### Branch 확인

```bash
git branch
```

`main`을 사용 중이라면 다음처럼 보일 수 있다.

```text
* main
```

### Remote 확인

```bash
git remote -v
```

GitHub URL이 나온다.

### Commit 확인

```bash
git log --oneline
```

SourceTree History에서 보던 commit들이 터미널에서도 나타난다.

예를 들어

```text
a1b2c3d docs: update README
d4e5f6a first commit
```

처럼 보일 수 있다.

Commit 앞의 문자열은 각 commit을 구분하는 식별값이며 실제 값은 컴퓨터마다 다르다.

---

## 76. SourceTree와 Git Bash 결과가 같은 이유

둘 다 같은 Git Repository를 보고 있기 때문이다.

```text
              Git Repository

              /          \

        Git Bash       SourceTree

          CLI             GUI
```

Git Bash에서 commit을 만들어도 SourceTree에 나타난다.

SourceTree에서 commit을 만들어도 Git Bash에서 `git log`로 확인할 수 있다.

이 관계를 이해하면 SourceTree를 훨씬 편하게 사용할 수 있다.

---

## 77. SourceTree를 종료하면 Git 기록이 사라질까?

사라지지 않는다.

SourceTree는 Git Repository를 보여주는 프로그램일 뿐이다.

Git 기록은 Repository의 `.git` 영역에 저장되어 있다.

따라서

```text
SourceTree 종료
```

를 해도 commit 기록이 사라지지 않는다.

SourceTree를 다시 실행하고 Repository를 열면 기존 기록을 다시 확인할 수 있다.

---

## 78. SourceTree를 삭제하면 프로젝트도 삭제될까?

일반적으로 SourceTree 프로그램을 제거하는 것과 프로젝트 Repository 폴더를 삭제하는 것은 별개의 작업이다.

예를 들어

```text
SourceTree 프로그램

C:\...\SourceTree
```

와

```text
내 프로젝트

C:\projects\git-test
```

는 다른 위치에 존재한다.

SourceTree는 프로젝트를 관리하는 도구다.

다만 파일 삭제나 프로그램 제거를 할 때는 항상 실제 경로와 삭제 대상을 확인해야 한다.

---

## 79. 새 컴퓨터에서는 어떤 순서로 설치할까?

새 PC에서 Git과 SourceTree를 설치한다면 다음과 같이 진행하면 이해하기 쉽다.

```text
1. Git 설치

↓

2. git --version 확인

↓

3. Git user.name 설정

↓

4. Git user.email 설정

↓

5. SourceTree 설치

↓

6. SourceTree에서 Git 확인

↓

7. GitHub 계정 연결

↓

8. GitHub Repository Clone

↓

9. SourceTree에서 Repository 열기

↓

10. GitHub 연결 확인
```

이 순서를 기억해두면 컴퓨터를 바꿨을 때도 환경을 다시 구성하기 쉽다.

---

## 80. 최종 점검 체크리스트

아래 항목을 하나씩 확인해보자.

```text
□ Git이 설치되어 있다

□ git --version이 정상적으로 출력된다

□ Git user.name이 설정되어 있다

□ Git user.email이 설정되어 있다

□ SourceTree를 설치했다

□ SourceTree가 정상 실행된다

□ SourceTree가 Git을 사용할 수 있다

□ GitHub 계정을 SourceTree에 연결했다

□ 올바른 GitHub 계정인지 확인했다

□ 기존 Local Repository를 SourceTree에서 열었다

□ main branch를 확인했다

□ origin Remote를 확인했다

□ GitHub Repository URL을 확인했다

□ 파일을 수정했다

□ SourceTree에서 변경된 파일을 확인했다

□ Diff를 확인했다

□ Stage했다

□ Commit했다

□ Push했다

□ GitHub에서 변경 사항을 확인했다
```

여기까지 모두 완료됐다면 SourceTree 환경 구축은 끝났다.

---

## 81. 오늘 배운 핵심 용어 정리

### Git

```text
코드 변경 이력을 관리하는 버전 관리 시스템
```

### GitHub

```text
Git Repository를 인터넷에 저장하고 공유할 수 있는 서비스
```

### SourceTree

```text
Git Repository를 GUI로 관리하는 프로그램
```

### CLI

```text
명령어를 입력해서 프로그램을 사용하는 방식
```

예:

```bash
git status
```

### GUI

```text
버튼과 화면을 이용해 프로그램을 사용하는 방식
```

예:

```text
SourceTree
```

### Repository

```text
Git으로 관리하는 프로젝트 저장 공간
```

### Local Repository

```text
내 컴퓨터에 있는 Git Repository
```

### Remote Repository

```text
GitHub처럼 인터넷에 존재하는 Git Repository
```

### Origin

```text
보통 기본 Remote Repository에 붙이는 이름
```

### Stage

```text
다음 Commit에 포함할 변경 사항을 선택하는 과정
```

Git 명령어로는 보통

```bash
git add
```

와 연결된다.

### Commit

```text
변경 내용을 하나의 Git 기록으로 남기는 작업
```

### Push

```text
Local의 Commit을 Remote Repository로 보내는 작업
```

### Clone

```text
Remote Repository를 내 컴퓨터에 Git Repository 형태로 처음 복제하는 작업
```

### Diff

```text
파일에서 이전 상태와 현재 상태가 어떻게 달라졌는지 보여주는 차이
```

---

## 82. SourceTree 작업 흐름 정리

앞으로 SourceTree를 사용할 때 가장 기본적인 흐름은 다음과 같다.

```text
코드 수정

↓

SourceTree에서 변경 확인

↓

Diff 확인

↓

Stage

↓

Commit 메시지 작성

↓

Commit

↓

Push

↓

GitHub 확인
```

Git 명령어와 비교하면 다음과 같다.

```text
코드 수정

↓

git status

↓

git diff

↓

git add

↓

git commit

↓

git push
```

두 방식은 서로 다른 시스템이 아니다.

**같은 Git 작업을 다른 인터페이스에서 하는 것이다.**

---

## 정리

이번 글에서는 SourceTree를 설치하고 GitHub 계정을 연결한 뒤 기존 Git Repository를 SourceTree에서 열어봤다.

전체 흐름을 다시 보면 다음과 같다.

```text
Git 설치 확인

↓

SourceTree 설치

↓

SourceTree와 Git 연결 확인

↓

GitHub 계정 연결

↓

기존 Local Repository 열기

↓

Branch 확인

↓

Remote 확인

↓

파일 수정

↓

Diff 확인

↓

Stage

↓

Commit

↓

Push

↓

GitHub에서 결과 확인
```

SourceTree에서 가장 중요한 개념은 이것이다.

```text
SourceTree가 Git을 대신하는 것이 아니다.

SourceTree는 Git을 화면에서 쉽게 사용할 수 있게 해준다.
```

따라서 앞으로 Git을 공부할 때는

```text
Git Bash에서는 어떤 명령어인가?

SourceTree에서는 어떤 버튼인가?
```

를 같이 생각하면 좋다.

예를 들어

```text
git status
↔ File Status

git add
↔ Stage

git commit
↔ Commit

git push
↔ Push

git branch
↔ Branches

git remote -v
↔ Remotes
```

처럼 연결해서 보면 Git을 훨씬 쉽게 이해할 수 있다.

이제 코드 변경 기록을 관리하기 위한 Git 환경과 SourceTree GUI 환경까지 준비됐다.

다음 Dev Setup에서는 실제 코드를 작성할 때 사용할 **VS Code를 설치하고 초기 개발환경을 설정**한다.

```text
Dev Setup

00 개발환경 구축 전체 가이드
   ↓

01 Git & GitHub 개발환경 구축
   ↓

02 SourceTree 설치 및 GitHub 연결  ← 현재
   ↓

03 VS Code 설치와 초기 설정
   ↓

04 Node.js 환경 구축
   ↓

05 JDK 21 환경 구축
   ↓

06 IntelliJ IDEA 환경 구축
   ↓

07 Tomcat 환경 구축
   ↓

08 새 PC에서 개발환경 다시 구축하기
```
