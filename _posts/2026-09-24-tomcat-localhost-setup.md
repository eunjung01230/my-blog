---
layout: post
title: "Tomcat 설치하고 localhost에서 실행하기"
date: 2026-09-24 23:08:00 +0900
categories: dev-setup
learningOrder: 80
tags:
  - tomcat
  - servlet
  - java
  - localhost
---

> **이 글의 위치**
>
> 이 글은 아직 부트캠프에서 Servlet/JSP와 Tomcat을 본격적으로 배우기 전에, 공식 문서와 자료를 찾아보며 먼저 개발환경을 구축해본 기록이다.
>
> 따라서 현재 시점에서는 **Tomcat이 무엇인지 이해하고, JDK 21과 연결해서 직접 서버를 실행한 뒤 localhost에 접속하는 것**까지를 목표로 한다.
>
> 이후 부트캠프에서 Servlet, JSP, WAR 배포, Context, IntelliJ 연동 등을 실제로 배우게 되면 이 글은 처음 개념부터 다시 검토하고 내용을 추가할 예정이다.
>
> 특히 Tomcat은 버전에 따라 지원하는 Servlet/Jakarta EE 규격과 Java 최소 버전이 다르므로 실제 수업에서 특정 Tomcat 버전을 지정한다면 **수업에서 사용하는 버전을 우선한다.**

---

앞선 Dev Setup에서는 Java 개발환경을 만들었다.

JDK 21을 설치했고,

```bash
java -version
```

과

```bash
javac -version
```

을 확인했다.

IntelliJ IDEA도 설치해서 JDK 21을 연결했다.

그리고 다음과 같은 Java 프로그램을 실행했다.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello Java!");
    }
}
```

현재까지는 이런 구조다.

```text
Java 코드 작성
      ↓
IntelliJ IDEA
      ↓
JDK 21
      ↓
Java 프로그램 실행
```

그런데 우리가 앞으로 만들고 싶은 것은 단순한 Java 프로그램만은 아니다.

예를 들어 브라우저에서

```text
http://localhost:8080
```

으로 접속했을 때 Java 프로그램이 요청을 받고 HTML을 응답하는 **웹 애플리케이션**을 만들고 싶을 수 있다.

이때 새로운 개념이 등장한다.

```text
웹 서버

HTTP

Servlet

Servlet Container

Tomcat

localhost

Port
```

처음 보면 갑자기 용어가 많아져 어렵게 느껴진다.

특히 Tomcat을 검색하면 어떤 글에서는

> Tomcat은 웹 서버다.

라고 하고,

다른 글에서는

> Tomcat은 WAS다.

라고 하고,

또 다른 글에서는

> Tomcat은 Servlet Container다.

라고 설명한다.

처음 공부하는 입장에서는

> 그래서 정확히 뭐라는 거지?

라는 생각이 들 수 있다.

이번 글에서는 이런 용어부터 하나씩 정리한 뒤 실제 Tomcat을 설치한다.

최종 목표는 다음과 같다.

```text
웹 애플리케이션 구조 이해

↓

웹 서버 개념 이해

↓

Servlet 개념 이해

↓

Servlet Container 이해

↓

Tomcat 역할 이해

↓

Tomcat 버전 선택

↓

Tomcat 설치

↓

JDK 21 연결 확인

↓

CATALINA_HOME 이해

↓

Tomcat 실행

↓

8080 Port 확인

↓

http://localhost:8080 접속

↓

Tomcat 정상 실행 확인

↓

Tomcat 종료
```

---

## 1. 먼저 웹은 어떻게 동작할까?

Tomcat을 이해하려면 가장 먼저 브라우저와 서버의 관계부터 알아야 한다.

우리가 Chrome이나 Edge에서 웹사이트 주소를 입력한다고 생각해보자.

예를 들어

```text
https://example.com
```

을 입력한다.

브라우저는 해당 서버에 요청을 보낸다.

```text
사용자

↓

Chrome / Edge

↓

요청

↓

Server
```

서버는 요청을 받고 필요한 작업을 처리한다.

그리고 결과를 다시 브라우저로 보낸다.

```text
Server

↓

응답

↓

Chrome / Edge

↓

사용자에게 화면 표시
```

이것이 웹의 가장 기본적인 구조다.

---

## 2. 요청과 응답

웹 개발을 공부하면 정말 많이 보게 되는 단어가 있다.

```text
Request

Response
```

우리말로 하면

```text
Request
→ 요청

Response
→ 응답
```

이다.

예를 들어 브라우저에서

```text
http://localhost:8080/hello
```

에 접속한다고 해보자.

브라우저는 서버에게 대략 이런 요청을 보낸다.

```text
/hello 페이지를 주세요.
```

서버는 요청을 처리하고 결과를 돌려준다.

```text
Hello!
```

전체 흐름은 다음과 같다.

```text
Browser

GET /hello

↓

Server

요청 처리

↓

Response

HTML / JSON 등

↓

Browser
```

---

## 3. HTTP란?

브라우저와 웹 서버가 요청과 응답을 주고받을 때 사용하는 대표적인 통신 규칙이 **HTTP**다.

HTTP는

**HyperText Transfer Protocol**

의 약자다.

처음에는 아주 단순하게

> **웹에서 클라이언트와 서버가 요청과 응답을 주고받기 위한 규칙**

이라고 이해하면 된다.

---

## 4. Client와 Server

웹 개발에서 매우 자주 등장하는 용어다.

### Client

서버에 요청을 보내는 쪽이다.

대표적으로

```text
Chrome
Edge
Safari
Mobile App
```

등이 Client가 될 수 있다.

### Server

Client의 요청을 받아 처리하고 결과를 응답하는 쪽이다.

따라서 기본 구조는 다음과 같다.

```text
Client

↓

Request

↓

Server

↓

Response

↓

Client
```

---

## 5. localhost는 무엇일까?

앞선 VS Code 글에서도 `localhost`를 잠깐 봤다.

localhost는 아주 쉽게 말하면

> **현재 내가 사용하고 있는 컴퓨터 자신**

을 가리킨다.

즉

```text
http://localhost
```

로 접속한다는 것은

> 인터넷 어딘가에 있는 다른 서버가 아니라 현재 내 컴퓨터에서 실행되고 있는 서버에 접속한다.

는 의미다.

---

## 6. localhost와 127.0.0.1

localhost를 공부하다 보면 다음 주소도 자주 보게 된다.

```text
127.0.0.1
```

이 주소는 IPv4에서 자신의 컴퓨터를 가리키는 대표적인 Loopback 주소다.

따라서 개발 환경에서는 다음 두 주소가 비슷한 용도로 사용되는 경우가 많다.

```text
http://localhost
```

```text
http://127.0.0.1
```

---

## 7. 그런데 왜 뒤에 `:8080`이 붙을까?

Tomcat을 실행하면 일반적으로 다음 주소로 접속한다.

```text
http://localhost:8080
```

여기서

```text
8080
```

이 바로 **Port 번호**다.

Tomcat의 기본 HTTP Connector는 기본 설정에서 8080 Port를 사용한다.

---

## 8. Port란?

하나의 컴퓨터에서는 여러 프로그램이 동시에 네트워크 통신을 할 수 있다.

예를 들어 내 컴퓨터에서

```text
웹 서버

데이터베이스

개발 서버

Tomcat
```

이 동시에 실행될 수 있다.

그러면 컴퓨터는

> 들어온 요청을 어떤 프로그램에게 전달해야 하지?

를 구분해야 한다.

이때 사용하는 것이 Port다.

아주 단순하게 비유하면

```text
IP 주소
→ 건물 주소

Port
→ 건물 안의 방 번호
```

처럼 생각할 수 있다.

---

## 9. localhost와 Port를 같이 보면

```text
localhost:8080
```

을 다음처럼 이해할 수 있다.

```text
localhost

현재 내 컴퓨터

+

8080

현재 컴퓨터에서 8080번 Port를 사용하는 프로그램
```

Tomcat이 8080에서 실행 중이라면

```text
http://localhost:8080
```

은

> 내 컴퓨터의 8080 Port에서 실행 중인 Tomcat에게 요청을 보내라.

라는 의미가 된다.

---

## 10. 웹 서버란?

이제 Tomcat을 이해하기 위해 **Web Server** 개념을 보자.

웹 서버는 Client로부터 HTTP 요청을 받고 웹 콘텐츠를 응답할 수 있는 서버 프로그램을 의미한다.

예를 들어

```text
HTML

CSS

JavaScript

Image
```

같은 정적 파일을 전달할 수 있다.

아주 단순화하면

```text
Browser

↓

HTML 주세요

↓

Web Server

↓

index.html

↓

Browser
```

같은 구조다.

---

## 11. 정적 콘텐츠란?

정적 콘텐츠는 요청할 때마다 서버 내부 프로그램이 복잡한 계산을 해서 새로 만드는 것이 아니라 이미 준비되어 있는 파일을 전달하는 형태라고 생각하면 된다.

예를 들어

```text
index.html

style.css

logo.png
```

같은 파일이다.

구조는 단순하다.

```text
Browser

↓

logo.png 요청

↓

Server

↓

logo.png 전달
```

---

## 12. 그런데 모든 웹사이트가 파일만 전달할까?

아니다.

예를 들어 로그인 기능이 있다고 생각해보자.

사용자가

```text
ID

Password
```

를 입력한다.

서버에서는

```text
사용자 정보 확인

↓

DB 조회

↓

비밀번호 확인

↓

로그인 성공/실패 판단

↓

결과 생성
```

같은 처리가 필요하다.

또 쇼핑몰이라면

```text
상품 목록 조회

장바구니 계산

결제 처리

회원 정보 조회
```

같은 작업도 필요하다.

이런 경우 단순히 저장된 HTML 파일 하나를 전달하는 것만으로는 부족하다.

서버에서 프로그램이 실행되어야 한다.

---

## 13. Java로 웹 프로그램을 만들면?

Java에서도 HTTP 요청을 처리하는 웹 애플리케이션을 만들 수 있다.

개념적으로 보면

```text
Browser

↓

HTTP Request

↓

Java Web Application

↓

Java 코드 실행

↓

HTTP Response

↓

Browser
```

가 된다.

그런데 여기서 문제가 있다.

우리가 작성한 Java Class가 혼자서

```text
HTTP 연결

요청 분석

Servlet 생성

요청 전달

응답 전송
```

을 모두 직접 관리하려면 너무 복잡하다.

그래서 이 역할을 도와주는 환경이 필요하다.

---

## 14. Servlet이란?

Tomcat을 공부하면 거의 반드시 **Servlet**이라는 단어가 등장한다.

Servlet은 서버에서 실행되면서 HTTP 요청을 처리하고 응답을 만들 수 있는 Java 프로그램 구성 요소다.

처음에는

> **Java로 웹 요청을 처리하기 위한 서버 측 Java 프로그램**

정도로 이해하면 된다.

예를 들어 개념적으로 다음과 같은 역할을 할 수 있다.

```text
/hello 요청

↓

HelloServlet

↓

"Hello" 응답
```

---

## 15. Servlet 예제는 어떻게 생길까?

현대적인 Jakarta Servlet 계열에서는 대략 다음과 비슷한 코드를 볼 수 있다.

```java
@WebServlet("/hello")
public class HelloServlet extends HttpServlet {

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {

        response.getWriter().println("Hello Servlet!");
    }
}
```

지금은 이 코드를 이해할 필요가 없다.

이번 글에서는 아직 Servlet 개발을 배우는 것이 아니다.

중요한 것은

```text
Browser Request

↓

Servlet

↓

Java 코드로 처리

↓

Response
```

구조다.

---

## 16. 그런데 Servlet은 누가 실행해줄까?

Servlet Class를 하나 만들었다고 브라우저 요청이 자동으로 연결되는 것은 아니다.

누군가는

```text
HTTP 요청을 받아야 하고

↓

어떤 Servlet이 처리할지 찾아야 하고

↓

Servlet을 실행해야 하고

↓

Request와 Response 객체를 만들어야 하고

↓

Servlet 실행 결과를 Browser에 돌려줘야 한다
```

이런 작업을 해야 한다.

이 역할을 하는 것이 **Servlet Container**다.

---

## 17. Servlet Container란?

Servlet Container는 Servlet이 실행될 수 있는 환경을 제공한다.

다른 이름으로

```text
Web Container
```

라고 부르기도 한다.

기본적인 역할을 단순화하면 다음과 같다.

```text
HTTP Request 받기

↓

요청 URL 분석

↓

적절한 Servlet 찾기

↓

Servlet 실행

↓

HTTP Response 생성

↓

Client에게 전달
```

---

## 18. Tomcat의 핵심 역할

바로 여기에서 Tomcat이 등장한다.

Apache Tomcat은 Servlet과 JSP 관련 규격을 구현하는 **Servlet/JSP Container**다.

현재 [Tomcat 공식 문서](https://tomcat.apache.org/tomcat-11.0-doc/index.html)에서도 Tomcat을 Servlet/JSP Container로 설명한다.

즉 아주 단순하게 보면

```text
Browser

↓

HTTP Request

↓

Tomcat

↓

Servlet

↓

Java Code

↓

Tomcat

↓

HTTP Response

↓

Browser
```

구조가 된다.

---

## 19. Tomcat은 웹 서버일까?

여기서 조금 정확하게 정리해야 한다.

Tomcat은 HTTP 요청을 직접 받고 정적 파일도 제공할 수 있기 때문에 **웹 서버처럼 동작하는 기능도 가지고 있다.**

하지만 Tomcat을 공부하는 핵심 이유는 단순한 정적 웹 서버 기능보다 **Java Servlet/JSP 웹 애플리케이션을 실행하는 Container** 역할이다.

Tomcat 11의 [Default Servlet](https://tomcat.apache.org/tomcat-11.0-doc/default-servlet.html)도 정적 Resource를 제공할 수 있다.

따라서 초보자 단계에서는

```text
Tomcat

= HTTP Server 기능도 가진
Java Servlet/JSP Container
```

라고 이해하면 비교적 정확하다.

---

## 20. Apache HTTP Server와 Apache Tomcat은 같은 것일까?

아니다.

둘 다 Apache라는 이름이 들어가서 많이 헷갈린다.

```text
Apache HTTP Server
```

와

```text
Apache Tomcat
```

은 서로 다른 프로젝트다.

아주 단순하게 구분하면

```text
Apache HTTP Server

→ 대표적인 Web Server
```

```text
Apache Tomcat

→ Java Servlet/JSP Container
→ 자체 HTTP 기능도 제공
```

이다.

이번 글에서 설치할 것은 **Apache Tomcat**이다.

---

## 21. Tomcat은 완전한 Jakarta EE Application Server일까?

Tomcat은 Jakarta EE의 모든 기능을 구현하는 Full Application Server가 아니다.

Tomcat은 Servlet, Pages(JSP), EL, WebSocket 등의 **Jakarta EE 기술 일부를 구현하는 Container**다.

[Apache 공식 사이트](https://tomcat.apache.org/)도 Tomcat을 Jakarta EE 기술의 일부를 구현하는 오픈소스 소프트웨어로 설명한다.

따라서

```text
Tomcat

=

Java EE / Jakarta EE 전체를
모두 구현한 서버
```

라고 이해하면 정확하지 않다.

---

## 22. Tomcat 버전을 아무거나 설치하면 될까?

아니다.

이 부분은 이번 글에서 매우 중요하다.

2026년 9월 현재 공식적으로 지원되는 Tomcat 주요 버전은 다음과 같다.

| Tomcat | Servlet | 계열 | 필요한 Java |
|------|------|------|------|
| Tomcat 11.0.x | Servlet 6.1 | Jakarta EE 11 | Java 17 이상 |
| Tomcat 10.1.x | Servlet 6.0 | Jakarta EE 10 | Java 11 이상 |
| Tomcat 9.0.x | Servlet 4.0 | Java EE 8 | Java 8 이상 |

현재 [공식 최신 릴리스](https://tomcat.apache.org/whichversion.html)는 Tomcat 11.0.26, 10.1.60, 9.0.122로 안내되고 있다.

---

## 23. JDK 21에서는 어떤 Tomcat을 사용할 수 있을까?

앞선 글에서 우리는 JDK 21을 설치했다.

JDK 21은

```text
Tomcat 11
Tomcat 10.1
Tomcat 9
```

의 최소 Java 요구사항을 모두 충족한다.

특히 Tomcat 11은 Java 17 이상을 요구하므로 JDK 21과 호환된다.

---

## 24. 그러면 무조건 Tomcat 11을 사용하면 될까?

그렇지는 않다.

**프로젝트가 사용하는 Servlet 규격이 더 중요하다.**

특히 아주 중요한 차이가 있다.

```text
Tomcat 9

javax.servlet
```

반면

```text
Tomcat 10.1 / 11

jakarta.servlet
```

계열을 사용한다.

[Tomcat 9의 Servlet API](https://tomcat.apache.org/tomcat-9.0-doc/servletapi/index.html)는 실제로 `javax.servlet` 패키지를 사용한다.

[Tomcat 10.1의 Servlet API](https://tomcat.apache.org/tomcat-10.1-doc/servletapi/index.html)는 `jakarta.servlet` 패키지를 사용한다.

---

## 25. 왜 javax가 jakarta로 바뀌었을까?

Java EE가 Eclipse Foundation으로 이전되면서 Jakarta EE로 발전했고 API Package Namespace도

```text
javax.*
```

에서

```text
jakarta.*
```

로 변경됐다.

[Tomcat 공식 다운로드 페이지](https://tomcat.apache.org/download-11.cgi)에서도 Tomcat 11 계열을 사용할 때 이 Namespace 변경으로 Tomcat 9 이하 애플리케이션에서 코드 변경이 필요할 수 있다고 안내한다.

---

## 26. 그래서 부트캠프 버전이 중요하다

예를 들어 강의 자료에서 다음 코드가 나온다고 해보자.

```java
import javax.servlet.http.HttpServlet;
```

이 경우 Tomcat 9 계열을 기준으로 작성된 자료일 가능성을 확인해야 한다.

반대로

```java
import jakarta.servlet.http.HttpServlet;
```

이라면 Tomcat 10+ 계열의 Jakarta Servlet 환경을 확인해야 한다.

따라서 부트캠프에서

```text
Tomcat 9 사용

또는

Tomcat 10.1 사용
```

처럼 버전을 지정하면 반드시 그 버전을 우선한다.

---

## 27. 이번 글에서는 어떤 버전을 사용할까?

아직 부트캠프 수업에서 Tomcat 버전이 지정되지 않은 상태이므로 **현재 독학용 환경 구축은 Tomcat 11 기준**으로 진행한다.

2026년 9월 현재 Tomcat 11은 공식 지원 중인 최신 주요 버전이며 최신 릴리스는 11.0.26이다. Tomcat 11은 Java 17 이상이 필요하므로 앞에서 설치한 JDK 21과 함께 사용할 수 있다.

다만 이 선택은

```text
부트캠프에서도 반드시 Tomcat 11을 사용한다
```

는 의미가 아니다.

수업 버전이 정해지면 그 버전에 맞춰 이 글의 설치와 Servlet 부분을 다시 보강한다.

---

## 28. 이번에는 Windows Installer 대신 ZIP 방식으로 설치한다

Tomcat은 Windows에서 여러 방식으로 설치할 수 있다.

대표적으로 공식 다운로드 페이지에서

```text
Windows zip

Windows Service Installer
```

등을 제공한다.

이번 글에서는 **ZIP 압축 파일 방식**으로 설치한다.

---

## 29. 왜 ZIP 방식을 사용할까?

Windows Service Installer를 사용하면 설치 과정이 편하다.

하지만 지금은 Tomcat의 구조를 공부하는 것이 목적이다.

ZIP을 직접 압축 해제하면 다음 폴더를 직접 볼 수 있다.

```text
bin

conf

logs

webapps

work

temp
```

그리고

```text
startup.bat

shutdown.bat

server.xml
```

같은 파일을 직접 확인할 수 있다.

그래서 처음 Tomcat 구조를 이해하기에는 ZIP 방식이 좋다.

---

## 30. Tomcat 다운로드

검색창에서

```text
Apache Tomcat
```

을 검색한다.

[Apache Tomcat 공식 사이트](https://tomcat.apache.org/)로 이동한다.

[Tomcat 11 다운로드 페이지](https://tomcat.apache.org/download-11.cgi)에서

```text
Binary Distributions
```

영역을 찾는다.

---

## 31. Core와 Source Code를 구분한다

다운로드 페이지에는 여러 파일이 있다.

우리가 필요한 것은 Tomcat을 직접 빌드하기 위한 Source Code가 아니다.

이미 실행할 수 있도록 만들어진 **Binary Distribution**이다.

따라서

```text
Binary Distributions

↓

Core

↓

Windows zip
```

을 찾는다.

---

## 32. Windows zip 다운로드

Windows 환경이므로

```text
Windows zip
```

을 다운로드한다.

파일 이름은 버전에 따라 다르지만 현재 예를 들면 다음처럼 보일 수 있다.

```text
apache-tomcat-11.0.26-windows-x64.zip
```

버전은 이후 업데이트되면 달라질 수 있다.

중요한 것은

```text
11.0.x

Windows zip
```

계열을 선택하는 것이다.

---

## 33. Tomcat은 설치 프로그램이 꼭 필요한 것이 아니다

ZIP 방식에서는 일반적인 Windows 프로그램처럼

```text
Next
Next
Install
```

과정을 진행하지 않는다.

압축 파일을 풀면 Tomcat 실행에 필요한 파일들이 들어 있다.

즉

```text
Download

↓

압축 해제

↓

JDK 연결

↓

startup.bat

↓

Tomcat 실행
```

방식이다.

---

## 34. Tomcat을 어디에 둘까?

개발 도구 전용 폴더를 만들어 관리하면 편하다.

예를 들어

```text
C:\dev
```

폴더를 사용하고 있다면

```text
C:\dev\apache-tomcat-11.0.26
```

처럼 둘 수 있다.

또는

```text
C:\tomcat\apache-tomcat-11.0.26
```

처럼 관리해도 된다.

---

## 35. 너무 깊은 경로는 피하는 것이 편하다

예를 들어

```text
C:\Users\사용자\Downloads\새 폴더\개발\서버\톰캣\apache-tomcat...
```

처럼 지나치게 깊은 위치보다는

```text
C:\dev\apache-tomcat-11.0.26
```

같은 단순한 경로가 관리하기 편하다.

반드시 `C:\dev`여야 하는 것은 아니다.

내가 Tomcat 위치를 쉽게 기억할 수 있으면 된다.

---

## 36. 압축 풀기

다운로드한 ZIP 파일에서

```text
모두 압축 풀기
```

를 실행한다.

최종적으로 다음과 같은 폴더가 존재하도록 만든다.

```text
C:\dev\apache-tomcat-11.0.26
```

이 폴더 안을 열어본다.

---

## 37. Tomcat 폴더 구조

다음과 비슷한 폴더들이 보인다.

```text
apache-tomcat-11.0.26

├─ bin
├─ conf
├─ lib
├─ logs
├─ temp
├─ webapps
└─ work
```

[Tomcat 공식 문서](https://tomcat.apache.org/tomcat-11.0-doc/introduction.html)에서도 `bin`, `conf`, `logs`, `webapps` 등을 주요 디렉터리로 설명한다.

하나씩 역할을 알아보자.

---

## 38. bin

```text
bin
```

에는 Tomcat 실행과 종료 등에 사용하는 Script와 실행 파일이 있다.

대표적으로

```text
startup.bat

shutdown.bat

catalina.bat
```

등이 있다.

Windows에서는 `.bat` 파일을 사용한다.

Linux/macOS 계열에서는 같은 역할의 `.sh` 파일을 볼 수 있다.

---

## 39. startup.bat

Tomcat을 시작할 때 사용할 수 있다.

```text
bin\startup.bat
```

[공식 `RUNNING.txt`](https://tomcat.apache.org/tomcat-11.0-doc/RUNNING.txt) 역시 Windows에서 Tomcat 시작 명령으로

```text
%CATALINA_HOME%\bin\startup.bat
```

을 안내한다.

---

## 40. shutdown.bat

Tomcat을 정상적으로 종료할 때 사용한다.

```text
bin\shutdown.bat
```

[공식 문서](https://tomcat.apache.org/tomcat-11.0-doc/RUNNING.txt)에서도 Windows 종료 방법으로 `shutdown.bat`을 안내한다.

---

## 41. catalina.bat

Tomcat의 실제 시작과 종료 등에 사용되는 중요한 Script다.

예를 들어 다음 방식으로도 시작할 수 있다.

```cmd
catalina.bat start
```

종료:

```cmd
catalina.bat stop
```

[공식 문서](https://tomcat.apache.org/tomcat-11.0-doc/RUNNING.txt)에서도 `catalina.bat start`와 `catalina.bat stop`을 지원한다.

---

## 42. conf

```text
conf
```

는 Tomcat 설정 파일들이 들어 있는 폴더다.

가장 중요한 파일 중 하나가

```text
server.xml
```

이다.

[Tomcat 공식 문서](https://tomcat.apache.org/tomcat-11.0-doc/introduction.html)에서도 `server.xml`을 Container의 주요 설정 파일로 설명한다.

---

## 43. server.xml에서 무엇을 설정할까?

예를 들어 Tomcat이 사용하는 HTTP Port 등이 설정되어 있다.

기본 HTTP Connector가

```text
8080
```

을 사용한다.

나중에 8080 Port 충돌이 발생하면 `server.xml`에서 Port를 변경할 수 있다. [공식 `RUNNING.txt`](https://tomcat.apache.org/tomcat-11.0-doc/RUNNING.txt) 역시 8080이 이미 사용 중일 경우 `conf/server.xml`에서 Port를 변경하도록 안내한다.

---

## 44. logs

```text
logs
```

에는 Tomcat 실행 로그가 저장된다.

서버가 정상적으로 실행되지 않을 때 매우 중요한 폴더다.

예를 들어

```text
Tomcat이 왜 안 켜지지?

Port가 충돌했나?

설정 파일에 문제가 있나?
```

를 확인할 때 로그를 볼 수 있다.

---

## 45. webapps

```text
webapps
```

는 Tomcat이 웹 애플리케이션을 배포해서 사용할 수 있는 기본 위치다.

[Tomcat 공식 문서](https://tomcat.apache.org/tomcat-11.0-doc/introduction.html)도 `webapps`를 Web Application이 위치하는 곳으로 설명한다.

나중에 Servlet/JSP를 배우면 이 폴더의 의미가 훨씬 중요해진다.

---

## 46. work

```text
work
```

는 Tomcat이 실행 과정에서 사용하는 작업용 파일들이 들어갈 수 있다.

특히 JSP 변환 및 컴파일과 관련해서도 사용될 수 있다.

처음에는 직접 수정할 필요가 없다.

---

## 47. temp

```text
temp
```

는 실행 과정에서 필요한 임시 파일을 위한 공간이다.

역시 처음에는 직접 수정할 필요가 없다.

---

## 48. Tomcat 설치 위치를 변수로 부르는 이름

Tomcat 문서를 보면

```text
CATALINA_HOME
```

이라는 단어를 계속 만나게 된다.

처음에는 또 환경변수가 하나 생긴 것 같아 부담스럽다.

하지만 의미는 단순하다.

---

## 49. CATALINA_HOME이란?

CATALINA_HOME은

> **Tomcat이 설치되어 있는 최상위 폴더**

를 의미한다.

예를 들어 Tomcat을

```text
C:\dev\apache-tomcat-11.0.26
```

에 압축 해제했다면

```text
CATALINA_HOME

=

C:\dev\apache-tomcat-11.0.26
```

이다.

[Tomcat 공식 문서](https://tomcat.apache.org/tomcat-11.0-doc/introduction.html)도 CATALINA_HOME을 Tomcat 설치 Root로 정의한다.

---

## 50. JDK의 JAVA_HOME과 비교하면 쉽다

앞선 글에서

```text
JAVA_HOME

→ JDK 설치 위치
```

였다.

이번에는

```text
CATALINA_HOME

→ Tomcat 설치 위치
```

다.

즉

```text
JAVA_HOME
C:\Program Files\Java\jdk-21
```

```text
CATALINA_HOME
C:\dev\apache-tomcat-11.0.26
```

처럼 볼 수 있다.

---

## 51. CATALINA_HOME은 꼭 환경변수로 만들어야 할까?

Tomcat Startup Script에는 CATALINA_HOME이 없으면 실행 Script 위치 등을 기준으로 값을 추정하는 로직이 있다.

하지만 [공식 `RUNNING.txt`](https://tomcat.apache.org/tomcat-11.0-doc/RUNNING.txt)에서는 상황에 따라 자동 판단이 실패할 수 있으므로 **명시적으로 설정하는 것을 권장한다.**

학습 과정에서도

```text
JAVA_HOME

CATALINA_HOME
```

을 구분해서 이해하기 좋기 때문에 이번 글에서는 직접 설정한다.

---

## 52. CATALINA_BASE라는 것도 있다

Tomcat 문서에서는

```text
CATALINA_BASE
```

도 볼 수 있다.

CATALINA_BASE는 특정 Tomcat Instance의 실행 설정 영역을 의미한다.

고급 구성에서는

```text
CATALINA_HOME
→ Tomcat 프로그램 본체

CATALINA_BASE
→ 특정 실행 Instance의 설정
```

을 분리할 수 있다.

[공식 문서](https://tomcat.apache.org/tomcat-11.0-doc/introduction.html)도 별도의 CATALINA_BASE를 사용하면 Upgrade와 유지 관리에 도움이 된다고 설명한다.

---

## 53. 지금 CATALINA_BASE까지 설정할 필요가 있을까?

현재는 Tomcat 하나를 처음 실행하는 단계다.

CATALINA_BASE를 따로 지정하지 않으면 기본적으로 CATALINA_HOME과 같은 위치를 사용한다.

따라서 지금은

```text
CATALINA_HOME
```

만 이해하면 충분하다.

---

## 54. Tomcat과 JDK 연결

Tomcat은 Java로 작성된 애플리케이션이다.

따라서 실행하려면 Java Runtime이 필요하다.

Tomcat 11은 Java 17 이상을 요구하며 JDK를 사용할 수도 있다.

우리는 이미 JDK 21을 설치했다.

---

## 55. 앞에서 만든 JAVA_HOME

현재 환경은 예를 들어 다음과 같다.

```text
JAVA_HOME

C:\Program Files\Java\jdk-21
```

그리고

```text
PATH

%JAVA_HOME%\bin
```

을 설정했다.

Tomcat Startup Script도 `JAVA_HOME` 또는 `JRE_HOME`을 사용해 Java 위치를 찾을 수 있다.

---

## 56. JRE_HOME과 JAVA_HOME

Tomcat 공식 실행 문서에는 두 변수가 나온다.

```text
JRE_HOME

JAVA_HOME
```

역할은 다음과 같다.

```text
JRE_HOME
→ Java Runtime 위치

JAVA_HOME
→ JDK 위치
```

[Tomcat 공식 문서](https://tomcat.apache.org/tomcat-11.0-doc/RUNNING.txt)에 따르면 둘 다 존재하면 `JRE_HOME`이 우선된다.

우리는 앞서 JDK 21을 설치했으므로 현재 학습 환경에서는

```text
JAVA_HOME
```

을 사용한다.

---

## 57. JAVA_HOME 확인

Tomcat을 실행하기 전에 다시 확인한다.

Command Prompt를 새로 연다.

```cmd
echo %JAVA_HOME%
```

예:

```text
C:\Program Files\Java\jdk-21
```

정상적으로 나오면 된다.

---

## 58. Java 버전 확인

```cmd
java -version
```

Java 21 계열인지 확인한다.

다음도 확인한다.

```cmd
javac -version
```

JDK 21이 정상적으로 설정돼 있어야 한다.

---

## 59. CATALINA_HOME 환경변수 만들기

Windows 검색창에

```text
환경 변수
```

를 검색한다.

```text
시스템 환경 변수 편집
```

을 선택한다.

그다음

```text
환경 변수
```

버튼을 누른다.

---

## 60. 시스템 변수에서 새로 만들기

개인 학습 PC에서 시스템 전체 Tomcat 위치로 사용한다는 가정으로 시스템 변수 영역에서

```text
새로 만들기
```

를 누른다.

변수 이름:

```text
CATALINA_HOME
```

변수 값:

```text
C:\dev\apache-tomcat-11.0.26
```

자신이 실제 압축을 푼 경로를 넣는다.

---

## 61. CATALINA_HOME에 bin까지 넣지 않는다

잘못된 예:

```text
C:\dev\apache-tomcat-11.0.26\bin
```

정확한 예:

```text
C:\dev\apache-tomcat-11.0.26
```

JAVA_HOME과 비슷하다.

```text
JAVA_HOME
→ JDK Root

CATALINA_HOME
→ Tomcat Root
```

이다.

---

## 62. PATH에 Tomcat을 넣어야 할까?

Java처럼 반드시 PATH에 Tomcat `bin`을 추가해야 실행되는 것은 아니다.

이번에는 직접

```text
%CATALINA_HOME%\bin
```

으로 이동해서 Script를 실행할 수 있다.

초보 단계에서는 필요하지 않은 PATH를 계속 늘리기보다 구조를 먼저 이해하는 것이 좋다.

---

## 63. 환경변수 저장

설정을 저장한 뒤 기존 Command Prompt를 닫는다.

새 Command Prompt를 연다.

환경변수 변경 전부터 열려 있던 Terminal은 이전 값을 가지고 있을 수 있기 때문이다.

---

## 64. CATALINA_HOME 확인

새 Command Prompt에서

```cmd
echo %CATALINA_HOME%
```

을 입력한다.

결과:

```text
C:\dev\apache-tomcat-11.0.26
```

처럼 실제 Tomcat 위치가 나오면 된다.

---

## 65. Tomcat bin으로 이동

다음 명령어를 사용한다.

```cmd
cd %CATALINA_HOME%\bin
```

현재 경로를 확인한다.

```cmd
cd
```

다음과 비슷해야 한다.

```text
C:\dev\apache-tomcat-11.0.26\bin
```

---

## 66. bin 파일 확인

```cmd
dir
```

을 입력한다.

여러 파일 중 다음이 보이는지 확인한다.

```text
startup.bat

shutdown.bat

catalina.bat
```

이 파일들이 Tomcat 시작과 종료에 사용된다.

---

## 67. Tomcat 실행하기

이제 실행한다.

```cmd
startup.bat
```

또는 전체 경로로

```cmd
%CATALINA_HOME%\bin\startup.bat
```

을 사용할 수 있다.

[공식 Tomcat 실행 문서](https://tomcat.apache.org/tomcat-11.0-doc/RUNNING.txt)도 Windows에서 이 명령을 사용한다.

---

## 68. 새 창이 나타날 수 있다

환경에 따라 Tomcat 실행과 관련된 Command Prompt 창이 나타날 수 있다.

콘솔에 여러 로그가 출력된다.

처음에는 글자가 너무 많이 나와 오류처럼 보일 수 있다.

하지만 서버 프로그램은 실행 과정에서 상태를 로그로 출력한다.

---

## 69. 무엇을 보면 될까?

우선 심각한 Exception이나 종료 메시지가 없는지 확인한다.

그리고 Tomcat이 서버를 시작했다는 내용이 나오는지 본다.

정상적으로 실행되었다면 이제 브라우저에서 확인할 수 있다.

---

## 70. 브라우저 열기

Chrome 또는 Edge를 연다.

주소창에 다음을 입력한다.

```text
http://localhost:8080
```

[공식 Tomcat 문서](https://tomcat.apache.org/tomcat-11.0-doc/RUNNING.txt) 역시 기본 애플리케이션 확인 주소로 이 URL을 안내한다.

---

## 71. Tomcat 화면이 나온다면

Tomcat 기본 화면이 정상적으로 표시된다면 서버가 실행되고 있다는 의미다.

즉

```text
Tomcat 실행

↓

8080 Port에서 대기

↓

Browser가 localhost:8080 요청

↓

Tomcat이 Request 수신

↓

Response

↓

Tomcat 기본 페이지 표시
```

과정이 성공한 것이다.

---

## 72. 이것이 왜 중요한 확인일까?

단순히 `startup.bat`이 실행됐다고 끝내면 안 된다.

브라우저에서 실제로

```text
http://localhost:8080
```

에 접속해야

```text
Tomcat 프로세스 실행

+

HTTP Connector 실행

+

8080 Port 접근 가능

+

기본 Web Application 응답
```

까지 확인할 수 있다.

---

## 73. localhost의 전체 의미 다시 보기

```text
http://localhost:8080
```

을 분리해보자.

```text
http
→ HTTP 통신

localhost
→ 현재 내 컴퓨터

8080
→ Tomcat HTTP Port
```

즉

> 현재 내 컴퓨터에서 8080번 Port로 실행되고 있는 HTTP 서버에 접속한다.

는 뜻이다.

---

## 74. 인터넷 연결이 없어도 localhost가 될까?

Tomcat과 필요한 파일이 이미 내 컴퓨터에 있고 로컬 환경이 정상적이라면 localhost 접근 자체는 인터넷상의 외부 서버에 접속하는 것이 아니다.

```text
Browser

↓

내 PC

↓

Tomcat
```

안에서 통신하기 때문이다.

---

## 75. 다른 사람이 localhost로 내 Tomcat에 접속할 수 있을까?

다른 사람 컴퓨터에서

```text
localhost
```

는 **그 사람의 컴퓨터 자신**을 의미한다.

즉 내 Tomcat을 가리키지 않는다.

```text
내 PC의 localhost
→ 내 PC

친구 PC의 localhost
→ 친구 PC
```

다.

---

## 76. 서버를 실행했으면 종료도 해야 한다

연습이 끝났다면 Tomcat을 정상적으로 종료해보자.

새 Command Prompt를 열거나 현재 터미널에서 다음을 실행한다.

```cmd
%CATALINA_HOME%\bin\shutdown.bat
```

[Tomcat 공식 문서](https://tomcat.apache.org/tomcat-11.0-doc/RUNNING.txt)에서 안내하는 Windows 종료 방법이다.

---

## 77. 종료 후 다시 localhost 접속

Tomcat을 종료한 뒤 브라우저를 새로고침한다.

서버가 완전히 종료됐다면

```text
http://localhost:8080
```

에 더 이상 정상 접속되지 않아야 한다.

이렇게 직접

```text
Start

↓

접속 성공

↓

Stop

↓

접속 실패
```

를 확인하면 서버가 켜지고 꺼진다는 개념을 더 쉽게 이해할 수 있다.

---

## 78. 서버 프로그램은 계속 실행되어 있어야 한다

HTML 파일을 단순히 브라우저로 열었던 것과 Tomcat 서버는 다르다.

Tomcat은 Request를 받기 위해 **실행 상태를 유지**해야 한다.

```text
Tomcat 실행 중

→ Request 받을 수 있음
```

```text
Tomcat 종료

→ Request 받을 서버 없음
```

이다.

---

## 79. 8080이 이미 사용 중이라는 오류

Tomcat에서 가장 흔하게 만날 수 있는 문제 중 하나다.

[Tomcat 공식 `RUNNING.txt`](https://tomcat.apache.org/tomcat-11.0-doc/RUNNING.txt)에서도 Standalone 설치에서 가장 흔한 문제 중 하나로 **8080 Port가 이미 다른 Process에서 사용 중인 상황**을 설명한다.

---

## 80. Port 충돌이란?

예를 들어 이미 다른 프로그램이

```text
8080
```

을 사용하고 있다고 해보자.

그 상태에서 Tomcat도

```text
8080
```

을 사용하려고 한다.

```text
프로그램 A
→ 8080 사용 중

Tomcat
→ 나도 8080 사용할래
```

하나의 Port에 두 프로그램이 동시에 같은 방식으로 Listen하려 하면 충돌할 수 있다.

---

## 81. Windows에서 8080 사용 여부 확인

Command Prompt에서 다음과 같은 방법으로 확인할 수 있다.

```cmd
netstat -ano | findstr :8080
```

결과가 나온다면 8080을 사용하는 Process가 있을 수 있다.

마지막에 PID가 표시된다.

---

## 82. PID란?

PID는

**Process ID**

다.

현재 실행 중인 Process를 구분하는 번호다.

예를 들어

```text
TCP ... :8080 ... LISTENING 12345
```

처럼 나온다면

```text
12345
```

가 PID다.

---

## 83. 어떤 프로그램인지 확인

다음과 같이 확인할 수 있다.

```cmd
tasklist | findstr 12345
```

실제 PID에 맞게 바꾼다.

이 방법으로 어떤 Process가 8080을 사용하는지 확인할 수 있다.

모르는 Process를 무작정 종료하지 않는다.

---

## 84. Tomcat Port 변경하기

8080을 사용할 수 없다면 Tomcat의

```text
conf\server.xml
```

을 연다.

[Tomcat 공식 문서](https://tomcat.apache.org/tomcat-11.0-doc/RUNNING.txt) 역시 Port 변경 시 `server.xml`을 수정하도록 안내한다.

파일 안에서

```text
8080
```

을 검색한다.

---

## 85. Connector 설정

대략 다음과 같은 HTTP Connector 설정을 찾을 수 있다.

```xml
<Connector port="8080" ... />
```

실제 옵션은 버전에 따라 더 많이 들어 있다.

Port를 예를 들어

```text
8081
```

로 변경할 수 있다.

---

## 86. 변경 후 Tomcat 재시작

Tomcat 설정 파일은 시작 시 읽히므로 설정을 변경했다면 Tomcat을 재시작한다. [공식 문서](https://tomcat.apache.org/tomcat-11.0-doc/introduction.html)도 구성 파일 변경 후 Container 재시작이 필요하다고 설명한다.

그다음 브라우저에서

```text
http://localhost:8081
```

로 접속한다.

---

## 87. 왜 주소도 8081로 바뀔까?

Tomcat이 이제 8080이 아니라

```text
8081
```

을 Listen하고 있기 때문이다.

따라서

```text
Tomcat Port
8081
```

이면

```text
http://localhost:8081
```

로 요청해야 한다.

---

## 88. `JAVA_HOME is not defined correctly` 오류

Tomcat Startup Script에서 Java 위치를 찾지 못하면 JAVA_HOME 관련 오류를 볼 수 있다.

이때 다음 순서로 확인한다.

```text
JDK 설치?

↓

JAVA_HOME 설정?

↓

JAVA_HOME에 bin을 넣었나?

↓

실제 JDK 폴더가 존재하나?

↓

새 Terminal을 열었나?
```

---

## 89. JAVA_HOME 올바른 예

```text
JAVA_HOME

C:\Program Files\Java\jdk-21
```

이다.

다음은 잘못된 형태다.

```text
C:\Program Files\Java\jdk-21\bin
```

JAVA_HOME은 JDK Root다.

---

## 90. java.exe 확인

다음 위치에 실제 파일이 있어야 한다.

```text
%JAVA_HOME%\bin\java.exe
```

Command Prompt에서

```cmd
where java
```

도 확인한다.

---

## 91. Tomcat 버전 확인

Tomcat `bin` 폴더에는 버전 정보를 확인할 수 있는 Script도 있다.

Windows에서 다음을 사용할 수 있다.

```cmd
version.bat
```

또는

```cmd
catalina.bat version
```

환경에 따라 Server Version, Java Home 등의 정보가 나타난다.

Tomcat이 어떤 Java를 사용하고 있는지 확인할 때 도움이 된다.

---

## 92. CATALINA_HOME 오류가 난다면

먼저

```cmd
echo %CATALINA_HOME%
```

을 확인한다.

실제 Tomcat Root인지 확인한다.

예:

```text
C:\dev\apache-tomcat-11.0.26
```

그리고 실제로 다음 파일이 존재해야 한다.

```text
%CATALINA_HOME%\bin\startup.bat
```

---

## 93. 압축을 한 단계 잘못 풀 수도 있다

예를 들어 이런 구조가 생길 수 있다.

```text
C:\dev\apache-tomcat-11.0.26
└─ apache-tomcat-11.0.26
   ├─ bin
   ├─ conf
   └─ ...
```

그런데 CATALINA_HOME을 바깥쪽 폴더에 지정하면

```text
%CATALINA_HOME%\bin
```

이 존재하지 않는다.

실제

```text
bin

conf

webapps
```

가 바로 들어 있는 Tomcat Root를 지정한다.

---

## 94. 올바른 구조

```text
C:\dev\apache-tomcat-11.0.26

├─ bin
├─ conf
├─ lib
├─ logs
├─ temp
├─ webapps
└─ work
```

이 경우

```text
CATALINA_HOME

C:\dev\apache-tomcat-11.0.26
```

이다.

---

## 95. Tomcat 창이 실행되자마자 닫힌다면

`startup.bat`을 Explorer에서 더블 클릭하면 오류가 발생한 뒤 창이 너무 빨리 닫혀 내용을 읽지 못할 수 있다.

이럴 때는 Command Prompt를 직접 열고

```cmd
cd %CATALINA_HOME%\bin
```

으로 이동한다.

그리고

```cmd
catalina.bat run
```

을 실행해보는 방법이 있다.

---

## 96. `catalina.bat run`의 장점

Tomcat을 현재 Console에서 직접 실행하기 때문에 로그를 계속 확인할 수 있다.

오류가 발생해도 창이 바로 닫히지 않아 원인을 읽기 쉽다.

초보자가 Tomcat Startup 문제를 확인할 때 유용하다.

---

## 97. startup과 run 차이

아주 단순하게 보면

```text
startup.bat

→ Tomcat 시작 명령을 별도로 실행
```

```text
catalina.bat run

→ 현재 Console에서 Tomcat 실행
→ 로그를 바로 보기 편함
```

정도로 이해하면 된다.

개발 중 오류 확인에는 `run` 방식이 편할 수 있다.

---

## 98. `Address already in use` 같은 메시지

이런 메시지가 보인다면 특정 Port가 이미 사용 중일 가능성이 높다.

```text
8080 Port 확인

↓

현재 사용 Process 확인

↓

Process를 종료할지

또는

Tomcat Port를 바꿀지 결정
```

순서로 접근한다.

---

## 99. 방화벽 메시지가 나타날 수 있다

처음 Tomcat이나 Java 프로그램이 네트워크 Listen을 시작하면 Windows Defender Firewall 관련 확인이 나타날 수 있다.

무조건 모든 Network 접근을 허용하기보다

```text
현재 실행 중인 프로그램이 맞는지

어떤 Network 범위에 허용하는지
```

를 확인하고 선택한다.

단순한 로컬 학습 환경에서는 불필요하게 외부 Network에 서버를 노출하지 않는 것이 좋다.

---

## 100. localhost에서만 테스트하는 이유

현재 목표는 다른 사용자에게 서비스를 공개하는 것이 아니다.

내 컴퓨터에서 Java Web Server 환경을 확인하는 것이다.

```text
개발 PC

↓

Tomcat

↓

localhost

↓

Browser
```

구조만 확인하면 된다.

---

## 101. localhost가 열린다고 인터넷에 배포된 것은 아니다

매우 중요하다.

```text
http://localhost:8080
```

에서 서비스가 보인다고

```text
인터넷 사용자도 접속 가능
```

하다는 뜻은 아니다.

현재는 로컬 개발환경에서 서버가 실행되고 있다는 뜻이다.

---

## 102. 로컬 실행과 배포

구분하면 다음과 같다.

```text
Local

내 PC에서 서버 실행

→ localhost
```

```text
Deployment

외부 서버에 애플리케이션 배포

→ 실제 Domain/IP를 통해 사용자 접근
```

Tomcat 설치는 현재 Local 개발환경 구축이다.

---

## 103. Tomcat 기본 페이지가 의미하는 것

Tomcat 기본 페이지가 보인다고 해서 내가 만든 Java Web Application이 완성된 것은 아니다.

확인된 것은

```text
Tomcat 설치 성공

↓

Java 연결 성공

↓

Server 시작 성공

↓

HTTP Connector 동작

↓

8080 접근 성공
```

정도다.

---

## 104. 이제 Servlet을 바로 만들까?

이번 글에서는 만들지 않는다.

이유는 현재 Dev Setup의 목적이

```text
Tomcat 환경 구축
```

이기 때문이다.

Servlet/JSP 프로젝트까지 만들기 시작하면

```text
Maven

Dependency

Servlet API

WAR

WEB-INF

web.xml

Annotation

Context Path
```

등의 새로운 개념이 한꺼번에 등장한다.

---

## 105. 앞으로 배우게 될 구조

Servlet을 실제로 배우면 다음과 같은 구조가 등장할 수 있다.

```text
Browser

↓

http://localhost:8080/myapp/hello

↓

Tomcat

↓

Context
myapp

↓

Servlet Mapping
/hello

↓

HelloServlet

↓

Response

↓

Browser
```

하지만 이 부분은 실제 Servlet/JSP 학습 단계에서 자세히 다룬다.

---

## 106. Context Path란?

지금은 개념만 미리 보자.

예를 들어 주소가

```text
http://localhost:8080/shop/login
```

이라고 해보자.

대략적으로

```text
localhost
→ 내 PC

8080
→ Tomcat Port

shop
→ Web Application Context

login
→ Application 안의 요청 경로
```

처럼 구성될 수 있다.

아직 외울 필요는 없다.

---

## 107. WAR란?

Tomcat을 검색하다 보면 `.war` 파일도 자주 보게 된다.

WAR는

**Web Application Archive**

다.

Java Web Application을 배포하기 위한 Package 형태 중 하나다.

예:

```text
shopping.war
```

를 Tomcat에 배포하면 Web Application으로 실행할 수 있다.

이 역시 다음 Servlet/JSP 학습에서 자세히 보는 것이 좋다.

---

## 108. webapps와 WAR

Tomcat 기본 Deployment 방식에서는

```text
webapps
```

Directory가 중요하다.

예를 들어 개념적으로

```text
webapps

├─ ROOT
├─ docs
├─ examples
└─ myapp
```

와 같은 형태가 될 수 있다.

[Tomcat 공식 문서](https://tomcat.apache.org/tomcat-11.0-doc/deployer-howto.html)도 `webapps`를 자동으로 Web Application을 Load할 수 있는 영역으로 설명한다.

---

## 109. ROOT란?

Tomcat의

```text
webapps\ROOT
```

은 기본 Root Web Application과 연결된다.

그래서

```text
http://localhost:8080/
```

처럼 별도 Context Path 없이 접근했을 때 기본 페이지가 나타날 수 있다.

나중에 Web Application 배포를 배우면 더 자세히 이해할 수 있다.

---

## 110. Manager와 Host Manager가 보일 수 있다

Tomcat 기본 화면에서는

```text
Manager App

Host Manager
```

등의 메뉴를 볼 수 있다.

처음에는 사용할 필요가 없다.

또한 관리 기능은 보안과 사용자 권한 설정을 이해하고 사용해야 한다.

[Tomcat 공식 보안 문서](https://tomcat.apache.org/tomcat-11.0-doc/security-howto.html)에서도 Manager와 Host Manager 같은 관리 Application을 별도 보안 대상으로 다룬다.

---

## 111. 무작정 관리자 계정을 만드는 것은 미룬다

검색하다 보면

```text
tomcat-users.xml
```

에 Manager 계정을 추가하는 예제를 많이 볼 수 있다.

이번 글에서는 하지 않는다.

현재 목표는

```text
서버 설치

실행

localhost 확인

종료
```

까지다.

관리 Application은 실제 필요할 때 권한 구조와 함께 공부한다.

---

## 112. Tomcat 설정 파일을 무작정 수정하지 않는다

`conf` 안에는 중요한 설정 파일이 많다.

```text
server.xml

web.xml

context.xml

tomcat-users.xml
```

등이 있다.

인터넷 글을 보고 의미를 모르는 설정을 모두 복사하지 않는다.

현재 필요한 경우에만 최소한으로 수정한다.

---

## 113. 특히 server.xml은 백업 후 수정하는 습관

Port 등 중요한 설정을 바꾸기 전에 기존 값을 기억해둔다.

Git으로 Tomcat 설치 폴더 전체를 관리할 필요는 없지만 최소한

```text
원래 8080이었다

내가 8081로 바꿨다
```

정도는 기록해두는 것이 좋다.

---

## 114. Tomcat 설치 폴더를 프로젝트 Git에 넣을까?

보통 애플리케이션 프로젝트 Repository 안에 Tomcat 전체 Binary를 그대로 넣지는 않는다.

예를 들어

```text
my-java-project

└─ apache-tomcat-11...
```

처럼 Tomcat 전체를 Git에 올리는 구조는 일반적인 프로젝트 관리 방식과 맞지 않을 수 있다.

Tomcat은 개발 실행 환경이고 애플리케이션 소스와 별도로 관리하는 것이 자연스럽다.

---

## 115. IntelliJ와 Tomcat은 어떻게 연결될까?

이후 Servlet/JSP 개발을 배우게 되면 IntelliJ와 Tomcat을 연동해서 사용할 수도 있다.

개념적으로

```text
IntelliJ

↓

Java Web Project

↓

Tomcat Server

↓

Browser
```

처럼 사용할 수 있다.

하지만 정확한 설정 방법은 IntelliJ 버전과 기능, 프로젝트 Build System, 사용하는 Tomcat 버전에 따라 달라질 수 있다.

따라서 이번 사전 환경 구축 글에서는 별도 IDE Server 연동까지 진행하지 않는다.

---

## 116. IntelliJ와 Tomcat 연결을 지금 하지 않는 이유

현재 목표는 Tomcat 자체를 이해하는 것이다.

먼저

```text
Tomcat 폴더가 어디 있는가?

↓

어떻게 실행하는가?

↓

어떤 Java를 사용하는가?

↓

어떤 Port를 사용하는가?

↓

localhost에서 확인하는가?

↓

어떻게 종료하는가?
```

를 이해한다.

그 이후 IDE 연동을 배우면 IntelliJ가 대신 처리하는 부분을 이해하기 쉬워진다.

---

## 117. Tomcat이 Spring Boot에서도 필요할까?

앞으로 Spring Boot를 배우면 또 헷갈릴 수 있는 부분이다.

Spring Boot Web 프로젝트는 일반적으로 Embedded Servlet Container를 포함해 실행할 수 있다.

그래서 전통적인 Servlet/JSP 프로젝트처럼 외부 Tomcat을 따로 설치해서 배포하지 않는 방식도 매우 흔하다.

즉

```text
Spring Boot 사용

=

반드시 외부 Tomcat 설치
```

는 아니다.

---

## 118. Embedded Tomcat이란?

아직 자세히 배울 필요는 없지만 개념만 보자.

전통적인 방식:

```text
Tomcat 설치

↓

Application 배포

↓

Tomcat이 Application 실행
```

Spring Boot에서 흔한 방식:

```text
Application

+

Embedded Tomcat

↓

Java Application처럼 실행
```

이다.

따라서 나중에 Spring Boot를 배우면

> Tomcat 설치했는데 왜 프로젝트 안에도 Tomcat이 있지?

라는 의문이 생길 수 있다.

둘은 사용 방식이 다르다.

---

## 119. 지금 Tomcat을 직접 설치하는 이유

Embedded Server를 사용할 수도 있지만, Tomcat을 직접 설치하고 실행해보면

```text
Server

Port

localhost

Deploy

Container

Web Application
```

개념을 이해하는 데 도움이 된다.

특히 Servlet/JSP를 직접 배우는 과정에서는 Tomcat 구조를 직접 보는 것이 학습에 유용하다.

---

## 120. Tomcat을 실행한 채 컴퓨터를 종료해도 될까?

개발 과정에서는 가능하면 서버를 사용한 뒤 정상적으로 종료하는 습관을 들이는 것이 좋다.

```cmd
shutdown.bat
```

으로 종료한다.

특히 같은 Port를 다른 개발 서버에서 사용하려 할 때 Tomcat이 계속 실행되고 있으면 Port 충돌이 발생할 수 있다.

---

## 121. Tomcat이 계속 실행 중인지 확인

브라우저에서

```text
http://localhost:8080
```

에 접속하는 것도 간단한 확인 방법이다.

또 Windows에서 Java Process 또는 Port를 확인할 수 있다.

```cmd
netstat -ano | findstr :8080
```

---

## 122. Tomcat을 두 번 실행하면?

이미 같은 Tomcat Instance가 8080에서 실행 중인데 또 실행하려고 하면 Port 충돌이나 Server Startup 오류가 발생할 수 있다.

따라서

```text
Tomcat 실행

↓

사용

↓

종료

↓

필요하면 다시 실행
```

흐름을 익힌다.

---

## 123. startup.bat을 눌렀는데 localhost가 안 열린다

다음 순서대로 확인한다.

```text
1. Console에 오류가 있는가?

2. JAVA_HOME이 올바른가?

3. java -version이 정상인가?

4. Tomcat 11이 Java 17+를 사용하고 있는가?

5. 8080 Port가 사용 중인가?

6. Tomcat Process가 실제로 살아 있는가?

7. logs에 오류가 있는가?
```

무작정 다시 설치하기 전에 오류를 확인한다.

---

## 124. Logs 확인

Tomcat Root 아래의

```text
logs
```

폴더를 확인한다.

서버 Startup과 관련된 로그를 찾아 오류 내용을 읽는다.

오류 메시지는 문제를 해결하는 가장 중요한 단서다.

---

## 125. 오류 메시지를 검색할 때

오류 문장 전체를 길게 검색하기보다 핵심 Exception이나 메시지를 확인한다.

그리고 반드시

```text
Tomcat 11

Java 21

Windows
```

처럼 자신의 환경을 함께 고려한다.

[Tomcat 공식 문서](https://tomcat.apache.org/tomcat-11.0-doc/introduction.html)도 주요 버전별로 동작과 해결책이 다를 수 있으므로 검색한 문서가 현재 Tomcat 버전에 해당하는지 확인하라고 안내한다.

---

## 126. Tomcat 9 해결법을 11에 그대로 적용하면 안 될 수도 있다

Tomcat은 Major Version에 따라 Servlet 규격과 설정이 달라진다.

특히

```text
javax.servlet

↓

jakarta.servlet
```

변화가 대표적이다.

따라서 검색할 때

```text
Tomcat error
```

만 검색하기보다

```text
Tomcat 11 error message
```

처럼 버전을 포함하는 것이 좋다.

---

## 127. 부트캠프에서 Tomcat 9를 쓴다고 하면?

그때는 현재 글의

```text
Tomcat 11 다운로드
```

부분을 그대로 사용하면 안 된다.

수업에서 지정한 Tomcat 9 버전을 설치하고

```text
javax.servlet
```

환경을 기준으로 학습 내용을 다시 추가한다.

Tomcat 9는 [현재 공식적으로도 지원되는 버전](https://tomcat.apache.org/whichversion.html)이며 Servlet 4.0 / Java EE 8 계열을 구현한다.

---

## 128. 부트캠프에서 Tomcat 10.1을 사용한다면?

Tomcat 10.1은 Servlet 6.0과 Jakarta EE 10 관련 규격을 구현하며 Java 11 이상을 요구한다. JDK 21에서도 실행 가능하다.

따라서

```text
Tomcat 10.1

+

JDK 21
```

조합 역시 가능하다.

그 경우 수업에 맞춰 10.1 버전으로 설치 실습을 다시 기록하면 된다.

---

## 129. 정확한 버전을 수업 후 다시 기록하는 것이 왜 좋은가?

개발환경 글에서 중요한 것은 단순히

```text
설치됨
```

을 기록하는 것이 아니다.

```text
왜 이 버전을 사용했는가?

어떤 Java 버전과 연결했는가?

어떤 Servlet 규격을 사용하는가?

프로젝트에서는 어떻게 연결되는가?
```

까지 기록해야 나중에 다시 환경을 구축할 수 있다.

그래서 이번 글은 **기초 사전 구축 기록**이고, 수업 후 실제 교육 환경을 추가하는 것이 오히려 더 좋은 기록이 된다.

---

## 130. 현재 Tomcat 환경 전체 구조

현재 컴퓨터는 대략 다음 상태다.

```text
JDK 21

C:\Program Files\Java\jdk-21

        ↓

JAVA_HOME


Tomcat 11

C:\dev\apache-tomcat-11.0.26

        ↓

CATALINA_HOME


startup.bat

        ↓

Java 21로 Tomcat 실행

        ↓

HTTP Port 8080

        ↓

http://localhost:8080
```

---

## 131. Tomcat 실행 과정을 조금 더 자세히

```text
startup.bat 실행

↓

catalina.bat 실행

↓

JAVA_HOME / JRE_HOME 확인

↓

Java Runtime 선택

↓

Tomcat Bootstrap

↓

server.xml 읽기

↓

HTTP Connector 시작

↓

8080 Port Listen

↓

Web Applications Load

↓

Tomcat Startup 완료
```

Tomcat의 Startup Script는 환경변수를 이용해 Java 실행 명령을 구성한다.

---

## 132. Browser 접속 과정

```text
Chrome

↓

GET /

↓

localhost:8080

↓

Tomcat HTTP Connector

↓

ROOT Web Application

↓

HTML Response

↓

Chrome 화면 표시
```

지금은 이 흐름 정도를 이해하면 충분하다.

---

## 133. shutdown 과정

```text
shutdown.bat

↓

Tomcat Stop 요청

↓

Web Application 종료

↓

Connector 종료

↓

8080 Port 해제

↓

Tomcat Process 종료
```

이후 8080을 다른 프로그램이 다시 사용할 수 있다.

---

## 134. Tomcat에서 꼭 기억할 폴더

지금 단계에서 모든 폴더를 외울 필요는 없다.

다섯 개 정도만 기억한다.

```text
bin
→ 실행 / 종료 Script

conf
→ 설정

logs
→ 로그

webapps
→ Web Application

lib
→ Tomcat 공용 Library
```

---

## 135. 꼭 기억할 파일

```text
startup.bat
→ 시작
```

```text
shutdown.bat
→ 종료
```

```text
catalina.bat
→ Tomcat 실행 Script 핵심
```

```text
server.xml
→ Server 주요 설정
```

---

## 136. 꼭 기억할 환경변수

```text
JAVA_HOME
→ JDK 위치
```

```text
CATALINA_HOME
→ Tomcat 위치
```

현재는 이 두 개만 정확하게 구분하면 된다.

---

## 137. 꼭 기억할 주소

```text
http://localhost:8080
```

분해하면

```text
http

localhost

8080
```

이다.

각각

```text
HTTP 통신

내 컴퓨터

Tomcat 기본 Port
```

를 뜻한다.

---

## 138. 꼭 기억할 명령

Tomcat 시작:

```cmd
%CATALINA_HOME%\bin\startup.bat
```

Tomcat 종료:

```cmd
%CATALINA_HOME%\bin\shutdown.bat
```

현재 Console에서 실행:

```cmd
%CATALINA_HOME%\bin\catalina.bat run
```

Tomcat 버전 확인:

```cmd
%CATALINA_HOME%\bin\version.bat
```

---

## 139. 환경변수 확인 명령

JAVA_HOME:

```cmd
echo %JAVA_HOME%
```

CATALINA_HOME:

```cmd
echo %CATALINA_HOME%
```

Java 버전:

```cmd
java -version
```

Compiler:

```cmd
javac -version
```

---

## 140. Port 확인 명령

```cmd
netstat -ano | findstr :8080
```

Process 확인:

```cmd
tasklist | findstr PID번호
```

문제가 생겼을 때 유용하다.

---

## 141. 이번 글에서 하지 않은 것

현재 단계에서는 다음 작업은 일부러 하지 않았다.

```text
Servlet 프로젝트 생성

JSP 작성

Maven 연결

Servlet Dependency 추가

WAR 생성

WAR 배포

web.xml 설정

Annotation Mapping

IntelliJ Tomcat Run Configuration

Tomcat Manager 설정

Database 연결

Spring 연결

Spring Boot Embedded Tomcat
```

이 항목들은 실제 Java Web 학습에서 하나씩 연결하는 것이 좋다.

---

## 142. 부트캠프에서 배우면 추가할 내용

실제 수업에서 Tomcat을 배우게 되면 이 글에 다음 부분을 추가할 수 있다.

```text
[추가 예정]

□ 수업에서 사용하는 Tomcat 버전과 이유

□ javax / jakarta 차이

□ Servlet Lifecycle

□ HttpServlet

□ doGet / doPost

□ Request / Response

□ Servlet Mapping

□ @WebServlet

□ web.xml

□ JSP

□ WEB-INF

□ Context Path

□ WAR

□ IntelliJ 연동

□ Maven / Gradle Dependency

□ Application 배포 과정

□ 실제 오류와 해결 과정
```

그러면 단순 설치 글에서 **Java Web 실행환경 전체를 이해하는 글**로 발전시킬 수 있다.

---

## 143. 최종 점검 체크리스트

아래 항목을 하나씩 확인한다.

```text
□ Client와 Server의 차이를 대략 이해했다

□ Request와 Response의 의미를 안다

□ HTTP가 무엇인지 대략 안다

□ localhost가 내 컴퓨터를 의미한다는 것을 안다

□ Port가 무엇인지 대략 안다

□ 8080의 의미를 안다

□ Web Server 개념을 대략 이해했다

□ Servlet이 무엇인지 대략 이해했다

□ Servlet Container가 무엇인지 이해했다

□ Tomcat이 Servlet/JSP Container라는 것을 안다

□ Apache HTTP Server와 Tomcat이 다른 프로그램임을 안다

□ Tomcat이 Jakarta EE 전체 Application Server는 아니라는 것을 안다

□ Tomcat 버전마다 Servlet 규격이 다르다는 것을 안다

□ Tomcat 9의 javax.servlet 계열을 알고 있다

□ Tomcat 10.1/11의 jakarta.servlet 계열을 알고 있다

□ 부트캠프에서 버전을 지정하면 수업 버전을 우선해야 한다는 것을 안다

□ JDK 21과 Tomcat 11이 호환된다는 것을 확인했다

□ Tomcat Windows ZIP을 다운로드했다

□ Tomcat 압축을 풀었다

□ Tomcat Root 폴더를 확인했다

□ bin 폴더를 확인했다

□ conf 폴더를 확인했다

□ webapps 폴더를 확인했다

□ logs 폴더를 확인했다

□ JAVA_HOME을 확인했다

□ java -version에서 Java 21을 확인했다

□ javac -version에서 21을 확인했다

□ CATALINA_HOME을 설정했다

□ CATALINA_HOME에 bin을 포함하지 않았다

□ echo %CATALINA_HOME%으로 확인했다

□ startup.bat을 실행했다

□ Tomcat이 정상 시작되는 것을 확인했다

□ http://localhost:8080에 접속했다

□ Tomcat 기본 화면을 확인했다

□ localhost와 8080의 의미를 이해했다

□ shutdown.bat으로 Tomcat을 종료했다

□ 종료 후 localhost 접속이 되지 않는 것을 확인했다

□ 8080 Port 충돌을 확인하는 방법을 안다

□ server.xml에서 Port를 설정한다는 것을 안다

□ 문제가 생기면 logs와 Console을 먼저 확인한다는 것을 안다
```

여기까지 정상이라면 이번 단계의 Tomcat 개발환경 구축은 완료다.

---

## 정리

이번 글에서는 Java 웹 애플리케이션을 실행하기 위한 기반으로 Apache Tomcat을 직접 설치하고 실행해봤다.

가장 먼저 웹의 기본 구조를 확인했다.

```text
Client

↓

HTTP Request

↓

Server

↓

HTTP Response

↓

Client
```

Java 웹 환경에서는 Tomcat이 중간에서 중요한 역할을 한다.

```text
Browser

↓

HTTP Request

↓

Tomcat

↓

Servlet / Java Web Application

↓

Tomcat

↓

HTTP Response

↓

Browser
```

Tomcat의 핵심 역할은 **Java Servlet/JSP Web Application을 실행할 수 있는 Container 환경을 제공하는 것**이다.

이번 환경에서는

```text
JDK 21

+

Tomcat 11
```

조합을 사용했다.

2026년 9월 현재 Tomcat 11.0.x는 Java 17 이상을 요구하므로 JDK 21에서 실행할 수 있다.

하지만 중요한 것은 Tomcat의 숫자가 무조건 높은 것이 아니다.

```text
Tomcat 9
→ Servlet 4.0
→ Java EE 8
→ javax.servlet
```

```text
Tomcat 10.1
→ Servlet 6.0
→ Jakarta EE 10
→ jakarta.servlet
```

```text
Tomcat 11
→ Servlet 6.1
→ Jakarta EE 11
→ jakarta.servlet
```

처럼 프로젝트가 사용하는 규격에 맞춰 선택해야 한다.

이번에 구성한 환경은 다음과 같다.

```text
JDK 21

↓

JAVA_HOME

↓

Tomcat 11

↓

CATALINA_HOME

↓

startup.bat

↓

Tomcat 실행

↓

HTTP 8080

↓

http://localhost:8080

↓

Browser에서 Tomcat 확인
```

실제 명령으로 보면 더욱 단순하다.

Java 확인:

```cmd
java -version
```

```cmd
javac -version
```

Tomcat 위치 확인:

```cmd
echo %CATALINA_HOME%
```

Tomcat 시작:

```cmd
%CATALINA_HOME%\bin\startup.bat
```

브라우저:

```text
http://localhost:8080
```

Tomcat 종료:

```cmd
%CATALINA_HOME%\bin\shutdown.bat
```

여기까지 성공했다면 **Java 웹 애플리케이션을 실행할 서버 환경의 가장 기본적인 준비는 끝난 것**이다.

다만 이번 글은 Servlet/JSP 수업을 실제로 배우기 전에 만든 **사전 개발환경 구축 기록**이다.

현재는

```text
Tomcat이 무엇인가?

↓

왜 Java가 필요한가?

↓

왜 8080을 사용하는가?

↓

localhost는 무엇인가?

↓

어떻게 서버를 시작하고 종료하는가?
```

까지 직접 확인했다.

앞으로 부트캠프에서 Tomcat과 Servlet/JSP를 배우게 되면 이 글을 다시 처음부터 검토하면서

```text
Servlet

↓

Request / Response

↓

Servlet Mapping

↓

JSP

↓

Context Path

↓

WEB-INF

↓

WAR

↓

Tomcat Deployment

↓

IntelliJ 연동
```

까지 실제 수업에서 이해한 내용을 추가할 예정이다.

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

06 IntelliJ IDEA 설치하고 JDK 연결
   ↓

07 Tomcat 설치하고 localhost에서 실행  ← 현재
   ↓

08 새 PC에서 개발환경 다시 구축하기
```

지금

```text
http://localhost:8080
```

에서 Tomcat 기본 화면을 확인하고,

Tomcat을 종료한 뒤 해당 주소가 더 이상 열리지 않는 것까지 확인했다면 **이번 단계의 Tomcat 기본 실행환경 구축은 완료**다.
