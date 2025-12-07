# Community Frontend (React JS)

## 개요

- React JS로 만든 커뮤니티 서비스입니다.

## 특징

- 단일 페이지 애플리케이션입니다.
- Spring Boot 백엔드(`http://localhost:8080`)와 쿠키 기반으로 통신하며, `React Router`로 라우팅을 관리합니다.

## 실행 방법

1. 백엔드 서버를 먼저 실행합니다. [백엔드 링크](https://github.com/100-hours-a-week/ktb3-bluer-full/tree/main/week04/main-assignment/community)
   - Spring Boot 서버를 `http://localhost:8080`에서 실행합니다. (예: `./gradlew bootRun`)

2. 프론트엔드를 루트에서 실행합니다.
   ```bash
    npm run dev
   ```
3. 브라우저에서 `http://localhost:5173` 접속.

## 주요 기능

- **인증/계정**: 로그인, 회원가입(닉네임/이메일 중복 검사, 프로필 이미지 업로드), 로그인 상태 자동 복원, 로그아웃, 회원탈퇴.
- **사용자 관리**: 프로필 조회·수정(닉네임 중복 재검사, 이미지 교체), 비밀번호 변경.
- **게시글**: 목록 무한 스크롤(5개씩 추가 로드), 작성/수정/삭제, Cloudinary 이미지 업로드, 상세 보기, 좋아요 토글, 조회수·댓글수·좋아요수 표시.
- **댓글**: 작성/수정/삭제, 작성자만 수정·삭제 가능하도록 프론트 단 권한 체크.
- **UX 요소**: 헤더 드롭다운(뒤로가기/로그인/프로필/비밀번호 변경/로그아웃), 공용 토스트 알림, 공용 모달 확인창.

<br />
<br />

# Demo

## Image
| 회원가입 | 로그인 | 마이페이지 |
|---|---|---|
| <img src="https://github.com/user-attachments/assets/3bbbc57c-c7c7-435c-811a-6c096c5c5267" width="300" /> | <img src="https://github.com/user-attachments/assets/bfb20ce3-eccf-4846-886b-4c49d55e087a" width="300" /> | <img src="https://github.com/user-attachments/assets/3f35f0e6-dec3-45fe-8681-dcd4bbe492d4" width="300" />  |

| 게시글 리스트 |게시글 디테일/댓글/드롭다운|
|---|---|
| <img src="https://github.com/user-attachments/assets/6bd7a9f6-7938-4924-87c7-188686cb5e44" width="300" /> |<img src="https://github.com/user-attachments/assets/86d4e3ca-7447-4e49-88f6-09a2d574aa54" width="300" /> | 



<br />
<br />

# 디렉토리 구조

<details>
   
    
   ```
    .
    ├── public
    └── src
        ├── components                # 공용 컴포넌트
        │   ├── bottomNav             # 네비게이션 영역
        │   ├── header                # 헤더 영역에 쓰인 컴포넌트
        │   ├── item
        │   ├── page                  # 주요 페이지, 페이지별 컴포넌트
        │   │   ├── JoinPage
        │   │   ├── PostDetailPage
        │   │   └── UserInfoPage
        │   └── ui                    # 공통 UI 컴포넌트
        ├── contexts                  # LifeCycle 등 context 사용하는 로직
        ├── hooks                     # Custom hooks
        │   ├── api                   # api 관련 hook
        │   └── route                 # routing 동작 관련 hook
        ├── layouts                   # 공통 레이앙웃
        ├── lib
        │   ├── api
        │   └── extenal
        ├── pages                     # 개별 페이지 컴포넌트
        ├── router                    # 라우터 관련 공용 로직
        ├── service                   # 이외 서비스 로직
        └── utils
 ```   
  </details>

<br />
<br />

# 기술적 특징

## Custom Fetch Hook

- API fetch 동작은 공용화하여 hook으로 작성하였습니다. [`src/hooks/api/useApi.jsx`](./src/hooks/api/useApi.jsx)에서 확인 가능하며, `Tanstack Query`, `SWR`에서 제공하는 api 통신으로 인한 상태값 관리 hook을 본따 만들었습니다.
  - `data, isLoading, isError, mutate` 동작을 구현했습니다.
  - <details>
      <summary>useApi 구현</summary>

    ```javascript
    import { useCallback, useEffect, useState } from "react";
    import { restClient } from "@/lib/api/restClient";

    function useApi(requestUrl, params) {
      const [data, setData] = useState(null);
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState(null);

      const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
          const { data } = await restClient.get(requestUrl, params);

          setData(data);
        } catch (error) {
          console.error(error);
          setError(true);
        } finally {
          setIsLoading(false);
        }
      }, [params, requestUrl]);

      useEffect(() => {
        fetchData();
      }, [fetchData]);

      return { data, isLoading, isError: !!error, mutate: fetchData };
    }

    export default useApi;
    ```

    </details>




## Compound 패턴 적용

- 학습을 위해 일부 컴포넌트엔 Compound 패턴을 적용해 보았습니다.
- 적용 코드:
  - [`src/components/ui/Dropdown.jsx`](./src/components/ui/Dropdown.jsx)
  - <details>
      <summary>Dropdown.jsx</summary>

    ```javascript
    import React, { createContext, useContext, useEffect, useRef } from "react";

    const DropdownContext = createContext();

    export function Dropdown(props) {
      const { children, direction = "left", className = "" } = props;
      const ref = useRef(null);
      const [open, toggle] = React.useState(false);

      useEffect(() => {
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            toggle(false);
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);

      return (
        <div
          ref={ref}
          className={`absolute top-1.5 ${direction === "left" ? "left-1.5" : "right-1.5"} ${className}`}
        >
          <DropdownContext.Provider value={{ open, toggle, direction }}>
            {children}
          </DropdownContext.Provider>
        </div>
      );
    }

    function Trigger(props) {
      const { children } = props;
      const { open, toggle } = useContext(DropdownContext);

      return <div onClick={() => toggle(!open)}>{children}</div>;
    }

    function List(props) {
      const { children, className = "" } = props;
      const { open, direction } = useContext(DropdownContext);

      return (
        open && (
          <ul
            className={`bg-base-white border-base-grey absolute top-7 w-40 border-2 p-0 ${direction === "left" ? "left-1.5" : "right-1.5"} z-1 ${className} `}
          >
            {children}
          </ul>
        )
      );
    }

    function Item(props) {
      const { children, onClick } = props;

      return (
        <li className="hover:bg-base-grey cursor-pointer list-none p-4" onClick={onClick}>
          {children}
        </li>
      );
    }

    Dropdown.Trigger = Trigger;
    Dropdown.List = List;
    Dropdown.Item = Item;
    ```

    </details>
