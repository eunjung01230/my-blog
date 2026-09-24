---
layout: post
title: "JDK 21 설치와 Java 환경변수 설정하기"
date: 2026-09-24 22:45:00 +0900
categories: dev-setup
learningOrder: 60
tags:
  - java
  - jdk
  - java-home
  - windows
---

앞선 Dev Setup에서는 Node.js와 npm을 설치해서 JavaScript를 컴퓨터에서 직접 실행할 수 있는 환경을 만들었다.

JavaScript에서는 다음과 같은 구조였다.

```text
VS Code
↓
JavaScript 코드 작성
↓
Node.js
↓
JavaScript 실행
```

이번에는 Java 개발환경을 구축한다.

Java에서는 Node.js와는 조금 다른 과정이 등장한다.

```text
Java 코드 작성

↓

javac로 컴파일

↓

Java Bytecode 생성

↓

JVM에서 실행
```

처음 Java를 공부하면 여기서부터 용어가 갑자기 많아진다.

```text
Java

JDK

JRE

JVM

javac

JAVA_HOME

PATH
```

특히 설치 방법을 찾아보면

> JDK를 설치하세요.

라는 글도 있고,

> JAVA_HOME을 설정하세요.

라는 글도 있고,

> PATH에 `%JAVA_HOME%\bin`을 추가하세요.

라는 설명도 나온다.

처음 보면 단순히 Java를 공부하고 싶은 것뿐인데 왜 이렇게 많은 설정이 필요한지 이해하기 어렵다.

그래서 이번 글에서는 단순히 JDK 21 설치 버튼만 누르는 것이 아니라

> **Java 프로그램이 내 컴퓨터에서 어떻게 컴파일되고 실행되는지 이해하면서 개발환경을 직접 구축하는 것**

을 목표로 한다.

이번 글에서 진행할 전체 과정은 다음과 같다.

```text
Java / JDK / JRE / JVM 이해

↓

JDK 21 선택

↓

JDK 21 설치

↓

설치 위치 확인

↓

JAVA_HOME 생성

↓

PATH에 %JAVA_HOME%\bin 추가

↓

새 터미널 실행

↓

java -version 확인

↓

javac -version 확인

↓

실제로 Java 파일 작성

↓

javac로 컴파일

↓

java로 실행

↓

환경 구축 완료
```

---

## 1. Java란?

Java는 프로그래밍 언어다.

예를 들어 다음과 같은 코드를 작성할 수 있다.

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello Java!");
    }
}
```

하지만 이 코드를 메모장이나 VS Code에 작성했다고 해서 컴퓨터가 바로 실행할 수 있는 것은 아니다.

사람이 작성한 Java 코드를 컴퓨터가 실행할 수 있는 형태로 바꾸는 과정이 필요하다.

Java에서는 대표적으로 다음과 같은 흐름을 거친다.

```text
Hello.java

Java Source Code
사람이 작성한 코드

↓

javac

컴파일

↓

Hello.class

Java Bytecode

↓

JVM

↓

프로그램 실행
```

이 구조를 이해하면 JDK를 왜 설치하는지도 자연스럽게 이해할 수 있다.

---

## 2. Java 파일은 바로 실행되는 것이 아니다

JavaScript에서는 Node.js가 설치되어 있다면 다음처럼 실행했다.

```bash
node hello.js
```

Java는 전통적인 기본 흐름이 조금 다르다.

먼저 Java 소스 파일을 작성한다.

```text
Hello.java
```

그다음 컴파일한다.

```bash
javac Hello.java
```

그러면

```text
Hello.class
```

파일이 만들어진다.

그다음 실행한다.

```bash
java Hello
```

즉,

```text
작성

↓

컴파일

↓

실행
```

이라는 단계가 있다.

---

## 3. 컴파일이란?

Compile은 사람이 작성한 프로그램 코드를 컴퓨터가 실행할 수 있는 다른 형태로 변환하는 과정이다.

Java에서는 다음과 같은 코드를 작성한다.

```java
System.out.println("Hello Java!");
```

이것은 사람이 읽고 작성하기 편한 Java Source Code다.

그런데 JVM은 이 `.java` 파일 자체를 그대로 실행하는 것이 아니라 컴파일된 Java Bytecode를 사용한다.

그래서

```text
Hello.java

↓

javac

↓

Hello.class
```

과정을 거친다.

---

## 4. javac란?

`javac`는 **Java Compiler**다.

Java 소스 코드를 컴파일하는 프로그램이다.

예를 들어

```bash
javac Hello.java
```

라고 입력하면

```text
Hello.java
↓
javac
↓
Hello.class
```

과정이 진행된다.

이 `javac`가 JDK 안에 들어 있다.

그래서 Java 프로그램을 **개발**하려면 JDK가 필요하다.

---

## 5. `.java`와 `.class` 차이

Java를 처음 공부할 때 두 파일이 헷갈릴 수 있다.

### `.java`

사람이 작성하는 Java 소스 코드다.

예:

```text
Hello.java
```

내용:

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello Java!");
    }
}
```

### `.class`

Java Compiler가 만들어낸 Bytecode 파일이다.

```text
Hello.java

↓

javac

↓

Hello.class
```

`.class` 파일은 우리가 일반적인 소스 코드처럼 직접 수정하기 위한 파일이 아니다.

JVM이 실행할 수 있는 Bytecode가 들어 있다.

---

## 6. JVM이란?

JVM은

**Java Virtual Machine**

의 약자다.

우리말로 하면 **Java 가상 머신**이다.

처음에는 다음 정도로 이해하면 충분하다.

> **컴파일된 Java 프로그램을 실제로 실행하는 환경**

이다.

전체 과정은 다음과 같다.

```text
Hello.java

↓

javac

↓

Hello.class

↓

JVM

↓

실행
```

---

## 7. Java가 여러 운영체제에서 실행될 수 있는 이유

Java에서 자주 보는 표현이 있다.

> Write Once, Run Anywhere

Java 소스 코드를 컴파일하면 특정 Windows 실행 파일이 아니라 Java Bytecode가 만들어진다.

그리고 운영체제에 맞는 JVM이 Bytecode를 실행한다.

개념적으로 보면 다음과 같다.

```text
Java Source Code
      ↓
   Compile
      ↓
Java Bytecode
      ↓
 ┌────┼────┐
 ↓    ↓    ↓
Windows
JVM

macOS
JVM

Linux
JVM
```

물론 실제 프로그램의 호환성에는 운영체제별 기능이나 외부 라이브러리 등의 영향도 있을 수 있다.

하지만 Java의 핵심 실행 구조를 이해할 때는

```text
Java Bytecode
+
JVM
```

구조가 중요하다.

---

## 8. 이제 JDK, JRE, JVM을 구분해보자

Java를 설치하다 보면 세 단어가 거의 항상 함께 등장한다.

```text
JDK

JRE

JVM
```

처음 보면 이름이 비슷해서 매우 헷갈린다.

가장 단순하게 먼저 정리하면 다음과 같다.

```text
JDK
→ Java 개발에 필요한 도구

JRE
→ Java 프로그램 실행에 필요한 환경

JVM
→ Java Bytecode를 실제로 실행
```

조금 더 자세히 알아보자.

---

## 9. JVM

앞에서 봤던 JVM부터 다시 정리해보자.

```text
JVM
Java Virtual Machine
```

역할은

```text
Java Bytecode 실행
```

이다.

즉

```text
Hello.class

↓

JVM

↓

프로그램 실행
```

구조다.

---

## 10. JRE란?

JRE는

**Java Runtime Environment**

의 약자다.

Java 프로그램을 **실행**하는 데 필요한 런타임 환경을 의미한다.

전통적으로 아주 단순하게 설명하면 다음과 같이 표현할 수 있다.

```text
JRE

├─ JVM
└─ Java 실행에 필요한 라이브러리
```

즉 이미 만들어진 Java 프로그램을 실행하는 데 초점을 둔다.

---

## 11. JDK란?

JDK는

**Java Development Kit**

의 약자다.

이름 그대로 Java 프로그램을 **개발**하기 위한 도구 모음이다.

여기에는 Java를 실행하는 기능뿐 아니라 개발에 필요한 도구들이 포함된다.

대표적으로

```text
java
javac
javadoc
jar
jshell
```

등이 있다.

이번 글에서 가장 중요한 것은

```text
java

javac
```

두 가지다.

---

## 12. JDK와 JRE를 아주 쉽게 비교하면

처음에는 다음처럼 생각하면 된다.

```text
JRE
→ 만들어진 Java 프로그램을 실행

JDK
→ Java 프로그램을 만들고 실행
```

개발자는 코드를 작성해야 하므로 **JDK를 설치한다.**

---

## 13. Java를 공부하는데 JRE만 설치하면 안 될까?

Java 프로그램을 개발하려면 Compiler인 `javac`가 필요하다.

JRE 중심의 실행 환경만으로는 개발에 필요한 모든 JDK 도구를 사용할 수 없다.

우리는

```text
Java 코드 작성

↓

javac로 컴파일

↓

java로 실행
```

을 해야 한다.

따라서 이번에는 **JDK 21**을 설치한다.

---

## 14. 요즘에는 JRE를 따로 설치해야 할까?

Java 관련 오래된 강의를 보면

```text
JDK 설치

JRE 설치
```

를 각각 설명하는 경우가 있다.

하지만 현재 Java 개발환경에서는 개발자가 Java를 공부하기 위해 별도의 JRE를 먼저 설치할 필요는 없다.

JDK 자체에 Java 애플리케이션을 개발하고 실행하는 데 필요한 도구가 포함되어 있다.

따라서 처음 Java를 공부하는 단계에서는

```text
JDK 설치
```

를 중심으로 생각하면 된다.

---

## 15. JDK 구조를 다시 정리하면

학습 목적으로 아주 단순화해서 보면 다음과 같이 생각할 수 있다.

```text
JDK

├─ Java 실행 환경
│
├─ java
│  └─ Java 프로그램 실행
│
├─ javac
│  └─ Java 코드 컴파일
│
├─ jar
│  └─ JAR 관련 도구
│
├─ javadoc
│  └─ 문서 생성
│
└─ 기타 Java 개발 도구
```

그래서 개발자는 JDK 하나를 설치하면 된다.

---

## 16. `java`와 `javac`는 다르다

이것은 반드시 기억해두자.

### java

컴파일된 Java 프로그램을 실행한다.

```bash
java Hello
```

### javac

Java 소스 코드를 컴파일한다.

```bash
javac Hello.java
```

따라서

```text
javac
→ Compile

java
→ Run
```

으로 기억하면 된다.

---

## 17. Java 개발 전체 흐름

지금까지 내용을 연결하면 다음과 같다.

```text
VS Code / IntelliJ

↓

Hello.java 작성

↓

javac Hello.java

↓

Hello.class 생성

↓

java Hello

↓

JVM 실행

↓

결과 출력
```

이번 글에서는 이 과정을 터미널에서 직접 해본다.

---

## 18. 왜 JDK 21을 설치할까?

Java도 Node.js처럼 여러 버전이 존재한다.

예를 들어

```text
Java 8

Java 11

Java 17

Java 21

Java 25
```

처럼 여러 주요 버전이 있다.

이번 Dev Setup에서는 **JDK 21**을 기준으로 환경을 구성한다.

Java 21은 장기 지원 계열로 널리 사용되는 버전 중 하나이며 여러 JDK 배포판에서 LTS로 제공되고 있다. 예를 들어 [Eclipse Temurin](https://adoptium.net/temurin/releases/?version=21)에서도 JDK 21을 LTS 릴리스로 제공한다.

---

## 19. 가장 최신 Java를 설치하면 안 될까?

반드시 가장 높은 숫자의 JDK를 사용해야 하는 것은 아니다.

개발에서는

```text
가장 최신 버전인가?
```

보다

```text
내 수업이나 프로젝트에서 요구하는 버전인가?
```

가 중요하다.

예를 들어 프로젝트가

```text
Java 21
```

을 기준으로 만들어졌다면 같은 JDK 21 환경을 사용하는 것이 좋다.

팀원은 Java 21인데 혼자 다른 주요 버전을 사용하면

```text
내 컴퓨터에서는 됨

팀원 컴퓨터에서는 안 됨
```

같은 환경 차이가 생길 수도 있다.

---

## 20. JDK는 Oracle에서만 받을 수 있을까?

아니다.

Java의 OpenJDK를 기반으로 여러 JDK 배포판이 제공된다.

대표적으로

```text
Oracle JDK

Eclipse Temurin

Amazon Corretto

Microsoft Build of OpenJDK
```

등이 있다.

처음 보면

> Java가 하나인데 왜 JDK가 여러 개인가?

싶을 수 있다.

쉽게 말하면 같은 Java 표준과 OpenJDK 기반으로 여러 업체나 프로젝트가 JDK 배포본을 제공하는 것이다.

---

## 21. 이번 글에서는 어떤 JDK를 사용할까?

이번 글에서는 설치 과정을 최대한 단순하게 설명하기 위해 **Oracle JDK 21의 Windows Installer**를 기준으로 진행한다.

Oracle은 Windows용 JDK 21 설치 프로그램을 공식적으로 제공하고 있으며 [기본 설치 경로 역시 문서화](https://docs.oracle.com/en/java/javase/21/install/installation-jdk-microsoft-windows-platforms.html)하고 있다.

다만 학교나 회사, 프로젝트에서

```text
Eclipse Temurin 21
```

같은 특정 배포판을 사용하라고 정했다면 그 기준을 따라야 한다.

[Temurin 21 역시 Windows용 JDK MSI를 제공](https://adoptium.net/installation/windows/)하며 PATH와 `JAVA_HOME` 설정 옵션을 제공한다.

참고로 [Oracle 다운로드 페이지](https://www.oracle.com/java/technologies/downloads/)에 따르면 Oracle JDK 21은 2026년 9월까지 무료 조건(NFTC)으로 업데이트가 제공되고, 그 이후의 업데이트는 Java SE OTN 라이선스로 바뀐다. 개인 학습이나 개발 용도로는 계속 사용할 수 있지만 회사에서 운영(production) 용도로 쓰려면 비용이 들 수 있으므로, 이런 조건이 신경 쓰인다면 Eclipse Temurin 21 같은 OpenJDK 배포판을 선택해도 된다.

---

## 22. JDK 배포판과 Java 버전은 구분해서 보기

예를 들어

```text
Oracle JDK 21
```

과

```text
Eclipse Temurin JDK 21
```

은 배포자는 다르지만 둘 다 Java 21 계열 JDK다.

따라서

```text
JDK 배포판
→ 누가 JDK를 제공하는가?

JDK 버전
→ 어떤 Java 버전인가?
```

를 구분해서 생각하면 된다.

---

## 23. 설치하기 전에 기존 Java부터 확인하기

새 JDK를 설치하기 전에 이미 Java가 설치되어 있는지 확인한다.

새 Command Prompt나 PowerShell, Git Bash를 연다.

먼저 다음을 입력한다.

```bash
java -version
```

그리고

```bash
javac -version
```

도 입력한다.

---

## 24. Java가 설치되어 있지 않다면

Windows Command Prompt에서는 다음과 비슷한 메시지가 나타날 수 있다.

```text
'java'은(는) 내부 또는 외부 명령...
```

Git Bash에서는

```text
java: command not found
```

처럼 나타날 수 있다.

현재 설치 전이라면 정상이다.

---

## 25. 이미 버전이 나온다면

예를 들어

```text
java version "17..."
```

처럼 나오면 Java가 이미 설치되어 있다는 뜻이다.

이 경우 무조건 새로 덮어쓰기 전에 현재 환경을 확인하는 것이 좋다.

다음을 확인한다.

```text
현재 java 버전

현재 javac 버전

Java가 설치된 위치

JAVA_HOME 값

PATH에 등록된 Java 경로
```

특히 기존 프로젝트를 사용 중이라면 기존 JDK를 삭제하기 전에 왜 설치되어 있는지 확인한다.

---

## 26. JDK 다운로드하기

브라우저에서

```text
Oracle JDK 21 download
```

를 검색한다.

[Oracle 공식 Java 다운로드 페이지](https://www.oracle.com/java/technologies/downloads/)에서 **JDK 21**을 찾는다.

Windows를 선택한다.

Windows용 설치 파일은 환경에 따라 다음과 같은 형식으로 제공된다.

```text
x64 Installer

x64 MSI Installer

Compressed Archive
```

[Oracle의 JDK 21 Windows 설치 가이드](https://docs.oracle.com/en/java/javase/21/install/installation-jdk-microsoft-windows-platforms.html)는 `.exe` Installer와 `.msi` Installer 방식을 공식적으로 안내하고 있다.

---

## 27. x64는 무엇일까?

일반적인 Intel 또는 AMD 기반 Windows PC는 대부분 x64 환경을 사용한다.

확인하려면 Windows에서

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

라고 되어 있다면 Windows x64 JDK를 설치하면 된다.

---

## 28. Installer와 ZIP 중 무엇을 사용할까?

초보자라면 Installer를 사용하는 것이 편하다.

Installer 방식에서는 설치 프로그램이 필요한 파일을 적절한 위치에 배치한다.

반면 ZIP 형태는

```text
압축 해제

설치 위치 직접 관리

환경변수 직접 연결
```

등을 더 직접 관리해야 한다.

이번 글에서는 **Windows x64 Installer**를 사용한다.

---

## 29. JDK 설치 파일 실행

다운로드한 파일을 실행한다.

파일 이름은 업데이트 버전에 따라 달라질 수 있지만 다음과 비슷하다.

```text
jdk-21_windows-x64_bin.exe
```

또는 버전 정보가 포함된 형태일 수 있다.

[Oracle 공식 문서](https://docs.oracle.com/en/java/javase/21/install/installation-jdk-microsoft-windows-platforms.html)에서도 Windows용 JDK 21 `.exe` Installer를 실행해 설치하도록 안내하고 있다.

---

## 30. 관리자 권한

Windows에서

```text
이 앱이 디바이스를 변경하도록 허용하시겠습니까?
```

라고 물을 수 있다.

공식 사이트에서 다운로드한 파일이 맞는지 확인한 뒤 진행한다.

Oracle JDK의 Windows 설치에는 관리자 권한이 필요하다.

---

## 31. 설치 위치 확인

Installer를 진행하면 JDK 설치 위치를 확인할 수 있다.

Oracle JDK 21의 기본 설치 위치는 다음 계열이다.

```text
C:\Program Files\Java\jdk-21
```

업데이트 버전에 따라 디렉터리 이름에 세부 버전이 포함될 수도 있다. [Oracle 역시](https://docs.oracle.com/en/java/javase/21/install/installation-jdk-microsoft-windows-platforms.html) JDK 21의 기본 설치 위치를 `C:\Program Files\Java\jdk-<FEATURE>` 형태로 설명한다.

특별한 이유가 없다면 기본 경로를 그대로 사용하는 것이 좋다.

---

## 32. 설치 경로를 기억해야 하는 이유

잠시 후 `JAVA_HOME`을 설정할 때 JDK가 설치된 경로가 필요하다.

예를 들어 실제 설치 폴더가

```text
C:\Program Files\Java\jdk-21
```

이라면 이 경로를 기억해둔다.

환경에 따라 다음처럼 세부 버전 번호가 붙을 수도 있다.

```text
C:\Program Files\Java\jdk-21.0.x
```

반드시 자신의 컴퓨터에서 실제 설치된 폴더 이름을 확인한다.

---

## 33. 설치 완료

Installer 안내에 따라 설치를 완료한다.

마지막에

```text
Close

Finish
```

등의 버튼이 나타나면 설치를 종료한다.

이제 JDK 파일 자체는 컴퓨터에 설치되었다.

하지만 아직 확인할 것이 남아 있다.

---

## 34. 실제 JDK 폴더를 확인해보자

Windows 파일 탐색기를 연다.

다음 위치로 이동한다.

```text
C:\Program Files\Java
```

안에 다음과 비슷한 폴더가 있는지 확인한다.

```text
jdk-21
```

또는

```text
jdk-21.0.x
```

해당 폴더를 연다.

---

## 35. JDK 폴더 안에는 무엇이 있을까?

다음과 비슷한 폴더들이 보일 수 있다.

```text
jdk-21

├─ bin
├─ conf
├─ include
├─ jmods
├─ legal
└─ lib
```

지금 모든 폴더를 이해할 필요는 없다.

가장 중요한 것은

```text
bin
```

이다.

---

## 36. bin 폴더란?

`bin`은 Binary와 관련된 이름으로, 실제 실행할 수 있는 여러 JDK 도구가 들어 있다.

JDK의 `bin` 폴더를 열어보면 다음과 같은 파일들을 찾을 수 있다.

```text
java.exe

javac.exe

jar.exe

javadoc.exe

jshell.exe
```

[Oracle의 Windows 설치 문서](https://docs.oracle.com/en/java/javase/21/install/installation-jdk-microsoft-windows-platforms.html) 역시 `java.exe`, `javac.exe`, `jshell.exe` 등의 실행 파일이 JDK에 포함됨을 설명한다.

---

## 37. 우리가 사용할 java.exe

`java.exe`는 Java 애플리케이션을 실행할 때 사용한다.

터미널에서는 확장자를 생략하고

```bash
java
```

라고 입력한다.

---

## 38. 우리가 사용할 javac.exe

`javac.exe`는 Java Compiler다.

Java Source Code를 Bytecode로 컴파일한다.

터미널에서는

```bash
javac
```

라고 사용한다.

---

## 39. 그런데 어떻게 아무 위치에서 java라고 입력할까?

여기서 **PATH**가 등장한다.

실제로 `java.exe`는 다음과 같은 폴더 안에 있다.

```text
C:\Program Files\Java\jdk-21\bin\java.exe
```

원칙적으로 실행 파일을 직접 지정하려면 매우 긴 경로를 사용할 수도 있다.

하지만 매번

```text
C:\Program Files\Java\jdk-21\bin\java.exe
```

라고 입력하는 것은 불편하다.

그래서 Windows의 PATH에

```text
JDK의 bin 폴더
```

를 등록한다.

그러면 어느 폴더에 있더라도

```bash
java
```

라고만 입력할 수 있다.

---

## 40. PATH를 다시 이해해보자

Node.js 설치 글에서도 PATH를 봤다.

Java도 같은 원리다.

```text
터미널

java -version 입력

↓

Windows가 PATH를 위에서부터 확인

↓

Java bin 경로 발견

↓

java.exe 실행
```

즉 PATH는

> **명령어를 입력했을 때 Windows가 실행 파일을 찾을 수 있도록 알려주는 경로 목록**

이다.

---

## 41. JAVA_HOME은 무엇일까?

이번에는 새로운 환경변수가 등장한다.

```text
JAVA_HOME
```

JAVA_HOME은 Java JDK가 설치되어 있는 **기본 위치를 알려주는 환경변수**다.

예를 들어

```text
JAVA_HOME
=
C:\Program Files\Java\jdk-21
```

처럼 설정한다.

---

## 42. JAVA_HOME에는 bin을 넣을까?

가장 많이 헷갈리는 부분이다.

정답부터 보면

```text
JAVA_HOME

C:\Program Files\Java\jdk-21
```

처럼 **JDK의 최상위 폴더**를 지정한다.

다음처럼 설정하지 않는다.

```text
C:\Program Files\Java\jdk-21\bin
```

즉,

```text
JAVA_HOME
→ JDK 자체의 위치
```

이다.

---

## 43. 왜 JAVA_HOME에는 bin을 넣지 않을까?

JAVA_HOME은 특정 실행 파일 하나의 위치가 아니라 **JDK가 설치된 기본 디렉터리**를 나타내는 용도로 사용되기 때문이다.

그래서 다른 프로그램들이

```text
JAVA_HOME
```

을 보고 JDK 내부의 필요한 경로를 찾아갈 수 있다.

예를 들어

```text
%JAVA_HOME%\bin

%JAVA_HOME%\lib
```

처럼 사용할 수 있다.

---

## 44. 그러면 PATH에는 무엇을 넣을까?

PATH에는 Java 실행 프로그램이 있는 `bin` 폴더가 필요하다.

그래서 다음을 추가한다.

```text
%JAVA_HOME%\bin
```

관계를 보면 다음과 같다.

```text
JAVA_HOME

C:\Program Files\Java\jdk-21

↓

%JAVA_HOME%\bin

↓

C:\Program Files\Java\jdk-21\bin

↓

java.exe
javac.exe
```

이 구조를 이해하면 환경변수를 외우지 않아도 된다.

---

## 45. JAVA_HOME과 PATH 차이

표로 정리해보자.

| 환경변수 | 값 | 역할 |
|------|------|------|
| `JAVA_HOME` | JDK 설치 폴더 | JDK가 어디 있는지 알려줌 |
| `Path` | `%JAVA_HOME%\bin` | `java`, `javac` 명령을 어디서든 실행 |

즉,

```text
JAVA_HOME
→ JDK 집 주소

PATH
→ 실행 파일을 찾는 길 안내
```

정도로 기억해도 된다.

---

## 46. Windows 환경변수 화면 열기

이제 실제로 설정해보자.

Windows 검색창에

```text
환경 변수
```

를 입력한다.

검색 결과에서

```text
시스템 환경 변수 편집
```

또는 비슷한 항목을 연다.

---

## 47. 시스템 속성 창

시스템 속성 창이 나타난다.

아래쪽에서

```text
환경 변수...
```

버튼을 선택한다.

이제 환경변수 설정 화면이 나타난다.

---

## 48. 사용자 변수와 시스템 변수

환경변수 화면에는 보통 두 영역이 있다.

```text
사용자 변수

시스템 변수
```

처음에는 무엇이 다른지 헷갈린다.

---

## 49. 사용자 변수

현재 로그인한 Windows 사용자에게만 적용된다.

예를 들어 PC에

```text
사용자 A

사용자 B
```

계정이 따로 있다면 A의 사용자 변수는 기본적으로 A 환경에 적용된다.

---

## 50. 시스템 변수

컴퓨터 전체의 시스템 수준에서 사용하는 환경변수다.

여러 사용자 계정에 영향을 줄 수 있다.

변경 시 관리자 권한이 필요할 수 있다.

---

## 51. JAVA_HOME은 어디에 만들까?

개인 개발용 PC에서 한 JDK를 시스템 전체 Java 환경으로 사용할 계획이라면 **시스템 변수**에 `JAVA_HOME`을 설정하는 방식이 흔하다.

다만 관리자 권한이 없거나 현재 사용자에게만 적용하고 싶다면 사용자 변수에 설정할 수도 있다.

중요한 것은

```text
JAVA_HOME이 실제 JDK 위치를 정확하게 가리키는가?
```

이다.

이번 글에서는 개인 개발 PC에서 관리자 권한을 사용할 수 있다고 가정하고 **시스템 변수 기준**으로 설명한다.

---

## 52. JAVA_HOME 만들기

시스템 변수 영역에서

```text
새로 만들기
```

를 선택한다.

변수 이름에 다음을 입력한다.

```text
JAVA_HOME
```

대문자로 작성하는 관례가 일반적이다.

---

## 53. JAVA_HOME 값 입력하기

변수 값에는 실제 JDK 설치 경로를 넣는다.

예:

```text
C:\Program Files\Java\jdk-21
```

자신의 컴퓨터에 설치된 실제 폴더가

```text
C:\Program Files\Java\jdk-21.0.x
```

라면 그 경로를 사용한다.

남의 블로그에 적힌 경로를 그대로 복사하지 말고 **내 컴퓨터의 실제 JDK 경로를 확인한다.**

---

## 54. 다시 한 번 — bin을 넣지 않는다

JAVA_HOME:

```text
C:\Program Files\Java\jdk-21
```

O

JAVA_HOME:

```text
C:\Program Files\Java\jdk-21\bin
```

X

이 차이가 중요하다.

---

## 55. JAVA_HOME 저장

입력을 완료했다면

```text
확인
```

을 선택한다.

이제 JAVA_HOME 환경변수가 만들어졌다.

하지만 아직 PATH 설정이 남아 있다.

---

## 56. Path 찾기

시스템 변수 목록에서

```text
Path
```

를 찾는다.

선택한 뒤

```text
편집
```

을 누른다.

Path에는 이미 여러 경로가 들어 있을 수 있다.

---

## 57. 기존 PATH를 전부 지우면 안 된다

매우 중요하다.

Path에는 Java뿐 아니라 Windows와 다른 프로그램에서 사용하는 여러 경로가 등록되어 있을 수 있다.

예를 들어

```text
Windows 관련 경로

Git 경로

Node.js 경로

기타 프로그램 경로
```

등이 존재할 수 있다.

따라서 Java를 추가한다고 **기존 Path 값을 삭제하면 안 된다.**

새 항목을 하나 추가한다.

---

## 58. PATH에 Java 추가

Path 편집 화면에서

```text
새로 만들기
```

를 선택한다.

다음을 입력한다.

```text
%JAVA_HOME%\bin
```

이제 Windows는 `%JAVA_HOME%`을 우리가 앞에서 등록한 값으로 바꿔서 이해한다.

예를 들어

```text
%JAVA_HOME%
=
C:\Program Files\Java\jdk-21
```

이므로

```text
%JAVA_HOME%\bin
```

은 실제로

```text
C:\Program Files\Java\jdk-21\bin
```

을 의미한다.

---

## 59. 왜 그냥 전체 경로를 넣지 않을까?

다음처럼 직접 입력해도 Java를 찾을 수 있다.

```text
C:\Program Files\Java\jdk-21\bin
```

그런데

```text
%JAVA_HOME%\bin
```

방식을 사용하면 Java 기준 경로를 `JAVA_HOME`에서 관리할 수 있다.

예를 들어 나중에 다른 JDK를 사용하게 되어

```text
JAVA_HOME
```

만 새 JDK 위치로 변경하면 관련 설정을 관리하기 편해진다.

---

## 60. 환경변수 저장

Path에

```text
%JAVA_HOME%\bin
```

을 추가했다면 열린 설정 창에서

```text
확인
```

을 눌러 차례대로 닫는다.

이제 설정 자체는 완료됐다.

---

## 61. 바로 기존 터미널에서 확인하면 안 될 수 있다

환경변수를 변경하기 전에 이미 열려 있던

```text
Command Prompt

PowerShell

Git Bash

VS Code Terminal
```

은 이전 환경변수 상태를 가지고 있을 수 있다.

따라서 기존 터미널을 닫는다.

그리고 **새 터미널을 실행한다.**

필요하다면 VS Code 역시 재실행한다.

[Oracle 계열 Java 설치 문서](https://www.java.com/en/download/help/path.html) 역시 환경변수 변경 후 새 Command Prompt를 실행해 변경 내용을 다시 읽도록 안내한다.

---

## 62. JAVA_HOME부터 확인

Command Prompt를 연다.

다음 명령어를 입력한다.

```cmd
echo %JAVA_HOME%
```

정상적으로 설정됐다면 다음과 비슷한 경로가 출력된다.

```text
C:\Program Files\Java\jdk-21
```

자신이 입력했던 실제 JDK 경로가 나오면 된다.

---

## 63. PowerShell에서는 확인 방법이 다르다

PowerShell을 사용한다면 다음과 같이 확인할 수 있다.

```powershell
$env:JAVA_HOME
```

결과:

```text
C:\Program Files\Java\jdk-21
```

---

## 64. Git Bash에서는?

Git Bash에서는 다음을 사용할 수 있다.

```bash
echo $JAVA_HOME
```

환경에 따라 Windows 경로가 표시된다.

지금은 자신이 가장 자주 사용할 터미널 하나에서 정상적으로 확인되면 된다.

---

## 65. java 버전 확인하기

이제 가장 중요한 확인이다.

새 터미널에서 입력한다.

```bash
java -version
```

정상적으로 JDK 21이 잡혀 있다면 결과 안에서 Java 21 계열임을 확인할 수 있다.

예를 들어 다음과 비슷한 형태다.

```text
java version "21..."
```

세부 업데이트 번호나 배포판 표시는 설치 시점에 따라 달라질 수 있다.

---

## 66. `java -version`은 무엇을 확인할까?

이 명령어는 현재 터미널에서 `java`라고 입력했을 때 실제 실행되는 Java의 버전을 보여준다.

즉 단순히

```text
JDK 파일이 컴퓨터에 있는가?
```

만 보는 것이 아니라

```text
현재 PATH를 통해 어떤 Java가 선택되고 있는가?
```

를 확인하는 데도 도움이 된다.

---

## 67. javac 버전 확인하기

이번에는 Compiler를 확인한다.

```bash
javac -version
```

정상적으로 설치되었다면

```text
javac 21...
```

과 비슷한 결과가 나온다.

이 명령어까지 성공해야 **Java 개발환경이 제대로 준비되었다고 보기 좋다.**

---

## 68. 왜 java만 확인하면 부족할까?

만약

```bash
java -version
```

만 확인한다면 Java 실행 환경이 있다는 것은 알 수 있다.

하지만 우리가 Java를 개발하려면 Compiler도 필요하다.

그래서

```bash
javac -version
```

도 반드시 확인한다.

최종적으로 다음 두 명령어가 모두 정상이어야 한다.

```bash
java -version
```

```bash
javac -version
```

---

## 69. java와 javac의 버전은 맞는 것이 좋다

예를 들어

```text
java
→ 21

javac
→ 21
```

이라면 이해하기 쉽다.

그런데

```text
java
→ 17

javac
→ 21
```

처럼 서로 다른 주요 버전이 나온다면 여러 Java 설치나 PATH 설정이 섞여 있을 가능성을 확인해야 한다.

---

## 70. 실제 어떤 java가 실행되는지 확인하기

Windows Command Prompt에서 다음 명령어를 사용한다.

```cmd
where java
```

여러 Java가 PATH에 등록되어 있다면 여러 경로가 나타날 수도 있다.

예:

```text
C:\Program Files\Java\jdk-21\bin\java.exe
```

---

## 71. javac도 확인하기

```cmd
where javac
```

예:

```text
C:\Program Files\Java\jdk-21\bin\javac.exe
```

이 두 명령어는 Java 버전 충돌을 확인할 때 매우 유용하다.

---

## 72. PowerShell에서는?

PowerShell에서는 다음처럼 확인할 수 있다.

```powershell
Get-Command java
```

그리고

```powershell
Get-Command javac
```

을 사용할 수 있다.

---

## 73. Git Bash에서는?

Git Bash에서는

```bash
which java
```

그리고

```bash
which javac
```

을 사용할 수 있다.

---

## 74. JAVA_HOME과 실제 java가 같은 JDK인지 확인하기

예를 들어 JAVA_HOME은

```text
C:\Program Files\Java\jdk-21
```

인데

```cmd
where java
```

결과는 다른 Java 설치 폴더를 가리킬 수 있다.

이 경우

```text
JAVA_HOME

과

PATH에서 가장 먼저 발견되는 Java
```

가 서로 다른 것이다.

Java 관련 문제가 생기면 이 부분을 확인해야 한다.

---

## 75. PATH에는 순서도 중요하다

Windows는 PATH에 등록된 경로를 순서대로 확인한다.

예를 들어

```text
1. 오래된 Java 17 경로

2. %JAVA_HOME%\bin
```

순서라면 `java` 명령어가 오래된 Java를 먼저 찾을 수도 있다.

그래서 여러 Java 경로가 들어 있다면 중복과 순서를 확인해야 한다.

---

## 76. Oracle Java의 기존 javapath도 보일 수 있다

Oracle JDK 설치 환경에서는 다음과 같은 경로가 존재할 수 있다.

```text
C:\Program Files\Common Files\Oracle\Java\javapath
```

[Oracle 공식 문서](https://docs.oracle.com/en/java/javase/21/install/installation-jdk-microsoft-windows-platforms.html)에서도 설치 과정에서 `java.exe`, `javac.exe` 등의 연결이 이 위치에 만들어질 수 있다고 설명한다.

따라서 여러 Java 버전을 설치하고 삭제한 PC에서는

```cmd
where java
```

를 통해 실제 어떤 Java가 선택되는지 확인하는 것이 좋다.

---

## 77. 환경변수 설정이 끝났다면 실제 Java 코드를 실행해보자

버전만 확인하고 끝내지 않는다.

정말 컴파일과 실행까지 가능한지 확인해보자.

연습용 폴더를 하나 만든다.

예:

```text
java-study
```

VS Code에서 해당 폴더를 연다.

---

## 78. Hello.java 만들기

새 파일을 만든다.

파일 이름:

```text
Hello.java
```

여기서 주의할 점이 있다.

Java에서는 `public class` 이름과 파일 이름을 맞춰야 하는 경우가 중요하다.

이번 코드는

```java
public class Hello
```

이므로 파일 이름도

```text
Hello.java
```

로 만든다.

---

## 79. 첫 Java 코드 작성

다음 코드를 입력한다.

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello Java!");
    }
}
```

저장한다.

```text
Ctrl + S
```

---

## 80. 코드가 어려워 보여도 괜찮다

이번 글의 목적은 Java 문법 공부가 아니다.

지금은 다음 정도만 보면 된다.

```text
Hello
→ 클래스 이름

main
→ 프로그램 실행 시작점

System.out.println
→ 글자 출력
```

Java 문법은 별도로 공부하면 된다.

이번에는 **JDK 환경이 정상적으로 작동하는지**만 확인한다.

---

## 81. VS Code Terminal 열기

VS Code에서

```text
Terminal
→ New Terminal
```

을 선택한다.

현재 터미널 위치가 `Hello.java`가 있는 `java-study` 폴더인지 확인한다.

Git Bash라면

```bash
pwd
```

와

```bash
ls
```

를 사용할 수 있다.

`Hello.java`가 보이는지 확인한다.

---

## 82. 먼저 컴파일

다음 명령어를 입력한다.

```bash
javac Hello.java
```

오류 메시지 없이 명령이 끝났다면 Explorer 또는 터미널에서 파일 목록을 다시 확인한다.

새 파일이 생긴다.

```text
Hello.java

Hello.class
```

---

## 83. 방금 무슨 일이 일어났을까?

다음 과정이 진행됐다.

```text
Hello.java

↓

javac Hello.java

↓

Java Compiler

↓

Hello.class
```

즉 Java 소스 코드를 Bytecode로 컴파일했다.

---

## 84. 이제 실행하기

다음 명령어를 입력한다.

```bash
java Hello
```

중요하다.

여기에서는 다음처럼 입력하지 않는다.

```bash
java Hello.java
```

또는

```bash
java Hello.class
```

이번 기본 컴파일-실행 흐름에서는 클래스 이름을 사용한다.

```bash
java Hello
```

참고로 Java 11부터는 `java Hello.java`처럼 소스 파일을 컴파일 없이 바로 실행하는 방식([JEP 330](https://openjdk.org/jeps/330))도 지원한다. 다만 이 방식은 `.class` 파일을 만들지 않기 때문에, 이번 글에서는 컴파일과 실행을 나눠서 직접 확인한다.

---

## 85. 결과 확인

정상적으로 실행되었다면

```text
Hello Java!
```

가 출력된다.

그러면 다음 모든 과정이 성공한 것이다.

```text
JDK 설치

↓

JAVA_HOME

↓

PATH

↓

javac 사용

↓

Java Compile

↓

java 사용

↓

JVM 실행

↓

결과 출력
```

---

## 86. Java 프로그램 전체 흐름을 다시 보자

```text
VS Code

Hello.java 작성

↓

javac Hello.java

↓

Hello.class 생성

↓

java Hello

↓

JVM

↓

Hello Java!
```

이 흐름을 직접 한 번 경험해보는 것이 중요하다.

---

## 87. `javac Hello.java`에서 `.java`가 필요한 이유

`javac`는 소스 파일을 컴파일한다.

따라서 어떤 파일을 컴파일할 것인지 알려줘야 한다.

```bash
javac Hello.java
```

---

## 88. 그런데 `java Hello`에서는 왜 확장자를 안 쓸까?

`java` 명령에서는 실행할 클래스 이름을 지정한다.

그래서

```bash
java Hello
```

를 사용한다.

처음에는 다음처럼 외워도 된다.

```text
컴파일

javac Hello.java


실행

java Hello
```

---

## 89. Hello.class를 직접 수정할까?

아니다.

우리가 수정하는 파일은

```text
Hello.java
```

다.

코드를 수정한 뒤 다시

```bash
javac Hello.java
```

를 실행하면 새로운 `Hello.class`가 만들어진다.

---

## 90. 코드 수정 후 다시 실행

`Hello.java`를 다음처럼 바꿔보자.

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("JDK 21 Setup Complete!");
    }
}
```

저장한다.

다시 컴파일한다.

```bash
javac Hello.java
```

그리고 실행한다.

```bash
java Hello
```

결과:

```text
JDK 21 Setup Complete!
```

---

## 91. 저장하지 않으면 왜 변경되지 않을까?

VS Code Editor에서 코드를 바꿔도 저장하지 않았다면 디스크의 `Hello.java`는 이전 내용일 수 있다.

그러면

```bash
javac Hello.java
```

가 이전 파일 내용을 컴파일할 수 있다.

따라서

```text
코드 수정

↓

Ctrl + S

↓

javac Hello.java

↓

java Hello
```

순서를 습관화한다.

---

## 92. 매번 javac를 실행해야 할까?

기본적인 Java 동작 원리를 직접 확인할 때는

```text
javac
↓
java
```

를 직접 실행해보는 것이 좋다.

나중에 IntelliJ IDEA를 설치하면 Run 버튼을 눌렀을 때 IDE가 이런 작업을 훨씬 편하게 처리해준다.

다음 글에서 바로 이 부분을 연결한다.

---

## 93. IntelliJ를 설치하면 JDK가 필요 없어질까?

아니다.

IntelliJ는 Java 코드를 작성하고 프로젝트를 관리하는 IDE다.

Java 자체를 개발하기 위한 JDK 역할과는 다르다.

관계를 보면

```text
IntelliJ IDEA

↓

Java 코드 작성

↓

JDK 21 연결

↓

Compile / Run
```

이다.

그래서 IntelliJ보다 JDK를 먼저 설치한 것이다.

---

## 94. JAVA_HOME은 IntelliJ에서도 무조건 필요할까?

IntelliJ는 프로젝트에서 사용할 JDK 경로를 별도로 지정할 수 있다.

그래서 모든 상황에서 IntelliJ가 반드시 JAVA_HOME만 보고 JDK를 찾는 것은 아니다.

하지만 `JAVA_HOME`은 Java 기반 개발 도구, 빌드 도구, 서버, 스크립트 등이 JDK 위치를 찾을 때 널리 사용하는 환경변수다.

따라서 개발환경을 명확하게 구성하기 위해 설정해두는 것이 좋다.

---

## 95. Maven과 Gradle에서도 JAVA_HOME을 만나게 된다

나중에 Java 프로젝트를 진행하면

```text
Maven

Gradle
```

같은 빌드 도구를 만나게 된다.

Java 기반 개발 도구들은 현재 사용할 Java 환경을 결정할 때 `JAVA_HOME`이나 PATH, 자체 설정 등을 참고할 수 있다.

그래서

```text
JAVA_HOME이 어디를 가리키는가?
```

를 확인하는 습관이 중요하다.

---

## 96. Tomcat에서도 Java가 필요하다

이 시리즈 뒤에서 Tomcat을 설치한다.

Tomcat 자체가 Java 기반으로 동작하기 때문에 Java 실행 환경이 필요하다.

즉 설치 순서에도 이유가 있다.

```text
JDK 설치

↓

Java 환경 구축

↓

IntelliJ 연결

↓

Tomcat 사용
```

---

## 97. 자주 발생하는 문제 — java를 찾을 수 없다

다음 명령어를 입력했는데

```bash
java -version
```

명령어를 찾을 수 없다고 나온다면 다음을 확인한다.

```text
JDK 설치 완료?

↓

JAVA_HOME 정확함?

↓

PATH에 %JAVA_HOME%\bin 있음?

↓

터미널을 새로 열었음?
```

---

## 98. 자주 발생하는 문제 — javac만 안 된다

예를 들어

```bash
java -version
```

은 되는데

```bash
javac -version
```

이 안 될 수 있다.

이 경우 실제로 어떤 Java 환경을 사용하고 있는지 확인한다.

```cmd
where java
```

```cmd
where javac
```

`java`만 존재하고 `javac`가 없는 오래된 실행 환경이나 잘못된 PATH가 선택되고 있을 가능성을 확인한다.

JDK의 `bin` 폴더에는 `javac`가 있어야 한다.

---

## 99. 자주 발생하는 문제 — Java 21을 설치했는데 17이 나온다

다음을 입력한다.

```bash
java -version
```

그런데

```text
17...
```

이 나온다고 해보자.

JDK 21 설치가 실패했다고 바로 단정하면 안 된다.

JDK 21은 설치되어 있지만 PATH에서 기존 Java 17을 먼저 찾고 있을 수 있다.

다음을 확인한다.

```cmd
where java
```

그리고

```text
JAVA_HOME

PATH 순서

기존 Java 경로
```

를 확인한다.

---

## 100. 자주 발생하는 문제 — JAVA_HOME은 21인데 java는 다른 버전

예:

```text
JAVA_HOME
→ JDK 21
```

그런데

```bash
java -version
```

결과:

```text
Java 17
```

이라면 PATH에 다른 Java 경로가 더 먼저 존재할 가능성이 있다.

즉

```text
JAVA_HOME 설정
```

만으로 `java` 명령어의 실제 실행 파일이 무조건 결정되는 것은 아니다.

PATH가 중요하다.

---

## 101. 자주 발생하는 문제 — JAVA_HOME에 bin을 넣었다

잘못된 예:

```text
JAVA_HOME
=
C:\Program Files\Java\jdk-21\bin
```

그리고 PATH:

```text
%JAVA_HOME%\bin
```

이면 실제 경로는 개념적으로

```text
...\jdk-21\bin\bin
```

처럼 잘못될 수 있다.

그래서 JAVA_HOME은 반드시 JDK 루트다.

```text
JAVA_HOME

C:\Program Files\Java\jdk-21
```

그리고

```text
PATH

%JAVA_HOME%\bin
```

으로 구분한다.

---

## 102. 자주 발생하는 문제 — PATH 기존 내용을 삭제함

Java 경로를 추가할 때 기존 Path를 통째로 지우면 다른 프로그램이 동작하지 않을 수 있다.

Path는

```text
교체
```

하는 것이 아니라

```text
새 Java 경로 추가
```

라고 생각해야 한다.

잘 모르는 기존 경로를 함부로 삭제하지 않는다.

---

## 103. 자주 발생하는 문제 — 터미널을 재시작하지 않음

환경변수를 수정한 뒤 기존 터미널에서 계속 테스트하면 이전 값을 사용할 수 있다.

따라서

```text
환경변수 수정

↓

확인

↓

기존 Terminal 종료

↓

새 Terminal 시작

↓

버전 확인
```

순서로 진행한다.

---

## 104. 자주 발생하는 문제 — 파일 이름과 class 이름이 다름

예를 들어 파일 이름은

```text
Hello.java
```

인데 코드가

```java
public class Test {
}
```

라면 `public class` 이름과 파일 이름이 맞지 않아 컴파일 오류가 발생할 수 있다.

이번 예제에서는 반드시

```text
Hello.java
```

와

```java
public class Hello
```

를 맞춘다.

---

## 105. 대소문자도 주의한다

다음은 서로 다르게 취급될 수 있다.

```text
Hello

hello
```

따라서 파일 이름을

```text
Hello.java
```

로 만들었다면 코드에서도

```java
public class Hello
```

처럼 동일하게 작성한다.

실행할 때도

```bash
java Hello
```

라고 입력한다.

---

## 106. 자주 발생하는 문제 — 현재 폴더가 다름

`Hello.java`는

```text
C:\dev\java-study
```

에 있는데 터미널은 다른 곳에 있을 수 있다.

그 상태에서

```bash
javac Hello.java
```

를 하면 파일을 찾지 못한다.

Git Bash에서는

```bash
pwd
```

```bash
ls
```

로 확인한다.

Command Prompt에서는

```cmd
cd
```

```cmd
dir
```

등으로 확인할 수 있다.

---

## 107. JDK가 여러 개 필요할 수도 있다

앞으로 프로젝트를 진행하다 보면 이런 상황이 생길 수 있다.

```text
학교 수업
→ JDK 17

개인 프로젝트
→ JDK 21

다른 프로젝트
→ JDK 25
```

여러 JDK를 컴퓨터에 설치하는 것 자체는 가능하지만 어떤 JDK가 현재 사용되는지 관리해야 한다.

이때 중요한 것이

```text
JAVA_HOME

PATH

IDE Project SDK
```

다.

---

## 108. JDK를 여러 개 설치했다면

예를 들어

```text
C:\Java\jdk-17

C:\Java\jdk-21
```

이 있다고 해보자.

JAVA_HOME을

```text
C:\Java\jdk-21
```

로 바꾸고 PATH를

```text
%JAVA_HOME%\bin
```

형태로 관리하면 환경을 이해하기 쉬워진다.

다만 실제 PATH에 다른 Java 경로가 먼저 존재하는지 역시 확인해야 한다.

---

## 109. IntelliJ에서는 또 별도의 JDK가 선택될 수 있다

Windows 터미널에서

```text
Java 21
```

을 사용하더라도 IntelliJ 프로젝트 설정에서는 Java 17 SDK가 선택되어 있을 수 있다.

즉 다음은 서로 구분해야 한다.

```text
Windows Terminal의 Java

IntelliJ Project SDK

Gradle JVM

Maven Java 환경
```

다음 글에서는 IntelliJ가 실제 JDK 21을 사용하도록 연결하는 방법을 확인한다.

---

## 110. JDK를 삭제할 때도 주의

사용하지 않는 JDK라고 해서 바로 삭제하기 전에 어떤 프로젝트가 그 버전을 사용하는지 확인한다.

예를 들어 기존 학교 프로젝트가 JDK 17을 사용하는데

```text
이제 21 설치했으니까 17 삭제
```

해버리면 해당 프로젝트 환경이 깨질 수 있다.

여러 프로젝트를 사용하는 단계에서는 JDK 버전도 하나의 프로젝트 환경 정보로 관리해야 한다.

---

## 111. Java 설치 경로를 직접 옮기지 않기

Installer로 설치한 JDK 폴더를 Windows 탐색기에서 단순히

```text
잘라내기

↓

다른 폴더에 붙여넣기
```

하는 방식으로 옮기는 것은 추천하지 않는다.

환경변수와 도구 설정이 기존 위치를 가리키고 있을 수 있기 때문이다.

설치 위치를 바꾸고 싶다면 정상적인 설치/제거 절차와 환경변수 설정을 다시 확인한다.

---

## 112. Java 버전 확인 명령 정리

Java 실행 버전:

```bash
java -version
```

Java Compiler 버전:

```bash
javac -version
```

Command Prompt에서 JAVA_HOME:

```cmd
echo %JAVA_HOME%
```

PowerShell에서 JAVA_HOME:

```powershell
$env:JAVA_HOME
```

Git Bash에서 JAVA_HOME:

```bash
echo $JAVA_HOME
```

---

## 113. Java 실행 위치 확인

Command Prompt:

```cmd
where java
```

```cmd
where javac
```

PowerShell:

```powershell
Get-Command java
```

```powershell
Get-Command javac
```

Git Bash:

```bash
which java
```

```bash
which javac
```

환경 문제를 해결할 때 매우 유용하다.

---

## 114. 첫 Java 프로그램 명령 정리

컴파일:

```bash
javac Hello.java
```

실행:

```bash
java Hello
```

즉 딱 두 줄이다.

```text
javac Hello.java

java Hello
```

---

## 115. 지금 꼭 외워야 할 것은?

모든 내용을 외울 필요는 없다.

이번 글에서 가장 중요한 것은 다음 다섯 가지다.

```text
JAVA_HOME
→ JDK 설치 폴더

PATH
→ %JAVA_HOME%\bin

java -version
→ Java 실행 버전 확인

javac -version
→ Java Compiler 확인

javac → java
→ 컴파일 후 실행
```

---

## 116. 환경변수 전체 구조 다시 보기

예를 들어 JDK가 다음 위치에 설치되었다고 하자.

```text
C:\Program Files\Java\jdk-21
```

그러면

```text
JAVA_HOME
=
C:\Program Files\Java\jdk-21
```

그리고 PATH에는

```text
%JAVA_HOME%\bin
```

을 추가한다.

Windows가 실제로 이해하는 경로는

```text
C:\Program Files\Java\jdk-21\bin
```

이다.

그 안에는

```text
java.exe

javac.exe
```

가 있다.

그래서 어느 폴더에서든

```bash
java
```

```bash
javac
```

를 사용할 수 있다.

---

## 117. 한 그림으로 이해하기

```text
C:\Program Files\Java\jdk-21
             ↑
             │
         JAVA_HOME
             │
             ↓
      %JAVA_HOME%\bin
             ↑
             │
            PATH
             │
      ┌──────┴──────┐
      ↓             ↓
   java.exe       javac.exe
      ↓             ↓
    실행           컴파일
```

이 그림을 이해했다면 Java 환경변수의 핵심은 거의 이해한 것이다.

---

## 118. JDK / JRE / JVM 한 번 더 정리

```text
JDK
Java Development Kit

→ Java 개발 도구
→ 개발자에게 필요
→ javac 포함
```

```text
JRE
Java Runtime Environment

→ Java 프로그램 실행에 필요한 환경이라는 개념
```

```text
JVM
Java Virtual Machine

→ Java Bytecode 실행
```

초보자 기준으로는

```text
나는 Java 개발을 한다

↓

JDK를 설치한다
```

라고 기억하면 된다.

---

## 119. Node.js와 비교하면 더 쉽게 이해할 수 있다

앞선 글과 연결해보자.

JavaScript:

```text
VS Code

↓

hello.js

↓

Node.js

↓

실행
```

Java:

```text
VS Code

↓

Hello.java

↓

JDK의 javac

↓

Hello.class

↓

JVM / java

↓

실행
```

Java에는 **Compile 과정**이 눈에 보인다는 차이가 있다.

---

## 120. 최종 점검 체크리스트

아래 내용을 하나씩 확인한다.

```text
□ Java와 JDK가 같은 말이 아니라는 것을 안다

□ JDK가 무엇인지 안다

□ JRE가 무엇인지 대략 안다

□ JVM이 무엇인지 대략 안다

□ java와 javac 차이를 안다

□ JDK 21 Installer를 다운로드했다

□ JDK 21을 설치했다

□ 실제 JDK 설치 폴더를 확인했다

□ JDK 안의 bin 폴더를 확인했다

□ JAVA_HOME을 만들었다

□ JAVA_HOME에 JDK 루트 경로를 넣었다

□ JAVA_HOME에 \bin을 넣지 않았다

□ PATH에 %JAVA_HOME%\bin을 추가했다

□ 기존 Path 항목을 삭제하지 않았다

□ 환경변수 변경 후 Terminal을 다시 열었다

□ echo %JAVA_HOME%으로 확인했다

□ java -version이 정상 출력된다

□ Java 21인지 확인했다

□ javac -version이 정상 출력된다

□ javac도 21인지 확인했다

□ where java로 실제 실행 위치를 확인할 수 있다

□ Hello.java를 만들었다

□ javac Hello.java로 컴파일했다

□ Hello.class가 생성되는 것을 확인했다

□ java Hello로 실행했다

□ Hello Java! 결과를 확인했다
```

이 항목이 모두 정상이라면 JDK 21 개발환경 구축은 완료다.

---

## 정리

이번 글에서는 단순히 Java를 설치하는 것이 아니라 Java 개발환경 전체 구조를 직접 확인했다.

전체 과정은 다음과 같다.

```text
Java 구조 이해

↓

JDK / JRE / JVM 구분

↓

JDK 21 다운로드

↓

JDK 설치

↓

설치 경로 확인

↓

JAVA_HOME 생성

↓

PATH에 %JAVA_HOME%\bin 추가

↓

새 Terminal 실행

↓

java -version

↓

javac -version

↓

Hello.java 작성

↓

javac Hello.java

↓

Hello.class 생성

↓

java Hello

↓

Hello Java!
```

이번 글에서 가장 중요한 구조는 이것이다.

```text
JAVA_HOME
→ JDK의 위치

PATH
→ JDK의 실행 도구 위치
```

실제 예를 들면

```text
JAVA_HOME

C:\Program Files\Java\jdk-21
```

그리고

```text
PATH

%JAVA_HOME%\bin
```

이다.

또 Java 실행 흐름은 다음과 같다.

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

실행
```

처음에는 JDK, JRE, JVM, JAVA_HOME, PATH 같은 단어가 한꺼번에 등장해서 복잡해 보인다.

하지만 역할을 나누면 생각보다 단순하다.

```text
JDK
→ 개발 도구

javac
→ 컴파일

java
→ 실행

JVM
→ Bytecode 실행

JAVA_HOME
→ JDK 위치

PATH
→ java와 javac를 찾는 경로
```

여기까지 직접 설정하고

```bash
java -version
```

과

```bash
javac -version
```

이 모두 Java 21로 정상 출력되며,

```bash
javac Hello.java
java Hello
```

까지 성공했다면 **JDK 21 개발환경 구축은 완료**다.

이제 Java를 명령어로 직접 컴파일하고 실행할 수 있는 환경까지 준비됐다.

다음 Dev Setup에서는 이 JDK 21을 **IntelliJ IDEA에 연결**한다.

```text
JDK 21
설치 완료

↓

IntelliJ IDEA 설치

↓

Project SDK에 JDK 21 연결

↓

Java Project 생성

↓

Hello.java 작성

↓

Run 버튼으로 실행
```

앞으로는 매번

```bash
javac Hello.java
java Hello
```

를 직접 입력하지 않고 IntelliJ가 Java 프로젝트의 작성·컴파일·실행 과정을 훨씬 편리하게 관리하도록 구성한다.

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

05 JDK 21 설치와 Java 환경변수 설정  ← 현재
   ↓

06 IntelliJ IDEA 설치 및 JDK 연결
   ↓

07 Tomcat 개발환경 구축
   ↓

08 새 PC에서 개발환경 다시 구축하기
```

다음 글에서는 **IntelliJ IDEA Community/무료 사용 범위부터 설치, JDK 21 연결, Project SDK, 첫 Java 프로젝트 생성, Run까지** 이어서 진행한다.

---

## 더 학습하면 좋은 개념

- **JIT 컴파일러와 JVM 메모리 구조** — `javac`가 만든 Bytecode를 JVM이 실행하면서 다시 기계어로 바꾸는 과정이다. 7장의 "Write Once, Run Anywhere"가 성능을 잃지 않는 이유이고, Heap·Stack 같은 메모리 개념으로 이어진다.
- **package와 classpath** — 지금은 `Hello.java` 하나였지만 파일이 여러 폴더로 나뉘면 `java`가 클래스를 어디서 찾는지 정해야 한다. 이 규칙이 classpath이고, IntelliJ가 대신 관리해 주는 부분이다.
- **Maven·Gradle과 Toolchain** — 95장에서 말한 빌드 도구다. 프로젝트마다 필요한 JDK 버전을 빌드 설정에 적어 두는 Toolchain 기능을 알면 107장의 "JDK 여러 개" 문제를 훨씬 깔끔하게 관리할 수 있다.
- **Java 릴리스 주기와 LTS** — Java는 6개월마다 새 버전이 나오고 그중 일부가 LTS가 된다. 18장에서 17·21·25가 나란히 등장한 이유와 배포판별 지원 기간을 이해할 수 있다.
- **JShell** — 11장의 도구 목록에 있던 Java REPL이다. Node.js REPL처럼 Java 코드를 한 줄씩 바로 실행해 볼 수 있어서 문법을 공부할 때 편하다.

## 참고 자료

- [Oracle - Java Downloads](https://www.oracle.com/java/technologies/downloads/)
- [Oracle Docs - JDK 21 Installation on Microsoft Windows](https://docs.oracle.com/en/java/javase/21/install/installation-jdk-microsoft-windows-platforms.html)
- [Oracle Docs - Java SE 21 Documentation](https://docs.oracle.com/en/java/javase/21/)
- [Oracle Docs - The java Command (JDK 21)](https://docs.oracle.com/en/java/javase/21/docs/specs/man/java.html)
- [Oracle Docs - The javac Command (JDK 21)](https://docs.oracle.com/en/java/javase/21/docs/specs/man/javac.html)
- [Java.com - How do I set or change the PATH system variable?](https://www.java.com/en/download/help/path.html)
- [Oracle - Java SE Licensing FAQ](https://www.oracle.com/java/technologies/javase/jdk-faqs.html)
- [Eclipse Temurin - JDK 21 Releases](https://adoptium.net/temurin/releases/?version=21)
- [Adoptium - Installing Temurin on Windows](https://adoptium.net/installation/windows/)
- [OpenJDK - JEP 330: Launch Single-File Source-Code Programs](https://openjdk.org/jeps/330)
