---
layout: post
title: "JDK를 설치하면서 이해한 JDK·JRE·JVM과 PATH·JAVA_HOME"
date: 2026-09-28 15:29:00 +0900
categories: dev-setup
learningOrder: 65
tags:
  - java
  - jdk
  - jdk21
  - eclipse-temurin
  - windows
---

Java 공부를 시작하려면 먼저 컴퓨터가 Java 코드를 만들고 실행할 수 있는 환경이 필요합니다.

Java라는 언어로 코드를 작성하는 것은 사람이 이해할 수 있는 형태로 명령을 적는 과정입니다.
하지만 컴퓨터는 우리가 작성한 `.java` 파일을 그대로 실행할 수 없습니다.

그래서 Java 코드를 컴퓨터가 실행할 수 있는 형태로 바꾸고, 실제로 실행해 주는 도구가 필요합니다.

그 역할을 하는 것이 **JDK(Java Development Kit)** 입니다.

이번 글에서는 수업에서 사용하는 **JDK 21**을 기준으로,

- JDK가 무엇인지
- JVM, JRE, JDK는 어떤 관계인지
- `javac`와 `java`는 어떤 역할을 하는지
- 왜 JDK 21을 설치하는지
- `PATH`와 `JAVA_HOME`이 무엇인지

을 순서대로 정리합니다.

실제 JDK 21 설치 과정은 [이전 글]({% post_url 2026-09-24-jdk21-java-home-setup %})에서 먼저 정리했습니다.

---

## 1. JDK는 무엇일까

**JDK(Java Development Kit)** 는 Java 프로그램을 **만들고 실행하는 데 필요한 도구들을 모아 놓은 개발 키트**입니다.

처음에는 JDK, JRE, JVM이라는 단어가 각각 따로 존재하는 것처럼 보여 헷갈렸습니다.

하지만 구조를 안쪽부터 보면 이해하기 쉽습니다.

```text
JDK
└─ JRE
   └─ JVM
```

가장 안쪽에는 JVM이 있고,
그 JVM에 Java 실행에 필요한 기능을 더한 것이 JRE,
JRE에 다시 개발 도구를 더한 것이 JDK라고 생각할 수 있습니다.

즉, Java 개발자는 보통 JDK 하나를 설치하면 됩니다.

### JVM

**JVM(Java Virtual Machine)** 은 Java 바이트코드를 실행하는 가상 머신입니다.

Java 소스 코드를 컴파일하면 `.class` 파일이 만들어집니다.
이 `.class` 파일에 들어 있는 바이트코드를 JVM이 읽고 실행합니다.

```text
Java 코드
   ↓
.class 바이트코드
   ↓
JVM
   ↓
실행
```

Windows, macOS, Linux는 서로 다른 운영체제입니다.

Java는 각 운영체제에서 직접 같은 방식으로 실행되는 것이 아니라, 해당 환경에 맞는 JVM이 중간에서 바이트코드를 실행해 줍니다.

그래서 처음 배울 때는 JVM을

```text
Java 코드를 실행하기 위해 컴퓨터 안에 만들어 놓은 Java 전용 가상 컴퓨터
```

정도로 이해했습니다.

JVM 안에는 클래스 로더, 바이트코드 검증, 실행 엔진, 메모리 관리 등의 기능이 들어 있습니다.

### JRE

**JRE(Java Runtime Environment)** 는 Java 프로그램을 실행하기 위한 환경입니다.

JVM만 있다고 모든 Java 프로그램을 바로 실행할 수 있는 것은 아닙니다.
Java 프로그램에서 자주 사용하는 여러 기능도 함께 필요합니다.

예를 들어

```java
System.out.println("Hello");
```

처럼 우리가 자연스럽게 사용하는 기능도 Java의 표준 라이브러리를 이용합니다.

JRE는 이런 표준 라이브러리와 JVM을 포함해 Java 프로그램을 실행할 수 있는 환경을 제공합니다.

간단하게 정리하면 다음과 같습니다.

```text
JRE
=
JVM
+
Java 실행에 필요한 표준 라이브러리
```

### JDK

JDK는 여기에 개발 도구까지 추가한 것입니다.

```text
JDK
=
JRE
+
Java 개발 도구
```

대표적으로 다음과 같은 도구들이 있습니다.

```text
javac
java
jshell
javap
jar
javadoc
jdb
```

이 중 처음 Java를 배울 때 가장 자주 보게 되는 것은 `javac`와 `java`입니다.

### javac와 java

Java 프로그램을 만드는 과정에서 두 명령의 역할은 다릅니다.

#### javac

`javac`는 Java 컴파일러입니다.

사람이 작성한 `.java` 파일을 JVM이 읽을 수 있는 `.class` 바이트코드로 변환합니다.

예를 들어 다음 명령을 실행하면

```powershell
javac Hello.java
```

```text
Hello.java
    ↓
javac
    ↓
Hello.class
```

과 같은 과정이 진행됩니다.

문법에 문제가 있다면 컴파일 과정에서 오류가 표시됩니다.

#### java

`java`는 만들어진 Java 프로그램을 실행할 때 사용합니다.

```powershell
java Hello
```

처럼 실행하면 JVM이 바이트코드를 읽어 프로그램을 실행합니다.

따라서 가장 기초적인 흐름은 다음과 같습니다.

```text
Hello.java
   ↓
javac
   ↓
Hello.class
   ↓
java
   ↓
JVM 실행
```

Java 코드를 작성하는 것과 컴퓨터가 그 코드를 실행하는 것은 같은 과정이 아니라는 점을 이 구조를 통해 이해할 수 있었습니다.

### JDK 폴더 안을 보면

JDK를 설치하면 설치 폴더 안에 여러 파일과 폴더가 만들어집니다.

Windows에서 Eclipse Temurin JDK를 기본 설정으로 설치했다면 대략 다음과 같은 경로를 볼 수 있습니다.

```text
C:\Program Files\Eclipse Adoptium\jdk-21...\bin
```

`bin` 폴더 안에는 실제 실행 파일들이 있습니다.

```text
javac.exe
java.exe
jshell.exe
javap.exe
jar.exe
javadoc.exe
jdb.exe
```

PowerShell에서

```powershell
javac Hello.java
```

라고 입력할 수 있는 것도 결국 Windows가 이 `javac.exe`를 찾아 실행하기 때문입니다.

---

## 2. 왜 JDK 21을 설치할까

Java는 현재 6개월 주기로 새로운 기능 릴리스가 나옵니다. 이 릴리스 모델에서는 기능 버전 번호가 6개월마다 증가합니다.

그중 일부 버전은 장기간 지원되는 **LTS(Long-Term Support)** 버전으로 운영됩니다.

대표적인 LTS 버전은

```text
Java 8
Java 11
Java 17
Java 21
Java 25
```

입니다. 현재 [Oracle의 지원 로드맵](https://www.oracle.com/java/technologies/java-se-support-roadmap.html)에서도 21과 25가 LTS 버전으로 구분되어 있습니다.

작성 시점 기준 최신 LTS는 Java 25지만, 이번 수업에서는 Java 21을 사용합니다.

그래서 최신 버전을 무조건 설치하기보다 수업에서 사용하는 버전에 맞춰 JDK 21을 설치했습니다.

Java 21은 2023년 9월에 나온 LTS 버전이며, 현재도 Eclipse Temurin에서 JDK 21 설치 파일이 제공되고 있습니다.

### 왜 수업 버전에 맞추는가

개인 공부에서는 최신 버전을 사용할 수도 있습니다.

하지만 수업이나 팀 프로젝트에서는 사용하는 Java 버전을 맞추는 것이 중요합니다.

Java 버전이 서로 다르면

- 사용하는 문법
- 라이브러리
- 프레임워크 설정
- 빌드 환경

에서 차이가 생길 수 있기 때문입니다.

이번에는 수업 환경과 동일하게 맞추기 위해 JDK 21을 설치했습니다.

### JDK는 누가 만들까

Java의 원본 소스는 OpenJDK라는 오픈소스 프로젝트를 기반으로 개발됩니다.

그리고 여러 회사와 프로젝트가 OpenJDK를 기반으로 JDK 배포판을 제공합니다.

예를 들면

```text
OpenJDK
   ├─ Eclipse Temurin
   ├─ Oracle JDK
   ├─ Amazon Corretto
   └─ Microsoft Build of OpenJDK
```

처럼 생각할 수 있습니다.

이름은 다르지만 모두 Java 개발에 사용할 수 있는 JDK 배포판입니다.

이번 수업에서는 Eclipse Temurin을 사용했습니다.

---

## 3. PATH와 JAVA_HOME

### PATH는 무엇일까

처음 환경 변수를 배우면서 `PATH`와 `JAVA_HOME`이 가장 헷갈렸습니다.

둘은 역할이 다릅니다.

먼저 `PATH`는 Windows가 명령어에 해당하는 실행 파일을 찾을 때 확인하는 폴더 목록입니다.

PowerShell에서

```powershell
java
```

라고 입력했다고 해서 Windows가 처음부터 `java.exe`의 위치를 알고 있는 것은 아닙니다.

`PATH`에 등록된 폴더를 차례대로 확인하면서 `java.exe`를 찾습니다.

예를 들어 `PATH` 안에 다음 경로가 들어 있다면

```text
C:\Program Files\Eclipse Adoptium\jdk-21...\bin
```

Windows가 그 폴더 안에서

```text
java.exe
javac.exe
```

를 찾을 수 있습니다.

그래서 어느 폴더에서든

```powershell
java
javac
```

를 사용할 수 있게 됩니다.

정리하면

```text
PATH = 명령어를 실행할 프로그램을 찾기 위한 폴더 목록
```

이라고 이해할 수 있습니다.

### JAVA_HOME은 무엇일까

`JAVA_HOME`은 JDK가 설치된 위치 하나를 저장하는 환경 변수입니다.

예를 들면

```text
JAVA_HOME
=
C:\Program Files\Eclipse Adoptium\jdk-21...
```

처럼 설정됩니다.

`PATH`와 달리 여러 폴더를 순서대로 검색하기 위한 것이 아니라

```text
내 컴퓨터에서 사용하는 JDK가 어디에 설치되어 있는지 알려주는 주소
```

라고 이해하면 쉽습니다.

IntelliJ, Gradle, Spring 같은 개발 도구가 JDK의 위치를 찾을 때 `JAVA_HOME`을 사용하는 경우가 있습니다.

### PATH와 JAVA_HOME 비교

| 구분 | PATH | JAVA_HOME |
|------|------|-----------|
| 역할 | 실행 파일을 찾을 폴더 목록 | JDK가 설치된 위치 |
| 형태 | 여러 경로 | 하나의 JDK 경로 |
| 예시 | `...\jdk-21...\bin` | `...\jdk-21...` |
| 사용 목적 | `java`, `javac` 명령 실행 | 개발 도구가 JDK 위치 확인 |

특히 경로를 보면 한 가지 차이가 있습니다.

```text
PATH
C:\Program Files\Eclipse Adoptium\jdk-21...\bin

JAVA_HOME
C:\Program Files\Eclipse Adoptium\jdk-21...
```

`PATH`에는 실제 실행 파일들이 들어 있는 `bin` 폴더까지 포함됩니다.

반면 `JAVA_HOME`은 JDK 자체의 설치 폴더를 가리킵니다.

### java를 입력하면 컴퓨터는 어떻게 찾을까

PowerShell에

```powershell
java
```

를 입력했다고 가정해 봅니다.

Windows는 `PATH`에 등록된 경로를 앞에서부터 확인합니다.

```text
PATH

1. C:\Windows\system32
2. C:\Windows
3. C:\Windows\System32\WindowsPowerShell\v1.0
4. C:\Program Files\Git\cmd
5. C:\Program Files\Eclipse Adoptium\jdk-21...\bin
6. ...
```

그리고 JDK의 `bin` 폴더에서

```text
java.exe
```

를 발견하면 해당 프로그램을 실행합니다.

그래서 JDK를 설치했더라도 `PATH`가 제대로 등록되지 않았다면

```text
'java' 용어가 ... 인식되지 않습니다
```

와 같은 오류가 발생할 수 있습니다.

---

## 4. 설치하면서 이해한 전체 흐름

이번 설치 과정까지 연결해 보면 Java 프로그램이 실행되는 흐름을 조금 더 구체적으로 볼 수 있습니다.

```text
사람이 Java 코드 작성
        ↓
Hello.java
        ↓
javac
        ↓
Hello.class
        ↓
JVM
        ↓
컴퓨터에서 프로그램 실행
```

그리고 이때

```text
JDK
├─ 개발 도구
│  ├─ javac
│  ├─ java
│  └─ ...
│
└─ Java 실행 환경
   └─ JVM
```

이 전체 환경을 준비하기 위해 JDK를 설치한 것입니다.

---

## 정리

Java 개발을 시작하기 위해서는 JDK가 필요합니다.

이번에 설치한 환경은

```text
Eclipse Temurin JDK 21
```

입니다.

JDK 안에는 Java 프로그램을 개발하고 실행하는 데 필요한 여러 도구가 들어 있습니다.

특히 처음에는 다음 관계를 기억해 두면 좋을 것 같습니다.

```text
JDK
└─ Java 개발에 필요한 전체 환경

JRE
└─ Java 프로그램 실행 환경

JVM
└─ Java 바이트코드를 실제로 실행
```

그리고 가장 먼저 사용하게 되는 두 명령은

```text
javac → Java 코드 컴파일
java  → Java 프로그램 실행
```

입니다.

Windows에서는 JDK를 설치한 뒤 환경 변수도 함께 연결해야 합니다.

```text
PATH
→ java.exe, javac.exe 같은 명령을 찾기 위한 경로

JAVA_HOME
→ JDK가 설치된 위치
```

마지막으로 다음 명령을 실행했을 때 모두 JDK 21을 정상적으로 가리키면 설치가 끝난 것입니다.

```powershell
java -version
javac -version
echo $env:JAVA_HOME
```

이제 컴퓨터가 Java 코드를 컴파일하고 실행할 수 있는 기본 개발 환경이 준비되었습니다.
