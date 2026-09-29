---
layout: post
title: "Java 조건문 — if, switch와 단축 평가"
date: 2026-09-29 15:29:00 +0900
categories: backend
learningOrder: 30
tags:
  - java
  - if
  - switch
  - scanner
  - short-circuit-evaluation
---

프로그램은 항상 모든 코드를 같은 순서로 실행하는 것은 아니다.

사용자의 입력값이나 현재 상태에 따라 어떤 코드는 실행하고, 어떤 코드는 실행하지 않아야 할 때가 있다.

Java에서는 이런 실행 흐름을 제어하기 위해 **조건문**을 사용한다.

이번 수업에서는 `if`와 `switch`를 사용해 조건에 따라 실행 흐름을 나누는 방법을 배우고, `Scanner`로 사용자의 값을 입력받아 직접 조건을 판단해 보았다.

또한 `&&`, `||` 연산에서 모든 조건을 항상 확인하지 않는 **단축 평가(short-circuit evaluation)**도 함께 살펴보았다.

---

## if 조건문

`if`문은 **조건식의 결과에 따라 프로그램의 실행 흐름을 분기시키는 제어문**이다.

기본 형태는 다음과 같다.

```java
if (조건식) {
    // 조건이 true일 때 실행
} else {
    // 조건이 false일 때 실행
}
```

`if` 뒤의 조건식이 `true`이면 첫 번째 블록이 실행되고, `false`이면 `else` 블록이 실행된다.

`else`가 반드시 필요한 것은 아니다. 조건을 만족할 때만 특정 코드를 실행하고 싶다면 `if`만 사용할 수도 있다.

```java
if (age >= 20) {
    System.out.println("성인입니다.");
}
```

조건이 여러 개라면 `else if`를 사용할 수도 있다.

```java
if (score >= 90) {
    System.out.println("A");
} else if (score >= 80) {
    System.out.println("B");
} else {
    System.out.println("C");
}
```

위에서부터 조건을 확인하다가 처음으로 `true`가 된 블록을 실행하고 조건문을 빠져나간다.

---

## Scanner로 사용자 입력받기

조건문을 사용하면 프로그램 내부에 미리 작성된 값뿐만 아니라 **사용자가 입력한 값**에 따라 결과를 다르게 만들 수도 있다.

콘솔에서 값을 입력받을 때 사용할 수 있는 클래스가 `Scanner`이다.

```java
Scanner sc = new Scanner(System.in);
```

정수를 입력받으려면 `nextInt()`를 사용할 수 있다.

```java
int age = sc.nextInt();
```

여기서 각각의 역할을 나누어 보면 다음과 같다.

| 코드 | 역할 |
|---|---|
| `Scanner` | 입력을 처리하기 위한 클래스 |
| `sc` | 생성한 Scanner 객체를 참조하는 변수 |
| `System.in` | 콘솔을 통한 입력 |
| `nextInt()` | 입력값을 `int` 형태로 읽음 |
| `age` | 입력받은 정수를 저장하는 변수 |

이제 `age`에 사용자가 입력한 나이가 저장되므로 조건문에서 사용할 수 있다.

---

## Scanner와 if문으로 할인율 계산하기

수업에서는 다음 조건을 가진 프로그램을 만들어 보았다.

- 13세 미만이면 청소년 할인 50%
- 65세 이상이면 노약자 할인 30%
- 그 외에는 할인 없음

입력과 출력은 다음과 같은 형태이다.

```text
입력
나이: 10

출력
나이: 10
할인율: 50%
```

Java 코드로 작성하면 다음과 같이 구성할 수 있다.

```java
import java.util.Scanner;

public class Application {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("나이를 입력하세요: ");
        int age = sc.nextInt();

        int discount = 0;

        if (age < 13) {
            discount = 50;
        } else if (age >= 65) {
            discount = 30;
        }

        System.out.println("나이: " + age);
        System.out.println("할인율: " + discount + "%");
    }
}
```

흐름만 정리하면 간단하다.

```text
사용자가 나이 입력
        ↓
     age 저장
        ↓
   age < 13 ?
    ↙       ↘
  true     false
   ↓         ↓
  50%    age >= 65 ?
          ↙       ↘
        true     false
         ↓         ↓
        30%        0%
```

사용자의 입력값은 같아도 조건식의 결과에 따라 실행되는 코드가 달라진다.

이것이 조건문을 이용한 **분기**이다.

---

## && 연산자

조건 하나만으로 판단하기 어려울 때는 여러 조건을 함께 사용할 수 있다.

`&&`는 AND 연산자이다.

```java
A && B
```

A와 B가 **모두 `true`일 때만 `true`**가 된다.

| A | B | A && B |
|---|---|---|
| true | true | true |
| true | false | false |
| false | true | false |
| false | false | false |

예를 들어 회원가입에 다음 두 조건이 있다고 생각해 볼 수 있다.

```text
A : 아이디 중복 검사
B : 비밀번호 조건 검사
```

두 조건을 모두 만족해야 회원가입을 허용한다면 다음과 같이 표현할 수 있다.

```java
if (A && B) {
    System.out.println("회원가입 성공");
} else {
    System.out.println("회원가입 실패");
}
```

그런데 `&&`에는 단순히 두 조건을 묶는 것 외에 알아둘 특징이 하나 있다.

---

## 단축 평가

Java의 `&&`와 `||`는 **단축 평가(short-circuit evaluation)**를 한다.

모든 조건을 끝까지 확인하지 않고, 결과가 이미 결정되었다면 이후 조건을 평가하지 않는 방식이다.

### &&의 단축 평가

`&&`는 모든 조건이 `true`여야 최종 결과가 `true`이다.

```java
A && B
```

만약 A가 이미 `false`라면 B의 결과가 무엇이든 전체 결과는 `false`이다.

```text
false && ?

결과는 이미 false
→ 오른쪽 조건을 평가할 필요가 없음
```

따라서 Java는 오른쪽의 B를 평가하지 않는다.

```java
if (false && someMethod()) {
    // ...
}
```

이 경우 `someMethod()`는 실행되지 않는다.

### 조건의 순서도 생각해 보기

수업에서는 회원가입 검사를 예로 조건 순서에 대해서도 생각해 보았다.

예를 들어 다음 두 작업이 있다고 가정한다.

```text
A : 아이디 중복 확인 → 1분
B : 비밀번호 조건 확인 → 0.5초
```

`&&`에서 왼쪽 조건이 `false`라면 오른쪽 조건은 실행하지 않는다.

따라서 먼저 빠르게 판단할 수 있는 조건에서 이미 `false`가 나온다면 뒤의 비싼 작업을 실행하지 않아도 된다.

다만 실제 코드에서 조건 순서를 정할 때는 **실행 시간만 보고 무조건 결정하는 것은 아니다.**

조건 사이에 의존 관계가 있는지, 메서드 호출에 부수 효과가 있는지, 코드의 의미와 가독성은 어떤지도 함께 고려해야 한다.

수업에서 배운 핵심은 다음과 같다.

> `&&`는 왼쪽부터 평가하며, `false`가 나오는 순간 뒤의 조건을 평가하지 않을 수 있다.

---

## ||의 단축 평가

`||`는 OR 연산자이다.

두 조건 중 **하나라도 `true`이면 `true`**이다.

```java
A || B
```

따라서 왼쪽의 A가 이미 `true`라면 오른쪽 조건을 확인할 필요가 없다.

```text
true || ?

결과는 이미 true
→ 오른쪽 조건을 평가하지 않음
```

`&&`와 비교하면 다음과 같이 기억할 수 있다.

| 연산자 | 결과가 확정되는 경우 | 오른쪽 조건 |
|---|---|---|
| `A && B` | A가 `false` | 평가하지 않음 |
| `A \|\| B` | A가 `true` | 평가하지 않음 |

즉, 단축 평가는 **이미 결과가 결정되었다면 불필요한 평가를 생략하는 것**이다.

---

## switch문

조건이 많아지면 `if - else if - else`가 길어질 수 있다.

이때 상황에 따라 `switch`문을 사용할 수 있다.

`switch`는 `if`를 무조건 대신하는 문법이 아니라, **하나의 식에서 나온 값을 여러 경우와 비교하는 상황**에서 사용하기 좋다.

기본 형태는 다음과 같다.

```java
switch (식) {
    case 값1:
        실행 코드;
        break;
    case 값2:
        실행 코드;
        break;
    default:
        기본 코드;
}
```

각 부분의 역할은 다음과 같다.

| 구성 | 역할 |
|---|---|
| `switch(식)` | 비교할 값을 지정 |
| `case` | 값이 일치했을 때 실행할 코드 정의 |
| `break` | 현재 switch문을 종료 |
| `default` | 어떤 case에도 해당하지 않을 때 실행 |

예를 들어 메뉴 번호에 따라 다른 결과를 출력할 수 있다.

```java
int menu = 2;

switch (menu) {
    case 1:
        System.out.println("아메리카노");
        break;
    case 2:
        System.out.println("카페라떼");
        break;
    case 3:
        System.out.println("바닐라라떼");
        break;
    default:
        System.out.println("없는 메뉴입니다.");
}
```

`menu`의 값이 `2`이므로 `case 2`가 실행된다.

```text
menu = 2
   ↓
case 1 ? → X
   ↓
case 2 ? → O
   ↓
"카페라떼" 출력
   ↓
break
   ↓
switch 종료
```

`default`는 모든 `case`에 일치하지 않았을 때 실행된다는 점에서 `if`문의 마지막 `else`와 비슷한 역할을 한다.

---

## break가 필요한 이유

기본적인 `switch`문에서는 `break`도 중요하다.

```java
case 1:
    System.out.println("1번");
    break;
```

`break`를 만나면 현재 `switch` 블록을 빠져나간다.

반대로 `break`가 없다면 일치한 `case` 이후의 코드가 다음 `case`로 이어져 실행될 수 있다. 이를 **fall-through**라고 한다.

```java
int num = 1;

switch (num) {
    case 1:
        System.out.println("1");
    case 2:
        System.out.println("2");
}
```

위 코드에서는 `case 1`에 진입한 뒤 `break`가 없기 때문에 다음 코드까지 이어질 수 있다.

따라서 기본적인 `switch`문을 작성할 때는 **어디에서 분기를 끝낼 것인지** 확인해야 한다.

---

## if와 switch는 언제 사용할까

둘 다 프로그램의 흐름을 분기하지만 사용하는 상황에는 차이가 있다.

```text
조건 자체를 판단
age < 13
score >= 90
idValid && passwordValid
        ↓
       if


하나의 값을 여러 경우와 비교
menu == 1
menu == 2
menu == 3
        ↓
     switch
```

`if`는 범위 비교나 여러 논리 조건을 조합할 때 유연하다.

`switch`는 하나의 값을 여러 경우로 나누어 처리할 때 코드의 구조를 명확하게 만들 수 있다.

따라서 `switch`를 단순히 **if문의 대체 문법**이라고 이해하기보다는 상황에 따라 적절한 분기 방법을 선택한다고 이해하는 편이 좋다.

---

## 정리

이번 수업에서는 조건에 따라 프로그램의 실행 흐름을 바꾸는 방법을 배웠다.

`if`는 조건식의 `true`, `false`에 따라 실행할 코드를 결정한다. `Scanner`를 함께 사용하면 사용자가 입력한 값에 따라 프로그램의 결과를 다르게 만들 수 있다.

여러 조건을 연결할 때 사용하는 `&&`와 `||`에서는 **단축 평가**가 발생한다.

```text
&& → 왼쪽이 false면 종료
|| → 왼쪽이 true면 종료
```

그리고 하나의 값을 여러 경우로 나누어 처리해야 할 때는 `switch`를 사용할 수 있다.

이번 내용을 단순히 문법으로만 외우기보다는,

> **조건을 확인하고 → 실행할 길을 선택한다.**

라는 흐름으로 이해하는 것이 중요하다.

조건문을 배운 다음에는 같은 코드를 여러 번 실행해야 할 때 사용하는 **반복문**으로 이어진다.
