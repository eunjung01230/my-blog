---
name: note
description: 배운 것을 학습 노트로 정리해서 블로그에 올린다. /note 라고 하면 실행한다.
---

# 학습 노트 만들기

아래 순서대로 해줘.

1. 먼저 나에게 물어봐 — "뭘 배웠어요?"
   내가 답하기 전에는 글을 쓰지 마.
2. 내 답을 가지고 `_posts/` 에 글을 만들어줘.
   파일 이름과 머리말은 `CLAUDE.md` 규칙을 따라.
   - `categories` 는 아래 표의 **slug 하나만, 소문자 그대로** 써. (`CLAUDE.md` 5.2.1)
   - 어느 카테고리인지 애매하면 지어내지 말고 나에게 물어봐.
   - Mermaid 다이어그램을 넣었으면 머리말에 `mermaid: true` 를 꼭 넣어.
3. 다 쓰면 나에게 먼저 보여줘. 내가 좋다고 하기 전에는 커밋하지 마.
4. 내가 확인하면 커밋하고 push 해줘.

## categories 에 쓸 수 있는 값

머리말에는 왼쪽 slug 를 쓴다. 오른쪽은 화면에 보이는 이름일 뿐이라 머리말에 쓰면 안 된다.

| slug (머리말에 쓰는 값) | 화면 표시명 |
|------|------|
| `dev-setup` | Dev Setup |
| `git` | Git & GitHub |
| `terminal` | Terminal |
| `frontend` | Frontend |
| `backend` | Backend |
| `database` | Database |
| `deployment` | Deployment |
| `design` | Design |
| `ai-tools` | AI & Tools |
| `my-blog` | MY-Blog |

- 표는 현재 기준이다. `_data/categories.yml` 에 새로 등록된 slug 도 쓸 수 있다. 목록에 없는 새 카테고리가 필요하면 지어내지 말고 나에게 물어본 뒤, `_data/categories.yml` 항목과 `categories/<slug>.md` 페이지를 먼저 추가한다.
- `project` 는 `_project_posts/` 프로젝트 글 전용이라 `/note` 학습 글에는 쓰지 않는다.
- 올바른 예: `categories: frontend`
- 잘못된 예: `categories: [Frontend]`, `categories: Git & GitHub`, `categories: [git, terminal]`, `categories: react`
  (대문자·표시명·여러 값·목록에 없는 값은 사이드바 개수와 카테고리 페이지에서 빠지고 URL 도 달라진다)
- 글을 저장하기 전에 `categories` 값이 위 표의 slug 와 글자 하나까지 같은지 확인한다.
