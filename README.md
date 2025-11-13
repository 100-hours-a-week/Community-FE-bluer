# Vanilla JS Community

## Config

- Local Development Proxy Setup (for CORS)
- 이 프로젝트는 Vanilla JS 프론트엔드와 Java Spring 백엔드를 로컬에서 분리 실행하는 구조입니다.
  - CORS 문제를 해결하기 위해 local-cors-proxy를 이용해 프록시 서버(localhost:5501)를 띄워야 합니다.

### 구조 요약

| 역할                  | 포트                              | 설명                           |
| --------------------- | --------------------------------- | ------------------------------ |
| Frontend              | `http://localhost:5500`           | live-server로 정적 페이지 실행 |
| Backend (Spring Boot) | `http://localhost:8080`           | Java Spring REST API 서버      |
| Proxy                 | `http://localhost:5501/proxy/...` | CORS 우회용 프록시 서버        |

## 실행 방법

### 1️⃣ 백엔드 실행

- Spring Boot 프로젝트를 먼저 실행합니다.
- `(Spring Boot Directory)/gradlew bootRun`
- 실행 후 API는 `http://localhost:8080/posts/` 등으로 접근 가능해야 합니다.

### 2️⃣ 프론트엔드 실행

- `live-server`
  - 기본 포트는 5500
    페이지 주소는 `http://localhost:5500`

### 3️⃣ 프록시 서버 실행 (CORS 우회)

- Install
  - `npm install -g local-cors-proxy`

- 실행
  - `lcp --proxyUrl http://localhost:8080 --port 5501`

### 접속

- `localhost:8080`

## App Structure (Vanilla JS)

```
├── css               // 도메인별 css
├── public
└── src
    ├── components    // 공통 컴포넌트 및, 페이지별 컴포넌트
    │   └── PostDetail
    ├── handlers
    ├── lib           // api, dom 조작 등 라이브러리성 파일들
    │   ├── api       // API server와의 통신
    │   └── external  // 3rd party 관련
    ├── pages         // 페이지 컴포넌트
    └── template      // html rendering을 위한 문자열 템플릿
```
