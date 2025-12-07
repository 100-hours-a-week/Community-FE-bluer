# 라우팅 path

| 경로                  | 화면                      |
| --------------------- | ------------------------- |
| `/` , `/posts`        | 게시글 목록 (무한 스크롤) |
| `/posts/create`       | 게시글 작성               |
| `/posts/:postId`      | 게시글 상세/좋아요/댓글   |
| `/posts/:postId/edit` | 게시글 수정               |
| `/login`              | 로그인                    |
| `/signup`             | 회원가입                  |
| `/user-info`          | 프로필 수정/탈퇴          |
| `/change-password`    | 비밀번호 변경             |

# 라우팅 로직 요약

- [`src/lib/router.js`](./src/lib/router.js)

```mermaid
flowchart LR

  A[페이지 최초 진입] --> B[initRouteHandler]
  B --> C[popstate 리스너 등록]
  B --> D[handleRoute]

  subgraph ROUTE[handleRoute 흐름]
    direction LR

    D --> E[라우트 매칭]
    E --> F{매칭됨?}

    F -- No --> G[404 렌더]
    G --> H[dispatch ROUTE_CHANGE]

    F -- Yes --> I[safeCleanUp]
    I --> J[새 페이지 인스턴스 생성]
    J --> K[currentPageInstance 업데이트]
    K --> L[dispatch ROUTE_CHANGE]
  end

  subgraph MOVE[moveToPage]
    direction LR
    M[moveToPage 호출] --> N{경로 변경?}
    N -- Yes --> O[pushState 후 handleRoute]
    N -- No --> P[아무 작업 없음]
  end

  C --> Q[popstate 발생]
  Q --> R[handleRoute 재실행]

```
