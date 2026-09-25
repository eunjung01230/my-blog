---
layout: post
title: "Git & GitHub 개발환경 구축하기"
date: 2026-09-24 22:27:00 +0900
categories: dev-setup
learningOrder: 20
tags:
  - git
  - github
  - git-bash
  - windows
---

개발환경 구축의 첫 번째 단계는 **Git과 GitHub를 사용할 수 있는 환경을 만드는 것**이다.

개발 공부를 시작하면 거의 반드시 Git과 GitHub라는 단어를 만나게 된다.

처음에는 이름이 비슷해서 둘이 같은 프로그램처럼 느껴질 수 있다.

하지만 Git과 GitHub는 역할이 다르다.

간단하게 먼저 정리하면 다음과 같다.

```text
Git
→ 내 컴퓨터에서 코드의 변경 기록을 관리

GitHub
→ Git으로 관리하는 프로젝트를 인터넷에 저장하고 공유
```

이번 글에서는 Git 명령어를 깊게 공부하지 않는다.

목표는 딱 하나다.

> **내 컴퓨터에 Git을 설치하고 GitHub와 실제로 연결해서 코드를 올릴 수 있는 상태를 만드는 것**

이번 글이 끝나면 다음 작업까지 할 수 있게 된다.

```text
Git 설치
↓
Git Bash 실행
↓
Git 사용자 정보 설정
↓
GitHub 저장소 생성
↓
내 컴퓨터와 GitHub 연결
↓
첫 commit
↓
첫 push
↓
GitHub에서 파일 확인
```

Git의 `branch`, `pull`, `merge`, `PR` 같은 기능은 Git & GitHub 카테고리의 학습 글에서 별도로 다룬다.

---

## 1. Git은 무엇일까?

개발을 하다 보면 하나의 파일을 계속 수정하게 된다.

예를 들어 처음에는 이런 코드가 있었다고 해보자.

```javascript
console.log("Hello");
```

조금 뒤 코드를 수정한다.

```javascript
console.log("Hello Git");
```

다시 기능을 추가한다.

```javascript
const name = "Purum";

console.log(`Hello ${name}`);
```

코드가 조금씩 바뀌고 있다.

그런데 이전 상태를 보관하려고 파일을 직접 복사하기 시작하면 이런 일이 생길 수 있다.

```text
project

project_final

project_final2

project_real_final

project_real_final_last

project_real_final_last2
```

어떤 것이 진짜 최신 파일인지 알기 어려워진다.

Git은 이런 문제를 해결하기 위해 사용한다.

Git을 사용하면 프로젝트가 변경되는 과정을 기록할 수 있다.

```text
프로젝트 생성
↓
로그인 화면 추가
↓
버튼 디자인 수정
↓
오류 수정
↓
회원가입 기능 추가
```

각 시점의 변경 내용을 기록해두기 때문에 나중에 무엇을 수정했는지 확인할 수 있다.

Git은 이런 종류의 프로그램을 **버전 관리 시스템**, 영어로는 **Version Control System**이라고 한다.

---

## 2. GitHub는 무엇일까?

Git은 기본적으로 **내 컴퓨터에서 동작하는 프로그램**이다.

Git만 사용해도 변경 기록을 남길 수 있다.

하지만 내 컴퓨터에만 프로젝트가 존재하면 여러 가지 문제가 있다.

컴퓨터가 고장날 수도 있고,

다른 컴퓨터에서 프로젝트를 사용하고 싶을 수도 있고,

팀원과 코드를 공유해야 할 수도 있다.

그래서 Git으로 관리하는 프로젝트를 인터넷에 저장할 수 있는 서비스가 필요하다.

대표적인 서비스가 GitHub다.

```text
내 컴퓨터

Git
↓
코드 변경 기록 관리

        ↓ 인터넷

GitHub
↓
코드 저장 및 공유
```

쉽게 비유하면 다음처럼 생각할 수 있다.

```text
Git
= 파일의 변경 이력을 기록하는 도구

GitHub
= 그 Git 프로젝트를 인터넷에 보관하는 공간
```

---

## 3. Git과 GitHub는 같은 것이 아니다

초보자일 때 가장 많이 헷갈리는 부분이다.

표로 정리하면 다음과 같다.

| 구분 | Git | GitHub |
|------|------|------|
| 종류 | 프로그램 | 웹 서비스 |
| 설치 | 컴퓨터에 설치 | 별도 설치 필요 없음 |
| 주요 역할 | 변경 이력 관리 | 프로젝트 저장 및 공유 |
| 인터넷 | 없어도 사용 가능 | 인터넷 필요 |
| 사용 위치 | 내 컴퓨터 | github.com |
| 협업 | 가능 | 협업을 훨씬 편하게 만들어줌 |

따라서

```text
GitHub를 사용한다
```

고 해서 Git과 같은 의미는 아니다.

보통 실제 개발에서는 두 가지를 함께 사용한다.

```text
Git으로 프로젝트 관리
        ↓
GitHub에 업로드
```

---

## 4. Repository는 무엇일까?

Git과 GitHub를 사용하면 **Repository**라는 단어가 계속 등장한다.

줄여서 `repo`라고 부르기도 한다.

Repository는 우리말로 **저장소**라고 한다.

처음에는

> **Git으로 관리하는 하나의 프로젝트 공간**

이라고 생각하면 된다.

예를 들어 내가 개발 블로그를 만들고 있다면

```text
my-blog
```

라는 프로젝트가 하나의 Repository가 될 수 있다.

CupPick이라는 프로젝트를 만들고 있다면

```text
cup-pick
```

이라는 또 다른 Repository를 만들 수 있다.

GitHub에서도 각각 별도의 저장소로 관리한다.

```text
GitHub

├─ my-blog
├─ cup-pick
└─ tanchunrun
```

---

## 5. Local과 Remote

Git을 공부하면 `local`과 `remote`라는 표현도 자주 나온다.

이것도 어렵게 생각할 필요는 없다.

### Local

현재 내가 사용하고 있는 컴퓨터다.

```text
내 PC
↓
Local
```

### Remote

인터넷에 있는 원격 저장소다.

GitHub Repository가 대표적인 Remote다.

```text
GitHub
↓
Remote
```

그래서 일반적인 Git 작업 구조는 다음과 같다.

```text
내 컴퓨터
Local Repository

       ↓ push

GitHub
Remote Repository
```

반대로 GitHub의 내용을 내 컴퓨터로 가져오는 작업도 있다.

```text
GitHub
Remote Repository

       ↓ pull / clone

내 컴퓨터
Local Repository
```

이번 글에서는 먼저 **내 컴퓨터에서 GitHub로 파일을 올리는 것**까지 진행한다.

---

## 6. Git 설치하기

이제 실제로 Git을 설치해보자.

이 글에서는 **Windows 기준**으로 진행한다.

브라우저에서 [Git 공식 사이트](https://git-scm.com/downloads/win)에 접속한다.

검색창에서 다음과 같이 검색해도 된다.

```text
Git download
```

공식 Git 사이트에서 Windows용 Git을 다운로드한다.

설치 파일 이름은 버전에 따라 달라질 수 있지만 대략 다음과 같은 형태다.

```text
Git-x.xx.x-64-bit.exe
```

여기서 버전 번호는 설치 시점에 따라 달라질 수 있다.

예를 들어

```text
2.xx.x
```

처럼 보일 수 있다.

버전 번호가 이 글과 다르다고 해서 문제가 있는 것은 아니다.

최신 안정 버전을 다운로드하면 된다.

---

## 7. 64비트인지 확인해야 할까?

최근 Windows 컴퓨터는 대부분 64비트를 사용한다.

확인하고 싶다면 Windows에서 다음 위치로 이동한다.

```text
설정
→ 시스템
→ 정보
```

또는 Windows 검색창에서

```text
시스템 정보
```

를 검색한다.

`시스템 종류` 또는 `System type`에서 다음과 비슷한 표시를 확인할 수 있다.

```text
64비트 운영 체제
```

라면 64-bit Git을 설치하면 된다.

---

## 8. Git 설치 시작하기

다운로드한 Git 설치 파일을 실행한다.

Windows에서

```text
이 앱이 디바이스를 변경하도록 허용하시겠습니까?
```

라는 창이 나타날 수 있다.

Git 공식 설치 파일을 정상적으로 다운로드한 경우 `예`를 선택한다.

설치 프로그램이 시작된다.

Git 설치 과정에는 생각보다 많은 선택 화면이 나온다.

처음 보면

> 뭘 선택해야 하지?

싶을 수 있다.

대부분은 기본 설정을 그대로 사용해도 된다.

중요한 항목만 하나씩 확인해보자.

---

## 9. 설치 위치

Git 설치 위치를 선택하는 화면이 나온다.

보통 기본값은 다음과 비슷하다.

```text
C:\Program Files\Git
```

특별한 이유가 없다면 기본값을 그대로 사용하는 것이 좋다.

```text
Next
```

를 선택한다.

---

## 10. Select Components

Git과 함께 설치할 기능을 선택하는 화면이다.

처음 설치한다면 대부분 기본값을 그대로 두어도 된다.

Git Bash나 Git GUI 등 필요한 기본 구성요소가 함께 설치된다.

처음에는 옵션을 전부 이해하려고 하기보다 기본 설정을 유지하는 것을 추천한다.

```text
기본값 유지
→ Next
```

---

## 11. Start Menu Folder

Windows 시작 메뉴에 Git 항목을 생성할 위치를 선택한다.

특별히 바꿀 필요가 없다.

기본값을 유지하고 다음으로 진행한다.

---

## 12. Git 기본 편집기 선택

Git은 특정 상황에서 텍스트 편집기를 사용한다.

예를 들어 Git이 commit 메시지를 편집해야 하는 경우다.

설치 버전에 따라 기본 편집기로 Vim이 선택되어 있을 수 있다.

Vim을 알고 있다면 그대로 사용해도 된다.

하지만 Vim을 처음 사용하는 초보자는 저장하거나 종료하는 방법부터 낯설 수 있다.

아직 VS Code를 설치하지 않았다면 Windows에서 익숙하게 사용할 수 있는 편집기를 선택하거나 기본값을 유지해도 된다.

이번 시리즈에서는 이후 VS Code를 설치하기 때문에 나중에 Git 기본 편집기를 VS Code로 변경할 수도 있다.

즉, 이 단계 때문에 설치를 멈출 필요는 없다.

---

## 13. 새 Repository의 기본 Branch 이름

Git 설치 중 새 Repository를 만들 때 사용할 기본 branch 이름을 정하는 화면이 나올 수 있다.

GitHub에서는 현재 `main`이라는 이름을 기본 branch로 많이 사용한다.

선택지가 있다면

```text
Override the default branch name for new repositories
```

를 선택하고

```text
main
```

으로 설정해도 좋다.

그러면 앞으로

```bash
git init
```

으로 새 Repository를 만들었을 때 기본 branch가 `main`으로 만들어진다.

설치 버전에 따라 화면이나 문구가 다를 수 있으므로 해당 옵션이 보이지 않는다면 그대로 다음 단계로 진행해도 된다.

---

## 14. PATH 설정

Git 설치 과정에서 중요한 부분 중 하나다.

Git을 어디에서 실행할 수 있도록 할 것인지 선택한다.

보통 다음과 비슷한 선택지가 나타난다.

```text
Git from the command line and also from 3rd-party software
```

일반적으로 이 옵션을 사용하면 된다.

이렇게 설정하면

```text
Git Bash
```

뿐 아니라

```text
Command Prompt
PowerShell
VS Code Terminal
```

등에서도 Git 명령어를 사용할 수 있다.

즉,

```bash
git --version
```

같은 명령어를 여러 터미널에서 실행할 수 있게 된다.

---

## 15. SSH 실행 프로그램 선택

설치 중 SSH와 관련된 선택지가 나타날 수 있다.

처음 설치하는 경우 기본값인 Git에 포함된 OpenSSH를 사용해도 된다.

보통 다음과 비슷하게 표시된다.

```text
Use bundled OpenSSH
```

특별히 Windows의 별도 OpenSSH 설정을 관리하고 있는 것이 아니라면 기본값을 유지한다.

SSH가 무엇인지는 뒤에서 간단히 설명한다.

이번 글에서는 초보자가 쉽게 시작할 수 있도록 HTTPS 방식을 먼저 사용한다.

---

## 16. HTTPS 설정

GitHub와 HTTPS로 통신하는 방법에 관한 옵션이 나타날 수 있다.

일반적인 사용자는 기본 선택값을 그대로 사용하면 된다.

Git 설치 버전에 따라 옵션 이름이 조금씩 다를 수 있기 때문에 특별한 목적이 없다면 기본 설정을 유지하는 것이 가장 안전하다.

---

## 17. 줄바꿈 설정

Windows와 Linux/macOS는 줄바꿈 문자를 처리하는 방식에 차이가 있다.

Git 설치 과정에서 줄바꿈 설정 화면이 나타날 수 있다.

초보자라면 기본값을 사용하면 된다.

일반적인 Windows 개발 환경에서는 Git이 운영체제 간 줄바꿈 차이를 적절하게 처리하도록 기본 설정이 되어 있다.

처음부터 이 부분을 변경할 필요는 없다.

---

## 18. Git Bash 터미널 설정

Git Bash에서 사용할 터미널을 선택하는 화면도 나올 수 있다.

특별한 이유가 없다면 기본값을 그대로 사용한다.

Git Bash는 설치가 완료되면 별도의 터미널처럼 사용할 수 있다.

---

## 19. git pull 기본 동작

설치 버전에 따라 `git pull` 동작을 선택하는 화면도 나타날 수 있다.

아직 `pull`, `merge`, `rebase` 개념을 배우지 않았다면 기본값을 그대로 사용하는 것이 좋다.

이 부분은 Git을 실제로 공부하면서 다시 다루게 된다.

---

## 20. Credential Manager

GitHub에 로그인할 때 인증 정보를 관리하는 옵션이 나타날 수 있다.

Windows에서 GitHub를 HTTPS 방식으로 사용할 예정이라면 **Git Credential Manager**를 사용하는 것이 편리하다.

Git Credential Manager는 GitHub 로그인을 보다 쉽게 처리해준다.

예전에는 GitHub 사용자 이름과 비밀번호를 직접 입력하는 방식도 사용했지만 지금은 Git 작업에서 GitHub 계정 비밀번호를 그대로 사용하는 방식과는 다르다.

Credential Manager를 사용하면 필요할 때 브라우저 로그인 등을 통해 인증할 수 있다.

설치 프로그램에서 Credential Manager 관련 옵션이 기본으로 선택되어 있다면 그대로 유지한다.

---

## 21. 설치 완료

마지막까지 기본 옵션을 확인하고 `Install`을 누른다.

설치가 끝나면 다음과 비슷한 버튼이 나타난다.

```text
Finish
```

이제 Git 설치 자체는 끝났다.

하지만 아직 끝난 것이 아니다.

정상적으로 설치되었는지 반드시 확인해야 한다.

---

## 22. Git Bash란?

Git을 설치하면 Windows에 **Git Bash**라는 프로그램도 함께 설치된다.

Windows 검색창에서

```text
Git Bash
```

를 검색한다.

실행하면 검은색 또는 어두운 배경의 터미널 창이 나타난다.

처음 보면 조금 낯설 수 있다.

하지만 Git Bash도 결국 **명령어를 입력하는 터미널**이다.

예를 들어 이곳에서 다음과 같은 Git 명령어를 실행할 수 있다.

```bash
git status
```

```bash
git add .
```

```bash
git commit
```

```bash
git push
```

아직 모든 명령어를 이해할 필요는 없다.

이번 글에서는 설치와 연결에 필요한 것만 사용한다.

---

## 23. Git이 정상 설치됐는지 확인하기

Git Bash를 실행하고 다음 명령어를 입력한다.

```bash
git --version
```

Enter를 누른다.

정상적으로 설치되었다면 다음과 비슷한 결과가 나온다.

```text
git version 2.xx.x.windows.x
```

버전 번호는 설치 시점에 따라 다를 수 있다.

중요한 것은

```text
git version
```

이라는 결과가 정상적으로 나온다는 것이다.

이 결과가 나오면

```text
Git 설치 완료
```

라고 볼 수 있다.

---

## 24. 명령어를 찾을 수 없다고 나오면?

만약 다음과 비슷한 오류가 나온다면

```text
git: command not found
```

또는 Windows 터미널에서

```text
'git'은 내부 또는 외부 명령...
```

같은 메시지가 나온다면 PATH 설정에 문제가 있을 수 있다.

가장 먼저 해볼 것은 터미널을 완전히 종료하고 다시 실행하는 것이다.

Git 설치 전부터 열려 있던 터미널은 새 PATH 설정을 바로 인식하지 못할 수 있다.

그래도 해결되지 않는다면 Git을 다시 설치하면서 PATH 설정 단계에서

```text
Git from the command line and also from 3rd-party software
```

와 비슷한 옵션이 선택되어 있는지 확인한다.

---

## 25. Git 사용자 정보 설정하기

Git을 설치했으면 이제 Git에서 사용할 사용자 정보를 설정한다.

Git은 commit을 남길 때

```text
누가 이 변경 내용을 기록했는가?
```

를 함께 저장한다.

그래서 이름과 이메일을 설정한다.

Git Bash에서 다음 명령어를 입력한다.

```bash
git config --global user.name "사용할 이름"
```

예를 들어 GitHub 사용자 이름을 사용하고 싶다면 다음과 같이 할 수 있다.

```bash
git config --global user.name "eunjung01230"
```

이 이름은 꼭 실명일 필요는 없다.

다만 GitHub에서 활동 기록을 관리할 생각이라면 자신이 계속 사용할 이름을 정해두는 것이 좋다.

---

## 26. Git 이메일 설정하기

다음으로 이메일을 설정한다.

```bash
git config --global user.email "이메일주소"
```

예를 들어

```bash
git config --global user.email "example@gmail.com"
```

처럼 입력한다.

여기서 중요한 점이 있다.

GitHub의 commit 기록과 GitHub 계정을 연결하고 싶다면 **GitHub 계정에 등록된 이메일과 연결되는 이메일을 사용하는 것이 좋다.**

GitHub에서는 개인정보 보호를 위해 실제 이메일 대신 GitHub에서 제공하는 `noreply` 이메일을 사용할 수도 있다.

이메일 공개 여부가 신경 쓰인다면 GitHub의 이메일 개인정보 설정을 확인하고 사용하는 것이 좋다.

---

## 27. `--global`은 무엇일까?

앞에서 이런 명령어를 사용했다.

```bash
git config --global user.name "이름"
```

여기서

```text
--global
```

은 현재 컴퓨터에서 사용하는 Git의 **전체 기본 설정**이라는 의미다.

예를 들어 프로젝트가 여러 개 있다고 해보자.

```text
project-a
project-b
project-c
```

`--global`로 이름과 이메일을 설정하면 기본적으로 세 프로젝트 모두 같은 사용자 정보를 사용한다.

```text
내 PC

Git global 설정
├─ project-a
├─ project-b
└─ project-c
```

특정 프로젝트만 다른 이메일을 사용해야 하는 경우에는 별도 설정도 가능하다.

하지만 개인 컴퓨터에서 혼자 공부하는 단계라면 우선 `--global` 설정으로 시작하면 된다.

---

## 28. 사용자 설정 확인하기

이름을 제대로 설정했는지 확인한다.

```bash
git config --global user.name
```

설정한 이름이 출력된다.

이메일도 확인한다.

```bash
git config --global user.email
```

예를 들어 결과가 다음과 같다면 정상이다.

```text
eunjung01230
example@gmail.com
```

전체 설정을 보고 싶다면 다음 명령어도 사용할 수 있다.

```bash
git config --list
```

여러 설정이 출력된다.

그중에서 다음 항목을 찾으면 된다.

```text
user.name=...
user.email=...
```

---

## 29. Git 설치와 GitHub 로그인은 다른 작업이다

여기까지 진행했다고 해서 GitHub와 연결된 것은 아니다.

현재 상태는 다음과 같다.

```text
내 컴퓨터

Git 설치 완료
↓
사용자 이름 설정 완료
↓
사용자 이메일 설정 완료
```

하지만 아직 GitHub Repository와 연결하지 않았다.

이제 GitHub 쪽 준비를 한다.

---

## 30. GitHub 계정 준비하기

GitHub 사이트에 접속한다.

GitHub 계정이 없다면 회원가입을 먼저 진행한다.

계정이 이미 있다면 로그인한다.

GitHub에서 중요한 이름 중 하나가 **Username**이다.

예를 들어 GitHub 주소가

```text
github.com/eunjung01230
```

이라면

```text
eunjung01230
```

부분이 GitHub username이다.

Repository 주소에서도 계속 사용된다.

---

## 31. GitHub Repository 만들기

이제 연습용 Repository를 하나 만들어보자.

GitHub 로그인 후 새 Repository를 만드는 메뉴로 이동한다.

보통

```text
New repository
```

또는

```text
New
```

버튼을 통해 만들 수 있다.

Repository 이름은 연습용으로 다음처럼 만들 수 있다.

```text
git-test
```

또는

```text
dev-setup-test
```

이름은 자유롭게 정하면 된다.

---

## 32. Public과 Private

Repository를 만들 때 공개 범위를 선택할 수 있다.

### Public

```text
다른 사람이 Repository를 볼 수 있음
```

오픈소스 프로젝트나 공개 포트폴리오 등에 사용할 수 있다.

### Private

```text
허용된 사용자만 Repository를 볼 수 있음
```

개인 작업이나 공개하면 안 되는 프로젝트에 사용할 수 있다.

단순한 Git 연습용 Repository라면 어느 쪽을 선택해도 상관없다.

공개해도 되는 테스트 파일만 사용할 예정이라면 Public으로 만들어도 된다.

---

## 33. README는 어떻게 할까?

새 Repository를 만들 때 README 파일을 함께 생성할 수 있다.

하지만 이번에는 **내 컴퓨터에서 먼저 프로젝트를 만들고 GitHub로 push하는 과정을 연습**할 것이다.

따라서 학습을 단순하게 하기 위해 빈 Repository로 만들어도 된다.

즉, 처음 연습할 때는

```text
README 자동 생성 X
.gitignore 자동 생성 X
License 자동 생성 X
```

상태로 Repository를 생성한다.

그러면 GitHub에서 Git 연결 방법을 안내하는 화면이 나타난다.

---

## 34. 이제 Local 프로젝트 만들기

Git Bash로 돌아온다.

먼저 연습할 폴더로 이동한다.

Git Bash에서는 다음 명령어로 현재 위치를 확인할 수 있다.

```bash
pwd
```

현재 폴더 안의 파일을 확인하려면

```bash
ls
```

를 사용할 수 있다.

Windows 사용자 폴더의 Desktop으로 이동하고 싶다면 환경에 따라 다음처럼 이동할 수 있다.

```bash
cd ~/Desktop
```

연습용 폴더를 만든다.

```bash
mkdir git-test
```

만든 폴더로 이동한다.

```bash
cd git-test
```

---

## 35. 현재 위치 확인하기

다시 다음 명령어를 입력한다.

```bash
pwd
```

경로의 마지막 부분이

```text
git-test
```

인지 확인한다.

Git 명령어는 **현재 어느 폴더에 있는지**가 굉장히 중요하다.

잘못된 폴더에서 Git 명령어를 실행하면 엉뚱한 프로젝트를 Git 저장소로 만들 수도 있다.

따라서 초보자일수록 명령어를 실행하기 전에 현재 위치를 확인하는 습관을 들이는 것이 좋다.

---

## 36. 테스트 파일 만들기

연습용 파일 하나를 만든다.

Git Bash에서 간단하게 다음 명령어를 사용할 수 있다.

```bash
echo "# Git Test" > README.md
```

파일이 만들어졌는지 확인한다.

```bash
ls
```

다음 파일이 보이면 된다.

```text
README.md
```

---

## 37. Git Repository로 만들기

현재 `git-test` 폴더는 그냥 일반 폴더다.

이 폴더를 Git이 관리하도록 만들어야 한다.

다음 명령어를 입력한다.

```bash
git init
```

정상적으로 실행되면 Git Repository가 초기화되었다는 메시지가 나온다.

이제 구조는 다음과 같다.

```text
git-test

일반 폴더
   ↓
git init
   ↓
Git Repository
```

Git은 내부적으로 `.git`이라는 숨김 폴더를 만들어 변경 기록을 관리한다.

`.git` 폴더는 Git Repository에서 매우 중요한 영역이므로 내용을 잘 모르는 상태에서 직접 수정하거나 삭제하지 않는 것이 좋다.

---

## 38. 현재 Git 상태 확인하기

Git에서 가장 자주 사용하는 명령어 중 하나다.

```bash
git status
```

현재 Repository의 상태를 보여준다.

처음 실행하면 README.md가 아직 Git에 기록되지 않은 파일로 표시될 수 있다.

즉,

```text
README.md 파일은 존재함

하지만

Git 기록에는 아직 들어가지 않음
```

이라는 상태다.

---

## 39. Git 기록 과정 이해하기

Git에서는 파일을 만든다고 바로 기록되는 것이 아니다.

보통 다음 단계를 거친다.

```text
파일 수정
↓
git add
↓
git commit
```

쉽게 이해하면

```text
파일 작성

↓

이번 기록에 포함할 파일 선택
git add

↓

하나의 기록으로 저장
git commit
```

이다.

---

## 40. git add 하기

README.md 파일을 이번 기록에 포함시킨다.

```bash
git add README.md
```

현재 폴더에서 변경된 파일을 모두 추가하고 싶다면 다음 명령어도 많이 사용한다.

```bash
git add .
```

여기서 `.`은 현재 위치를 의미한다.

다시 상태를 확인한다.

```bash
git status
```

README.md가 commit할 준비가 된 상태로 표시된다.

---

## 41. 첫 commit 만들기

이제 첫 번째 Git 기록을 만든다.

```bash
git commit -m "first commit"
```

여기서

```text
commit
```

은 하나의 변경 기록을 남기는 작업이다.

`-m` 뒤에는 이 commit이 어떤 작업인지 설명하는 메시지를 적는다.

예를 들어

```bash
git commit -m "add README"
```

처럼 적을 수도 있다.

실제 프로젝트에서는

```text
로그인 기능 추가
버튼 오류 수정
README 작성
```

처럼 무엇을 변경했는지 이해할 수 있도록 메시지를 작성하는 것이 좋다.

---

## 42. 현재 branch 확인하기

다음 명령어를 실행한다.

```bash
git branch
```

현재 branch가 표시된다.

앞에서 기본 branch를 `main`으로 설정했다면 다음처럼 보일 수 있다.

```text
* main
```

만약 다른 이름으로 되어 있고 이번 연습에서 `main`으로 맞추고 싶다면 다음 명령어를 사용할 수 있다.

```bash
git branch -M main
```

처음에는 branch가 무엇인지 완벽하게 이해하지 않아도 된다.

지금은

> Git 프로젝트 안에서 현재 작업하는 기본 작업 공간

정도로 이해하면 충분하다.

branch는 Git & GitHub 카테고리의 학습 글에서 자세히 다룬다.

---

## 43. GitHub Repository 주소 확인하기

GitHub에서 앞에서 만든 `git-test` Repository를 연다.

Repository 주소는 보통 다음과 같은 형태다.

```text
https://github.com/사용자이름/git-test.git
```

예를 들어 GitHub username이

```text
eunjung01230
```

이라면 다음과 비슷한 형태가 된다.

```text
https://github.com/eunjung01230/git-test.git
```

이 주소는 각자 다르므로 **자신의 Repository 주소를 사용해야 한다.**

---

## 44. Local Repository와 GitHub 연결하기

Git Bash에서 다음 명령어를 입력한다.

```bash
git remote add origin https://github.com/사용자이름/git-test.git
```

반드시 자신의 GitHub 주소로 변경한다.

예를 들어

```bash
git remote add origin https://github.com/eunjung01230/git-test.git
```

처럼 사용할 수 있다.

이 명령어의 의미는 다음과 같다.

```text
git remote add

→ 원격 저장소를 등록한다

origin

→ 그 원격 저장소에 origin이라는 이름을 붙인다

GitHub URL

→ 실제 연결할 Repository 주소
```

---

## 45. origin은 무엇일까?

Git을 처음 배우면 `origin`이라는 단어가 자주 나온다.

특별한 GitHub 기능 이름은 아니다.

원격 Repository에 붙인 **별명**이다.

일반적으로 GitHub의 기본 원격 저장소를

```text
origin
```

이라고 부르는 관례가 있다.

즉,

```text
origin
=
내가 연결한 GitHub Repository
```

라고 이해하면 된다.

---

## 46. Remote 연결 확인하기

다음 명령어를 입력한다.

```bash
git remote -v
```

정상적으로 연결되어 있다면 다음과 비슷한 결과가 나온다.

```text
origin  https://github.com/사용자이름/git-test.git (fetch)
origin  https://github.com/사용자이름/git-test.git (push)
```

`fetch`와 `push` 주소가 보인다면 GitHub Repository 주소가 등록된 것이다.

아직 파일을 GitHub로 올린 것은 아니다.

현재 상태는

```text
Local Repository
      ↕
GitHub 주소 등록
```

까지만 완료된 것이다.

---

## 47. GitHub에 첫 push 하기

이제 Local Repository의 commit을 GitHub로 올린다.

```bash
git push -u origin main
```

처음 실행하면 GitHub 인증 과정이 나타날 수 있다.

환경에 따라 브라우저가 열리면서 GitHub 로그인 화면이 나타날 수도 있다.

GitHub 계정에 로그인하고 Git Credential Manager의 인증 요청이 나타나면 정상적인 계정인지 확인한 뒤 인증한다.

---

## 48. `git push -u origin main` 뜻

명령어가 길어 보이지만 나눠보면 어렵지 않다.

```text
git push
→ Local의 commit을 Remote로 보낸다

origin
→ 보낼 원격 저장소

main
→ 보낼 branch
```

즉,

```text
현재 Local의 main branch를
origin이라는 GitHub Repository로 올린다
```

는 뜻이다.

`-u`는 Local의 `main`과 Remote의 `main`을 연결해서 이후 명령어를 조금 더 간단하게 사용할 수 있도록 해준다.

첫 연결 이후에는 상황에 따라

```bash
git push
```

만으로도 push할 수 있다.

---

## 49. GitHub 로그인 창이 나오는 이유

GitHub에는 아무나 코드를 올릴 수 있으면 안 된다.

예를 들어 다른 사람이 내 Repository 주소만 안다고 해서 내 프로젝트를 마음대로 수정하면 큰 문제가 된다.

그래서 GitHub는

```text
이 Repository에 push하려는 사람이
정말 권한을 가진 사용자인가?
```

를 확인한다.

이것이 인증 과정이다.

Git Credential Manager를 사용하는 환경에서는 브라우저를 통해 GitHub 계정 인증이 진행될 수 있다.

한 번 정상적으로 인증하면 이후 작업에서는 인증 정보가 관리되어 매번 같은 과정을 반복하지 않을 수 있다.

---

## 50. GitHub 비밀번호를 Git에 직접 입력하면 될까?

GitHub의 웹사이트 로그인 비밀번호와 Git 명령어의 인증 방식을 동일하게 생각하면 안 된다.

예전 자료를 보면 다음처럼 설명하는 글이 있을 수 있다.

```text
Username 입력
Password 입력
```

하지만 현재 GitHub의 HTTPS Git 작업에서는 일반 계정 비밀번호를 그대로 Git 인증 비밀번호로 사용하는 예전 방식과 다르다.

그래서 최신 Git for Windows 환경에서는 Git Credential Manager를 이용해 브라우저 로그인 방식으로 인증하는 것이 초보자에게 편리하다.

별도로 Personal Access Token을 사용하는 방식도 있지만 이번 입문 글에서는 Credential Manager를 기준으로 진행한다.

---

## 51. Push 성공 확인하기

push가 성공했다면 GitHub Repository 페이지를 새로고침한다.

앞에서 만든

```text
README.md
```

파일이 GitHub에 나타나는지 확인한다.

그리고 commit 메시지도 확인할 수 있다.

예를 들어

```text
first commit
```

또는

```text
add README
```

가 표시된다면 성공이다.

전체 과정은 다음과 같다.

```text
README.md 작성
↓
git add
↓
git commit
↓
git push
↓
GitHub에 README.md 표시
```

여기까지 되었다면 **Git과 GitHub 연결이 정상적으로 완료된 것**이다.

---

## 52. 마지막으로 다시 상태 확인하기

Git Bash에서 다음 명령어를 실행한다.

```bash
git status
```

변경 사항이 없다면 다음과 비슷한 메시지를 볼 수 있다.

```text
nothing to commit, working tree clean
```

쉽게 말하면

```text
현재 추가로 기록할 변경 사항이 없다
```

는 의미다.

GitHub와 Remote 연결도 다시 확인한다.

```bash
git remote -v
```

그리고 Git 사용자 정보도 확인한다.

```bash
git config --global user.name
```

```bash
git config --global user.email
```

마지막으로 Git 버전을 확인한다.

```bash
git --version
```

---

## 53. 최종 점검 체크리스트

다음 항목이 모두 정상이라면 이번 개발환경 구축은 완료된 것이다.

```text
□ Git 설치 완료

□ git --version 정상 출력

□ Git Bash 실행 가능

□ user.name 설정 완료

□ user.email 설정 완료

□ GitHub 로그인 가능

□ GitHub Repository 생성

□ Local Repository 생성

□ git init 완료

□ 첫 git add 완료

□ 첫 git commit 완료

□ origin 연결

□ git remote -v 정상 출력

□ git push 성공

□ GitHub에서 업로드된 파일 확인
```

---

## 54. Git 작업의 기본 흐름 미리 보기

앞으로 Git을 사용하면서 가장 자주 보게 될 흐름은 다음과 같다.

```text
파일 작성 또는 수정

↓

git status
현재 변경 상태 확인

↓

git add .
변경 사항을 commit 대상으로 선택

↓

git commit -m "메시지"
하나의 변경 기록 생성

↓

git push
GitHub로 업로드
```

처음에는 명령어를 외우려고 하기보다 흐름을 이해하는 것이 중요하다.

```text
수정한다
↓
선택한다
↓
기록한다
↓
GitHub로 보낸다
```

라고 기억하면 된다.

---

## 55. Git Bash를 껐다가 다시 켜도 기록이 사라질까?

사라지지 않는다.

Git 기록은 Git Bash 창 안에 임시로 저장되는 것이 아니다.

Repository의 `.git` 영역에 저장된다.

따라서 터미널을 종료하고 컴퓨터를 재부팅해도 Git 기록은 그대로 남아 있다.

다시 프로젝트 폴더로 이동해서

```bash
git status
```

를 실행하면 Git 상태를 확인할 수 있다.

---

## 56. GitHub에 올렸으면 컴퓨터 파일을 지워도 될까?

GitHub에 코드가 올라가 있더라도 무작정 Local 프로젝트를 지우는 습관은 좋지 않다.

GitHub가 백업 역할을 어느 정도 할 수는 있지만 Git과 GitHub의 목적 자체를 단순한 파일 백업 서비스로만 생각하면 안 된다.

실제 개발에서는

```text
Local
+
Git 기록
+
Remote Repository
```

를 함께 사용한다.

새로운 컴퓨터에서는 GitHub의 Repository를 `clone`해서 다시 가져올 수 있다.

`clone`은 이후 글에서 자세히 다룬다.

---

## 57. HTTPS와 SSH는 무엇이 다를까?

GitHub Repository 주소를 보면 보통 HTTPS와 SSH 방식을 볼 수 있다.

HTTPS 주소는 다음과 비슷하다.

```text
https://github.com/username/repository.git
```

SSH는 다음과 비슷하다.

```text
git@github.com:username/repository.git
```

둘 다 GitHub Repository에 연결할 수 있다.

이번 글에서는 초보자가 시작하기 쉬운 **HTTPS 방식**을 사용했다.

```text
HTTPS
→ 브라우저/Git Credential Manager 인증 사용 가능
→ 처음 시작하기 비교적 편함
```

SSH는 공개키와 개인키를 생성하고 GitHub에 공개키를 등록해서 인증하는 방식이다.

SSH를 자주 사용하는 개발 환경에서는 매우 편리하지만 처음 Git을 설치하는 단계에서는 인증 과정까지 한꺼번에 배우면 복잡할 수 있다.

필요해질 때 별도로 SSH 연결 방법을 익혀도 늦지 않다.

---

## 58. SourceTree를 설치하면 Git Bash는 필요 없을까?

다음 Dev Setup 글에서는 SourceTree를 설치할 예정이다.

SourceTree에서는 버튼을 이용해

```text
commit
push
pull
branch
```

같은 Git 작업을 할 수 있다.

그렇다고 Git Bash를 더 이상 사용할 필요가 없는 것은 아니다.

SourceTree는 Git을 보다 쉽게 조작할 수 있도록 화면을 제공하는 프로그램이고 실제 핵심은 Git이다.

```text
Git
→ 실제 버전 관리

Git Bash
→ 명령어로 Git 사용

SourceTree
→ 화면으로 Git 사용
```

세 가지 관계를 이렇게 이해하면 된다.

Git 명령어를 알고 있으면 SourceTree에서 어떤 동작이 일어나는지도 이해하기 쉬워진다.

---

## 59. 초보자가 자주 하는 실수

### 1. 현재 폴더를 확인하지 않고 `git init` 실행

Git은 현재 위치를 기준으로 동작한다.

따라서 항상

```bash
pwd
```

또는

```bash
git status
```

를 사용해 현재 프로젝트 위치를 확인하는 습관을 들이는 것이 좋다.

### 2. GitHub Repository 주소를 그대로 복사하지 않음

다른 사람의 예제 주소를 그대로 사용하면 안 된다.

```text
https://github.com/사용자이름/저장소이름.git
```

에서 자신의 사용자 이름과 Repository 주소를 사용해야 한다.

가장 안전한 방법은 GitHub Repository의 주소를 직접 복사하는 것이다.

### 3. commit 전에 add를 하지 않음

Git에서는 일반적으로 다음 순서가 필요하다.

```text
수정

↓

add

↓

commit
```

파일을 수정했다고 바로 commit되는 것이 아니다.

### 4. commit만 하고 GitHub에 올라갔다고 생각함

이것도 매우 많이 헷갈리는 부분이다.

```text
commit
```

은 기본적으로 Local Git 기록이다.

```text
push
```

를 해야 GitHub에 올라간다.

즉,

```text
commit
≠ GitHub 업로드
```

다.

정확한 흐름은

```text
Local

git commit

↓

git push

↓

GitHub
```

다.

### 5. GitHub에서 파일이 안 보이는데 push 성공 여부를 확인하지 않음

GitHub에 파일이 없다면 먼저 터미널에서 push 결과를 확인한다.

그리고 다음 명령어들도 확인한다.

```bash
git status
```

```bash
git branch
```

```bash
git remote -v
```

현재 상태, branch, 연결된 Repository 주소를 차례대로 확인하면 문제를 찾는 데 도움이 된다.

---

## 60. 오늘 사용한 명령어 정리

이번 글에서 사용한 Git 명령어를 한 번에 정리하면 다음과 같다.

Git 버전 확인:

```bash
git --version
```

Git 사용자 이름 설정:

```bash
git config --global user.name "이름"
```

Git 사용자 이메일 설정:

```bash
git config --global user.email "이메일"
```

사용자 정보 확인:

```bash
git config --global user.name
git config --global user.email
```

전체 설정 확인:

```bash
git config --list
```

Git Repository 생성:

```bash
git init
```

상태 확인:

```bash
git status
```

파일 추가:

```bash
git add .
```

commit:

```bash
git commit -m "commit message"
```

branch 확인:

```bash
git branch
```

branch 이름을 main으로 변경:

```bash
git branch -M main
```

GitHub Repository 연결:

```bash
git remote add origin GitHub주소
```

Remote 확인:

```bash
git remote -v
```

GitHub에 최초 push:

```bash
git push -u origin main
```

이후 push:

```bash
git push
```

지금 당장 이 명령어를 전부 외울 필요는 없다.

실제로 프로젝트를 반복해서 사용하다 보면 자연스럽게 익숙해진다.

---

## 정리

이번 글에서는 Git과 GitHub를 처음 사용할 수 있도록 개발환경을 구축했다.

전체 과정을 다시 보면 다음과 같다.

```text
Git 설치

↓

Git Bash 실행

↓

git --version
설치 확인

↓

user.name
user.email
사용자 정보 설정

↓

GitHub Repository 생성

↓

Local Repository 생성

↓

git init

↓

git add

↓

git commit

↓

git remote add origin

↓

git push

↓

GitHub에서 파일 확인
```

Git과 GitHub의 역할도 다시 구분해보자.

```text
Git
→ 내 컴퓨터에서 코드의 변경 이력을 관리한다.

GitHub
→ Git Repository를 인터넷에 저장하고 공유한다.
```

그리고 오늘 가장 중요한 흐름은 이것이다.

```text
코드 수정

↓

Git으로 기록

↓

GitHub로 push
```

Git을 처음 시작하면 명령어가 많아 보여 어렵게 느껴진다.

하지만 지금 단계에서는 모든 명령어를 외우는 것보다

> **Local에서 작업한 내용을 Git으로 기록하고 GitHub라는 Remote Repository에 올린다**

는 구조를 이해하는 것이 더 중요하다.

이제 Git을 사용할 수 있는 기본 환경이 만들어졌다.

다음 Dev Setup에서는 Git을 명령어가 아닌 화면으로 조작할 수 있도록 **SourceTree를 설치하고 GitHub Repository와 연결**해본다.

```text
Dev Setup

00 개발환경 구축 전체 가이드
   ↓

01 Git & GitHub 개발환경 구축  ← 현재
   ↓

02 SourceTree 환경 구축
   ↓

03 VS Code 환경 구축
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
