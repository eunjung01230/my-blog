---
layout: post
title: "Supabase와 Neon은 뭐가 다를까? 둘 다 PostgreSQL인데 다른 이유"
date: 2026-09-24 22:18:00 +0900
categories: database
learningOrder: 20
tags:
  - postgresql
  - supabase
  - neon
  - branching
---

## 들어가며

프로젝트에서 Neon PostgreSQL을 사용하면서, PostgreSQL 기반 서비스를 찾아보면 Supabase도 같이 자주 등장했다.

처음에는 둘 다 PostgreSQL을 제공하니 비슷한 서비스라고 생각했다.

그런데 공식 문서를 읽어 보니 두 서비스는 PostgreSQL을 중심으로 한다는 공통점은 있지만, **PostgreSQL 주변에 무엇을 함께 제공하는지**와 **어떤 개발 방식을 중요하게 보는지**가 달랐다.

그래서 이번에는 둘을

> 어떤 것이 더 좋은가?

로 비교하기보다

> 각각 무엇을 해결하려는 서비스인가?

를 기준으로 정리해 봤다.

Neon은 프로젝트에서 직접 사용했고, Supabase는 공식 문서를 기준으로 공부한 내용이다. 두 서비스 모두 기능이 계속 바뀌고 있어서 **이 글은 2026년 9월 기준**으로 정리했다.

---

## 가장 먼저 알아야 할 공통점

Supabase와 Neon 모두 **PostgreSQL을 기반**으로 한다.

즉 일반적인 PostgreSQL SQL을 그대로 쓸 수 있다.

```sql
SELECT *
FROM users;
```

PostgreSQL 생태계의 도구와 ORM도 사용할 수 있다. 예를 들어 Drizzle 같은 ORM은 어느 쪽이든 PostgreSQL에 연결하는 방식으로 쓴다.

Supabase 공식 문서도 프로젝트마다 **완전한 Postgres 데이터베이스(full Postgres database)**를 제공한다고 설명한다.

그래서 처음 보면 둘의 역할이 거의 같아 보인다.

| 공통점 | 내용 |
|------|------|
| 데이터베이스 | PostgreSQL |
| 쿼리 | 일반 PostgreSQL SQL |
| 도구 | PostgreSQL 클라이언트, ORM(Drizzle 등) 사용 가능 |
| 형태 | 클라우드에서 관리해 주는 PostgreSQL |

하지만 **PostgreSQL 주변에 무엇을 함께 제공하는가**에서 차이가 커진다.

---

## Supabase — 백엔드를 한곳에 모으는 방향

Supabase는 데이터베이스 하나만 제공하는 서비스라기보다, 백엔드에 필요한 여러 기능을 **하나의 플랫폼**에서 제공하는 방향에 가깝다.

공식 문서의 주요 기능 목록에는 다음이 들어 있다.

| 기능 | 역할 |
|------|------|
| Database | 프로젝트마다 제공되는 PostgreSQL |
| Auth | 회원가입·로그인 등 사용자 인증 |
| Storage | 이미지·파일 저장 |
| Realtime | 데이터 변경을 실시간으로 받기 |
| Edge Functions | 서버 코드를 함수 단위로 실행 |

예를 들어 서비스를 하나 만든다고 하면 이렇게 연결할 수 있다.

```text
회원가입 / 로그인
        ↓
Supabase Auth

사용자 데이터
        ↓
PostgreSQL

이미지 / 파일
        ↓
Supabase Storage

실시간 변경 감지
        ↓
Supabase Realtime
```

특히 Supabase Auth는 이메일, OTP, 소셜 로그인 같은 여러 인증 방식을 지원하고, PostgreSQL의 **RLS(Row Level Security)**와 연결해 쓸 수 있다.

### RLS를 같이 알아야 했다

RLS는 PostgreSQL 자체 기능으로, **테이블의 행(row) 단위로 누가 읽고 쓸 수 있는지** 정책을 거는 방식이다.

```text
일반적인 권한
→ 이 테이블을 읽을 수 있는가?

RLS
→ 이 테이블에서 "어떤 행"을 읽을 수 있는가?
```

Supabase에서는 로그인한 사용자 정보를 이 정책에 활용할 수 있다. 그래서 "자기 글만 수정할 수 있다" 같은 규칙을 데이터베이스 쪽에 둘 수 있다.

프론트엔드 중심으로 빠르게 서비스를 만들면서 **인증·DB·스토리지까지 한 플랫폼에서 관리**하고 싶을 때 이해하기 편한 구조다.

---

## Neon — PostgreSQL 개발 환경에 집중한 방향

Neon도 PostgreSQL을 제공하지만, 가장 크게 다른 점은 **데이터베이스 개발 환경 자체를 다루는 방식**이었다.

대표적인 기능이 데이터베이스 **Branching**이다.

Git에서 코드 브랜치를 만드는 것처럼

```text
main
 └── feature/login
```

Neon에서는 데이터베이스도 별도의 브랜치로 만들 수 있다.

Neon 공식 문서에 따르면 브랜치는 **부모 브랜치의 스키마와 데이터를 기반으로 빠르게 만들어지고, 부모와 격리되어** 동작한다.

```text
Production DB
      ↓
Preview Branch
      ↓
새 migration 테스트
```

이렇게 하면 운영 DB를 직접 건드리지 않고 새로운 스키마나 기능을 시험해 볼 수 있다.

Vercel Preview 배포와 데이터베이스 브랜치를 연결하는 방식이 잘 어울리는 이유도 여기에 있다. Preview 배포마다 그에 맞는 DB 브랜치를 붙일 수 있기 때문이다.

### 탄천런에서는 브랜치가 아니라 프로젝트를 나눴다

Branching을 탄천런의 DB 구성과 비교해 보면 차이가 보인다.

탄천런에서는 환경을 이렇게 나눴다.

```text
로컬 개발  → Docker PostgreSQL 17
통합       → Neon PostgreSQL (프로젝트 A)
배포       → Neon PostgreSQL (프로젝트 B)
```

통합과 배포를 **같은 Neon 안의 서로 다른 프로젝트**로 분리한 구조였다.

Branching을 알고 나서 보니, 환경을 나누는 방법에도 선택지가 있었다.

| 방법 | 특징 |
|------|------|
| 프로젝트를 따로 만든다 | 환경이 완전히 분리된다. 데이터와 스키마는 각각 따로 관리한다 |
| 한 프로젝트 안에서 브랜치를 만든다 | 부모의 스키마·데이터를 기반으로 빠르게 만든다. Preview 환경과 연결하기 좋다 |

어느 쪽이 맞는지는 팀의 배포 구조에 따라 다르겠지만, **Neon의 Branching은 "환경을 나누는 다른 방법"**이라는 점을 알게 됐다.

---

## Scale to Zero와 Autoscaling

Neon의 또 다른 특징은 **compute(쿼리를 실행하는 부분)를 필요에 따라 조절**하는 구조다.

| 기능 | 내용 |
|------|------|
| Autoscaling | 부하에 따라 compute 크기를 자동으로 조절한다 |
| Scale to Zero | 일정 시간 사용하지 않으면 compute를 멈추고, 다음 요청이 오면 다시 켠다 |

공식 문서 기준으로 Scale to Zero는 **활동이 없는 상태가 5분** 지나면 compute를 멈추고, 다음 쿼리가 오면 **수백 밀리초 안에** 다시 활성화한다.

```text
사용 중
→ compute 활성화

5분 동안 사용하지 않음
→ scale to zero

다시 요청
→ compute 재활성화
```

개발이나 Preview 환경처럼 DB를 항상 쓰지 않는 환경에서는 이런 방식이 잘 맞는다.

다만 멈춰 있던 compute가 다시 켜지는 동안 **첫 요청이 조금 늦어질 수 있다**는 점도 같이 알아 둘 필요가 있었다.

---

## 그러면 Neon은 데이터베이스만 제공할까?

예전 자료를 보면

```text
Supabase = DB + Auth + Storage + ...
Neon     = DB
```

처럼 비교한 글이 많다.

하지만 지금은 이렇게만 설명하면 정확하지 않다.

Neon에도 **Neon Auth**가 있다.

Neon은 2025년 12월에 Auth를 새로 만들어 **Better Auth 기반**으로 바꿨다고 발표했다.

공식 문서 기준으로 정리하면 이렇다.

- 사용자, 세션, 조직 같은 인증 데이터가 Neon 데이터베이스 안의 `neon_auth` 스키마에 저장된다.
- 데이터베이스 브랜치를 만들면 **인증 상태도 함께 브랜치**된다.
- 브랜치에서 만든 사용자는 운영 브랜치에 생기지 않고, 브랜치마다 인증 설정도 따로 바꿀 수 있다.

그래서 지금 기준으로는

> Supabase에는 Auth가 있고 Neon에는 없다.

라고 단순하게 비교하면 안 된다.

서비스들이 계속 기능을 추가하고 있기 때문에 **제품 비교 글은 작성 시점이 중요하다**는 것도 이번에 알게 됐다.

---

## 그래도 두 서비스의 성격은 다르다

현재 기능을 기준으로 단순화하면 다음처럼 이해할 수 있었다.

| 구분 | Supabase | Neon |
|------|------|------|
| 기본 DB | PostgreSQL | PostgreSQL |
| 중심 방향 | 통합 백엔드 플랫폼 | 서버리스 PostgreSQL, DB 개발 워크플로 |
| 인증 | Supabase Auth | Neon Auth (Better Auth 기반) |
| 파일 저장 | Supabase Storage 제공 | 별도 서비스와 조합하는 경우가 일반적 |
| 실시간 기능 | Realtime 제공 | 주요 기능으로 내세우지 않음 |
| DB Branching | Branching 기능 제공 | 핵심 기능 중 하나 |
| Autoscaling | 플랫폼에서 관리 | Autoscaling, Scale to Zero가 핵심 compute 기능 |
| Preview DB | 구성 가능 | Branching과 특히 잘 맞음 |

Supabase는 Auth, Storage, Realtime, Edge Functions처럼 **PostgreSQL 주변 기능을 하나의 플랫폼으로 제공**하는 성격이 강하다.

Neon은 **데이터베이스 브랜칭과 서버리스 PostgreSQL 개발 경험**을 주요 특징으로 둔다.

---

## 하나의 서비스로 모든 것을 만들 필요는 없었다

CupPick에서는 Neon PostgreSQL을 사용했고, 인증은 Neon Auth에 모두 맡기지 않고 **Auth.js와 Neon을 조합**하는 구조를 사용했다.

이 경험을 통해 생각이 하나 바뀌었다.

처음에는

> 백엔드 서비스 하나를 정하면 모든 것을 그 서비스로 만들어야 한다.

고 생각했다.

하지만 실제 서비스는 꼭 그럴 필요가 없었다.

필요한 도구를 각각 골라 조합할 수도 있고,

```text
Next.js
+
Auth.js
+
Neon PostgreSQL
+
Drizzle ORM
+
Vercel
```

반대로 하나의 플랫폼에 많은 기능을 맡길 수도 있다.

```text
Frontend
+
Supabase Auth
+
Supabase Database
+
Supabase Storage
```

두 방식을 비교하면 이렇다.

| 방식 | 장점 | 신경 쓸 점 |
|------|------|------|
| 도구를 조합한다 | 부분마다 원하는 도구를 고를 수 있다 | 도구 사이 연결과 설정을 직접 챙겨야 한다 |
| 한 플랫폼에 모은다 | 인증·DB·스토리지가 이미 연결되어 있다 | 그 플랫폼 방식에 맞춰 구조를 잡게 된다 |

---

## 정리

Supabase와 Neon 중 하나가 무조건 더 좋은 것은 아니다.

둘 다 PostgreSQL을 사용하지만 **해결하려는 범위가 조금 다르다.**

지금까지 이해한 차이를 한 문장씩 줄이면 이렇다.

```text
Supabase
→ PostgreSQL을 중심으로
   백엔드 전체를 구성하기 편한 플랫폼

Neon
→ PostgreSQL을 중심으로
   DB 개발·브랜칭·배포 환경을 다루기 편한 플랫폼
```

물론 두 서비스 모두 계속 새로운 기능을 추가하고 있어서 이 경계도 점점 변하고 있다.

| 처음 생각 | 공부한 뒤 |
|------|------|
| 둘 다 PostgreSQL이니 비슷한 서비스다 | DB는 같지만 주변에 제공하는 범위가 다르다 |
| 백엔드 서비스 하나를 정하면 모든 것을 그 서비스로 만든다 | 필요한 도구를 조합하는 구조도 가능하다 |

처음에는 둘 다 PostgreSQL인데 왜 다른 서비스를 쓰는지 잘 이해하지 못했다.

정리해 보니 중요한 것은 데이터베이스 종류만 보는 것이 아니라 **인증, 파일 저장, Preview 환경, 배포 구조, ORM, 개발 환경을 어떻게 구성할지까지 함께 보는 것**이었다.

---

## 더 학습하면 좋은 개념

- **Row Level Security (RLS)** — PostgreSQL에서 행 단위로 접근 권한을 거는 기능이다. Supabase처럼 브라우저에서 DB에 가까이 접근하는 구조를 이해하려면 먼저 알아야 한다.
- **Connection Pooling** — 서버리스 환경에서는 요청마다 DB 연결이 새로 생길 수 있다. Neon과 Supabase가 모두 연결 풀링을 제공하는 이유와 연결된다.
- **Database Migration** — 브랜치에서 스키마를 바꿔 보고 운영에 반영하는 흐름의 바탕이다. Drizzle의 migration과 Neon Branching을 같이 이해할 수 있다.
- **스토리지와 compute 분리 구조** — Neon의 Branching과 Scale to Zero가 가능한 배경이다. 데이터를 저장하는 부분과 쿼리를 실행하는 부분을 나눠서 보는 관점이다.
- **Cold Start** — Scale to Zero나 서버리스 함수에서 멈춰 있던 자원이 다시 켜질 때 생기는 지연이다. 첫 요청이 느린 이유를 설명할 수 있다.

## 참고 자료

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Docs - Auth](https://supabase.com/docs/guides/auth)
- [Supabase Docs - Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase Docs - Branching](https://supabase.com/docs/guides/deployment/branching)
- [Neon Docs - Branching](https://neon.com/docs/introduction/branching)
- [Neon Docs - Autoscaling](https://neon.com/docs/introduction/autoscaling)
- [Neon Docs - Scale to Zero](https://neon.com/docs/introduction/scale-to-zero)
- [Neon Docs - Neon Auth](https://neon.com/docs/auth/overview)
- [Neon Docs - Branching authentication](https://neon.com/docs/auth/branching-authentication)
- [Neon Blog - Meet the New Neon Auth](https://neon.com/blog/neon-auth-branchable-identity-in-your-database)
- [PostgreSQL 공식 문서 - Row Security Policies](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
