---
layout: post
title: "IntelliJ IDEA 설치하고 JDK 연결하기"
date: 2026-09-24 22:55:00 +0900
categories: dev-setup
learningOrder: 70
tags:
  - intellij
  - java
  - jdk
  - ide
---

앞선 글에서는 JDK 21을 설치하고 Java 개발환경을 직접 구성했다.

터미널에서 다음 명령어도 실행해봤다.

```bash
java -version
```

```bash
javac -version
```

그리고 직접 Java 파일을 만들었다.

```text
Hello.java
```

컴파일했다.

```bash
javac Hello.java
```

실행했다.

```bash
java Hello
```

이 과정을 통해 Java 프로그램이 대략 다음 순서로 동작한다는 것도 확인했다.

```text
Hello.java

↓

javac

↓

Hello.class

↓

java

↓

JVM

↓

프로그램 실행
```

이제 Java를 개발할 수 있는 기본 환경은 만들어졌다.

그런데 실제로 Java 프로젝트를 개발할 때마다 터미널에서 계속

```bash
javac Hello.java
```

```bash
java Hello
```

를 직접 입력해야 한다면 상당히 불편하다.

프로젝트가 커지면 Java 파일도 하나가 아니라 수십 개, 수백 개가 될 수 있다.

예를 들어 프로젝트가 다음처럼 커질 수 있다.

```text
shopping-project

├─ User.java
├─ Product.java
├─ Order.java
├─ Payment.java
├─ Cart.java
├─ LoginService.java
├─ OrderService.java
└─ Main.java
```

여기에 외부 라이브러리, 테스트 코드, 설정 파일까지 추가된다.

이 모든 것을 직접 터미널 명령어만으로 관리하는 것은 가능하지만 처음 배우는 입장에서는 상당히 복잡하다.

그래서 Java 개발에서는 **IDE**를 많이 사용한다.

이번 글에서는 대표적인 Java IDE인 **IntelliJ IDEA**를 설치하고, 앞에서 설치한 **JDK 21을 연결한 뒤 실제 Java 프로젝트를 만들고 실행**해본다.

이번 글의 최종 목표는 다음과 같다.

```text
IDE가 무엇인지 이해

↓

IntelliJ IDEA 역할 이해

↓

IntelliJ IDEA 설치

↓

첫 실행

↓

JDK 21 연결

↓

새 Java 프로젝트 생성

↓

프로젝트 구조 확인

↓

Java Class 생성

↓

main 메서드 작성

↓

Run 버튼으로 실행

↓

IntelliJ가 내부에서 무엇을 하는지 이해

↓

VS Code와 IntelliJ 차이 이해
```

이번 글까지 끝나면 매번 직접

```bash
javac Hello.java
java Hello
```

를 입력하지 않아도 IntelliJ 안에서 Java 프로젝트를 작성하고 실행할 수 있게 된다.

---

## 1. IDE란?

먼저 IntelliJ를 설치하기 전에 **IDE**가 무엇인지부터 알아보자.

IDE는

**Integrated Development Environment**

의 약자다.

우리말로는 보통

**통합 개발 환경**

이라고 부른다.

이름만 보면 조금 어렵다.

아주 쉽게 말하면

> **코드를 작성하는 것뿐 아니라 개발에 필요한 여러 기능을 하나의 프로그램 안에 모아놓은 도구**

라고 생각하면 된다.

---

## 2. 메모장으로도 Java를 개발할 수 있을까?

가능하다.

앞선 글에서도 사실 특별한 IDE 없이 Java 프로그램을 실행했다.

예를 들어 메모장으로

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello Java!");
    }
}
```

를 작성한다.

파일 이름을

```text
Hello.java
```

로 저장한다.

터미널을 열고 직접 컴파일한다.

```bash
javac Hello.java
```

실행한다.

```bash
java Hello
```

이것만으로도 Java 프로그램을 만들 수 있다.

그러므로 Java 개발에 IntelliJ가 **절대적으로 필수라서** 설치하는 것은 아니다.

문제는 프로젝트가 커졌을 때다.

---

## 3. 프로젝트가 커지면 무엇이 불편해질까?

Java 파일 하나만 있을 때는 간단하다.

```text
Hello.java
```

하지만 프로젝트가 조금만 커져도 다음과 같이 된다.

```text
my-project

├─ Main.java
├─ User.java
├─ Product.java
├─ Order.java
├─ Payment.java
├─ UserService.java
├─ OrderService.java
└─ PaymentService.java
```

이때 개발자는 단순히 글자만 입력하는 것이 아니다.

코드 오류를 찾아야 하고,

클래스가 어디에 있는지 찾아야 하고,

메서드 이름을 바꿔야 하고,

파일을 이동해야 하고,

프로그램을 컴파일해야 하고,

실행해야 하고,

라이브러리를 연결해야 하고,

테스트를 실행해야 한다.

이러한 작업을 도와주는 프로그램이 IDE다.

---

## 4. IDE에서 할 수 있는 일

IntelliJ 같은 IDE에서는 하나의 프로그램 안에서 다음과 같은 작업을 처리할 수 있다.

```text
코드 작성

코드 자동완성

오류 검사

프로젝트 파일 관리

Java 버전 관리

JDK 연결

컴파일

프로그램 실행

디버깅

테스트

Git 연동

라이브러리 관리

코드 검색

코드 이동

이름 변경

리팩터링
```

그래서 이름도

```text
Integrated
Development
Environment
```

즉 **여러 개발 기능이 통합된 환경**이다.

---

## 5. IntelliJ IDEA란?

IntelliJ IDEA는 JetBrains에서 만든 IDE다.

Java와 Kotlin 개발에 특히 많이 사용된다.

Java 프로젝트를 만들면 IntelliJ가 프로젝트 구조를 이해하고

```text
어떤 JDK를 사용하는지

어떤 파일이 Java 코드인지

어디가 Source 폴더인지

어떤 클래스에 main 메서드가 있는지

코드에 오류가 있는지

어떤 프로그램을 실행할 수 있는지
```

같은 정보를 관리해준다.

즉 단순한 텍스트 편집기를 넘어 **Java 프로젝트 자체를 이해하는 개발환경**에 가깝다.

---

## 6. IntelliJ의 정식 이름

정식 이름은

```text
IntelliJ IDEA
```

다.

보통 개발자들은 간단하게

```text
IntelliJ
```

또는

```text
인텔리제이
```

라고 부른다.

IDEA가 제품 이름의 일부다.

---

## 7. 예전 글에는 Community와 Ultimate가 있는데?

IntelliJ 설치 방법을 검색하면 오래된 글에서 다음 두 제품을 볼 수 있다.

```text
IntelliJ IDEA Community Edition

IntelliJ IDEA Ultimate
```

예전에는 Community와 Ultimate가 별도의 제품으로 배포됐다.

하지만 **[IntelliJ IDEA 2025.3부터 하나의 통합 제품으로 합쳐졌다.](https://www.jetbrains.com/help/idea/intellij-idea-single-distribution.html)**

현재는 별도의 Community Edition Installer와 Ultimate Installer 중 하나를 고르는 방식이 아니라 **하나의 IntelliJ IDEA를 설치**한다. 기본 Java와 Kotlin 개발 기능은 무료로 계속 사용할 수 있고, 추가 전문 기능은 Ultimate 구독으로 활성화하는 방식이다.

따라서 2026년 현재 새로운 사용자가 설치한다면

```text
Community 받을까?

Ultimate 받을까?
```

를 먼저 고민할 필요가 없다.

---

## 8. 그러면 IntelliJ는 유료 프로그램일까?

기본적인 Java와 Kotlin 개발에 필요한 핵심 기능은 무료로 사용할 수 있다.

현재 통합 IntelliJ IDEA는 설치 시 Ultimate 기능의 30일 체험을 제공할 수 있으며, 체험 후 구독하지 않아도 무료 핵심 기능을 계속 사용할 수 있다.

따라서 이번 글에서 진행할

```text
Java 프로젝트 생성

JDK 연결

Java 코드 작성

컴파일

Java 프로그램 실행
```

같은 기본 학습에는 유료 구독이 없어도 된다.

---

## 9. Spring을 배우면 무조건 유료일까?

여기서는 조금 구분할 필요가 있다.

현재 통합 IntelliJ IDEA에서는 예전 Community Edition보다 무료 기능이 늘어났고, 기본적인 Spring 프로젝트 생성이나 일부 기본 지원도 무료 기능에 포함된다.

하지만 Spring에 대한 더 전문적이고 깊은 IDE 지원 기능은 Ultimate 구독 영역에 포함될 수 있다. [JetBrains도](https://blog.jetbrains.com/idea/2025/12/intellij-idea-unified-release/) Ultimate 구독 기능으로 고급 Spring 및 JVM 생태계 지원을 안내하고 있다.

지금은 Java 기초 프로젝트를 만드는 단계이므로 이 부분을 크게 신경 쓰지 않아도 된다.

---

## 10. IntelliJ를 설치하려면 Java가 먼저 있어야 할까?

여기서 조금 재미있는 부분이 있다.

IntelliJ IDEA 자체는 JetBrains Runtime이라는 Java Runtime을 포함하고 있기 때문에 **IntelliJ 프로그램 자체를 실행하기 위해 우리가 별도로 설치한 JDK가 필요한 것은 아니다.**

하지만 **Java 프로그램을 개발하려면 별도의 JDK가 필요하다.**

[JetBrains 공식 문서](https://www.jetbrains.com/help/idea/installation-guide.html)도 IntelliJ IDEA 실행용 Runtime은 IDE에 포함되어 있지만, Java 애플리케이션 개발에는 standalone JDK가 필요하다고 설명한다.

즉 다음 두 가지는 다른 이야기다.

```text
IntelliJ 프로그램 실행
→ IntelliJ 내부 Runtime 사용

Java 프로젝트 개발
→ 우리가 설치한 JDK 사용
```

---

## 11. 그래서 JDK를 먼저 설치한 것이다

Dev Setup 순서를 다시 보면

```text
05 JDK 21 설치

↓

06 IntelliJ IDEA 설치
```

순서였다.

이유가 바로 이것이다.

앞선 글에서

```text
C:\Program Files\Java\jdk-21
```

같은 위치에 JDK를 설치했고,

이번에는 IntelliJ에게

> Java 프로젝트를 만들 때 이 JDK 21을 사용해

라고 알려준다.

---

## 12. IntelliJ와 JDK 관계

전체 구조를 아주 간단하게 보면 다음과 같다.

```text
IntelliJ IDEA

코드 작성
프로젝트 관리
실행 버튼
오류 검사

        ↓

JDK 21

javac
java
Java Library

        ↓

Java 프로그램 실행
```

즉 IntelliJ 자체가 JDK를 대신하는 것은 아니다.

---

## 13. JDK 없이 IntelliJ만 설치하면?

IntelliJ 프로그램 자체는 실행될 수 있다.

하지만 Java 프로젝트를 만들려고 하면 사용할 JDK를 지정해야 한다.

IntelliJ에서는 이미 설치된 JDK를 선택할 수도 있고, 필요한 경우 IDE 안에서 JDK를 다운로드할 수도 있다.

이번에는 이미 앞선 글에서 JDK 21을 직접 설치했기 때문에 그 JDK를 연결한다.

---

## 14. 설치 전 JDK 21 다시 확인

IntelliJ를 설치하기 전에 앞서 만든 Java 환경을 다시 한 번 확인한다.

새 터미널을 연다.

```bash
java -version
```

Java 21 계열인지 확인한다.

다음도 실행한다.

```bash
javac -version
```

여기에서도

```text
21
```

계열인지 확인한다.

---

## 15. JAVA_HOME도 확인

Command Prompt를 사용한다면

```cmd
echo %JAVA_HOME%
```

PowerShell이라면

```powershell
$env:JAVA_HOME
```

Git Bash라면

```bash
echo $JAVA_HOME
```

을 확인한다.

예를 들어

```text
C:\Program Files\Java\jdk-21
```

같은 JDK 경로가 나오면 된다.

이 경로는 잠시 뒤 IntelliJ에서 JDK를 직접 지정할 때도 사용할 수 있다.

---

## 16. IntelliJ 시스템 요구사항 확인

2026년 현재 [JetBrains 공식 문서](https://www.jetbrains.com/help/idea/installation-guide.html) 기준 IntelliJ IDEA는 Windows 10과 11을 지원하며, 공식 안내상 8GB의 전체 RAM과 약 10GB의 디스크 공간 등을 권장한다.

다만 실제 프로젝트 규모, 실행하는 서버, 브라우저, Docker, 데이터베이스 등을 동시에 사용하면 훨씬 많은 메모리가 필요할 수 있다.

이번 글에서는 Windows 10 또는 Windows 11 환경을 기준으로 진행한다.

---

## 17. IntelliJ 설치 방법은 하나뿐일까?

아니다.

대표적으로 다음과 같은 방법이 있다.

```text
JetBrains Toolbox App

Standalone Installer
```

JetBrains는 여러 JetBrains 프로그램과 버전을 관리하기 편한 **[Toolbox App](https://www.jetbrains.com/toolbox-app/) 사용을 [권장](https://www.jetbrains.com/help/idea/installation-guide.html)**하고 있다. Toolbox를 사용하면 설치, 업데이트, 이전 버전 관리 등을 한곳에서 할 수 있다.

하지만 이번 글에서는 설치 과정을 직접 이해하기 쉽도록 **Standalone Windows Installer 방식**으로 진행한다.

---

## 18. Toolbox App은 나중에 써도 된다

JetBrains 프로그램을 여러 개 사용하게 된다면 Toolbox가 편하다.

예를 들어 앞으로

```text
IntelliJ IDEA

PyCharm

WebStorm

DataGrip
```

같은 JetBrains 제품을 여러 개 사용한다면 Toolbox에서 관리할 수 있다.

하지만 현재 목표는 IntelliJ 하나를 직접 설치하고 구조를 이해하는 것이다.

따라서 Installer 방식으로 진행해도 문제없다.

---

## 19. IntelliJ 공식 사이트 접속

검색창에

```text
IntelliJ IDEA
```

또는

```text
IntelliJ IDEA download
```

를 검색한다.

[JetBrains 공식 IntelliJ IDEA 다운로드 페이지](https://www.jetbrains.com/idea/download/)로 이동한다.

현재는 통합 제품이므로

```text
IntelliJ IDEA
```

다운로드 버튼을 찾으면 된다.

---

## 20. 오래된 Community 설치 글과 화면이 다른 이유

인터넷 강의나 예전 블로그에는

```text
Ultimate

Community
```

두 개의 다운로드 버튼이 있을 수 있다.

현재는 제품이 통합됐기 때문에 화면이 다를 수 있다.

따라서 오래된 화면과 내 화면이 다르다고

> 내가 잘못 들어왔나?

라고 생각할 필요는 없다.

현재 JetBrains의 공식 배포 방식 자체가 바뀐 것이다.

---

## 21. Windows Installer 선택

Windows 환경에 맞는 Installer를 다운로드한다.

일반 Intel/AMD PC에서는 일반적인 Windows x64 계열 Installer를 사용하면 된다.

ARM 기반 Windows PC라면 ARM64용 Installer가 별도로 제공된다. [JetBrains 공식 설치 문서](https://www.jetbrains.com/help/idea/installation-guide.html)도 Windows ARM64용 Installer가 별도로 제공된다고 안내한다.

---

## 22. 설치 파일 실행

다운로드한 `.exe` 파일을 실행한다.

Windows에서

```text
이 앱이 디바이스를 변경하도록 허용하시겠습니까?
```

같은 메시지가 나타날 수 있다.

JetBrains 공식 사이트에서 다운로드한 Installer가 맞는지 확인한 뒤 진행한다.

---

## 23. 설치 위치

Installer를 진행하면 IntelliJ IDEA 설치 위치를 지정하는 화면이 나타난다.

특별한 이유가 없다면 기본 설치 경로를 그대로 사용하는 것이 좋다.

처음 개발환경을 만들 때는 프로그램 경로를 임의로 바꾸기보다 기본값을 유지하는 편이 관리하기 쉽다.

---

## 24. Installation Options

Windows Standalone Installer에서는 설치 옵션을 선택하는 화면이 나타난다.

현재 [JetBrains 공식 문서](https://www.jetbrains.com/help/idea/installation-guide.html)에는 대표적으로 다음 기능을 설정할 수 있다고 안내되어 있다.

```text
Desktop Shortcut

Command-line Launcher PATH

Open Folder as Project

File Association
```

하나씩 의미를 알아보자.

---

## 25. Desktop Shortcut

바탕화면에 IntelliJ 실행 아이콘을 만드는 옵션이다.

필수는 아니다.

바탕화면에서 자주 실행하고 싶다면 체크해도 된다.

체크하지 않아도 Windows 시작 메뉴에서 IntelliJ를 검색해 실행할 수 있다.

---

## 26. PATH에 IntelliJ Launcher 추가

Installer에서는 IntelliJ의 command-line launcher 경로를 PATH에 추가하는 옵션도 제공한다.

이 옵션은 터미널에서 IntelliJ를 실행하는 기능을 사용할 때 편하다.

다만 Java 개발 자체에 필수인 설정은 아니다.

여기서 헷갈리지 말아야 한다.

```text
JDK PATH

와

IntelliJ PATH
```

는 다른 것이다.

---

## 27. JDK PATH와 IntelliJ PATH 차이

앞선 글에서 설정한

```text
%JAVA_HOME%\bin
```

은 Java 실행을 위한 PATH다.

그래서

```bash
java
```

```bash
javac
```

를 사용할 수 있었다.

이번 Installer의 PATH 옵션은 IntelliJ의 command-line launcher를 터미널에서 찾기 위한 것이다.

즉 서로 다른 목적이다.

---

## 28. Open Folder as Project

매우 편리한 옵션이다.

이 기능을 추가하면 Windows 탐색기에서 폴더를 마우스 오른쪽 버튼으로 클릭했을 때 IntelliJ 프로젝트로 여는 메뉴를 사용할 수 있다.

[JetBrains 공식 Installer](https://www.jetbrains.com/help/idea/installation-guide.html)도 이 옵션을 제공한다.

개발 프로젝트 폴더를 자주 여는 경우 편리하므로 추가해도 좋다.

---

## 29. File Association

특정 확장자의 파일을 더블 클릭했을 때 IntelliJ로 열도록 연결하는 옵션이다.

예를 들어 `.java` 파일을 IntelliJ와 연결할 수 있다.

하지만 파일 연결은 개인 취향의 영역이다.

VS Code와 IntelliJ를 함께 사용한다면 모든 파일을 무조건 IntelliJ에 연결할 필요는 없다.

---

## 30. 설치 진행

옵션을 확인했다면

```text
Install
```

을 선택한다.

설치가 완료되면

```text
Run IntelliJ IDEA
```

같은 선택지가 나타날 수 있다.

실행한다.

---

## 31. IntelliJ 첫 실행

처음 실행하면 기존 JetBrains IDE의 설정을 가져올지 묻는 화면이 나타날 수 있다.

처음 사용하는 경우라면 가져올 기존 설정이 없으므로 새 설정으로 시작하면 된다.

버전에 따라 화면의 정확한 문구나 순서는 조금씩 달라질 수 있다.

---

## 32. 테마 선택

처음 실행 과정에서 테마를 선택할 수 있다.

대표적으로 밝은 계열과 어두운 계열이 있다.

예를 들어

```text
Light

Dark
```

형태다.

개발 기능에 차이가 있는 것은 아니다.

자신이 보기 편한 것을 선택하면 된다.

---

## 33. Ultimate 체험 안내가 나타날 수 있다

현재 통합 IntelliJ IDEA는 무료 핵심 기능과 Ultimate 구독 기능을 같은 제품 안에서 제공한다.

따라서 설치 또는 첫 실행 과정에서 Ultimate 체험 안내가 나타날 수 있다.

Java 기본 학습을 위해 반드시 유료 구독을 시작해야 하는 것은 아니다.

무료 핵심 기능만으로 이번 글의 Java 프로젝트를 만들고 실행할 수 있다.

---

## 34. Welcome 화면

초기 설정이 끝나면 Welcome 화면을 볼 수 있다.

대표적으로 다음과 같은 기능이 있다.

```text
New Project

Open

Get from VCS
```

각각 역할이 다르다.

---

## 35. New Project

새로운 프로젝트를 처음부터 만들 때 사용한다.

이번 글에서 사용할 기능이다.

```text
New Project
→ 새 Java 프로젝트 생성
```

---

## 36. Open

이미 내 컴퓨터에 존재하는 프로젝트 폴더를 열 때 사용한다.

예를 들어

```text
C:\dev\school-java-project
```

라는 프로젝트가 이미 있다면 Open을 사용할 수 있다.

---

## 37. Get from VCS

GitHub 같은 원격 Git Repository에서 프로젝트를 받아올 때 사용할 수 있다.

예를 들어 GitHub 주소가 있다면

```text
GitHub

↓

Clone

↓

Local PC

↓

IntelliJ에서 Open
```

과정을 IntelliJ 안에서 진행할 수 있다.

앞선 Git 글에서 배운 `git clone`과 연결되는 기능이다.

이번에는 Git을 섞지 않고 Java 프로젝트 자체에 집중하기 위해 New Project를 사용한다.

---

## 38. New Project 선택

Welcome 화면에서

```text
New Project
```

를 선택한다.

이미 프로젝트가 열려 있다면 메뉴에서

```text
File
→ New
→ Project
```

를 사용할 수 있다.

[JetBrains 공식 프로젝트 생성 안내](https://www.jetbrains.com/help/idea/creating-and-running-your-first-java-application.html)도 같은 흐름을 사용한다.

---

## 39. Java 선택

새 프로젝트 생성 화면에서 언어로

```text
Java
```

를 선택한다.

이제 프로젝트 이름, 위치, Build System, JDK 등의 항목을 설정할 수 있다.

---

## 40. 프로젝트 이름 정하기

이번 연습 프로젝트 이름은 예를 들어

```text
intellij-java-test
```

로 한다.

또는

```text
HelloIntelliJ
```

처럼 만들어도 된다.

이번 글에서는 설명을 쉽게 하기 위해

```text
intellij-java-test
```

를 사용한다고 가정한다.

---

## 41. 프로젝트 이름과 폴더

프로젝트를 만들면 일반적으로 프로젝트 이름과 비슷한 폴더가 생성된다.

예:

```text
C:\dev\intellij-java-test
```

안에 프로젝트 파일들이 들어간다.

즉 IntelliJ 안에 코드가 저장되는 것이 아니다.

실제 Windows 폴더가 존재한다.

---

## 42. Location

Location은 프로젝트를 실제로 저장할 위치다.

예를 들어 개발 프로젝트를

```text
C:\dev
```

에 모으기로 했다면

```text
C:\dev\intellij-java-test
```

처럼 만들 수 있다.

프로젝트를 어디에 만들었는지 항상 알 수 있게 일정한 폴더 규칙을 정해두는 것이 좋다.

---

## 43. IntelliJ Project란?

[JetBrains는 Project를](https://www.jetbrains.com/help/idea/creating-and-managing-projects.html) 소스 코드, 테스트, 라이브러리, SDK, 빌드 정보, 설정 등을 함께 관리하는 최상위 단위로 설명한다.

초보자 입장에서는

> **하나의 개발 작업 전체를 담고 있는 큰 폴더**

라고 이해하면 된다.

예:

```text
shopping-project

├─ Java 코드
├─ Test 코드
├─ Library
├─ 설정
└─ JDK 정보
```

---

## 44. Build System이라는 항목이 있다

프로젝트를 만들 때 다음과 같은 선택지를 볼 수 있다.

```text
IntelliJ

Maven

Gradle
```

처음 보면 또 새로운 프로그램이 등장해서 당황할 수 있다.

---

## 45. Build System이란?

프로젝트를 컴파일하고 테스트하고 패키징하고 외부 라이브러리를 관리하는 과정은 프로젝트가 커질수록 복잡해진다.

이를 자동화하고 관리하는 도구가 Build System 또는 Build Tool이다.

Java에서는 대표적으로

```text
Maven

Gradle
```

을 많이 사용한다.

---

## 46. 그런데 이번에는 왜 IntelliJ를 선택할까?

현재 목표는 Java IDE와 JDK 연결을 이해하는 것이다.

처음부터 Maven이나 Gradle까지 같이 배우면

```text
IDE

JDK

Maven

Gradle

Dependency

Repository
```

개념이 한꺼번에 늘어난다.

따라서 이번 간단한 Java 프로젝트에서는

```text
Build System
→ IntelliJ
```

를 선택한다.

[JetBrains의 기본 Java 프로젝트 생성 안내](https://www.jetbrains.com/help/idea/creating-and-running-your-first-java-application.html)에서도 단순한 첫 Java 프로젝트를 만들 때 IntelliJ 자체 Build System을 선택할 수 있다.

---

## 47. Maven과 Gradle은 나중에

실제 Spring Boot 프로젝트에서는 Maven 또는 Gradle을 자주 사용한다.

하지만 지금은

```text
Java 파일 작성

↓

JDK로 Compile

↓

Run
```

이라는 기본 구조만 확인한다.

Build Tool은 별도의 학습 주제로 다루는 것이 더 이해하기 쉽다.

---

## 48. 가장 중요한 JDK 항목

이제 프로젝트 생성 화면에서 가장 중요한 부분을 본다.

```text
JDK
```

항목이다.

여기에서 **이 프로젝트가 어떤 JDK를 사용할 것인지** 선택한다.

우리의 목표는

```text
JDK 21
```

이다.

---

## 49. IntelliJ가 JDK 21을 자동으로 찾을 수도 있다

앞선 글에서 JDK 21을 정상적으로 설치했다면 IntelliJ가 자동으로 감지할 수 있다.

JDK 목록에

```text
21
```

또는 설치한 JDK의 이름이 나타날 수 있다.

그렇다면 해당 JDK 21을 선택하면 된다.

---

## 50. JDK가 목록에 없다면?

설치되어 있는데 IntelliJ가 자동으로 찾지 못할 수도 있다.

그럴 때는

```text
Add JDK from Disk
```

또는 버전에 따라 비슷한 이름의 메뉴를 선택한다.

[JetBrains 공식 문서](https://www.jetbrains.com/help/idea/sdk.html)에서도 설치된 JDK를 IDE가 찾지 못할 경우 **Add JDK from disk**를 선택하고 JDK Home Directory를 지정하도록 안내한다.

---

## 51. 어떤 폴더를 선택해야 할까?

앞선 글에서 JAVA_HOME으로 설정했던 경로를 생각하면 된다.

예를 들어

```text
C:\Program Files\Java\jdk-21
```

이다.

바로 이 **JDK 루트 폴더**를 선택한다.

---

## 52. bin 폴더를 선택하는 것이 아니다

여기서 또 매우 중요한 부분이다.

다음 폴더를 선택한다.

```text
C:\Program Files\Java\jdk-21
```

O

다음 폴더를 선택하지 않는다.

```text
C:\Program Files\Java\jdk-21\bin
```

X

이유는 IntelliJ가 JDK 전체 구조를 알아야 하기 때문이다.

앞선 `JAVA_HOME`과 같은 원리다.

---

## 53. JDK Home Directory

IntelliJ에서 JDK 위치를 지정한다는 것은

> 이 폴더에 Java 개발에 필요한 JDK가 설치되어 있다

고 알려주는 것이다.

[JetBrains는 이 위치를](https://www.jetbrains.com/help/idea/sdk.html) **SDK Home Directory**라고 설명한다.

즉

```text
JDK Home

C:\Program Files\Java\jdk-21
```

이다.

---

## 54. IntelliJ에서 JDK를 새로 다운로드할 수도 있다

만약 JDK를 설치하지 않았다면 IntelliJ의

```text
Download JDK
```

기능을 사용할 수도 있다.

버전과 배포판을 선택하면 IntelliJ가 JDK를 다운로드하고 등록해준다.

하지만 이번 시리즈에서는 JDK 설치와 환경변수까지 직접 이해하기 위해 앞선 05편에서 수동 설치했다.

---

## 55. JDK 목록에 21이 여러 개라면?

컴퓨터에 여러 JDK 배포판이 설치되어 있을 수 있다.

예를 들어

```text
Oracle JDK 21

Temurin 21

Corretto 21
```

처럼 보일 수 있다.

수업이나 프로젝트에서 특정 JDK 배포판을 요구한다면 그 환경을 맞춘다.

특별한 요구사항이 없다면 앞선 글에서 설치한 JDK를 선택한다.

---

## 56. Add Sample Code

프로젝트 생성 화면에

```text
Add sample code
```

같은 옵션이 있을 수 있다.

체크하면 IntelliJ가 예제 Java 코드를 자동으로 만들어줄 수 있다.

하지만 이번에는 직접 파일을 만드는 과정을 확인하기 위해 체크하지 않고 진행한다.

---

## 57. Create Git Repository

다음과 같은 옵션도 있을 수 있다.

```text
Create Git repository
```

체크하면 새 프로젝트 폴더를 Git Repository로 만들 수 있다.

앞에서 Git을 이미 배웠지만 이번 글에서는 IntelliJ와 Java에 집중하기 위해 우선 체크하지 않아도 된다.

나중에

```bash
git init
```

을 직접 하거나 IntelliJ의 Git 기능을 사용해 연결할 수 있다.

---

## 58. 프로젝트 생성

다음을 확인한다.

```text
Language
→ Java

Name
→ intellij-java-test

Build System
→ IntelliJ

JDK
→ 21
```

문제가 없다면

```text
Create
```

를 선택한다.

---

## 59. 프로젝트가 처음 열릴 때

프로젝트를 처음 만들면 IntelliJ가 프로젝트 정보를 읽고 인덱싱하는 작업을 수행할 수 있다.

프로젝트가 커지면 이 과정에 시간이 조금 걸릴 수 있다.

IntelliJ는 프로젝트 구조와 코드 정보를 분석해서

```text
자동완성

코드 검색

오류 검사

리팩터링

클래스 이동
```

같은 기능을 제공한다.

---

## 60. IntelliJ 화면 구조

프로젝트가 열리면 처음에는 메뉴가 많아 복잡해 보인다.

아주 단순하게 나누면 다음과 같다.

```text
┌───────────────────────────────────────┐
│ Menu / Toolbar                        │
├──────────────┬────────────────────────┤
│              │                        │
│   Project    │        Editor          │
│              │                        │
│              │                        │
│              │                        │
├──────────────┴────────────────────────┤
│ Run / Terminal / Problems 등          │
└───────────────────────────────────────┘
```

모든 버튼을 처음부터 외울 필요는 없다.

---

## 61. Project 창

왼쪽에는 보통 Project Tool Window가 있다.

프로젝트의 폴더와 파일 구조를 보여준다.

[JetBrains 공식 문서](https://www.jetbrains.com/help/idea/project-tool-window.html) 기준 Windows에서는

```text
Alt + 1
```

로 Project Tool Window를 열 수도 있다.

처음에는 Windows 파일 탐색기와 비슷하다고 생각해도 된다.

---

## 62. Editor

가운데 가장 넓은 영역은 실제 코드를 작성하는 Editor다.

Java 파일을 선택하면 이곳에서 코드를 작성한다.

예를 들어

```text
Main.java
```

를 열면 해당 파일의 내용이 Editor에 나타난다.

---

## 63. Tool Window

아래에는 상황에 따라 여러 창이 나타난다.

예를 들어

```text
Run

Debug

Terminal

Problems

Git
```

같은 창이다.

Java 프로그램을 실행하면 결과는 보통

```text
Run
```

창에서 확인한다.

---

## 64. src 폴더

간단한 Java 프로젝트를 만들면

```text
src
```

라는 폴더를 볼 수 있다.

`src`는

```text
source
```

의 약자로 생각하면 된다.

Java 소스 코드를 넣는 영역이다.

예:

```text
intellij-java-test

└─ src
```

---

## 65. 왜 아무 폴더에 Java 파일을 만들지 않을까?

IntelliJ는 프로젝트 안에서 어떤 폴더가 Java Source를 담는 위치인지 구분한다.

Source Root로 인식된 폴더의 코드는 Java Source Code로 처리한다.

그래서 이번에는 `src` 아래에 Java Class를 만든다.

---

## 66. 첫 Java Class 만들기

Project 창에서

```text
src
```

폴더를 선택한다.

마우스 오른쪽 버튼을 누른다.

다음 메뉴를 찾는다.

```text
New
→ Java Class
```

선택한다.

---

## 67. Class 이름

이름을

```text
Main
```

으로 입력한다.

그러면

```text
Main.java
```

파일이 만들어진다.

IntelliJ가 자동으로 기본 Class 구조를 만들어줄 수 있다.

예:

```java
public class Main {

}
```

---

## 68. 파일 이름과 Class 이름

앞선 Java 글에서 배웠던 규칙을 다시 보자.

파일:

```text
Main.java
```

Class:

```java
public class Main
```

이다.

이렇게 이름을 맞춘다.

IntelliJ에서 Java Class를 생성하면 이름을 기준으로 파일과 Class를 만들어주기 때문에 실수를 줄일 수 있다.

---

## 69. main 메서드 작성

이제 다음과 같이 작성한다.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello IntelliJ!");
    }
}
```

앞선 글에서 직접 작성했던 형태와 동일하다.

---

## 70. IntelliJ 자동완성

IntelliJ에서는 코드를 입력하면서 자동완성 기능을 사용할 수 있다.

예를 들어 클래스나 메서드 이름을 입력하면 가능한 코드를 추천한다.

일반적인 코드 완성 목록은

```text
Ctrl + Space
```

로 열 수 있다.

IntelliJ의 장점 중 하나가 Java 코드의 문맥을 이해하고 다양한 코딩 지원을 제공한다는 점이다.

---

## 71. `main`을 빠르게 만드는 방법도 있다

IntelliJ에는 Live Template이라는 기능도 있다.

환경에 따라

```text
main
```

같은 템플릿을 입력하고 자동완성을 사용해 `main` 메서드를 빠르게 생성할 수 있다.

또 출력문도 템플릿을 이용해 빠르게 작성할 수 있다.

하지만 처음 배우는 단계에서는 자동 템플릿에 너무 의존하기보다

```java
public static void main(String[] args)
```

구조를 직접 한 번 작성해보는 것도 좋다.

---

## 72. IntelliJ는 저장 버튼이 잘 안 보이는데?

VS Code를 사용하다 IntelliJ로 오면

> 저장은 어디서 하지?

라고 생각할 수 있다.

IntelliJ는 파일 변경을 자동으로 저장하는 방식이 기본이다.

컴파일, 실행, 디버깅, 프로젝트 종료, 다른 애플리케이션으로 전환하는 등의 여러 이벤트에서 자동 저장이 발생한다. 직접 저장하고 싶다면 Windows에서

```text
Ctrl + S
```

또는 `File → Save All`을 사용할 수 있다.

---

## 73. 그래도 Ctrl + S를 눌러도 된다

IntelliJ가 자동 저장한다고 해서

```text
Ctrl + S
```

가 잘못된 것은 아니다.

처음에는 VS Code 습관대로 Ctrl + S를 눌러도 괜찮다.

다만 IntelliJ에서는

> 저장 버튼을 안 눌렀는데 어떻게 코드가 실행됐지?

라는 상황이 정상적으로 발생할 수 있다는 점을 알아두면 된다.

---

## 74. Java 코드 왼쪽에 초록색 삼각형

`main` 메서드가 정상적으로 작성되어 있다면 코드 왼쪽 영역에 초록색 삼각형 모양의 실행 아이콘이 나타날 수 있다.

대략

```text
▶ public static void main(...)
```

같은 느낌이다.

IntelliJ가

> 이 메서드는 Java 프로그램의 실행 시작점이다

라고 인식하고 있다는 뜻이다.

---

## 75. 실행하기

초록색 Run 아이콘을 클릭한다.

다음과 비슷한 메뉴가 나타난다.

```text
Run 'Main.main()'
```

선택한다.

[JetBrains 공식 문서](https://www.jetbrains.com/help/idea/creating-and-running-your-first-java-application.html)도 `main()`이 있는 Java 코드를 Editor의 Run 아이콘으로 실행할 수 있다고 안내한다.

---

## 76. 단축키로 실행

Windows에서 일반적인 Run 단축키로

```text
Shift + F10
```

을 사용할 수 있다.

처음에는 버튼을 눌러 실행하고, 익숙해지면 단축키를 사용해도 된다.

---

## 77. IntelliJ가 내부에서 하는 일

Run 버튼을 눌렀다고 Java가 마법처럼 실행되는 것은 아니다.

기본 개념은 앞선 글과 같다.

우리가 직접 했던 작업은

```text
Main.java

↓

javac Main.java

↓

Main.class

↓

java Main
```

이었다.

IntelliJ에서는 이 과정을 IDE가 관리해준다.

개념적으로 보면

```text
Run 클릭

↓

IntelliJ가 Project 설정 확인

↓

선택된 JDK 확인

↓

Java 코드 Build / Compile

↓

실행

↓

결과 표시
```

과정이다.

---

## 78. Run 창 확인

프로그램이 실행되면 화면 아래쪽에

```text
Run
```

Tool Window가 열린다.

출력 결과를 확인한다.

```text
Hello IntelliJ!
```

가 표시되면 된다.

---

## 79. Process finished with exit code 0

실행 결과 아래에 다음과 비슷한 문장이 나타날 수 있다.

```text
Process finished with exit code 0
```

처음 보면 오류처럼 느껴질 수 있다.

하지만

```text
exit code 0
```

은 일반적으로 프로그램이 정상적으로 종료됐다는 뜻이다.

[JetBrains 공식 첫 Java 실행 예제](https://www.jetbrains.com/help/idea/creating-and-running-your-first-java-application.html)에서도 프로그램이 정상 종료되었을 때 exit code 0을 확인할 수 있다고 설명한다.

---

## 80. exit code가 무엇일까?

프로그램이 종료될 때 운영체제에 결과 상태를 전달할 수 있다.

일반적으로

```text
0
→ 정상 종료
```

로 사용된다.

0이 아닌 값은 프로그램이나 실행 환경에 따라 오류 또는 다른 상태를 나타낼 수 있다.

따라서

```text
Process finished with exit code 0
```

은 걱정할 문구가 아니다.

---

## 81. 코드를 수정해보기

다음 코드를

```java
System.out.println("Hello IntelliJ!");
```

다음처럼 바꾼다.

```java
System.out.println("JDK 21 + IntelliJ 연결 완료!");
```

전체 코드는 다음과 같다.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("JDK 21 + IntelliJ 연결 완료!");
    }
}
```

다시 Run한다.

---

## 82. 결과 확인

Run 창에서

```text
JDK 21 + IntelliJ 연결 완료!
```

가 출력되는지 확인한다.

정상적으로 나온다면

```text
IntelliJ

↓

JDK 21

↓

Java Compile

↓

Java Run
```

연결이 정상적으로 동작하는 것이다.

---

## 83. 그런데 정말 JDK 21을 사용하고 있는지 확인하고 싶다면?

프로젝트 JDK를 직접 확인한다.

메뉴에서

```text
File
→ Project Structure
```

를 연다.

Windows에서는

```text
Ctrl + Alt + Shift + S
```

단축키로 Project Structure를 열 수도 있다.

---

## 84. Project SDK 확인

Project Structure에서

```text
Project Settings
→ Project
```

영역을 찾는다.

여기에서

```text
SDK
```

또는 Project SDK 관련 항목을 확인한다.

JDK 21이 선택되어 있어야 한다.

[JetBrains 공식 설정 경로](https://www.jetbrains.com/help/idea/sdk.html) 역시 `File → Project Structure → Project`에서 Project SDK를 설정하도록 안내한다.

---

## 85. Project SDK란?

Project SDK는

> **이 IntelliJ Project가 기본적으로 사용할 개발 SDK**

라고 이해하면 된다.

Java 프로젝트에서는 사실상

```text
Project SDK
→ JDK
```

라고 생각하면 된다.

현재 프로젝트는

```text
Project SDK
→ JDK 21
```

이어야 한다.

---

## 86. SDK는 JDK와 다른 것인가?

SDK는 더 넓은 개념이다.

SDK는

**Software Development Kit**

이다.

특정 플랫폼이나 기술을 개발하기 위한 도구 묶음을 의미한다.

Java 개발용 SDK가 바로 JDK다.

```text
SDK
└─ Java SDK
   └─ JDK
```

[JetBrains도](https://www.jetbrains.com/help/idea/sdk.html) Java 애플리케이션 개발에 필요한 Java SDK가 JDK라고 설명한다.

---

## 87. Project SDK가 비어 있다면?

만약

```text
No SDK
```

처럼 되어 있다면 Java 프로젝트가 사용할 JDK가 제대로 지정되지 않은 것이다.

이때

```text
Add SDK

또는

Add JDK from Disk
```

를 사용한다.

그리고 앞서 설치한

```text
C:\Program Files\Java\jdk-21
```

을 지정한다.

---

## 88. JDK 21이 목록에 있다면 다시 다운로드하지 않는다

이미 JDK 21을 설치했고 목록에 정상적으로 있다면 굳이

```text
Download JDK
```

로 또 다운로드할 필요는 없다.

현재 설치된 JDK를 선택하면 된다.

---

## 89. Language Level이란?

Project Structure를 보다 보면

```text
Language Level
```

이라는 항목을 볼 수 있다.

이것도 초보자 입장에서 상당히 헷갈린다.

Language Level은 이 프로젝트에서 사용할 Java 언어 기능의 수준을 정한다.

[JetBrains 공식 문서](https://www.jetbrains.com/help/idea/project-settings-and-structure.html)에 따르면 Language Level은 IDE의 코딩 지원뿐 아니라 별도의 target bytecode 설정이 없다면 컴파일에도 영향을 줄 수 있다.

---

## 90. JDK 21인데 Language Level 17일 수도 있을까?

가능하다.

예를 들어

```text
JDK
→ 21

Language Level
→ 17
```

로 설정할 수도 있다.

그러면 JDK 21을 사용하면서도 Java 17 수준에 맞는 코드 사용을 제한하는 식으로 구성할 수 있다.

---

## 91. 처음에는 어떻게 설정할까?

이번 프로젝트에서는 JDK 21을 학습하고 있으므로

```text
SDK
→ JDK 21
```

그리고 Language Level은

```text
SDK default
```

또는 Java 21에 맞는 설정을 사용하는 것이 이해하기 쉽다.

특별한 호환성 요구가 없다면 처음부터 별도의 낮은 Language Level을 강제로 설정할 이유는 없다.

---

## 92. Module이라는 것도 보인다

IntelliJ Project에는 Module이라는 개념이 있다.

처음에는 다음처럼 이해하면 된다.

```text
Project

└─ Module
```

작은 Java 연습 프로젝트에서는 Project 하나에 Module 하나 정도의 구조로 시작할 수 있다.

프로젝트가 커지면 여러 Module을 가질 수도 있다.

---

## 93. Project SDK와 Module SDK

IntelliJ에서는 Project 전체에 사용하는 SDK와 Module별 SDK를 다르게 설정할 수도 있다.

예를 들어

```text
Project
SDK 21

├─ Module A
│  └─ SDK 21
│
└─ Module B
   └─ SDK 17
```

같은 설정도 가능하다.

[JetBrains 공식 문서](https://www.jetbrains.com/help/idea/sdk.html)도 Module별로 Project SDK를 상속하거나 별도의 SDK를 지정할 수 있다고 설명한다.

---

## 94. 지금은 복잡하게 설정하지 않는다

처음 Java를 공부하는 단계에서는

```text
Project SDK
→ JDK 21

Module SDK
→ Project SDK 사용
```

정도로 맞추는 것이 이해하기 쉽다.

별도의 이유가 없다면 Module마다 다른 JDK를 설정하지 않는다.

---

## 95. IntelliJ Terminal에서도 Java를 확인해보자

IntelliJ에도 통합 Terminal이 있다.

하단의

```text
Terminal
```

을 연다.

다음 명령어를 실행해보자.

```bash
java -version
```

그리고

```bash
javac -version
```

을 실행한다.

IntelliJ는 프로젝트에 지정된 JDK를 내장 터미널에서 사용할 수 있도록 [`JAVA_HOME`과 `PATH`를 구성하는 기능](https://www.jetbrains.com/help/idea/terminal-emulator.html)도 제공한다.

---

## 96. Windows 터미널과 IntelliJ의 Java 버전이 다를 수도 있을까?

프로젝트 설정에 따라 차이가 생길 수 있다.

예를 들어 Windows 전체 환경에서는

```text
JAVA_HOME
→ JDK 21
```

인데 특정 IntelliJ Project에서는

```text
Project SDK
→ JDK 17
```

을 사용할 수도 있다.

그래서 Java 버전 문제를 해결할 때는

```text
Windows JAVA_HOME

Windows PATH

IntelliJ Project SDK

Module SDK

Gradle JVM

Maven JDK
```

등이 서로 다른 개념이라는 것을 알아두면 좋다.

---

## 97. 지금은 어디까지만 보면 될까?

현재 프로젝트는 Build System으로 IntelliJ를 사용하므로 우선 다음만 확인하면 충분하다.

```text
Windows Java
→ JDK 21

Project SDK
→ JDK 21

Module SDK
→ Project SDK

Language Level
→ SDK Default 또는 21
```

Maven과 Gradle 관련 Java 설정은 나중에 해당 Build Tool을 사용할 때 확인한다.

---

## 98. 빨간 글씨가 보인다고 무조건 실행 오류는 아니다

IntelliJ는 코드를 작성하는 순간에도 계속 분석한다.

그래서 문제가 있는 코드에는 빨간색 밑줄이나 오류 표시가 나타날 수 있다.

예를 들어

```java
System.out.println("Hello")
```

처럼 세미콜론을 빼먹었다면 오류를 표시한다.

```java
System.out.println("Hello");
```

처럼 수정하면 해결된다.

---

## 99. IntelliJ가 컴파일 전에 오류를 알려주는 이유

터미널에서 직접 Java를 작성했을 때는

```bash
javac Hello.java
```

를 실행한 뒤 오류 메시지를 확인했다.

IntelliJ는 Editor에서 코드를 작성하는 동안 미리 문제를 분석해 보여준다.

그래서 컴파일하기 전에 많은 실수를 찾을 수 있다.

---

## 100. 자동 Import

Java에서 다른 Class를 사용하면 `import`가 필요할 수 있다.

IntelliJ는 필요한 Class를 분석해서 import를 추천하거나 자동으로 추가할 수 있다.

이런 기능도 IDE를 사용하는 이유 중 하나다.

하지만 처음에는 IntelliJ가 자동으로 만들어준 결과를 그냥 넘기기보다

> 이 import는 왜 생겼지?

정도는 확인하면서 공부하는 것이 좋다.

---

## 101. Refactoring이란?

IDE 설명에서 자주 나오는 단어가 있다.

```text
Refactoring
```

Refactoring은 프로그램의 동작 자체는 유지하면서 코드 구조를 개선하는 작업을 말한다.

예를 들어 변수 이름을

```text
a
```

에서

```text
userName
```

으로 바꾸고 싶다고 해보자.

프로젝트 전체에서 이 변수를 사용하는 곳이 많으면 직접 하나씩 변경하기 어렵다.

IntelliJ는 코드 구조를 이해하기 때문에 안전하게 이름을 변경하는 Refactor 기능을 제공한다.

---

## 102. 그냥 Ctrl + H로 이름을 바꾸는 것과 다를까?

단순 문자열 바꾸기는 같은 글자를 모두 바꿀 수 있다.

하지만 Refactoring은 Java 코드의 실제 구조를 이해하면서 변경한다.

예를 들어

```text
Class 이름

Method 이름

Variable 이름
```

을 변경할 때 관련 참조를 함께 수정할 수 있다.

이런 기능이 IDE의 강점이다.

---

## 103. Search Everywhere

IntelliJ를 사용하면서 매우 편리한 기능 중 하나가 Search Everywhere다.

```text
Shift
```

키를 두 번 빠르게 누르면 사용할 수 있다.

[JetBrains 공식 문서](https://www.jetbrains.com/help/idea/searching-everywhere.html)도 `Shift` 두 번으로 프로젝트의 Action, Setting, File, Symbol 등을 빠르게 찾을 수 있다고 안내한다.

메뉴 위치를 몰라도 검색으로 기능을 찾을 수 있다.

---

## 104. Settings 열기

Windows에서는

```text
Ctrl + Alt + S
```

로 Settings를 열 수 있다.

여기에서

```text
Editor

Plugins

Appearance

Build 설정

Git

Terminal
```

등을 조정할 수 있다.

하지만 처음부터 모든 설정을 변경할 필요는 없다.

---

## 105. 처음에는 설정을 많이 바꾸지 않는다

VS Code 글에서도 같은 이야기를 했다.

인터넷에는

```text
IntelliJ 설치 후 반드시 해야 하는 설정 30가지
```

같은 글이 많다.

처음부터 모두 적용하면 나중에

> 왜 내 IntelliJ는 강의 화면과 다르지?

라는 문제가 생길 수 있다.

우선 기본 설정으로 Java 프로젝트를 정상적으로 만들고 실행하는 것을 추천한다.

---

## 106. Plugins란?

IntelliJ도 VS Code처럼 Plugin을 설치할 수 있다.

Plugin을 추가하면 새로운 언어나 도구 지원 기능 등을 확장할 수 있다.

하지만 Java 기본 개발 기능은 IntelliJ 자체에서 제공하므로

```text
Java 개발하려면 Java Extension 먼저 설치
```

같은 VS Code 방식으로 생각할 필요는 없다.

---

## 107. VS Code에서는 Java Extension이 필요한 이유

VS Code는 범용 Code Editor에 가깝기 때문에 Java 개발 기능을 강화하려면 Java 관련 Extension을 설치해서 사용하는 경우가 많다.

반면 IntelliJ는 Java 개발을 핵심 용도로 설계한 IDE다.

그래서 Java 프로젝트 구조를 기본적으로 깊게 이해한다.

---

## 108. VS Code와 IntelliJ를 비교해보자

이제 가장 궁금할 수 있는 부분이다.

> 둘 다 코드 쓰는 프로그램인데 왜 두 개를 설치했지?

둘은 역할이 상당 부분 겹치지만 성격이 다르다.

| 구분 | VS Code | IntelliJ IDEA |
|------|------|------|
| 기본 성격 | 범용 코드 편집기 | 통합 개발 환경 |
| 강점 | 가볍고 다양한 언어에 유연함 | Java/Kotlin 프로젝트에 강함 |
| 기능 확장 | Extensions 중심 | Java 기능이 깊게 통합됨 |
| 프로젝트 이해 | Extension에 따라 확장 | Java 프로젝트 구조를 깊게 분석 |
| 실행 | Terminal/Extension 활용 | Run Configuration 통합 |
| Java Refactoring | Extension에 따라 지원 | 강력한 Java Refactoring |
| 주 사용 예 | HTML/CSS/JS/React/Next.js | Java/Spring/Spring Boot |

둘 중 하나가 무조건 더 좋은 프로그램이라는 의미는 아니다.

프로젝트 종류에 따라 적합한 도구가 다르다.

---

## 109. VS Code는 IDE가 아닌가?

이 부분은 명확하게 한 줄로만 나누기는 어렵다.

VS Code는 기본적으로 Code Editor로 소개되는 경우가 많지만 Extension을 설치하면 디버깅, Git, 언어 서버, 테스트 등 IDE와 비슷한 많은 기능을 사용할 수 있다.

그래서 실제 사용 환경에서는 꽤 강력한 개발 환경이 될 수 있다.

다만 IntelliJ는 처음부터 Java 개발을 깊게 지원하는 통합 IDE라는 차이가 있다.

---

## 110. IntelliJ로 HTML도 작성할 수 있을까?

가능하다.

IntelliJ에서도 HTML, CSS, JavaScript 등 다양한 파일을 열고 수정할 수 있다.

하지만 우리가 Dev Setup에서 도구를 나눈 이유는 역할을 이해하기 쉽도록 하기 위해서다.

이번 학습에서는 다음처럼 사용한다.

```text
Frontend

HTML
CSS
JavaScript
React
Next.js

→ VS Code
```

```text
Backend

Java
Spring
Spring Boot

→ IntelliJ IDEA
```

반드시 지켜야 하는 규칙은 아니다.

---

## 111. VS Code에서 Java를 할 수도 있을까?

가능하다.

VS Code에 Java 관련 Extension을 설치하고 JDK를 연결하면 Java 개발이 가능하다.

따라서

```text
Java
=
무조건 IntelliJ에서만 가능
```

은 아니다.

다만 Java 프로젝트 개발에서 IntelliJ가 제공하는 통합 기능이 편리하기 때문에 많이 사용된다.

---

## 112. IntelliJ에서는 Terminal을 안 써도 될까?

아니다.

IntelliJ 안에도 Terminal이 있다.

앞으로 Spring Boot나 Gradle, Maven, Git 등을 사용하면서 터미널 명령어를 사용할 수 있다.

예를 들어

```bash
git status
```

```bash
git branch
```

```bash
./gradlew build
```

등을 사용할 수 있다.

IDE를 사용한다고 Terminal 학습이 필요 없어지는 것은 아니다.

---

## 113. Git도 IntelliJ 안에서 사용할 수 있다

IntelliJ에는 Git 통합 기능도 있다.

그래서

```text
Commit

Push

Pull

Branch

Merge
```

같은 작업을 IDE 안에서 할 수 있다.

현재까지 우리는 Git을 다음 세 방식으로 사용할 수 있게 된 셈이다.

```text
Git Bash
→ CLI

SourceTree
→ Git GUI

VS Code / IntelliJ
→ IDE 안에서 Git 관리
```

---

## 114. 그럼 SourceTree는 이제 필요 없을까?

반드시 그렇지는 않다.

SourceTree는 Commit History, Branch Graph 등 Git 작업을 시각적으로 보는 데 편리할 수 있다.

IntelliJ에서는 코드를 수정하면서 바로 Commit하기 편하다.

상황에 따라

```text
코드 작성
→ IntelliJ

Git 그래프 확인
→ SourceTree

간단한 명령 확인
→ Git Bash
```

처럼 함께 사용할 수도 있다.

어떤 도구를 사용할지는 개인이나 팀 Workflow에 따라 달라진다.

---

## 115. IntelliJ의 Run 버튼이 만들어주는 것은 무엇일까?

처음 Run 버튼을 누르면 IntelliJ가 **Run Configuration**을 만든다.

쉽게 말하면

> 이 프로그램을 어떤 방식으로 실행할 것인지 저장한 설정

이다.

예를 들어

```text
어떤 Main Class를 실행할 것인지

어떤 JDK를 사용할 것인지

어떤 프로그램 인자를 전달할 것인지

어떤 JVM 옵션을 사용할 것인지
```

같은 정보를 담을 수 있다.

처음에는 IntelliJ가 자동으로 만들어주는 설정을 사용하면 된다.

---

## 116. Main Class가 두 개라면?

프로젝트가 커져서 다음처럼 Main Class가 두 개 있다고 해보자.

```text
Main.java

TestMain.java
```

둘 다

```java
public static void main(String[] args)
```

를 가지고 있다면 어떤 프로그램을 실행할지 선택해야 한다.

이때 각각 다른 Run Configuration을 만들 수 있다.

---

## 117. Run과 Debug 차이

IntelliJ에는

```text
Run

Debug
```

두 기능이 있다.

Run은 프로그램을 일반적으로 실행한다.

Debug는 프로그램 실행을 중간에 멈추면서 변수 값과 실행 흐름을 확인할 수 있게 해준다.

---

## 118. Debug는 왜 사용할까?

예를 들어 코드가

```java
int a = 10;
int b = 20;
int result = a + b;
```

인데 예상하지 못한 결과가 나온다고 해보자.

Debug를 사용하면 한 줄씩 실행하면서

```text
현재 a 값

현재 b 값

result 값
```

을 확인할 수 있다.

이번 글에서는 실행 환경 구축이 목표이므로 Debug까지 깊게 다루지는 않는다.

---

## 119. Breakpoint란?

Debug에서 자주 사용하는 것이 Breakpoint다.

코드 왼쪽을 클릭하면 빨간 점을 만들 수 있다.

프로그램이 Debug 모드에서 해당 줄에 도달하면 실행을 잠시 멈춘다.

그 상태에서 변수 값을 확인할 수 있다.

Java를 본격적으로 공부할 때 꼭 익혀두면 좋은 기능이다.

---

## 120. IntelliJ에서 코드를 실행했는데 Run 버튼이 없다

몇 가지 원인이 있을 수 있다.

먼저 코드에 정상적인 `main` 메서드가 있는지 확인한다.

JDK 21의 전통적인 클래스 구조에서는 다음 형태를 사용한다.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}
```

그리고 Java 파일이 정상적인 Source 폴더 안에 있는지도 확인한다.

---

## 121. `No SDK`가 나타난다

Project SDK가 설정되지 않은 경우다.

다음으로 이동한다.

```text
File

↓

Project Structure

↓

Project

↓

SDK
```

JDK 21을 선택한다.

없다면

```text
Add JDK from Disk
```

을 선택한다.

JDK Home:

```text
C:\Program Files\Java\jdk-21
```

을 지정한다.

---

## 122. `Cannot resolve symbol` 오류가 많이 나타난다

IntelliJ가 Java 기본 Class를 찾지 못하거나 Project SDK가 잘못된 경우 이런 증상이 생길 수 있다.

예를 들어 평범한

```java
String
```

까지 빨간색으로 표시된다면 Project SDK 상태를 먼저 확인한다.

```text
Project SDK

Module SDK

JDK 경로
```

를 확인한다.

---

## 123. JDK 21 설치했는데 IntelliJ는 다른 버전을 쓴다

Windows에 JDK 21을 설치했다고 해서 모든 IntelliJ Project가 자동으로 JDK 21을 사용하는 것은 아니다.

각 Project의 SDK 설정을 확인해야 한다.

예를 들어

```text
Windows JAVA_HOME
→ 21

IntelliJ Project SDK
→ 17
```

일 수도 있다.

Project Structure에서 직접 확인한다.

---

## 124. Project SDK는 21인데 Module은 17이다

Module에 별도의 SDK가 지정되어 있을 수 있다.

다음 경로를 확인한다.

```text
File

↓

Project Structure

↓

Modules

↓

Dependencies
```

Module SDK가

```text
Project SDK
```

를 사용하게 하거나 필요한 JDK 21을 선택한다.

---

## 125. Project SDK가 21인데 Java 21 문법이 오류다

Language Level을 확인한다.

```text
File

↓

Project Structure

↓

Project

↓

Language Level
```

낮은 Java 버전으로 제한되어 있지 않은지 확인한다.

이번 학습 환경에서는

```text
SDK default

또는

Java 21
```

을 사용하는 것이 이해하기 쉽다.

---

## 126. 프로그램은 실행됐는데 결과가 안 보인다

화면 아래쪽

```text
Run
```

Tool Window를 확인한다.

실행 결과는 Editor 안이 아니라 Run 창에 표시된다.

예:

```text
Hello IntelliJ!

Process finished with exit code 0
```

---

## 127. 코드를 바꿨는데 이전 결과가 보인다

실제로 어떤 Class를 실행하고 있는지 확인한다.

프로젝트에 Main Class가 여러 개라면 이전에 만든 Run Configuration을 실행하고 있을 수도 있다.

Editor의 해당 `main` 메서드 옆 Run 아이콘을 눌러 정확한 Class를 실행해본다.

---

## 128. Java 파일을 만들었는데 Java Class 메뉴가 없다

현재 선택한 폴더가 Source Root로 인식되지 않은 일반 폴더일 수 있다.

Project 구조에서

```text
src
```

같은 Source 영역을 확인한다.

필요한 경우 해당 폴더를 Source Root로 설정할 수 있지만, 처음 만든 단순 Java Project라면 기본 `src`를 사용하는 것이 가장 쉽다.

---

## 129. 프로젝트 폴더에 `.idea`가 생겼다

IntelliJ Project를 만들면

```text
.idea
```

폴더가 생길 수 있다.

이곳에는 IntelliJ 프로젝트 설정 정보가 들어간다.

[JetBrains 공식 문서](https://www.jetbrains.com/help/idea/creating-and-managing-projects.html)도 Project 설정의 여러 항목이 `.idea` 디렉터리의 설정 파일에 저장된다고 설명한다.

무슨 파일인지 모르는 상태에서 임의로 내용을 삭제하거나 수정하지 않는 것이 좋다.

---

## 130. `out` 폴더가 생길 수도 있다

IntelliJ 자체 Build System을 사용하면 컴파일 결과가 별도의 출력 폴더에 저장될 수 있다.

Project Structure에는 [Compiler Output 경로 설정](https://www.jetbrains.com/help/idea/project-settings-and-structure.html)도 존재하며 IntelliJ는 컴파일 결과를 출력 디렉터리에 저장한다.

즉 앞선 글에서 우리가 직접 만든

```text
Hello.class
```

같은 컴파일 결과를 IntelliJ가 프로젝트의 Output 영역에서 관리하는 것이다.

---

## 131. 내가 직접 `Hello.class`를 찾지 않아도 되는 이유

앞선 글에서는 Java 동작 원리를 공부하기 위해

```text
Hello.java

↓

Hello.class
```

를 직접 확인했다.

IntelliJ에서는 Build와 Output을 IDE가 관리해주기 때문에 매번 `.class` 파일을 직접 확인하지 않아도 된다.

하지만 내부적으로 **Compile 과정 자체가 사라진 것은 아니다.**

---

## 132. IDE를 사용하면 Java 원리를 몰라도 될까?

IDE가 많은 작업을 대신해준다고 해서

```text
javac

class 파일

JVM

JDK

PATH
```

같은 개념이 필요 없어지는 것은 아니다.

오히려 오류가 생겼을 때 이런 개념을 알고 있어야 해결하기 쉽다.

예를 들어

```text
No SDK

Unsupported Java Version

JAVA_HOME 문제

Gradle JVM 문제
```

등을 구분할 수 있다.

---

## 133. 그래서 앞선 글에서 터미널 실행을 먼저 해본 것이다

순서를 다시 보면

```text
05 JDK 설치

↓

javac Hello.java

↓

java Hello

↓

06 IntelliJ 설치

↓

Run 버튼
```

이다.

IntelliJ의 Run 버튼이 실제로 어떤 과정을 대신하는지 이해할 수 있도록 터미널 방식부터 먼저 해본 것이다.

---

## 134. IntelliJ를 새 PC에 설치하면 JDK도 자동으로 따라올까?

IntelliJ 자체를 실행하는 Runtime은 포함되어 있다.

하지만 Java 개발에 사용할 standalone JDK는 별도로 필요하다.

따라서 새 PC에서는 다음 순서가 이해하기 쉽다.

```text
JDK 설치

↓

java -version

↓

javac -version

↓

IntelliJ 설치

↓

Project JDK 연결
```

---

## 135. IntelliJ의 Runtime과 내 프로젝트 JDK를 섞지 않기

이번 글에서 꽤 중요한 개념이다.

```text
IntelliJ 자체 실행

↓

JetBrains Runtime
```

와

```text
내 Java Project 실행

↓

Project JDK 21
```

은 다른 것이다.

IntelliJ가 실행되고 있다고 해서 내 Java Project의 JDK 설정이 정상이라는 뜻은 아니다.

---

## 136. IntelliJ 업데이트

IntelliJ IDEA 역시 지속적으로 업데이트된다.

그래서 예전 강의와

```text
메뉴 위치

아이콘 모양

New Project 화면

제품 이름
```

이 조금 다를 수 있다.

특히 Community/Ultimate 통합처럼 큰 변화도 있었기 때문에 최신 문서를 기준으로 기능의 **목적**을 이해하는 것이 중요하다.

---

## 137. 화면이 다르면 무엇을 기준으로 찾을까?

버튼의 정확한 위치를 외우기보다 기능 이름을 기억한다.

예를 들어 JDK가 필요하다면

```text
Project Structure

SDK

JDK
```

를 찾는다.

프로그램을 실행하려면

```text
Run
```

을 찾는다.

설정을 바꾸려면

```text
Settings
```

를 찾는다.

또 모르는 기능은 `Shift` 두 번을 눌러 Search Everywhere에서 검색할 수 있다.

---

## 138. 현재 꼭 기억할 단축키

이번 단계에서는 다음 정도만 알아도 충분하다.

```text
Shift 두 번
→ Search Everywhere

Ctrl + Alt + S
→ Settings

Ctrl + Alt + Shift + S
→ Project Structure

Alt + 1
→ Project Tool Window

Shift + F10
→ Run

Ctrl + S
→ Save All
```

모든 단축키를 외울 필요는 없다.

사용하다 보면 자연스럽게 익숙해진다.

---

## 139. IntelliJ와 VS Code 단축키가 다르다

같은 기능이라도 단축키가 다를 수 있다.

따라서 VS Code 단축키를 그대로 IntelliJ에서 사용할 수 있다고 생각하면 안 된다.

특히 자동완성, 파일 검색, Run, Refactor 등은 JetBrains Keymap 기준 단축키를 사용한다.

---

## 140. Git 프로젝트를 IntelliJ에서 열 때

앞으로 GitHub에서 Java 프로젝트를 Clone해서 IntelliJ로 열 수도 있다.

예를 들어

```text
GitHub

↓

git clone

↓

Local Folder

↓

IntelliJ Open
```

이다.

이미 Git Repository가 있는 프로젝트를 IntelliJ에서 열었다고 해서 Git 기록이 새로 만들어지는 것은 아니다.

IntelliJ가 기존 `.git` 정보를 읽어 Git 기능을 제공한다.

---

## 141. IntelliJ에서 Commit해도 SourceTree에 보일까?

보인다.

같은 Git Repository를 보고 있기 때문이다.

```text
                 Git Repository
                /       |       \
               /        |        \
        Git Bash    SourceTree   IntelliJ
```

IntelliJ에서 Commit하면 SourceTree History에서도 확인할 수 있다.

SourceTree에서 Branch를 만들면 IntelliJ에서도 같은 Repository를 새로 읽어 해당 Branch를 확인할 수 있다.

---

## 142. 프로젝트를 IntelliJ로 열었다고 GitHub에 올라가는 것은 아니다

이것도 구분해야 한다.

```text
IntelliJ에서 Project 생성

≠

GitHub에 Repository 생성
```

그리고

```text
IntelliJ에서 저장

≠

GitHub Push
```

Git은 별도의 버전 관리 과정이다.

```text
코드 작성

↓

Git Add / Commit

↓

Push

↓

GitHub
```

가 필요하다.

---

## 143. IntelliJ 프로젝트를 닫아도 파일은 남는다

IntelliJ의

```text
Close Project
```

는 프로젝트를 IDE에서 닫는 것이다.

Windows의 실제 프로젝트 폴더를 삭제하는 것이 아니다.

예:

```text
C:\dev\intellij-java-test
```

폴더는 그대로 남아 있다.

---

## 144. IntelliJ를 삭제해도 코드가 자동으로 삭제되는 것은 아니다

IDE 프로그램과 Project 파일은 별개다.

```text
IntelliJ IDEA
→ 프로그램
```

```text
C:\dev\intellij-java-test
→ 프로젝트 파일
```

따라서 IntelliJ를 제거하는 것과 프로젝트 폴더를 삭제하는 것은 별도의 작업이다.

---

## 145. 프로젝트를 삭제하려면 조심한다

Project 목록에서 제거하는 것과 Windows 파일 자체를 삭제하는 것은 의미가 다를 수 있다.

코드를 실제로 삭제하기 전에는

```text
GitHub에 Push됐는가?

필요한 파일인가?

Local에만 존재하는 변경사항은 없는가?
```

를 확인하는 습관을 들이는 것이 좋다.

---

## 146. JDK를 바꾸고 싶다면?

예를 들어 나중에 JDK 25를 설치했다고 해보자.

단순히 Windows에 JDK 25를 설치했다고 기존 IntelliJ Project가 자동으로 25로 바뀌는 것은 아니다.

Project Structure에서

```text
Project SDK
```

를 변경해야 할 수 있다.

---

## 147. 팀 프로젝트에서는 JDK를 마음대로 바꾸지 않는다

팀 프로젝트가

```text
JDK 21
```

을 기준으로 만들어졌다면 혼자

```text
JDK 25
```

로 변경하지 않는 것이 좋다.

새 Java 기능을 사용하면 다른 팀원의 환경이나 배포 환경에서 Compile 오류가 발생할 수 있다.

프로젝트 환경은 팀 규칙에 맞춘다.

---

## 148. IntelliJ에서 JDK 21이 정상인지 최종 확인

이번 글의 핵심 점검을 해보자.

먼저 Windows Terminal:

```bash
java -version
```

```bash
javac -version
```

둘 다 21 계열.

다음 IntelliJ:

```text
File
→ Project Structure
→ Project SDK
→ 21
```

그리고 프로그램을 Run했을 때

```text
Hello IntelliJ!
```

정상 출력.

여기까지 되면 기본 연결은 끝났다.

---

## 149. 최종 프로젝트 구조

이번 실습 결과를 단순화하면 다음과 비슷하다.

```text
intellij-java-test

├─ .idea
│  └─ IntelliJ Project 설정
│
├─ src
│  └─ Main.java
│
└─ 컴파일 관련 출력
```

그리고 `Main.java`는 다음 내용이다.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("JDK 21 + IntelliJ 연결 완료!");
    }
}
```

---

## 150. 전체 실행 구조

이제 전체 흐름을 한 번에 보자.

```text
IntelliJ IDEA

↓

Main.java 작성

↓

Project SDK 확인

JDK 21

↓

Run 클릭

↓

IntelliJ Build

↓

Java Compiler

↓

Bytecode

↓

JVM

↓

프로그램 실행

↓

Run Window

JDK 21 + IntelliJ 연결 완료!
```

---

## 151. 앞선 터미널 실행과 비교

앞선 글:

```text
VS Code

↓

Hello.java

↓

javac Hello.java

↓

Hello.class

↓

java Hello
```

이번 글:

```text
IntelliJ

↓

Main.java

↓

Run

↓

Compile + Execute 자동 처리
```

즉 Java 자체의 원리가 달라진 것이 아니다.

IntelliJ가 복잡한 작업을 IDE 안에서 관리해주는 것이다.

---

## 152. VS Code와 IntelliJ 사용 방향 다시 정리

현재 Dev Setup에서는 다음 방향으로 도구를 사용할 예정이다.

```text
VS Code

HTML
CSS
JavaScript
TypeScript
React
Next.js
Markdown
JSON
```

그리고

```text
IntelliJ IDEA

Java
Spring
Spring Boot
Java Backend
```

이것은 절대적인 규칙이 아니라 **학습과 프로젝트 관리가 편하도록 정한 기본 사용 방향**이다.

---

## 153. 어떤 IDE가 더 좋은가?

단순히

```text
VS Code vs IntelliJ

누가 더 좋다?
```

로 비교할 필요는 없다.

도구의 목적이 다르다.

VS Code는 빠르고 유연한 범용 코드 편집 환경이 강점이고,

IntelliJ는 Java 프로젝트를 깊게 이해하고 자동완성, Refactor, Run Configuration, Build와 Debug 등을 통합해서 관리하는 것이 강점이다.

따라서 프로젝트에 맞춰 사용하면 된다.

---

## 154. IntelliJ를 처음 사용할 때 가장 중요한 습관

버튼을 외우는 것보다 다음을 확인하는 습관이 중요하다.

```text
현재 어떤 Project인가?

↓

현재 어떤 JDK인가?

↓

현재 어떤 Class를 수정하는가?

↓

현재 어떤 Run Configuration을 실행하는가?

↓

결과는 어디에 나오는가?
```

이 다섯 가지를 확인하면 초반 혼란이 크게 줄어든다.

---

## 155. 문제가 생기면 가장 먼저 볼 곳

Java 프로젝트가 실행되지 않는다면 다음 순서로 확인한다.

```text
1. JDK가 설치되어 있는가?

2. java -version이 정상인가?

3. javac -version이 정상인가?

4. IntelliJ Project SDK가 JDK 21인가?

5. Module SDK가 Project SDK를 사용하는가?

6. Language Level이 적절한가?

7. main 메서드가 존재하는가?

8. 현재 올바른 Class를 실행하고 있는가?
```

이 순서를 알고 있으면 무작정 IntelliJ를 삭제하고 다시 설치하는 일을 줄일 수 있다.

---

## 156. IntelliJ를 재설치하기 전에 설정부터 확인

초보자일 때 오류가 발생하면

> 설치를 잘못했나?

라고 생각하고 프로그램부터 다시 설치하기 쉽다.

하지만 실제 문제는

```text
Project SDK

Module SDK

JDK Version

Language Level

Run Configuration

Project Path
```

같은 프로젝트 설정일 수도 있다.

따라서 오류 메시지를 먼저 읽고 원인을 구분한다.

---

## 157. IntelliJ가 무겁게 느껴질 수도 있다

VS Code보다 IntelliJ가 처음 실행될 때 더 무겁게 느껴질 수 있다.

IntelliJ는 프로젝트의 코드를 분석하고 인덱싱하며 Java 관련 많은 기능을 제공한다.

특히 큰 프로젝트를 처음 열었을 때는 Indexing 작업이 진행될 수 있다.

이때 무조건 프로그램이 멈췄다고 생각하지 말고 하단 상태 표시를 확인한다.

---

## 158. IntelliJ를 실행할 때 JDK 21을 직접 실행하는 것은 아니다

다시 한 번 중요한 구분이다.

```text
IntelliJ 프로그램 자체

↓

JetBrains Runtime
```

그리고

```text
내 Java 프로젝트

↓

JDK 21
```

이다.

이 구조를 이해하면

> IntelliJ는 켜지는데 왜 Java Project는 안 되지?

라는 상황도 설명할 수 있다.

IDE 실행과 프로젝트 JDK 설정은 별개이기 때문이다.

---

## 159. 이번 글에서 꼭 알아둘 용어

IDE:

```text
Integrated Development Environment

개발에 필요한 여러 기능을 통합한 환경
```

IntelliJ IDEA:

```text
JetBrains가 만든 IDE

Java / Kotlin 개발에 특히 강함
```

JDK:

```text
Java Development Kit

Java 개발에 필요한 도구
```

SDK:

```text
Software Development Kit

특정 기술 개발을 위한 도구 모음
```

Project SDK:

```text
현재 IntelliJ Project가 사용하는 SDK
```

Language Level:

```text
프로젝트에서 사용할 Java 언어 기능 수준
```

Run Configuration:

```text
프로그램을 어떻게 실행할지 저장하는 설정
```

---

## 160. 이번 글에서 사용한 주요 경로

JDK 설치 경로 예:

```text
C:\Program Files\Java\jdk-21
```

프로젝트 경로 예:

```text
C:\dev\intellij-java-test
```

JDK를 IntelliJ에 연결할 때 선택할 곳:

```text
C:\Program Files\Java\jdk-21
```

다시 말하지만

```text
C:\Program Files\Java\jdk-21\bin
```

을 Project JDK Home으로 선택하지 않는다.

---

## 161. 이번 글에서 사용한 주요 메뉴

프로젝트 생성:

```text
Welcome

↓

New Project

↓

Java
```

JDK 변경:

```text
File

↓

Project Structure

↓

Project

↓

SDK
```

Module JDK:

```text
File

↓

Project Structure

↓

Modules

↓

Dependencies
```

설정:

```text
File

↓

Settings
```

프로그램 실행:

```text
Main.java

↓

main 옆 ▶

↓

Run
```

---

## 162. 최종 점검 체크리스트

이번 글에서 한 작업을 처음부터 끝까지 확인해보자.

```text
□ IDE가 무엇인지 이해했다

□ IntelliJ IDEA가 어떤 프로그램인지 이해했다

□ Community / Ultimate가 현재 통합 제품으로 바뀐 것을 확인했다

□ 기본 Java 개발은 무료 기능으로 가능하다는 것을 확인했다

□ IntelliJ 실행 Runtime과 Project JDK가 다르다는 것을 이해했다

□ JDK 21이 먼저 설치되어 있는지 확인했다

□ java -version에서 21을 확인했다

□ javac -version에서 21을 확인했다

□ IntelliJ IDEA를 설치했다

□ Windows 설치 옵션을 확인했다

□ IntelliJ를 정상적으로 실행했다

□ New Project를 선택했다

□ Java 프로젝트를 선택했다

□ Build System을 IntelliJ로 선택했다

□ Project JDK로 JDK 21을 선택했다

□ 필요한 경우 Add JDK from Disk를 사용했다

□ JDK 루트 폴더를 선택했다

□ bin 폴더를 JDK Home으로 선택하지 않았다

□ 프로젝트를 생성했다

□ src 폴더를 확인했다

□ Main.java를 만들었다

□ main 메서드를 작성했다

□ System.out.println을 작성했다

□ Run 버튼을 눌렀다

□ Run 창에서 결과를 확인했다

□ exit code 0의 의미를 알았다

□ File → Project Structure를 열어봤다

□ Project SDK가 JDK 21인지 확인했다

□ Language Level을 확인했다

□ VS Code와 IntelliJ의 차이를 이해했다
```

여기까지 모두 정상이라면 IntelliJ IDEA 기본 Java 개발환경 구축은 완료됐다.

---

## 정리

이번 글에서는 Java 개발용 IDE인 IntelliJ IDEA를 설치하고 앞서 설치한 JDK 21을 연결했다.

전체 과정을 다시 보면 다음과 같다.

```text
JDK 21 설치 확인

↓

java -version

↓

javac -version

↓

IntelliJ IDEA 설치

↓

New Project

↓

Java 선택

↓

Build System
IntelliJ

↓

Project JDK
JDK 21

↓

Project 생성

↓

src

↓

Main.java

↓

main 메서드 작성

↓

Run

↓

Compile

↓

Java 실행

↓

Run Window

↓

결과 확인
```

가장 중요한 것은 **IntelliJ와 JDK의 역할을 구분하는 것**이다.

```text
IntelliJ IDEA

→ 코드를 작성한다
→ 프로젝트를 관리한다
→ 오류를 분석한다
→ Build와 Run을 편하게 처리한다
```

그리고

```text
JDK 21

→ Java 개발 도구를 제공한다
→ Compiler를 제공한다
→ Java 프로그램을 실행할 환경을 제공한다
```

즉

```text
IntelliJ IDEA

        ↓

     JDK 21

        ↓

Java Compile / Run
```

구조다.

또 앞선 글에서 직접 입력했던

```bash
javac Hello.java
```

```bash
java Hello
```

과 이번 글의

```text
▶ Run
```

은 완전히 다른 Java 실행 원리가 아니다.

IntelliJ가 Compile과 Run 과정을 IDE 안에서 편하게 관리해주는 것이다.

VS Code와 IntelliJ 역시 둘 중 하나만 선택해야 하는 관계가 아니다.

이번 Dev Setup에서는 다음처럼 역할을 나누어 사용한다.

```text
VS Code
→ Frontend / 범용 코드 작성

IntelliJ IDEA
→ Java / Backend 개발
```

현재 개발환경은 이제 다음과 같이 구성됐다.

```text
개발환경

├─ 코드 작성
│
├─ VS Code
│  └─ HTML / CSS / JavaScript / React 등
│
├─ IntelliJ IDEA
│  └─ Java 프로젝트
│
├─ JavaScript 실행
│  └─ Node.js
│
├─ JavaScript Package 관리
│  └─ npm
│
├─ Java 개발
│  └─ JDK 21
│
├─ 버전 관리
│  ├─ Git
│  ├─ Git Bash
│  └─ SourceTree
│
└─ Remote Repository
   └─ GitHub
```

이제 Java 코드를 작성하고 Compile하고 실행하는 기본 환경까지 모두 준비됐다.

하지만 아직 **Java 웹 애플리케이션을 서버 형태로 실행하는 환경**은 다루지 않았다.

다음 Dev Setup에서는 **Apache Tomcat**을 설치한다.

```text
Java 코드

↓

Java Web Application

↓

Tomcat

↓

Server 실행

↓

Browser

↓

localhost
```

그리고 다음 내용을 확인한다.

```text
Web Server와 Application Server는 무엇인가?

Servlet은 무엇인가?

Servlet Container는 무엇인가?

Tomcat은 왜 필요한가?

Tomcat 설치

↓

JDK 21 연결

↓

Tomcat 실행

↓

Port 확인

↓

localhost 접속

↓

Tomcat 종료
```

현재 Dev Setup 진행 상황은 다음과 같다.

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

04 Node.js와 npm 개발환경 구축
   ↓

05 JDK 21 설치와 Java 환경변수 설정
   ↓

06 IntelliJ IDEA 설치하고 JDK 연결  ← 현재
   ↓

07 Tomcat 설치와 실행 환경 구축
   ↓

08 새 PC에서 개발환경 다시 구축하기
```

IntelliJ에서

```text
Project SDK
→ JDK 21
```

이 정상적으로 설정되어 있고,

다음 코드를

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("JDK 21 + IntelliJ 연결 완료!");
    }
}
```

Run했을 때

```text
JDK 21 + IntelliJ 연결 완료!

Process finished with exit code 0
```

까지 확인했다면 **IntelliJ IDEA와 JDK 21 연결은 정상적으로 완료된 것**이다.

---

## 더 학습하면 좋은 개념

- **Maven과 Gradle의 빌드 생명주기** — 44~47장에서 미뤄 둔 Build Tool이다. 의존성(Dependency)을 선언하면 라이브러리를 자동으로 받아 주고, 컴파일·테스트·패키징을 한 명령으로 묶어 준다. Spring Boot 프로젝트를 시작하면 바로 필요해진다.
- **Debugger와 Breakpoint 활용** — 117~119장에서 소개만 한 기능이다. Step Over·Step Into, 변수 값 확인, 조건부 Breakpoint를 익히면 `System.out.println`으로 값을 찍어 보는 것보다 훨씬 빠르게 원인을 찾을 수 있다.
- **Run Configuration의 VM 옵션과 프로그램 인자** — 115장에서 말한 "어떤 방식으로 실행할지"의 구체적인 내용이다. `main(String[] args)`의 `args`가 어디서 들어오는지, JVM 메모리 옵션을 어디에 넣는지 이해할 수 있다.
- **Inspections(정적 분석)** — 98~99장의 "컴파일 전에 오류를 알려주는" 기능의 정체다. 오류뿐 아니라 사용하지 않는 코드, 잠재적 버그까지 경고해 주는 규칙들을 알면 IDE의 노란 경고를 제대로 읽을 수 있다.
- **`.idea` 폴더와 `.gitignore`** — 129장의 `.idea`를 Git에 올릴지 말지의 문제다. 팀원마다 다른 개인 설정이 섞이지 않게 어떤 파일을 공유하고 어떤 파일을 제외하는지 알아 두면 협업할 때 충돌이 줄어든다.

## 참고 자료

- [JetBrains - IntelliJ IDEA Download](https://www.jetbrains.com/idea/download/)
- [IntelliJ IDEA Docs - Install IntelliJ IDEA](https://www.jetbrains.com/help/idea/installation-guide.html)
- [IntelliJ IDEA Docs - IntelliJ IDEA as a unified product](https://www.jetbrains.com/help/idea/intellij-idea-single-distribution.html)
- [JetBrains Blog - The Unified IntelliJ IDEA](https://blog.jetbrains.com/idea/2025/12/intellij-idea-unified-release/)
- [JetBrains - Toolbox App](https://www.jetbrains.com/toolbox-app/)
- [IntelliJ IDEA Docs - Create your first Java application](https://www.jetbrains.com/help/idea/creating-and-running-your-first-java-application.html)
- [IntelliJ IDEA Docs - Projects](https://www.jetbrains.com/help/idea/creating-and-managing-projects.html)
- [IntelliJ IDEA Docs - SDKs](https://www.jetbrains.com/help/idea/sdk.html)
- [IntelliJ IDEA Docs - Project structure settings](https://www.jetbrains.com/help/idea/project-settings-and-structure.html)
- [IntelliJ IDEA Docs - Terminal](https://www.jetbrains.com/help/idea/terminal-emulator.html)
- [IntelliJ IDEA Docs - Save and revert changes](https://www.jetbrains.com/help/idea/saving-and-reverting-changes.html)
- [IntelliJ IDEA Docs - Project tool window](https://www.jetbrains.com/help/idea/project-tool-window.html)
- [IntelliJ IDEA Docs - Search everywhere](https://www.jetbrains.com/help/idea/searching-everywhere.html)
- [IntelliJ IDEA Docs - Run/debug configurations](https://www.jetbrains.com/help/idea/run-debug-configuration.html)
- [IntelliJ IDEA Docs - Debug code](https://www.jetbrains.com/help/idea/debugging-code.html)
- [IntelliJ IDEA Docs - Code refactoring](https://www.jetbrains.com/help/idea/refactoring-source-code.html)
