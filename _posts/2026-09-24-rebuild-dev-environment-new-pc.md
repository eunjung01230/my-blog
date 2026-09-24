---
layout: post
title: "새 PC에서 개발환경 다시 구축하기"
date: 2026-09-24 23:05:00 +0900
categories: dev-setup
learningOrder: 90
tags:
  - dev-environment
  - checklist
  - windows
  - setup
---

개발 공부를 어느 정도 하다 보면 언젠가는 개발환경을 다시 만들어야 하는 순간이 온다.

예를 들면 이런 경우다.

```text
새 노트북을 샀다.

Windows를 다시 설치했다.

기존 컴퓨터가 고장 났다.

학교나 회사에서 새로운 PC를 받았다.

개발용 계정을 새로 만들었다.

기존 개발환경이 너무 꼬여서 처음부터 다시 구축하고 싶다.

( 블로그작성자처럼 노트북이 하나가 아니다...)
```

처음 개발환경을 만들 때는 하나씩 검색하면서 설치했기 때문에 시간이 오래 걸린다.

Git을 설치하고,

VS Code를 설치하고,

Node.js를 설치하고,

JDK를 설치하고,

IntelliJ를 설치하고,

Tomcat까지 설치하고 나면 어느새 프로그램이 상당히 많아진다.

문제는 몇 달 뒤 새로운 컴퓨터를 사용하게 되었을 때다.

> Git부터 설치했던가?

> Node.js가 먼저였나 VS Code가 먼저였나?

> JDK만 설치하면 Java가 바로 되는 건가?

> JAVA_HOME에는 bin을 넣었었나?

> IntelliJ 안에서 JDK를 또 연결해야 했나?

> Tomcat은 설치 프로그램이었나 ZIP이었나?

하나씩 배울 때는 이해했는데 전체 환경을 처음부터 다시 만들려고 하면 순서가 잘 기억나지 않을 수 있다.

그래서 이번 글에서는 지금까지 만든 Dev Setup을 **새 PC에서 처음부터 다시 구축하는 순서**로 정리한다.

이번 글의 목표는 새로운 내용을 많이 배우는 것이 아니다.

> **앞에서 배운 개발환경을 새로운 컴퓨터에서도 다시 만들 수 있도록 하나의 체크리스트로 만드는 것**

이 목표다.

전체 순서는 다음과 같다.

```text
Windows 기본 확인
   ↓
Git
   ↓
GitHub
   ↓
SourceTree
   ↓
VS Code
   ↓
Node.js / npm
   ↓
JDK 21
   ↓
IntelliJ IDEA
   ↓
Tomcat
   ↓
GitHub 프로젝트 Clone
   ↓
프로젝트별 버전 확인
   ↓
최종 동작 테스트
```

---

## 1. 왜 설치 순서를 정해둘까?

각 프로그램은 완전히 독립적으로 존재하는 것처럼 보이지만 실제로는 서로 연결되어 있다.

예를 들어 SourceTree는 Git을 사용한다.

```text
Git
↓
SourceTree
```

IntelliJ에서 Java 프로그램을 만들려면 JDK가 필요하다.

```text
JDK
↓
IntelliJ
```

Tomcat은 Java로 실행되기 때문에 Java Runtime 환경이 필요하다.

```text
JDK
↓
Tomcat
```

VS Code 터미널에서 Node.js 명령어를 사용하려면 Node.js가 먼저 설치되어 있어야 한다.

```text
Node.js
↓
VS Code Terminal
↓
node / npm 명령어 사용
```

따라서 무작정 프로그램을 생각나는 대로 설치하기보다 **의존 관계를 고려해서 순서를 정해두면 오류가 줄어든다.**

---

## 2. 이번 글에서 사용할 설치 순서

이번 Dev Setup에서는 다음 순서를 기준으로 다시 구축한다.

```text
00. Windows 기본 상태 확인

01. Git 설치
02. Git 사용자 설정
03. GitHub 연결 확인

04. SourceTree 설치
05. GitHub 계정 연결

06. VS Code 설치
07. VS Code PATH / Terminal 확인

08. Node.js 설치
09. npm 확인

10. JDK 21 설치
11. JAVA_HOME 설정
12. PATH 설정

13. IntelliJ IDEA 설치
14. JDK 21 연결

15. Tomcat 설치
16. CATALINA_HOME 설정
17. localhost 확인

18. GitHub 프로젝트 Clone

19. 프로젝트별 추가 환경변수 복구

20. 전체 버전 확인
```

이 순서를 무조건 지켜야만 설치가 되는 것은 아니다.

예를 들어 VS Code를 Git보다 먼저 설치해도 된다.

하지만 처음부터 다시 구축할 때는 이 순서대로 진행하면 지금까지 배운 Dev Setup 흐름과 같아서 이해하기 쉽다.

---

## 3. 새 PC 개발환경 구축 전에 준비할 것

프로그램을 바로 설치하기 전에 먼저 확인할 것이 있다.

### Windows 업데이트

가능하면 Windows Update를 먼저 확인한다.

```text
설정
→ Windows Update
```

운영체제 업데이트가 많이 밀려 있다면 개발 도구를 설치하기 전에 업데이트하는 편이 좋다.

특히 새 PC라면 업데이트 후 재부팅이 여러 번 필요할 수도 있다.

### Windows 계정 확인

현재 어떤 Windows 사용자 계정을 사용하고 있는지도 확인한다.

개발 프로그램의 일부 설정은 사용자 계정별로 저장된다.

예를 들어

```text
C:\Users\사용자이름
```

경로가 여러 프로그램의 기본 위치에 사용된다.

### 시스템 종류 확인

Windows에서

```text
설정
→ 시스템
→ 정보
```

로 이동한다.

다음과 같은 항목을 확인한다.

```text
시스템 종류

64비트 운영 체제

x64 기반 프로세서
```

대부분의 일반적인 Intel/AMD Windows PC라면 x64 설치 파일을 사용한다.

ARM 기반 Windows PC라면 ARM64용 프로그램이 있는지 확인해야 한다.

---

## 4. 개발용 기본 폴더부터 만들기

새 PC에서는 프로젝트 위치를 처음부터 정해두는 것이 좋다.

예를 들어

```text
C:\dev
```

또는

```text
C:\Users\사용자이름\projects
```

같은 폴더를 만든다.

이번 글에서는 예시로

```text
C:\dev
```

를 사용한다.

구조는 나중에 다음처럼 될 수 있다.

```text
C:\dev

├─ projects
│  ├─ my-blog
│  ├─ cup-pick
│  └─ java-study
│
└─ tools
   └─ apache-tomcat
```

반드시 이런 구조로 해야 하는 것은 아니다.

중요한 것은

> **내 프로젝트와 개발 도구가 어디에 있는지 내가 쉽게 찾을 수 있게 정리하는 것**

이다.

---

## 5. 첫 번째 — Git 설치

가장 먼저 [Git](https://git-scm.com/downloads/win)을 설치한다.

Git은 앞으로 GitHub Repository를 Clone하고 프로젝트 변경 이력을 관리할 때 필요하다.

새 PC에서 기존 프로젝트를 가져오려면 결국 Git이 필요하기 때문에 초반에 설치하는 것이 좋다.

---

## 6. Git 설치 확인

Git 설치가 끝났다면 새 Git Bash 또는 Terminal을 연다.

입력한다.

```bash
git --version
```

정상이라면 다음과 비슷한 결과가 나온다.

```text
git version ...
```

정확한 버전 숫자는 설치 시점에 따라 다를 수 있다.

중요한 것은 명령어가 정상적으로 실행되는 것이다.

---

## 7. Git 사용자 이름 다시 설정

새 PC에서는 기존 PC에서 했던 Git 설정이 자동으로 따라오지 않을 수 있다.

사용자 이름을 설정한다.

```bash
git config --global user.name "사용할 이름"
```

예:

```bash
git config --global user.name "eunjung01230"
```

---

## 8. Git 이메일 설정

이메일도 설정한다.

```bash
git config --global user.email "이메일주소"
```

예:

```bash
git config --global user.email "example@gmail.com"
```

GitHub Commit 기록과 연결할 목적이라면 GitHub 계정과 연결된 이메일 또는 GitHub의 noreply 이메일 사용 여부를 확인한다.

---

## 9. Git 사용자 정보 확인

다음 명령어로 확인한다.

```bash
git config --global user.name
```

```bash
git config --global user.email
```

또는 전체 설정을 본다.

```bash
git config --list
```

---

## 10. Git 기본 Branch 설정도 확인

새 Repository의 기본 Branch를 `main`으로 사용하고 싶다면 다음처럼 설정할 수 있다.

```bash
git config --global init.defaultBranch main
```

확인:

```bash
git config --global init.defaultBranch
```

결과:

```text
main
```

---

## 11. Git 설치 최종 체크

```text
□ Git 설치

□ git --version 확인

□ user.name 설정

□ user.email 설정

□ 기본 branch 설정 확인
```

여기까지 문제가 없다면 Git 준비는 끝났다.

---

## 12. 두 번째 — GitHub 로그인 확인

Git은 내 컴퓨터에서 사용하는 프로그램이다.

GitHub는 인터넷의 Remote Repository 서비스다.

따라서 새 PC에서 Git을 설치했다고 GitHub까지 자동으로 로그인되는 것은 아니다.

브라우저에서 GitHub에 접속한다.

자신의 계정으로 로그인한다.

---

## 13. GitHub에서 확인할 것

GitHub Profile에 들어가 기존 Repository들이 정상적으로 보이는지 확인한다.

예:

```text
my-blog

cup-pick

기타 프로젝트
```

Private Repository가 있다면 해당 계정에서 정상적으로 접근할 수 있는지도 확인한다.

---

## 14. 아직 프로젝트를 Clone하지 않는다

지금 바로 모든 Repository를 Clone해도 되지만 이번 글에서는 개발 도구들을 먼저 구축한 뒤 마지막에 프로젝트를 가져온다.

이유는 프로젝트마다

```text
Node.js

JDK

npm

환경변수

Database

기타 도구
```

가 필요할 수 있기 때문이다.

우선 기본 개발환경부터 완성한다.

---

## 15. 세 번째 — SourceTree 설치

Git 설치가 끝났다면 [SourceTree](https://www.sourcetreeapp.com/)를 설치한다.

SourceTree는 Git을 GUI로 관리할 수 있는 프로그램이다.

구조를 다시 보면 다음과 같다.

```text
Git
→ 실제 Version Control

SourceTree
→ Git을 화면으로 사용
```

---

## 16. SourceTree에서 Git 연결 확인

SourceTree를 실행한다.

설정에서 Git 관련 항목을 확인한다.

앞서 설치한 System Git을 정상적으로 찾고 있는지 확인한다.

Git이 이미 설치되어 있으므로 SourceTree가 기존 Git을 사용하도록 구성하면 이해하기 쉽다.

---

## 17. GitHub 계정 연결

SourceTree의 Account 설정에서 GitHub 계정을 연결한다.

브라우저 인증 또는 제공되는 인증 방식을 이용한다.

GitHub 계정을 여러 개 사용한다면 **어떤 계정으로 로그인했는지 반드시 확인한다.**

---

## 18. SourceTree 최종 확인

현재는 아직 프로젝트를 Clone하지 않았으므로 다음 정도만 확인하면 된다.

```text
□ SourceTree 실행

□ Git 연결 정상

□ GitHub 계정 연결

□ 올바른 GitHub 계정인지 확인
```

---

## 19. 네 번째 — VS Code 설치

다음은 [VS Code](https://code.visualstudio.com/download)다.

앞으로 HTML, CSS, JavaScript, React, Next.js, Markdown, JSON 등 여러 파일을 작성하는 기본 Editor로 사용할 수 있다.

---

## 20. VS Code 설치 옵션 확인

Windows Installer를 이용한다.

설치 과정에서 가능하면 다음 항목을 확인한다.

```text
PATH 추가

폴더를 Code로 열기

파일을 Code로 열기
```

특히 PATH가 정상적으로 등록되면 터미널에서

```bash
code .
```

를 사용할 수 있다.

---

## 21. VS Code 설치 후 터미널 다시 열기

VS Code를 설치한 뒤 기존 Terminal이 열려 있었다면 닫는다.

새 Terminal을 연다.

확인:

```bash
code --version
```

버전 정보가 나오면 정상이다.

---

## 22. `code .` 확인

연습용 폴더로 이동한다.

예:

```bash
cd /c/dev
```

Git Bash 기준 예시다.

다음 명령어를 실행한다.

```bash
code .
```

현재 폴더가 VS Code에서 열린다면 PATH 연결도 정상이다.

---

## 23. VS Code Terminal 확인

VS Code에서

```text
Terminal
→ New Terminal
```

을 연다.

다음 명령어를 실행한다.

```bash
git --version
```

Git 버전이 정상적으로 출력되는지 확인한다.

즉 현재

```text
VS Code
↓
Terminal
↓
Git
```

연결도 확인한 것이다.

---

## 24. 필요한 Extension 다시 설치

새 PC에서는 기존 VS Code Extension이 자동으로 존재하지 않을 수 있다.

[계정 동기화](https://code.visualstudio.com/docs/configure/settings-sync)를 사용하는 경우 일부 설정과 Extension을 복구할 수도 있지만, 처음부터 필요한 것만 설치하는 것도 좋다.

예를 들어 현재 Dev Setup에서 사용했던 확장은 다음 정도다.

```text
Live Server

Prettier

Korean Language Pack
```

필요한 것만 설치한다.

---

## 25. 확장 프로그램을 무조건 전부 복구하지 않기

예전 PC에서 Extension을 많이 설치했다고 해서 새 PC에 전부 다시 설치할 필요는 없다.

현재 실제로 사용하는 것만 설치하면 된다.

```text
지금 쓰는가?

↓

YES
→ 설치

NO
→ 일단 설치하지 않음
```

개발환경을 새로 만들 때는 불필요한 설정을 정리할 기회이기도 하다.

---

## 26. VS Code 체크리스트

```text
□ VS Code 설치

□ code --version

□ code . 실행

□ Terminal 실행

□ Terminal에서 git --version

□ 필요한 Extension 설치
```

---

## 27. 다섯 번째 — Node.js 설치

JavaScript 프로젝트를 실행하려면 [Node.js](https://nodejs.org/en/download)가 필요하다.

특히 앞으로

```text
React

Next.js

npm

개발 서버

Frontend Build
```

등을 사용할 때 중요하다.

---

## 28. Node.js 버전 선택

새 PC라고 무조건 가장 최신 Current 버전을 설치하지 않는다.

먼저 자신이 사용할 프로젝트가 어떤 Node.js 버전을 요구하는지 확인하는 것이 좋다.

아직 특정 프로젝트 요구사항이 없다면 지원 중인 LTS 계열을 기준으로 설치한다.

---

## 29. 기존 프로젝트가 있다면 README 확인

예를 들어 GitHub Repository의 README에

```text
Node.js 24 이상

또는

Node 22 사용
```

같은 요구사항이 있을 수 있다.

또는 다음 파일이 존재할 수도 있다.

```text
.nvmrc
```

```text
.node-version
```

프로젝트 규칙이 있다면 그 버전을 우선한다.

---

## 30. 처음 구축하는 기본 환경이라면

현재 Dev Setup에서 정한 Node.js LTS 버전을 설치한다.

설치 과정에서 Node.js와 npm이 함께 설치되는지 확인한다.

---

## 31. 설치 후 터미널 재시작

Node.js 설치 후에는 기존 VS Code Terminal과 Git Bash를 닫는다.

새 터미널을 실행한다.

Node.js 버전 확인:

```bash
node -v
```

npm 버전 확인:

```bash
npm -v
```

두 명령어가 모두 정상적으로 출력되어야 한다.

---

## 32. 실제 Node.js 실행 테스트

버전만 확인하지 말고 간단히 실행해본다.

연습 폴더를 만든다.

```text
C:\dev\node-test
```

VS Code로 연다.

```bash
code .
```

`hello.js`를 만든다.

```javascript
console.log("Node.js setup complete!");
```

터미널에서 실행한다.

```bash
node hello.js
```

결과:

```text
Node.js setup complete!
```

가 나오면 정상이다.

---

## 33. npm도 최소 확인

연습 폴더에서 다음을 실행할 수 있다.

```bash
npm init -y
```

`package.json` 파일이 만들어지는지 확인한다.

이 정도면 npm 기본 동작까지 확인할 수 있다.

---

## 34. Node.js 최종 체크

```text
□ Node.js 설치

□ node -v

□ npm -v

□ hello.js 작성

□ node hello.js 성공

□ npm init -y 성공
```

---

## 35. 여섯 번째 — JDK 21 설치

이번에는 Java 개발환경을 복구한다.

현재 Dev Setup에서는 JDK 21을 기준으로 한다.

다만 실제 프로젝트가 다른 JDK 버전을 요구한다면 프로젝트 기준을 우선한다.

---

## 36. 기존 Java가 있는지 먼저 확인

새 Terminal에서

```bash
java -version
```

```bash
javac -version
```

을 실행한다.

새 PC라면 Java가 아직 없을 가능성이 높다.

이미 설치되어 있다면 버전을 확인하고 JDK 21과 충돌하지 않는지 확인한다.

---

## 37. JDK 21 설치

사용할 JDK 배포판의 JDK 21을 설치한다.

예:

```text
Oracle JDK 21

Eclipse Temurin 21

기타 프로젝트에서 지정한 OpenJDK 21
```

수업이나 회사에서 특정 배포판을 지정했다면 그 기준을 따른다.

---

## 38. JDK 설치 위치 확인

예를 들어

```text
C:\Program Files\Java\jdk-21
```

에 설치됐다고 해보자.

실제 폴더를 열어본다.

다음 폴더가 있는지 확인한다.

```text
bin

conf

include

lib
```

`bin` 안에는

```text
java.exe

javac.exe
```

가 있어야 한다.

---

## 39. JAVA_HOME 다시 설정

새 PC에서는 기존 PC의 JAVA_HOME 설정이 존재하지 않는다.

Windows 검색에서

```text
환경 변수
```

를 검색한다.

환경 변수 설정 화면을 연다.

새 환경변수를 만든다.

변수 이름:

```text
JAVA_HOME
```

변수 값:

```text
C:\Program Files\Java\jdk-21
```

실제 설치 위치를 사용한다.

---

## 40. JAVA_HOME에 bin을 넣지 않는다

다시 한 번 중요하다.

정상:

```text
JAVA_HOME

C:\Program Files\Java\jdk-21
```

잘못된 예:

```text
JAVA_HOME

C:\Program Files\Java\jdk-21\bin
```

JAVA_HOME은 **JDK Root**다.

---

## 41. Path 설정

Windows 환경변수의 `Path`에 새 항목을 추가한다.

```text
%JAVA_HOME%\bin
```

기존 Path 항목을 삭제하지 않는다.

새 Java 항목만 추가한다.

---

## 42. 터미널 다시 열기

환경변수를 수정했다면 기존 Terminal을 모두 닫는다.

새 Command Prompt 또는 PowerShell을 연다.

JAVA_HOME 확인:

```cmd
echo %JAVA_HOME%
```

결과 예:

```text
C:\Program Files\Java\jdk-21
```

---

## 43. Java 버전 확인

```bash
java -version
```

JDK 21 계열인지 확인한다.

Compiler:

```bash
javac -version
```

역시 21 계열인지 확인한다.

---

## 44. 실제 Java 실행 테스트

연습용 폴더를 만든다.

```text
C:\dev\java-test
```

`Hello.java`를 만든다.

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Java setup complete!");
    }
}
```

컴파일한다.

```bash
javac Hello.java
```

`Hello.class`가 생성되는지 확인한다.

실행한다.

```bash
java Hello
```

결과:

```text
Java setup complete!
```

---

## 45. JDK 최종 체크

```text
□ JDK 21 설치

□ JAVA_HOME 설정

□ PATH에 %JAVA_HOME%\bin

□ java -version

□ javac -version

□ Hello.java 작성

□ javac Hello.java

□ Hello.class 생성

□ java Hello 성공
```

---

## 46. 일곱 번째 — IntelliJ IDEA 설치

JDK가 준비됐으니 IntelliJ를 설치한다.

IntelliJ는 Java 프로젝트를 작성하고 실행하기 위한 IDE로 사용할 수 있다.

---

## 47. IntelliJ를 JDK보다 나중에 설치한 이유

순서는 이렇게 된다.

```text
JDK 21

↓

IntelliJ IDEA

↓

Project SDK에 JDK 21 연결
```

IntelliJ 프로그램 자체는 자체 Runtime으로 실행될 수 있지만 Java 프로젝트 개발에는 별도의 JDK가 필요하다.

---

## 48. IntelliJ 설치

[공식 Installer](https://www.jetbrains.com/idea/download/)를 이용해 설치한다.

필요하다면

```text
Open Folder as Project

Command-line Launcher

Desktop Shortcut
```

등을 선택한다.

처음에는 기본 설정을 크게 바꾸지 않아도 된다.

---

## 49. IntelliJ에서 JDK 21 확인

새 Java 프로젝트를 만든다.

예:

```text
Name
→ intellij-test

Language
→ Java

Build System
→ IntelliJ

JDK
→ 21
```

---

## 50. JDK가 자동으로 안 보이면

다음 기능을 사용한다.

```text
Add JDK from Disk
```

JDK Root를 선택한다.

예:

```text
C:\Program Files\Java\jdk-21
```

여기서도

```text
...\jdk-21\bin
```

을 선택하는 것이 아니다.

---

## 51. IntelliJ Java 실행 테스트

`Main.java`를 만든다.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("IntelliJ setup complete!");
    }
}
```

Run 버튼을 누른다.

Run Window에서

```text
IntelliJ setup complete!
```

가 나오면 된다.

---

## 52. Project SDK 직접 확인

다음으로 이동한다.

```text
File
→ Project Structure
→ Project
```

SDK가

```text
JDK 21
```

인지 확인한다.

Language Level도 필요하다면

```text
SDK default
```

또는 Java 21 기준인지 확인한다.

---

## 53. IntelliJ 최종 체크

```text
□ IntelliJ 설치

□ Java Project 생성

□ JDK 21 선택

□ Project SDK 21 확인

□ Main.java 작성

□ Run 성공

□ exit code 0 확인
```

---

## 54. 여덟 번째 — Tomcat 설치

Java 기본 개발환경까지 완성됐다면 필요에 따라 Tomcat을 설치한다.

Tomcat은 Java Servlet/JSP 웹 애플리케이션을 실행하는 Container 환경이다.

---

## 55. Tomcat은 항상 필요한가?

아니다.

현재 공부나 프로젝트가

```text
Servlet

JSP

외부 Tomcat 배포
```

를 사용하지 않는다면 지금 당장 필요하지 않을 수도 있다.

특히 Spring Boot 프로젝트는 Embedded Tomcat을 사용하는 경우가 많다.

따라서 새 PC 복구 시에도

```text
내가 현재 Tomcat을 실제로 사용하는가?
```

를 먼저 확인한다.

---

## 56. 현재 Dev Setup 기준으로는 설치

이번 시리즈에서는 Tomcat 환경까지 구축했기 때문에 재설치한다고 가정한다.

부트캠프나 프로젝트에서 사용하는 [Tomcat 버전](https://tomcat.apache.org/whichversion.html)을 먼저 확인한다.

```text
Tomcat 9?

Tomcat 10.1?

Tomcat 11?
```

버전에 따라 Servlet API가 다를 수 있다.

---

## 57. 수업 버전이 있다면 수업 기준 우선

예를 들어

```text
Tomcat 9
→ javax.servlet
```

계열과

```text
Tomcat 10.1 / 11
→ jakarta.servlet
```

계열은 차이가 있다.

따라서 예전에 내가 설치했던 버전보다 **현재 프로젝트가 요구하는 버전이 우선**이다.

---

## 58. Tomcat 압축 해제

예를 들어

```text
C:\dev\tools\apache-tomcat
```

같은 위치에 설치할 수 있다.

실제 Root 아래에

```text
bin

conf

lib

logs

webapps
```

가 바로 존재하는지 확인한다.

---

## 59. CATALINA_HOME 설정

환경변수를 만든다.

변수 이름:

```text
CATALINA_HOME
```

변수 값:

```text
Tomcat Root 경로
```

예:

```text
C:\dev\tools\apache-tomcat-11.x.x
```

`bin`까지 넣지 않는다.

---

## 60. CATALINA_HOME 확인

새 Command Prompt를 실행한다.

```cmd
echo %CATALINA_HOME%
```

실제 Tomcat Root가 출력되는지 확인한다.

---

## 61. Tomcat 버전 확인

```cmd
%CATALINA_HOME%\bin\version.bat
```

또는

```cmd
%CATALINA_HOME%\bin\catalina.bat version
```

을 사용한다.

여기에서

```text
Tomcat 버전

Java Home

Java Version
```

등을 확인할 수 있다.

---

## 62. Tomcat 시작

```cmd
%CATALINA_HOME%\bin\startup.bat
```

을 실행한다.

오류 없이 서버가 시작되는지 확인한다.

---

## 63. localhost 접속

브라우저에서

```text
http://localhost:8080
```

에 접속한다.

Tomcat 기본 화면이 나타나면 된다.

---

## 64. Tomcat 종료

테스트가 끝났다면

```cmd
%CATALINA_HOME%\bin\shutdown.bat
```

을 실행한다.

브라우저에서 다시

```text
http://localhost:8080
```

을 새로고침한다.

Tomcat이 종료되었다면 더 이상 정상 접속되지 않아야 한다.

---

## 65. Tomcat 최종 체크

```text
□ 프로젝트에서 필요한 Tomcat 버전 확인

□ Tomcat 압축 해제

□ Root 폴더 확인

□ CATALINA_HOME 설정

□ version.bat 확인

□ startup.bat 성공

□ localhost:8080 성공

□ shutdown.bat 성공
```

---

## 66. 여기까지 하면 기본 개발 도구 설치는 끝

현재 새 PC에는 다음 개발환경이 준비됐다.

```text
Git
GitHub
SourceTree
VS Code
Node.js
npm
JDK 21
IntelliJ IDEA
Tomcat
```

하지만 아직 실제 프로젝트는 없다.

이제 GitHub에서 기존 프로젝트를 가져온다.

---

## 67. 프로젝트를 ZIP으로 다운로드하지 않고 Clone

계속 개발할 프로젝트라면 GitHub의

```text
Download ZIP
```

보다

```text
git clone
```

을 사용하는 것이 일반적이다.

Clone하면

```text
프로젝트 파일

+

Git Commit History

+

Remote 연결
```

을 함께 가져올 수 있다.

---

## 68. 프로젝트 폴더로 이동

예를 들어 프로젝트를

```text
C:\dev\projects
```

에 모으기로 했다면 Git Bash에서 해당 위치로 이동한다.

```bash
cd /c/dev/projects
```

---

## 69. Git Clone

GitHub에서 Repository HTTPS 주소를 복사한다.

예:

```bash
git clone https://github.com/사용자이름/repository.git
```

Clone이 끝나면 프로젝트 폴더가 만들어진다.

---

## 70. Clone 후 무조건 실행부터 하지 않는다

프로젝트마다 필요한 환경이 다르다.

먼저 다음 파일을 찾는다.

```text
README.md

package.json

.env.example

pom.xml

build.gradle

build.gradle.kts
```

이 파일들을 보면 프로젝트를 실행하는 데 필요한 환경을 알 수 있다.

---

## 71. Node.js 프로젝트라면

`package.json`이 있다면 JavaScript/Node.js 계열 프로젝트일 가능성이 높다.

우선 README를 확인한다.

그다음 Node 버전을 확인한다.

```bash
node -v
```

프로젝트 요구 버전과 맞는지 확인한다.

---

## 72. npm 패키지 설치

프로젝트 폴더에서

```bash
npm install
```

을 실행한다.

그러면 프로젝트에서 필요한 Package들이 설치된다.

일반적으로 `node_modules`는 GitHub에서 Clone되지 않기 때문에 새 PC에서 다시 설치해야 한다.

---

## 73. `node_modules`가 없어도 정상

Clone 후 다음처럼 보일 수 있다.

```text
project

├─ package.json
├─ package-lock.json
└─ src
```

그런데

```text
node_modules
```

가 없다.

정상일 수 있다.

```bash
npm install
```

을 실행하면 다시 생성된다.

---

## 74. 환경변수 파일은 Git에서 안 내려올 수 있다

중요하다.

다음과 같은 파일은 보안 때문에 Git에 올리지 않는 경우가 많다.

```text
.env

.env.local

Secret 관련 설정
```

따라서 새 PC에서 Clone했다고 모든 환경이 자동으로 복구되는 것은 아니다.

---

## 75. `.env` 관련 자료 확인

Repository 안에

```text
.env.example
```

또는 README에 환경변수 목록이 있을 수 있다.

예:

```text
DATABASE_URL=

AUTH_SECRET=

API_KEY=
```

필요한 값을 새 PC에 다시 설정해야 한다.

---

## 76. Secret을 GitHub에서 무작정 복사하면 안 된다

환경변수와 Secret은 어디에서 관리되는지 확인한다.

예를 들어

```text
Vercel

Neon

Google OAuth

Kakao Developers

Naver Developers
```

같은 외부 서비스에 저장되어 있을 수 있다.

새 PC에서 필요한 Local 값만 안전하게 다시 설정한다.

---

## 77. Java 프로젝트라면

다음 파일을 볼 수 있다.

```text
pom.xml
```

이면 Maven 프로젝트일 수 있다.

```text
build.gradle
```

또는

```text
build.gradle.kts
```

이면 Gradle 프로젝트일 수 있다.

IntelliJ에서 프로젝트를 열고 올바른 JDK가 선택되어 있는지 확인한다.

---

## 78. IntelliJ에서 Clone한 Java 프로젝트 열기

IntelliJ Welcome 화면에서

```text
Open
```

을 선택한다.

Clone한 프로젝트 Root를 선택한다.

예:

```text
C:\dev\projects\my-java-project
```

---

## 79. Project SDK 확인

프로젝트를 열었으면 가장 먼저 확인한다.

```text
File
→ Project Structure
→ Project
```

프로젝트가 JDK 21을 사용하는지 또는 다른 버전을 사용하는지 확인한다.

---

## 80. 프로젝트마다 JDK 버전이 다를 수 있다

새 PC에서 JDK 21을 설치했다고 모든 Java 프로젝트가 21인 것은 아니다.

예:

```text
프로젝트 A
→ Java 17

프로젝트 B
→ Java 21
```

따라서 README와 Build 설정을 확인한다.

---

## 81. 새 PC에서 특히 중요한 것 — 프로젝트별 환경

개발환경에는 두 종류가 있다고 생각하면 이해하기 쉽다.

```text
PC 전체 개발환경

+

프로젝트별 개발환경
```

---

## 82. PC 전체 개발환경

예:

```text
Git

VS Code

Node.js

JDK

IntelliJ

Tomcat
```

---

## 83. 프로젝트별 개발환경

예:

```text
Node.js Version

npm Package

JDK Version

Database URL

API Key

OAuth Client ID

OAuth Secret

Tomcat Version

Build Tool
```

새 PC를 만들 때 **PC 프로그램만 설치하면 끝이 아닌 이유**다.

---

## 84. GitHub에 있다고 모든 것이 복구되는 것은 아니다

Git Repository에는 소스 코드가 있다.

하지만 보안상 제외한 파일이나 외부 서비스 설정까지 모두 저장되지는 않는다.

예를 들어

```text
.env.local

Database Password

OAuth Secret

Private Key
```

같은 정보는 Git에 없어야 정상인 경우가 많다.

따라서 별도의 안전한 방식으로 관리해야 한다.

---

## 85. 그래서 README가 중요하다

프로젝트 README에는 최소한 다음 정보가 있으면 새 PC 구축이 매우 쉬워진다.

```text
필요한 Node 버전

필요한 Java 버전

설치 명령

실행 명령

필요한 환경변수 이름

Database 설정 방법

외부 서비스 설정 방법
```

몇 달 뒤의 나도 사실상 새로운 개발자와 비슷하다.

README가 잘 작성되어 있으면 과거의 환경을 다시 기억할 필요가 줄어든다.

---

## 86. 새 PC에서는 버전부터 기록

모든 설치가 끝났다면 현재 버전을 한 번에 기록한다.

---

## 87. Git

```bash
git --version
```

---

## 88. VS Code

```bash
code --version
```

---

## 89. Node.js

```bash
node -v
```

---

## 90. npm

```bash
npm -v
```

---

## 91. Java

```bash
java -version
```

---

## 92. Java Compiler

```bash
javac -version
```

---

## 93. JAVA_HOME

Command Prompt:

```cmd
echo %JAVA_HOME%
```

---

## 94. Tomcat

```cmd
%CATALINA_HOME%\bin\version.bat
```

---

## 95. CATALINA_HOME

```cmd
echo %CATALINA_HOME%
```

---

## 96. 버전 확인 결과를 기록해두자

예를 들어 다음처럼 기록할 수 있다.

```text
Git:
버전 확인 완료

VS Code:
버전 확인 완료

Node.js:
LTS 버전 확인

npm:
Node 설치본과 함께 확인

JDK:
21

JAVA_HOME:
C:\Program Files\Java\jdk-21

IntelliJ:
설치 완료
Project SDK 21 확인

Tomcat:
프로젝트/수업에서 사용하는 버전

CATALINA_HOME:
Tomcat Root
```

정확한 세부 버전 숫자는 시간이 지나면서 달라질 수 있기 때문에 실제 설치 시점의 값을 기록한다.

---

## 97. 버전을 왜 기록할까?

나중에 이런 상황이 생길 수 있다.

```text
예전 PC에서는 됐는데
새 PC에서는 안 됨
```

두 컴퓨터의 차이를 비교할 때 가장 먼저 보는 것이 환경 차이다.

예:

```text
Old PC
Node 22

New PC
Node 24
```

또는

```text
Old PC
JDK 17

New PC
JDK 21
```

같은 차이가 있을 수 있다.

버전을 기록해두면 원인을 찾기 쉬워진다.

---

## 98. PATH도 확인할 필요가 있다

프로그램을 설치했는데 버전 명령어가 실행되지 않는다면 PATH 문제일 수 있다.

Command Prompt에서 프로그램 위치를 확인할 수 있다.

---

## 99. Git 위치

```cmd
where git
```

---

## 100. VS Code 위치

```cmd
where code
```

---

## 101. Node.js 위치

```cmd
where node
```

---

## 102. npm 위치

```cmd
where npm
```

---

## 103. Java 위치

```cmd
where java
```

---

## 104. javac 위치

```cmd
where javac
```

실행 경로가 여러 개 나온다면 같은 프로그램이 여러 곳에 설치되어 있을 가능성도 확인한다.

---

## 105. `where java`가 여러 개 나오면

예:

```text
C:\Program Files\Java\jdk-21\bin\java.exe

C:\어딘가\old-java\java.exe
```

같은 결과가 나올 수 있다.

이 경우 PATH에서 어떤 Java가 먼저 선택되는지 확인해야 한다.

특히

```bash
java -version
```

이 예상과 다른 버전을 보여준다면 중요한 단서다.

---

## 106. Node도 여러 버전이 있을 수 있다

```cmd
where node
```

결과가 여러 개라면 과거 설치본이나 Version Manager 설정이 섞여 있을 수 있다.

무조건 파일을 삭제하지 말고

```text
현재 어떤 Node가 실행되는가?

왜 여러 개가 있는가?
```

를 먼저 확인한다.

---

## 107. 최종 통합 테스트 — Git

연습 Repository 또는 기존 프로젝트로 이동한다.

```bash
git status
```

정상적으로 Git Repository 상태를 보여주는지 확인한다.

Remote도 확인한다.

```bash
git remote -v
```

---

## 108. 최종 통합 테스트 — VS Code

프로젝트 폴더에서

```bash
code .
```

을 실행한다.

VS Code가 해당 프로젝트를 정상적으로 여는지 확인한다.

---

## 109. 최종 통합 테스트 — Node

Node 프로젝트에서

```bash
node -v
```

를 확인한다.

필요하면

```bash
npm install
```

을 실행한다.

그리고 프로젝트의 실행 명령을 사용한다.

예:

```bash
npm run dev
```

단, 해당 프로젝트에 `dev` Script가 정의되어 있을 때만 사용한다.

---

## 110. 최종 통합 테스트 — Java

Java 프로젝트에서는

```bash
java -version
```

```bash
javac -version
```

을 확인한다.

IntelliJ에서도 Project SDK를 확인하고 프로그램을 Run한다.

---

## 111. 최종 통합 테스트 — Tomcat

Tomcat이 필요한 환경이라면

```cmd
%CATALINA_HOME%\bin\startup.bat
```

을 실행한다.

브라우저:

```text
http://localhost:8080
```

접속 확인.

테스트 후

```cmd
%CATALINA_HOME%\bin\shutdown.bat
```

으로 종료한다.

---

## 112. 새 PC에서 흔한 문제 — GitHub Repository는 있는데 Local에 없다

정상이다.

GitHub는 Remote Repository다.

새 PC에는 Local Repository가 없기 때문에 Clone해야 한다.

```text
GitHub

↓

git clone

↓

새 PC Local Repository
```

---

## 113. 흔한 문제 — SourceTree에는 Repository가 안 보인다

새 PC니까 정상일 수 있다.

SourceTree의 Repository 목록은 기존 PC와 별개다.

프로젝트를 Clone한 뒤 SourceTree에 Local Repository를 추가한다.

---

## 114. 흔한 문제 — VS Code Extension이 없다

새 설치이므로 정상이다.

필요한 Extension을 다시 설치한다.

VS Code 계정 동기화를 사용하고 있었다면 Sync 상태를 확인할 수도 있다.

---

## 115. 흔한 문제 — `node` 명령어가 안 된다

확인:

```text
Node.js 설치?

↓

터미널 재시작?

↓

PATH?

↓

where node
```

---

## 116. 흔한 문제 — `npm`만 안 된다

먼저

```bash
node -v
```

와

```bash
npm -v
```

을 각각 확인한다.

PowerShell에서는 Script 실행 정책과 관련된 메시지가 나타날 수도 있으므로 오류 내용을 읽고 Node 설치 문제와 구분한다.

---

## 117. 흔한 문제 — `java`는 되는데 `javac`가 안 된다

JDK가 아니라 실행 환경만 선택되고 있거나 PATH가 잘못된 경우를 확인한다.

```cmd
where java
```

```cmd
where javac
```

을 비교한다.

---

## 118. 흔한 문제 — JDK 21을 설치했는데 Java 17이 나온다

```bash
java -version
```

결과가 예상과 다르면

```cmd
where java
```

를 확인한다.

그리고

```text
JAVA_HOME

Path 순서

기존 Java 설치
```

를 확인한다.

---

## 119. 흔한 문제 — IntelliJ는 켜지는데 Java 프로젝트가 안 된다

IntelliJ 자체 Runtime과 프로젝트 JDK는 다르다.

확인:

```text
File

↓

Project Structure

↓

Project

↓

SDK
```

JDK 21 또는 프로젝트가 요구하는 JDK가 선택되어 있는지 본다.

---

## 120. 흔한 문제 — Tomcat이 안 켜진다

순서:

```text
JAVA_HOME 확인

↓

java -version

↓

CATALINA_HOME 확인

↓

Tomcat version.bat 확인

↓

8080 Port 확인

↓

logs 확인
```

문제가 생겼다고 Tomcat부터 재설치하지 않는다.

---

## 121. 8080 Port 확인

```cmd
netstat -ano | findstr :8080
```

이미 다른 프로그램이 사용 중인지 확인한다.

---

## 122. 프로젝트가 새 PC에서 안 돌아간다면

무작정 코드를 수정하기 전에 **환경 차이부터 확인한다.**

확인 순서:

```text
Node Version

npm Version

Java Version

JDK

환경변수

Database 연결

OAuth 설정

Package 설치 여부

Port

.gitignore로 제외된 파일
```

코드가 같은데 PC만 달라졌다면 환경 차이일 가능성도 충분히 있다.

---

## 123. `.gitignore` 파일 확인

새 PC 구축에서 `.gitignore`가 왜 중요한지도 드러난다.

Git에서 제외한 파일은 Clone으로 복원되지 않는다.

대표적으로

```text
.env

.env.local

node_modules

IDE Local 설정

Build 결과
```

등이 있을 수 있다.

따라서 GitHub에 없는 것이 반드시 파일이 사라진 것은 아니다.

처음부터 **Repository에 저장하지 않기로 한 파일**일 수 있다.

---

## 124. 프로젝트별 복구 문서를 만드는 것이 좋다

프로젝트마다 다음 내용을 README 또는 별도 문서로 정리하면 좋다.

```text
필요한 프로그램

Node 버전

JDK 버전

Database

필요한 환경변수

설치 명령

Migration 명령

Seed 명령

실행 명령

배포 환경
```

그러면 새 PC에서도 문서만 보고 복구할 수 있다.

---

## 125. 개발환경을 백업한다고 프로그램 폴더를 복사하면 될까?

일반적으로 프로그램 설치 폴더를 그대로 다른 PC로 복사하는 방식은 추천하지 않는다.

설치 프로그램이

```text
환경변수

Registry

사용자 설정

Windows Integration
```

등을 같이 설정할 수 있기 때문이다.

새 PC에서는 가능하면 공식 Installer나 공식 설치 방법을 이용해 다시 설치한다.

---

## 126. 무엇을 백업해야 할까?

오히려 중요한 것은 프로그램 자체보다 다음 정보다.

```text
프로젝트 Source Code

GitHub Repository

설정 문서

사용 프로그램 목록

사용 버전

환경변수 이름

Secret 보관 위치

IDE 설정

SSH Key 필요 여부
```

---

## 127. Secret은 별도 관리

다음 정보는 블로그나 GitHub Public Repository에 기록하지 않는다.

```text
Password

Database Password

API Secret

OAuth Client Secret

Private Key

Access Token
```

새 PC 복구용 문서에는

```text
DATABASE_URL 필요
```

처럼 **변수 이름과 어디서 다시 가져오는지**까지만 기록하는 방식이 안전하다.

---

## 128. 예를 들어 이렇게 기록

```text
DATABASE_URL
→ Neon Dashboard에서 확인

AUTH_SECRET
→ 로컬에서 다시 생성 또는 안전한 보관 위치에서 복구

GOOGLE_CLIENT_ID
→ Google Cloud Console

GOOGLE_CLIENT_SECRET
→ Google Cloud Console
```

값 자체를 Public 문서에 남기지 않는다.

---

## 129. 개발환경 복구에서 GitHub가 중요한 이유

프로젝트를 GitHub에 정상적으로 Push해두었다면 PC가 바뀌어도 Source Code는 다시 Clone할 수 있다.

```text
Old PC

↓

Git Push

↓

GitHub

↓

New PC

↓

Git Clone
```

GitHub는 단순한 협업 도구뿐 아니라 개발환경 이전 과정에서도 중요한 역할을 한다.

---

## 130. 하지만 GitHub만 믿으면 안 되는 이유

다시 말하지만 다음은 Git에 없을 수 있다.

```text
.env

Secret

Database 실제 데이터

로컬 파일

업로드 이미지

IDE 개인 설정
```

따라서 중요한 데이터가 어디에 저장되어 있는지 따로 알고 있어야 한다.

---

## 131. 새 PC 개발환경 최종 구조

모든 작업이 끝나면 대략 이런 구조가 된다.

```text
Windows

├─ Git
│  └─ Version Control
│
├─ SourceTree
│  └─ Git GUI
│
├─ VS Code
│  └─ Frontend / General Editor
│
├─ Node.js
│  └─ JavaScript Runtime
│
├─ npm
│  └─ Package Manager
│
├─ JDK 21
│  ├─ java
│  └─ javac
│
├─ IntelliJ IDEA
│  └─ Java IDE
│
└─ Tomcat
   └─ Servlet Container
```

그리고 프로젝트는 별도로

```text
C:\dev\projects

├─ my-blog
├─ cup-pick
├─ java-study
└─ ...
```

처럼 관리할 수 있다.

---

## 132. 프로그램 역할 다시 정리

| 프로그램 | 역할 |
|------|------|
| Git | 코드 변경 이력 관리 |
| GitHub | Remote Repository |
| SourceTree | Git GUI |
| VS Code | 범용 Code Editor |
| Node.js | JavaScript Runtime |
| npm | JavaScript Package Manager |
| JDK 21 | Java 개발 도구 |
| IntelliJ IDEA | Java 중심 IDE |
| Tomcat | Java Servlet/JSP Container |

---

## 133. 설치 순서를 다시 한 번

```text
Windows 확인

↓

Git

↓

GitHub 로그인

↓

SourceTree

↓

VS Code

↓

Node.js / npm

↓

JDK 21

↓

JAVA_HOME / PATH

↓

IntelliJ IDEA

↓

JDK 연결

↓

Tomcat

↓

CATALINA_HOME

↓

GitHub Clone

↓

프로젝트 환경변수

↓

프로젝트 실행
```

---

## 134. 새 PC에서 최소 명령어 점검표

이 부분만 따로 복사해둬도 좋다.

```bash
git --version
```

```bash
code --version
```

```bash
node -v
```

```bash
npm -v
```

```bash
java -version
```

```bash
javac -version
```

Command Prompt:

```cmd
echo %JAVA_HOME%
```

```cmd
echo %CATALINA_HOME%
```

Tomcat:

```cmd
%CATALINA_HOME%\bin\version.bat
```

---

## 135. 조금 더 자세한 최종 점검표

### Git

```text
□ Git 설치
□ git --version
□ user.name
□ user.email
□ GitHub 로그인
```

### SourceTree

```text
□ SourceTree 설치
□ Git 연결
□ GitHub 계정 연결
```

### VS Code

```text
□ VS Code 설치
□ code --version
□ code .
□ Terminal 정상 실행
□ 필요한 Extensions 설치
```

### Node.js

```text
□ Node.js 설치
□ node -v
□ npm -v
□ hello.js 실행
```

### Java

```text
□ JDK 21 설치
□ JAVA_HOME
□ %JAVA_HOME%\bin
□ java -version
□ javac -version
□ Hello.java Compile / Run
```

### IntelliJ

```text
□ IntelliJ 설치
□ JDK 21 연결
□ Project SDK 확인
□ Main.java Run
```

### Tomcat

```text
□ 필요한 Tomcat 버전 확인
□ 압축 해제
□ CATALINA_HOME
□ version.bat
□ startup.bat
□ localhost:8080
□ shutdown.bat
```

### 프로젝트

```text
□ Git Clone
□ README 확인
□ Node/JDK 버전 확인
□ npm install
□ 환경변수 복구
□ Database 연결
□ OAuth/API 설정
□ Local 실행
```

---

## 136. 모든 프로그램을 무조건 설치할 필요는 없다

새 PC라고 해서 이번 목록을 모두 설치해야 하는 것은 아니다.

예를 들어 프론트엔드만 공부하고 있다면

```text
Git

GitHub

VS Code

Node.js

npm
```

정도로 충분할 수 있다.

Java를 공부한다면

```text
JDK

IntelliJ
```

를 추가한다.

Servlet/JSP를 사용한다면

```text
Tomcat
```

도 설치한다.

즉 환경은 **현재 공부와 프로젝트에 맞게 구성**한다.

---

## 137. 설치 프로그램 수가 많다고 좋은 환경은 아니다

개발 프로그램을 많이 설치하는 것이 목표가 아니다.

중요한 것은

```text
이 프로그램을 왜 설치했는가?

현재 프로젝트에서 실제로 사용하는가?

어떤 버전인가?

다른 도구와 어떻게 연결되는가?
```

를 이해하는 것이다.

필요 없는 프로그램은 굳이 설치하지 않는다.

---

## 138. 새 PC 구축을 하면서 기존 환경을 정리할 수도 있다

예전 PC에서는 공부하면서 이것저것 설치하다 보니

```text
JDK 여러 버전

Node 여러 버전

사용하지 않는 Extension

테스트용 프로그램

중복 PATH
```

등이 남아 있을 수 있다.

새 PC에서는 현재 사용하는 환경만 설치해서 더 깔끔하게 시작할 수 있다.

---

## 139. 설치가 끝났으면 스크린샷보다 버전을 남기자

설치 화면을 전부 캡처하는 것도 도움이 되지만 나중에는 다음 정보가 더 중요하다.

```text
프로그램 이름

설치 버전

설치 목적

환경변수

프로젝트 요구 버전

설치 확인 명령어
```

이 정보를 기록하면 다시 구축하기 쉽다.

---

## 140. 새 PC 구축 기록 예시

```text
Git
→ 설치 완료
→ git --version 확인

VS Code
→ 설치 완료
→ code --version 확인

Node.js
→ LTS 설치
→ node -v 확인

npm
→ npm -v 확인

JDK
→ 21
→ JAVA_HOME 설정
→ java / javac 확인

IntelliJ
→ 설치 완료
→ Project SDK 21

Tomcat
→ 프로젝트 요구 버전
→ CATALINA_HOME 설정
→ localhost 확인
```

---

## 141. Dev Setup 시리즈에서 배운 것을 한 번에 연결하면

처음에는 프로그램이 각각 별개처럼 보였다.

하지만 지금은 전체 흐름을 볼 수 있다.

```text
VS Code / IntelliJ
코드 작성

↓

Node.js / JDK
프로그램 실행

↓

Git
변경 기록

↓

SourceTree
Git GUI

↓

GitHub
Remote Repository

↓

Tomcat
Java Web Application 실행
```

---

## 142. 새 PC에서는 이 구조를 다시 만드는 것

결국 이번 작업은 프로그램을 무작정 설치하는 것이 아니다.

다음 구조를 다시 만드는 것이다.

```text
작성 환경

+

실행 환경

+

버전 관리 환경

+

Remote 저장소

+

Java Web 실행 환경
```

---

## 143. 개발환경 복구가 성공했다는 기준

모든 프로그램 아이콘이 바탕화면에 생겼다고 끝난 것이 아니다.

다음이 실제 성공 기준이다.

```text
Git 명령어 실행됨

VS Code가 Terminal에서 열림

Node.js가 JavaScript 실행함

npm이 Package를 관리할 수 있음

JDK가 Java를 Compile할 수 있음

IntelliJ가 JDK 21로 Java를 실행함

Tomcat이 localhost에서 실행됨

GitHub Repository를 Clone할 수 있음

실제 프로젝트가 Local에서 실행됨
```

---

## 144. 아이콘보다 명령어 확인이 중요한 이유

예를 들어 Node.js 아이콘이 Windows에 있어도

```bash
node -v
```

가 되지 않을 수 있다.

JDK 폴더가 있어도

```bash
javac -version
```

이 되지 않을 수 있다.

Tomcat 폴더가 있어도

```text
http://localhost:8080
```

이 열리지 않을 수 있다.

따라서 항상

```text
설치

↓

설정

↓

명령어 확인

↓

실제 실행
```

까지 확인한다.

---

## 145. 프로그램별 성공 기준

Git:

```text
git --version
```

성공.

VS Code:

```text
code .
```

성공.

Node.js:

```text
node hello.js
```

성공.

JDK:

```text
javac Hello.java
java Hello
```

성공.

IntelliJ:

```text
Run
→ 출력 성공
```

Tomcat:

```text
localhost:8080
→ 접속 성공
```

이다.

---

## 146. 새 PC에서 프로젝트 하나까지 실행해보기

마지막으로 실제 사용 중인 프로젝트 하나를 고른다.

예를 들어 Node 프로젝트라면

```text
Git Clone

↓

code .

↓

npm install

↓

환경변수 설정

↓

npm run dev
```

까지 해본다.

Java 프로젝트라면

```text
Git Clone

↓

IntelliJ Open

↓

Project SDK 확인

↓

Dependency Download

↓

Run
```

까지 확인한다.

이 단계까지 성공해야 **실제 개발환경 이전이 완료됐다고 보기 좋다.**

---

## 147. 새 PC 구축에서 가장 중요한 세 가지

첫 번째는 **순서**다.

```text
기반 프로그램

↓

실행환경

↓

IDE

↓

프로젝트
```

순으로 진행한다.

두 번째는 **버전**이다.

```text
무조건 최신

X

프로젝트가 요구하는 버전

O
```

이다.

세 번째는 **Secret과 환경변수**다.

GitHub에서 Clone했다고 프로젝트 환경이 100% 복구되는 것은 아니다.

```text
.env

Database

OAuth

API Key
```

등을 별도로 복구해야 할 수 있다.

---

## 148. 개발환경을 다시 만들 수 있다는 것의 의미

처음 개발환경을 구축할 때는

```text
Next 버튼은 뭘 눌러야 하지?

PATH가 뭔데?

JAVA_HOME은 왜 만드는 거지?

localhost는 뭔데?
```

같은 부분 하나하나가 어렵다.

하지만 한 번 환경 전체를 이해하고 나면 새 PC에서도

```text
Git부터 설치하고,

Node 환경 만들고,

JDK 연결하고,

IDE 연결하고,

Repository Clone하고,

프로젝트별 환경만 복구하면 되겠구나.
```

라고 전체 흐름을 볼 수 있다.

개발환경을 다시 구축할 수 있다는 것은 단순히 설치 방법을 외웠다는 의미가 아니다.

**내 코드가 어떤 환경 위에서 실행되는지 이해하기 시작했다는 뜻**이기도 하다.

---

## 149. 새 PC 개발환경 최종 전체 체크리스트

마지막으로 정말 처음부터 끝까지 한 번에 확인해보자.

```text
[Windows]

□ Windows Update 확인
□ 시스템 x64 / ARM64 확인
□ 개발 폴더 생성


[Git]

□ Git 설치
□ git --version
□ user.name
□ user.email
□ default branch 확인


[GitHub]

□ GitHub 로그인
□ Repository 확인
□ Private Repository 접근 확인


[SourceTree]

□ 설치
□ System Git 연결
□ GitHub 계정 연결


[VS Code]

□ 설치
□ PATH
□ code --version
□ code .
□ Terminal
□ 필요한 Extensions


[Node.js]

□ 필요한 Node Version 확인
□ LTS 설치
□ node -v
□ npm -v
□ hello.js 실행
□ npm init 테스트


[JDK]

□ 필요한 JDK Version 확인
□ JDK 21 설치
□ JDK Root 확인
□ JAVA_HOME
□ PATH에 %JAVA_HOME%\bin
□ java -version
□ javac -version
□ Hello.java Compile
□ Hello.java Run


[IntelliJ]

□ 설치
□ Java Project 생성
□ JDK 21 연결
□ Project SDK 확인
□ Language Level 확인
□ Java Main 실행


[Tomcat]

□ 필요한 Tomcat Version 확인
□ 압축 해제
□ CATALINA_HOME
□ version.bat
□ startup.bat
□ localhost:8080
□ shutdown.bat


[Projects]

□ Git Clone
□ README 확인
□ 프로젝트 Node Version 확인
□ 프로젝트 JDK Version 확인
□ npm install
□ 환경변수 복구
□ Secret 복구
□ Database 연결
□ OAuth/API 설정
□ 실제 프로젝트 실행


[마지막 확인]

□ git --version
□ code --version
□ node -v
□ npm -v
□ java -version
□ javac -version
□ JAVA_HOME 확인
□ CATALINA_HOME 확인
□ GitHub Push/Pull 가능
□ 실제 프로젝트 실행 가능
```

---

## 정리

이번 글에서는 새 PC에서 개발환경을 처음부터 다시 구축하는 전체 과정을 정리했다.

설치 순서는 다음과 같다.

```text
Git

↓

GitHub

↓

SourceTree

↓

VS Code

↓

Node.js / npm

↓

JDK 21

↓

JAVA_HOME / PATH

↓

IntelliJ IDEA

↓

JDK 연결

↓

Tomcat

↓

CATALINA_HOME

↓

GitHub Clone

↓

프로젝트별 환경 복구

↓

실제 실행
```

각 프로그램의 역할도 다시 정리하면 다음과 같다.

```text
Git
→ 변경 이력 관리

GitHub
→ Remote Repository

SourceTree
→ Git GUI

VS Code
→ 범용 코드 작성

Node.js
→ JavaScript 실행

npm
→ JavaScript Package 관리

JDK
→ Java 개발

IntelliJ
→ Java IDE

Tomcat
→ Java Servlet/JSP Web Application 실행
```

가장 중요한 것은 프로그램을 **설치만 하고 끝내지 않는 것**이다.

항상

```text
설치

↓

환경 설정

↓

Version 확인

↓

실제 실행

↓

프로젝트 실행
```

까지 진행해야 한다.

새 PC에서 최소한 다음 명령어가 모두 정상적으로 동작하는지 확인한다.

```bash
git --version
```

```bash
code --version
```

```bash
node -v
```

```bash
npm -v
```

```bash
java -version
```

```bash
javac -version
```

그리고 필요하다면

```cmd
echo %JAVA_HOME%
```

```cmd
echo %CATALINA_HOME%
```

도 확인한다.

마지막으로 중요한 것은 **실제 프로젝트 하나를 실행해보는 것**이다.

프로그램 버전만 정상이라고 개발환경 전체가 복구된 것은 아니다.

```text
GitHub Repository Clone

↓

필요한 Package 설치

↓

환경변수 복구

↓

Database / OAuth / API 연결

↓

프로젝트 실행
```

까지 성공해야 실제 개발을 다시 시작할 수 있다.

---

## Dev Setup 시리즈 완료

이번 글을 마지막으로 기본 Dev Setup 시리즈를 마친다.

```text
Dev Setup

00 개발 공부를 시작하기 전에
   개발환경 구축 전체 가이드
   ↓

01 Git & GitHub
   개발환경 구축
   ↓

02 SourceTree
   설치 및 GitHub 연결
   ↓

03 VS Code
   설치와 초기 개발환경 설정
   ↓

04 Node.js와 npm
   개발환경 구축
   ↓

05 JDK 21
   설치와 Java 환경변수 설정
   ↓

06 IntelliJ IDEA
   설치하고 JDK 연결
   ↓

07 Tomcat
   설치하고 localhost 실행
   ↓

08 새 PC에서
   개발환경 다시 구축하기
```

처음 00편에서는 개발환경이 무엇인지도 잘 모르는 상태에서 시작했다.

그때는

```text
VS Code

Git

GitHub

Node.js

JDK

Tomcat
```

이 모두 별개의 프로그램처럼 보였다.

하지만 이제는 각 도구가 어떤 역할을 하는지 연결해서 볼 수 있다.

```text
코드 작성
→ VS Code / IntelliJ

프로그램 실행
→ Node.js / JDK

Package 관리
→ npm

버전 관리
→ Git

Git GUI
→ SourceTree

Remote 저장소
→ GitHub

Java Web 실행
→ Tomcat
```

그리고 새로운 컴퓨터에서도 같은 구조를 다시 만들 수 있다.

개발환경 구축에서 가장 중요한 것은

> 어떤 버튼을 눌렀는지 외우는 것보다
> **왜 이 프로그램을 설치하고, 다른 프로그램과 어떻게 연결되는지를 이해하는 것**

이라고 생각한다.

앞으로 새로운 기술을 배우면서

```text
Database

Docker

Spring Boot

React

Next.js

Cloud

Deployment
```

같은 도구가 추가되더라도 같은 방식으로 생각하면 된다.

```text
이 도구는 무엇인가?

↓

왜 필요한가?

↓

어디에 설치되는가?

↓

다른 도구와 어떻게 연결되는가?

↓

어떤 명령어로 정상 여부를 확인하는가?

↓

실제 프로젝트에서 어떻게 사용하는가?
```

이 기준으로 개발환경을 하나씩 확장해가면 된다.

그리고 언젠가 다시 새로운 PC를 사용하게 되었을 때는 이 글을 열고 위에서부터 하나씩 체크하면 된다.

---

## 더 학습하면 좋은 개념

- **winget (Windows Package Manager)** — Git, VS Code, Node.js 같은 프로그램을 명령어 한 줄로 설치할 수 있는 Windows 공식 패키지 관리자다. 이 글의 설치 순서를 스크립트로 만들어 두면 다음 새 PC에서는 훨씬 빠르게 복구할 수 있다.
- **dotfiles와 설정 동기화** — Git 전역 설정, VS Code Settings Sync, IntelliJ 설정 백업처럼 "프로그램이 아니라 설정"을 옮기는 방법이다. 126장의 "무엇을 백업해야 할까?"를 실제로 실천하는 방식이다.
- **Version Manager (nvm-windows, fnm 등)** — 97·106장의 "Node 여러 버전" 문제를 정리하는 도구다. 프로젝트마다 다른 Node 버전을 요구하기 시작하면 필요해진다.
- **Dev Containers와 Docker** — 개발환경 자체를 파일로 정의해서 어느 PC에서나 같은 환경을 띄우는 방식이다. 이 글의 체크리스트를 "사람이 하는 일"에서 "파일이 하는 일"로 바꾸는 다음 단계다.
- **Secret 관리 (.env.example, 비밀번호 관리자)** — 127~128장의 "값은 남기지 않고 이름과 출처만 기록"하는 원칙을 팀 단위로 확장한 방식이다. 협업 프로젝트에서 새 팀원이 합류할 때도 똑같이 쓰인다.

## 참고 자료

- [Git - Download for Windows](https://git-scm.com/downloads/win)
- [Git Docs - git-config (init.defaultBranch)](https://git-scm.com/docs/git-config)
- [GitHub Docs - Cloning a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
- [GitHub Docs - Ignoring files](https://docs.github.com/en/get-started/git-basics/ignoring-files)
- [Sourcetree 공식 사이트](https://www.sourcetreeapp.com/)
- [Visual Studio Code - Download](https://code.visualstudio.com/download)
- [VS Code Docs - Settings Sync](https://code.visualstudio.com/docs/configure/settings-sync)
- [Node.js - Download](https://nodejs.org/en/download)
- [npm Docs - npm install](https://docs.npmjs.com/cli/commands/npm-install)
- [Oracle - Java Downloads](https://www.oracle.com/java/technologies/downloads/)
- [Eclipse Temurin - JDK 21 Releases](https://adoptium.net/temurin/releases/?version=21)
- [JetBrains - IntelliJ IDEA Download](https://www.jetbrains.com/idea/download/)
- [IntelliJ IDEA Docs - SDKs](https://www.jetbrains.com/help/idea/sdk.html)
- [Apache Tomcat - Which Version Do I Want?](https://tomcat.apache.org/whichversion.html)
- [Tomcat 11 Docs - RUNNING.txt](https://tomcat.apache.org/tomcat-11.0-doc/RUNNING.txt)
- [Microsoft Learn - Windows Package Manager (winget)](https://learn.microsoft.com/en-us/windows/package-manager/winget/)
