# Community Frontend (Vanilla JS)

## 개요

- Vanilla JS로 만든 커뮤니티 서비스입니다.

## 특징

- 단일 페이지 애플리케이션입니다.
- Spring Boot 백엔드(`http://localhost:8080`)와 쿠키 기반으로 통신하며, `history.pushState`로 라우팅을 관리합니다.
- 빌드 도구 없이 정적 자바스크립트 모듈만 사용하므로, 정적 서버만 띄우면 즉시 실행됩니다.

## 실행 방법

1. 백엔드 서버를 먼저 실행합니다. [백엔드 링크](https://github.com/100-hours-a-week/ktb3-bluer-full/tree/main/week04/main-assignment/community)
   - Spring Boot 서버를 `http://localhost:8080`에서 실행합니다. (예: `./gradlew bootRun`)

2. 프론트엔드를 루트에서 실행합니다.
   ```bash
   npx live-server . --port=5500
   ```
3. 브라우저에서 `http://localhost:5500` 접속.

## 주요 기능

- **인증/계정**: 로그인, 회원가입(닉네임/이메일 중복 검사, 프로필 이미지 업로드), 로그인 상태 자동 복원, 로그아웃, 회원탈퇴.
- **사용자 관리**: 프로필 조회·수정(닉네임 중복 재검사, 이미지 교체), 비밀번호 변경.
- **게시글**: 목록 무한 스크롤(5개씩 추가 로드), 작성/수정/삭제, Cloudinary 이미지 업로드, 상세 보기, 좋아요 토글, 조회수·댓글수·좋아요수 표시.
- **댓글**: 작성/수정/삭제, 작성자만 수정·삭제 가능하도록 프론트 단 권한 체크.
- **UX 요소**: 헤더 드롭다운(뒤로가기/로그인/프로필/비밀번호 변경/로그아웃), 공용 토스트 알림, 공용 모달 확인창.

### Demo 영상
<table>
  <tr>
    <td style="vertical-align: top; padding: 10px;">
      <strong>회원가입 · 로그인</strong><br/>
      <video src="https://github.com/user-attachments/assets/0645526e-4f31-4f1f-b014-9b7cb20dce25" controls width="360"></video>
    </td>
    <td style="vertical-align: top; padding: 10px;">
      <strong>로그인/로그아웃</strong><br/>
      <video src="https://github.com/user-attachments/assets/f42b2e06-c87b-46d1-8144-a9180c5f4fee" controls width="360"></video>
    </td>
  </tr>
  <tr>
    <td style="vertical-align: top; padding: 10px;">
      <strong>게시글 조회/작성/수정/삭제</strong><br/>
      <video src="https://github.com/user-attachments/assets/dbece29b-8fed-4afa-b73a-4b63838f12a8" controls width="360"></video>
    </td>
    <td style="vertical-align: top; padding: 10px;">
      <strong>게시글 좋아요 Toggle / 댓글</strong><br/>
      <video src="https://github.com/user-attachments/assets/5d47fc2b-d213-415f-b8fd-409e597f47e7" controls width="360"></video>
    </td>
  </tr>
</table>




## 디렉토리 구조 (요약)

```
css/                # 공통 및 페이지별 스타일
public/logo.png     # 로고
src/
  components/       # 헤더, 게시글/댓글/포스트 상세 컴포넌트
  lib/              # 라우터, 스토어, API 래퍼, 유틸, 검증, 외부 연동
  pages/            # 라우팅되는 페이지 컴포넌트
  template/         # 템플릿 문자열 (회원가입 등)
index.html          # 엔트리 (Pretendard, Font Awesome CDN 포함)
```

## 기술적 특징

### 전역 상태 관리

- [`src/lib/store.js`](./src/lib/store.js)에서 전역 로그인 상태를 관리하며, 라우트 변경/로그인/로그아웃을 구독합니다.
  - `subscribe` 로 구독하길 원하는 액션명을 기입하여 활용합니다.
    ```javascript
    subscribe((globalState, type) => {
      if (type === "LOGIN") {
        this.moveTo("posts");
      } else if (type === "LOGOUT") {
        this.moveTo("login");
      }
    });
    ```
  - 전역적으로 영향을 미칠 이벤트는 `dispatch`로 전파합니다.

    ```javascript
    try {
      const result = await apiManager.getUserProfile();

      if (result.status === StatusCode.OK) {
        dispatch("LOGIN", {
          userId: result.data.id,
        });
      }
    } catch (error) {
      dispatch("LOGOUT");
    }
    ```

### Single Page Application

- [`src/lib/router.js`](./src/lib/router.js)는 `history.pushState` 기반 SPA 라우팅을 처리하고, 잘못된 경로는 404 화면을 렌더링합니다.
  - 라우팅 관련 세부 로직은 [`route.md`](./route.md)를 참고해 주세요.
- [`src/lib/api/apiManager.js`](./src/lib/api/apiManager.js)가 모든 REST 호출을 모으고, `restClient`에서 공통 헤더와 타임아웃, `credentials: "include"`를 설정합니다.
- 게시글/댓글 이미지 업로드는 Cloudinary REST API를 직접 호출합니다(`uploadToImageBucket`).


### Vanilla JS 기반 Mini Component System
* 학습을 위해 일부 컴포넌트엔 React의 Element 생성 방식과 유사하게 Element를 생성하도록 구현했습니다.
* 적용 코드:
  - [`src/lib/dom.js`](./src/lib/dom.js)
  - [`src/components/PostDetail/PostStats.js`](./src/components/PostDetail/PostStats.js)
  - [`src/components/PostDetail/PostContent.js`](./src/components/PostDetail/PostContent.js)

## 이외

- 코드는 번들링 없이 ES Module을 사용하므로, 상대경로를 유지한 채 정적 서버에서 실행해야 합니다.
- 포매팅 설정은 `.prettierrc`에 있으며, 별도 빌드 스텝은 없습니다.
- 무한 스크롤 페이지네이션 파라미터(`POSTS_PER_PAGE`, `cursor/size`)는 `src/pages/PostList.js`와 백엔드 응답 규약(`posts`, `nextCursor`, `hasNext`)에 의존합니다.
