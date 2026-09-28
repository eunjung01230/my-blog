---
layout: post
title: "JDK 21 설치와 Java 환경변수 설정하기"
date: 2026-09-24 22:51:00 +0900
categories: dev-setup
learningOrder: 60
tags:
  - java
  - jdk
  - eclipse-temurin
  - java-home
  - windows
---

앞선 Dev Setup에서는 Node.js와 npm을 설치해서 JavaScript를 컴퓨터에서 직접 실행할 수 있는 환경을 만들었다.

이번에는 Java 개발환경을 준비한다.

이번 설치 환경은 다음과 같다.

```text
운영체제 : Windows
배포판   : Eclipse Temurin
버전     : JDK 21 LTS
```

설치는 크게 네 단계로 진행했다.

```text
1. 설치 파일 내려받기
2. 설치 옵션 설정
3. PowerShell 새로 열기
4. 설치 확인
```

---

## 1단계. Temurin 21 설치 파일 내려받기

[Eclipse Adoptium의 Temurin 다운로드 페이지](https://adoptium.net/temurin/releases/?version=21)로 이동한다.

다운로드할 때는 다음 항목을 확인했다.

```text
Operating System : Windows
Architecture     : x64
Package Type     : JDK
Version          : 21 LTS
```

그리고 `.msi` 형식의 설치 파일을 내려받았다.

Adoptium은 현재도 Windows용 Temurin 21 MSI 설치 파일을 제공하고 있다.

여기서 중요한 것은 최신 LTS를 무조건 내려받지 않는 것이다.

현재 다운로드 페이지에는 JDK 25도 있기 때문에 이번 수업에서는 반드시 버전을 확인하고 21 LTS를 선택해야 한다.

### x64는 무엇일까

내 Windows 환경이 x64인지 모르겠다면

```text
설정
→ 시스템
→ 정보
→ 시스템 종류
```

에서 확인할 수 있다.

대부분의 일반적인 Windows PC는 x64 환경이다.

---

## 2단계. 설치 옵션 설정하기

다운로드한 `.msi` 파일을 실행한다.

라이선스에 동의하고 설치를 진행하다 보면 Custom Setup 화면이 나온다.

여기서 중요한 항목은 다음 두 가지다.

```text
Add to PATH
Set or override JAVA_HOME variable
```

[Temurin의 Windows MSI 설치 프로그램](https://adoptium.net/installation/windows/)은 기본적으로 JDK를 `C:\Program Files\Eclipse Adoptium\...` 아래에 설치하며, PATH 추가 기능을 제공한다. JAVA_HOME 업데이트는 설치 과정에서 추가로 선택할 수 있는 기능이다.

수업에서는

```text
Add to PATH
→ 사용

Set or override JAVA_HOME variable
→ 사용
```

으로 설정했다.

`Set or override JAVA_HOME variable` 항목에 빨간 X가 표시되어 있다면 해당 항목을 눌러

```text
Will be installed on local hard drive
```

를 선택한다.

설정이 끝나면

```text
Next
→ Install
→ Finish
```

순서로 설치를 완료한다.

---

## 3단계. PowerShell을 새로 열기

JDK를 설치하기 전에 PowerShell이나 터미널을 열어 둔 상태였다면 설치 후에는 새 창을 열어야 한다.

왜냐하면 기존 PowerShell 창은 창이 열릴 당시의 환경 변수 정보를 가지고 있기 때문이다.

JDK 설치 과정에서 PATH가 변경되었더라도 기존 터미널에는 바로 반영되지 않을 수 있다.

따라서

```text
기존 PowerShell 종료
→ 새로운 PowerShell 실행
```

을 한다.

이후 새 PowerShell에서는 변경된 PATH를 사용할 수 있다.

---

## 4단계. 설치 확인하기

설치가 끝났다면 세 가지를 확인한다.

### Java 실행 버전 확인

```powershell
java -version
```

실행 결과에서 `21`이 보이는지 확인한다.

예를 들어

```text
openjdk version "21..."
```

처럼 출력되면 된다.

`java` 명령은 Java 프로그램을 실행할 때 사용하는 명령이다.

### Java 컴파일러 버전 확인

```powershell
javac -version
```

역시 결과에서 `21`이 보이는지 확인한다.

```text
javac 21...
```

와 같이 나타난다면 Java 컴파일러도 정상적으로 설치된 것이다.

### JAVA_HOME 확인

PowerShell에서는 다음 명령으로 확인할 수 있다.

```powershell
echo $env:JAVA_HOME
```

JDK 설치 폴더가 나타나는지 확인한다.

예를 들어

```text
C:\Program Files\Eclipse Adoptium\jdk-21...
```

과 같은 형태다.

세 가지가 모두 정상이라면 JDK 21 설치가 완료된 것이다.

---

## 마무리

이번 글에서는 Eclipse Temurin JDK 21을 설치하고, 설치 옵션(`Add to PATH`, `Set or override JAVA_HOME variable`)으로 PATH와 JAVA_HOME을 설정한 뒤 새 PowerShell에서 설치를 확인했다.

JDK/JRE/JVM과 PATH, JAVA_HOME의 원리는 [다음 글]({% post_url 2026-09-28-jdk-jre-jvm-path-java-home %})에서 따로 정리했다.
