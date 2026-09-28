---
layout: post
title: "Java 기초 — 실행 원리, 변수, 자료형과 연산자"
date: 2026-09-28 15:20:00 +0900
categories: backend
learningOrder: 20
tags:
  - java
  - jvm
  - variable
  - data-type
  - operator
---

Java를 처음 공부하면서 가장 먼저 배운 내용은 크게 다음과 같다.

Java 코드는 어떻게 실행되는지, 변수는 무엇인지, 자료형에는 어떤 것들이 있는지, 그리고 값을 계산하거나 비교할 때 연산자를 어떻게 사용하는지에 대한 내용이다.

처음에는 용어가 많아서 복잡하게 느껴질 수 있지만, 하나씩 보면 대부분 기본적인 규칙으로 연결된다.

---

## 1. Java 코드의 기본 구조

### 패키지와 클래스

Java에서는 코드를 정리하기 위해 **패키지(package)** 를 사용한다. 패키지는 쉽게 생각하면 폴더와 비슷한 역할을 한다.

예를 들어 네이버에서 네이버 스포츠 프로젝트를 만든다고 하면 다음과 같이 표현할 수 있다.

```java
com.naver.sports
```

구조로 보면 다음과 비슷하다.

```text
com
└─ naver
   └─ sports
```

이 패키지 안에 Java 클래스를 만든다. 예를 들어 `Hello`라는 클래스를 만들었다면 파일 이름은 `Hello.java`이다.

Java에서는 클래스 이름의 첫 글자를 보통 대문자로 작성한다.

```text
Hello
Student
Member
```

그리고 `public class`를 사용하는 경우에는 클래스 이름과 파일 이름이 같아야 한다.

```java
public class Hello {

}
```

위 코드의 파일 이름은 반드시 `Hello.java`여야 한다. 다음처럼 대소문자가 다르면 안 된다.

```text
파일 이름: Hello.java
클래스 이름: hello
```

Java는 대문자와 소문자를 구분하기 때문에 `Hello`와 `hello`는 서로 다른 이름이다.

### main 메서드

Java 프로그램을 처음 실행할 때 가장 많이 보는 구조는 다음과 같다.

```java
public class Hello {

    public static void main(String[] args) {

    }
}
```

여기서 중요한 부분은 `public static void main(String[] args)`이다. `main()`은 프로그램이 시작되는 위치이다.

예를 들어 다음과 같이 작성하면

```java
public class Hello {

    public static void main(String[] args) {
        System.out.println("Hello Java");
    }
}
```

프로그램을 실행했을 때 `main()` 안의 코드가 실행된다. 결과는 다음과 같다.

```text
Hello Java
```

처음 Java를 배우는 단계에서는 **Java 프로그램은 `main()`에서 시작한다** 정도로 이해하면 된다.

### 세미콜론과 실행 방향

Java에서는 하나의 명령이 끝나는 위치에 보통 세미콜론 `;`을 작성한다. 변수 선언도, 출력문도 마찬가지이다.

```java
int age = 20;
System.out.println("Hello");
```

세미콜론을 빼면 컴파일 과정에서 오류가 발생할 수 있다.

```java
// 잘못된 예
System.out.println("Hello")

// 올바른 예
System.out.println("Hello");
```

처음에는 간단하게 **하나의 명령이 끝나면 `;`** 이라고 기억하면 된다.

기본적인 Java 코드는 보통 위에서 아래로 실행된다. 예를 들어 다음 코드가 있다.

```java
int a = 10;
int b = 20;

System.out.println(a);
System.out.println(b);
```

실행 결과는 다음과 같다.

```text
10
20
```

위에 작성된 코드가 먼저 실행되고, 그다음 아래의 코드가 실행된다. 연산도 기본적으로 왼쪽에서 오른쪽으로 진행되는 경우가 많다. 지금 단계에서는 `위 → 아래`, `왼쪽 → 오른쪽` 방향으로 읽으면 된다.

---

## 2. Java 코드는 어떻게 실행될까?

### JDK와 javac

Java는 사람이 작성하고 이해하기 위한 프로그래밍 언어이다. 예를 들어 `int age = 20;` 같은 코드는 사람이 읽을 수 있다.

하지만 컴퓨터는 Java 코드를 그대로 이해할 수 없다. 그래서 Java 코드를 컴퓨터가 실행할 수 있도록 번역하는 과정이 필요하다.

이때 Java 개발에 필요한 도구가 들어 있는 것이 **JDK(Java Development Kit)** 이다.

```text
JDK
= Java 개발에 필요한 도구 모음
```

JDK 안에는 Java 코드를 번역하는 컴파일러인 `javac`도 들어 있다.

### 컴파일과 바이트코드

Java 코드는 바로 실행되는 것이 아니다. 기본적인 실행 흐름은 다음과 같다.

```text
.java
↓
javac
↓
.class
↓
JVM
↓
실행
```

조금 더 자세히 보면, 먼저 `Hello.java` 파일을 만들고 다음과 같이 작성한다.

```java
public class Hello {

    public static void main(String[] args) {
        System.out.println("Hello Java");
    }
}
```

우리가 직접 작성하는 이 파일을 소스 코드라고 한다. 컴퓨터는 `.java` 파일을 그대로 실행하지 못하기 때문에 JDK에 포함된 `javac`가 이 파일을 번역한다.

```text
Hello.java
↓
javac
↓
Hello.class
```

이 과정을 **컴파일(Compile)** 이라고 한다. 쉽게 말하면 사람이 작성한 Java 코드를 JVM이 읽을 수 있는 형태로 바꾸는 과정이다.

컴파일이 성공하면 `Hello.class` 파일이 만들어진다. `.class` 파일 안에는 **바이트코드(Bytecode)** 가 들어 있다. 바이트코드는 CPU가 바로 읽는 기계어가 아니라, JVM이 읽고 실행할 수 있는 코드이다.

| 파일 | 의미 |
|------|------|
| `.java` | 사람이 작성한 Java 코드 |
| `.class` | JVM이 읽는 바이트코드 |

### Class Loader와 JVM

Java 프로그램을 실행하면 JVM이 동작한다. JVM 안에는 **Class Loader**라는 기능이 있다.

Class Loader는 필요한 `.class` 파일을 찾아서 메모리에 올리는 역할을 한다.

```text
Hello.class
↓
Class Loader
↓
메모리
```

그다음 JVM이 메모리에 올라온 바이트코드를 실행한다. 전체 흐름은 다음과 같다.

```text
Hello.java
↓
javac
↓
Hello.class
↓
Class Loader가 메모리에 올림
↓
JVM 실행
```

### 실행 명령

컴파일된 Java 프로그램을 실행할 때는 다음과 같이 작성한다.

```bash
java Hello
```

여기서 중요한 점은 `.class`를 붙이지 않는다는 것이다.

```bash
# 잘못된 예
java Hello.class

# 올바른 예
java Hello
```

즉 Java를 실행할 때는 클래스 이름만 작성한다.

---

## 3. 리터럴과 변수

### 리터럴

**리터럴(Literal)** 은 코드에 직접 작성한 값을 의미한다. 예를 들어 다음 값들이 있다.

```java
10
3.14
'A'
"안녕하세요"
true
```

`int age = 20;` 코드에서는 `20`이 리터럴이다.

### 변수와 대입 연산자

일반적으로 변수라고 하면 변하는 수라는 의미를 먼저 생각하게 된다. 프로그래밍에서는 여기에 하나의 의미가 추가된다.

> 변수는 값을 저장하기 위한 공간이다.

예를 들어 `int age = 20;` 코드를 나누어 보면 다음과 같다.

| 코드 | 의미 |
|------|------|
| `int` | 자료형 |
| `age` | 변수 이름 |
| `=` | 대입 연산자 |
| `20` | 값 |

즉 가장 기본적인 구조는 `공간 = 값`이다. `age`라는 공간을 만들고 그 공간 안에 `20`이라는 값을 넣는 것이다.

Java에서 `=`은 수학에서 사용하는 같다는 의미와 다르다. Java의 `=`은 **대입 연산자**이다.

```java
int x = 10;
```

이 코드는 **x라는 공간에 10을 넣는다**라는 의미이다. 대입 연산자의 왼쪽에는 값을 저장할 공간이 오고, 오른쪽에는 저장할 값이 온다.

### 변수도 오른쪽에 사용할 수 있다

다음 코드를 보자.

```java
int y = 10;
int z;

z = y;
```

대입 연산자의 오른쪽에 `y`라는 변수가 들어 있다. 이 경우에는 `y`라는 공간 자체를 넣는 것이 아니라, `y`가 가지고 있는 값을 가져온다.

현재 `y = 10;`이므로 `z = y;`는 결과적으로 `z = 10;`과 같은 결과가 된다.

### 변수 선언과 초기화

변수를 만들기만 하는 것을 **선언**이라고 한다.

```java
int num;
```

이 코드는 `num`이라는 이름의 공간을 만든다는 의미이다. 그다음 처음으로 값을 넣어주는 것을 **초기화**라고 한다.

```java
num = 30;
```

선언과 초기화를 동시에 할 수도 있다. 즉 다음 두 코드는 같은 흐름이다.

```java
int num;
num = 30;
```

```java
int num = 30;
```

그리고 같은 `{}` 영역에서는 같은 변수명을 다시 선언할 수 없다.

---

## 4. 자료형

### 기본 자료형 8개

변수를 만들 때는 어떤 종류의 값을 저장할 것인지 정해야 한다. 이것을 **자료형(Data Type)** 이라고 한다. Java의 기본 자료형은 총 8개이다.

| 분류 | 자료형 |
|------|--------|
| 정수형 | `byte`, `short`, `int`, `long` |
| 실수형 | `float`, `double` |
| 문자형 | `char` |
| 논리형 | `boolean` |

### bit와 byte

컴퓨터는 데이터를 0과 1로 표현한다. 가장 작은 단위를 **bit**라고 한다.

```text
1 bit → 0 또는 1
```

8개의 bit가 모이면 1byte가 된다.

```text
1 byte = 8 bit
```

Java의 `byte` 자료형은 1byte 크기이다. Java의 `byte`가 저장할 수 있는 정수 범위는 `-128 ~ 127`이다.

### 정수형과 실수형

정수를 저장할 때는 정수 자료형을, 소수점이 있는 값을 저장할 때는 실수 자료형을 사용한다.

| 분류 | 자료형 | 크기 | 예시 |
|------|--------|------|------|
| 정수 | `byte` | 1 byte | `byte b = 10;` |
| 정수 | `short` | 2 byte | `short s = 10;` |
| 정수 | `int` | 4 byte | `int i = 10;` |
| 정수 | `long` | 8 byte | `long l = 10;` |
| 실수 | `float` | 4 byte | `float f = 3.14f;` |
| 실수 | `double` | 8 byte | `double d = 3.14;` |

처음에는 일반적인 정수를 저장할 때 `int`를 많이 사용한다.

```java
int age = 20;
```

`float`을 사용할 때는 값 뒤에 `f`를 붙인다.

```java
float f = 3.14f;
```

### 문자 char와 문자열 String

문자 하나를 저장할 때 `char`를 사용한다.

```java
char ch = 'A';
```

또는

```java
char ch = 'ㅎ';
```

처럼 사용할 수 있다. `char`는 `'A'`, `'가'`, `'1'`처럼 작은따옴표를 사용한다. Java의 `char`는 2byte이다.

그리고 Java의 문자는 내부적으로 **Unicode** 값을 사용한다. 그래서 다음 코드도 가능하다.

```java
char ch = 'A';
int num = ch;
```

문자 `'A'`에는 내부적으로 숫자 값이 있기 때문에 `int`에 저장할 수 있다.

여러 문자를 저장할 때는 `String`을 사용한다.

```java
String str = "안녕하세요";
```

`char`와 비교하면 다음과 같다.

| 자료형 | 의미 | 예시 |
|--------|------|------|
| `char` | 문자 하나 | `char ch = 'A';` |
| `String` | 여러 문자 | `String str = "ABC";` |

`String`은 앞에서 배운 8개의 기본 자료형에는 포함되지 않는다. `String`은 **참조 자료형**이다. 지금 단계에서는 `char`는 문자 하나, `String`은 문자열 정도로 구분하면 된다.

### 논리형 boolean

참과 거짓을 저장할 때 사용한다.

```java
boolean result = true;
```

또는

```java
boolean result = false;
```

`boolean`에 저장할 수 있는 값은 `true`와 `false` 두 가지이다. 숫자를 넣을 수는 없다.

```java
boolean result = 1; // 사용할 수 없다
```

`boolean`은 주로 조건이 맞는지 확인할 때 사용할 수 있다. 예를 들어 나이가 20살 이상인지 확인한다고 하자.

```java
int age = 20;

boolean isAdult = age >= 20;
System.out.println(isAdult);
```

`age`가 20이고 `age >= 20`이라는 조건이 맞기 때문에 결과는 `true`가 된다.

```text
true
```

즉 `boolean`은 다음처럼 이해하면 된다.

```text
조건이 맞다   → true
조건이 틀리다 → false
```

---

## 5. 출력과 입력

### System.out.println()

Java에서 콘솔에 값을 출력할 때 `System.out.println();`을 사용한다.

```java
int age = 20;

System.out.println(age);
System.out.println("안녕하세요");
```

결과는 다음과 같다.

```text
20
안녕하세요
```

### sout와 soutv

IntelliJ에서는 `System.out.println()`을 빠르게 작성할 수 있다. `sout` 자동 완성을 사용하면 `System.out.println();`으로 바뀐다.

또한 `soutv`를 사용하면 가까이에 있는 변수의 값을 출력하는 코드를 만들어준다. 예를 들어 `int age = 20;` 근처에서 `soutv`를 사용하면 다음과 비슷한 코드가 만들어진다.

```java
System.out.println("age = " + age);
```

단, `sout`과 `soutv`는 Java 문법이 아니라 IntelliJ에서 제공하는 편의 기능이다.

### Scanner

콘솔에서 값을 입력받을 때는 `Scanner`를 사용할 수 있다.

```java
import java.util.Scanner;
```

| 코드 | 역할 |
|------|------|
| `System.out.println()` | 출력 |
| `Scanner` | 입력 |

---

## 6. 형변환

**형변환(Type Conversion)** 은 하나의 자료형을 다른 자료형으로 바꾸는 것을 의미한다. 형변환은 크게 암시적 형변환과 명시적 형변환 두 가지가 있다.

### 암시적 형변환

작은 범위의 자료형을 더 큰 범위로 변환할 때 자동으로 변환되는 경우가 있다.

```java
int num = 100;

double dnum = num;
```

`int`는 4byte이고 `double`은 8byte이다. 더 큰 공간으로 이동하기 때문에 자동으로 변환된다.

```text
int (4byte) → double (8byte)
```

### 명시적 형변환

반대로 큰 범위에서 작은 범위로 바꾸면 값이 손실될 수 있다.

```java
double dnum = 99.99;

int inum = (int) dnum;

System.out.println(dnum);
System.out.println(inum);
```

`double`에서 `int`로 변환하고 있다. 결과를 출력하면 다음과 같다.

```text
99.99
99
```

소수점 아래의 값이 사라졌다. 이처럼 데이터 손실 가능성이 있는 경우에는 `(int)`처럼 변환할 자료형을 직접 작성한다. 이것을 명시적 형변환이라고 한다. 큰 자료형을 작은 자료형으로 바꿀 때 명시적 형변환을 쓰지 않으면 컴파일 오류가 발생한다.

### 문자열과 숫자 변환

문자열과 숫자는 일반적인 숫자 자료형끼리의 형변환과 방법이 조금 다르다.

문자열 안에 숫자가 들어 있다면 숫자로 변환할 수 있다. 아래 코드를 실행하면 `num`에는 숫자 `123`이 저장된다.

```java
String str = "123";

int num = Integer.parseInt(str);
```

반대로 숫자를 문자열로 바꾸는 것도 가능하다.

```java
int num = 123;

String str = String.valueOf(num);
```

즉 숫자 → 문자열, 문자열 → 숫자 모두 가능하다. 다만 일반적인 `(int)` 형변환 방식과는 다른 방법을 사용한다.

---

## 7. 연산자

### 산술 연산자

숫자를 계산할 때 사용하는 연산자이다.

| 연산자 | 의미 |
|--------|------|
| `+` | 더하기 |
| `-` | 빼기 |
| `*` | 곱하기 |
| `/` | 나누기 |
| `%` | 나머지 |

예를 들어 `int a = 10;`, `int b = 3;`이라고 했을 때 다음처럼 사용할 수 있다.

```java
a + b
a - b
a * b
a / b
a % b
```

`%`는 나머지를 구한다. `10 % 3`의 결과는 `1`이다.

### 비교 연산자

두 값을 비교할 때 사용한다.

| 연산자 | 의미 |
|--------|------|
| `==` | 같다 |
| `!=` | 같지 않다 |
| `>` | 크다 |
| `<` | 작다 |
| `>=` | 크거나 같다 |
| `<=` | 작거나 같다 |

비교한 결과는 `boolean` 값이 된다.

```java
int a = 10;
int b = 3;

boolean result = a > b;
```

`10 > 3`은 참이므로 `result = true`가 된다.

### 논리 연산자

여러 조건을 같이 사용할 때 논리 연산자를 사용한다.

| 연산자 | 의미 | 결과 |
|--------|------|------|
| `&&` | AND | 두 조건이 모두 참이어야 참 |
| `\|\|` | OR | 둘 중 하나만 참이어도 참 |
| `!` | NOT | 현재 논리 값을 반대로 바꿈 |

```java
boolean isTrue = true;
boolean isFalse = false;

System.out.println(isTrue && isFalse); // false
System.out.println(isTrue || isFalse); // true
System.out.println(!true);             // false
```

### &&는 왼쪽부터 확인한다

`A && B`와 같은 조건이 있다고 하자. Java는 먼저 왼쪽 조건인 `A`를 확인한다.

만약 `A`가 `false`라면 `false && B`의 전체 결과는 이미 `false`이다. 따라서 뒤의 `B`는 확인하지 않아도 된다. 즉 `&&`에서는 조건의 순서도 중요할 수 있다.

수업에서는 이처럼 `&&`의 왼쪽 조건이 `false`면 오른쪽을 확인하지 않기 때문에 조건 순서가 중요할 수 있다는 면접 질문도 언급되었다.

### 증감 연산자

변수의 값을 1 증가시키거나 감소시킬 때 사용한다. `++`는 증가, `--`는 감소이다.

예를 들어 `int age = 20;`이라고 하자.

**전위 연산**은 값을 먼저 증가시킨 뒤 사용한다.

```java
System.out.println(++age); // 21
```

**후위 연산**은 현재 값을 먼저 사용한 뒤 증가한다. 현재 `age`가 21이라면

```java
System.out.println(age++); // 21
```

출력 결과는 `21`이다. 하지만 이 코드가 끝난 뒤 `age`는 `22`가 된다.

### 문자열과 + 연산자

문자열이 포함된 `+` 연산에서는 주의할 점이 있다.

```java
int a = 10;
int b = 3;

System.out.println("덧셈 : " + a + b);
```

결과는 다음과 같다.

```text
덧셈 : 103
```

왜 13이 아니라 103이 나올까? 앞에서부터 계산하기 때문이다.

먼저 `"덧셈 : " + 10`을 계산해서 `"덧셈 : 10"`이 된다. 이미 문자열이 되었기 때문에 그 뒤의 3도 문자열로 연결되어, `"덧셈 : 10" + 3`의 결과는 `덧셈 : 103`이 된다.

숫자끼리 먼저 계산하고 싶다면 괄호를 사용한다.

```java
System.out.println("덧셈 : " + (a + b));
```

먼저 `10 + 3`을 계산해서 `13`이 되고, 그다음 문자열과 연결된다.

```text
덧셈 : 13
```

---

## 마무리

오늘 배운 Java의 가장 기본적인 실행 흐름은 다음과 같다.

```text
Java 코드 작성 (.java)
↓
javac 컴파일
↓
.class 생성 (바이트코드)
↓
Class Loader가 메모리에 올림
↓
JVM 실행
```

Java 프로그램을 실행할 때는 `java Hello`처럼 클래스 이름만 사용한다. `.class`는 붙이지 않는다.

변수의 기본 구조는 `int age = 20;`이다. 이를 간단하게 보면 `자료형 변수명 = 값;` 또는 `공간 = 값`이라고 이해할 수 있다.

Java의 기본 자료형은 총 8개이다.

```text
정수형: byte, short, int, long
실수형: float, double
문자형: char
논리형: boolean
```

문자열을 다루는 `String`은 기본 자료형이 아니라 참조 자료형이다.

이번에 배운 내용은 Java에서 값을 저장하고, 계산하고, 비교하고, 출력하는 가장 기본적인 내용이다. 이후 조건문이나 반복문을 배우더라도 변수, 자료형, 연산자는 계속 사용하게 되기 때문에 기초 단계에서 구조를 익혀두는 것이 중요하다.
