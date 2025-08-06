# Fearless - LoL 밴픽 시뮬레이션

- Fearless 배포 주소 : [Fearless](https://fearless-lab.github.io/)

<br />

## 🚀 프로젝트 소개
Fearless는 리그 오브 레전드(LoL)의 밴픽(Ban & Pick) 과정을 시뮬레이션하여, 팀 전략 수립과 밴픽 연습을 돕는 웹 기반 도구입니다.
- 실시간 밴픽 진행
- 다양한 모드 지원 (토너먼트 드래프트, 소프트 피어리스, 하드 피어리스)
- 이전 세트 기록 및 스왑 기능 제공

<img width="780" height="465" alt="image" src="https://github.com/user-attachments/assets/e385b275-6c03-49ac-8d20-955734b356b8" />
<img width="780" height="465" alt="image" src="https://github.com/user-attachments/assets/7e2366eb-380d-4989-894d-9977d3a372b5" />
<img width="780" height="465" alt="image" src="https://github.com/user-attachments/assets/c50917a1-fefe-4cd1-9f8f-22de9caa59ab" />



<br />

## 🕒 개발 일정
- MVP 개발 : 2025.07.19 ~ 2025.08.05
- 추가 기능 개발 : 커뮤니티 기능 (미정)

<br />

## ⚠️ 기술적 고민

- 본 프로젝트는 2개 이상의 클라이언트에서 동시에 진행되는 실시간 시뮬레이션 특성상, 멀티 클라이언트 환경에서 발생하는 복잡한 동기화 문제와 상태 관리, 경쟁 조건(race condition) 등 다양한 이슈를 경험하고 해결해야 했습니다.
- 특히 내 차례, 상대 차례, 밴, 픽, 스왑, 게임 종료, 진영 선택, 다음 게임 준비 완료 여부 등 다양한 상황에 따른 세밀한 분기 처리가 필요해 로직 설계와 상태 관리가 매우 까다로웠습니다.
아래는 주요 문제와 해결 과정을 정리한 내용입니다.

### 1. 카운트다운 타이머 동기화 문제
- Firestore `onSnapshot`을 통해 실시간 데이터 변화를 감지하여 카운트다운 시작
- 단순히 `setInterval`로 타이머를 돌리면, 탭 비활성화 시 실행 지연으로 인해 클라이언트별 시간 불일치 발생
- 해결책으로 타이머 시작 기준 시간을 Firestore에 저장하여 모든 클라이언트가 서버 시간을 기준으로 경과 시간을 계산
- 클라이언트 상태에 의존하지 않고 서버 기준으로 동기화된 타이머 구현 성공

### 2. 중복 요청(race condition) 문제 해결
- 두 클라이언트(양 팀)가 동시에 다음 단계로 넘어가는 함수를 호출해 단계가 클라이언트 수만큼(2번 이상) 중복 증가하는 문제 발생
- Firestore 트랜잭션을 활용해 충돌 감지 및 자동 재시도로 중복 증가 방지
- 조건 검사를 통해 이미 반영된 변경을 다시 처리하지 않도록 구현
- 덕분에 안전하고 원자적인 단계 변경이 가능해짐  
👉 Firestore의 낙관적 동시성 제어(Optimistic Concurrency Control)를 직접 경험한 사례

<br />

## 🛠️ SEO 개선 과정

### 1. React 내장 `<meta>` 컴포넌트를 활용한 동적 메타데이터 관리 및 초기 기대
- React에서 제공하는 내장 `<meta>` 컴포넌트를 컴포넌트 내부에서 직접 렌더링하여, 동적으로 메타데이터를 관리했습니다.  
- React는 이 메타 태그들을 자동으로 문서 `<head>`에 배치해주므로, 별도의 라이브러리 없이 SEO 메타 태그를 간편하게 관리할 수 있었습니다.
- 또한 index.html에도 meta, link, title 등의 정적 메타 정보를 추가하여 초기 로딩 시에도 의미 있는 SEO 정보가 포함되도록 보완했습니다.
- 이 덕분에 Lighthouse 기준 SEO 점수 100점을 달성했고, 처음엔 이것만으로 충분하다고 생각했습니다.
- 하지만 실제로 구글 크롤러가 사이트를 제대로 색인하는지 확인하는 것이 더 중요하다는 걸 알게 되었습니다.

### 2. 크롤링 문제 발견 및 대응
- React SPA를 GitHub Pages에 배포한 특성상, 루트 경로 외 페이지에서 404 오류가 발생해 구글 크롤러가 색인을 못하는 문제가 있었습니다.
- 실제 사용자는 GitHub Pages의 404.html 리디렉션 덕분에 페이지를 문제 없이 이용할 수 있었지만, 크롤러는 이를 인식하지 못해 색인에 어려움이 있었습니다.
- 구글 서치 콘솔을 통해 색인 요청을 했음에도, React SPA와 GitHub Pages의 한계로 인해 발생하는 404 오류 문제는 추가적인 해결책이 필요했습니다.

### 3. 해결 방법 도입
- `react-static-prerender`를 사용해 정적 HTML을 사전 렌더링하여 모든 경로에서 정적 페이지가 서빙되도록 수정했습니다.  
- 이를 통해 구글 검색 결과에서 특정 키워드 기준으로 1페이지 5위에 노출되는 성과를 얻었습니다.

### 4. Next.js 마이그레이션 고려
- 완전한 SSR로의 이전(Next.js)을 고민했으나, 현재 방식으로도 유의미한 결과를 얻었기에 당분간 유지하기로 결정했습니다.

### 5. 참고 레퍼런스
- [react-static-prerender](https://github.com/jankojjs/react-static-prerender): React SPA를 정적 HTML 파일로 사전 렌더링하는 CLI 도구로, GitHub Pages와 같은 정적 호스팅 환경에서 SEO 최적화를 위해 사용되었습니다.
- [Reddit 게시글: Prerender React SPA to static HTML files](https://www.reddit.com/r/reactjs/comments/1lerjzr/prerender_react_spa_to_static_html_files_without/): 도구의 개발 배경과 사용 사례에 대한 설명이 잘 정리되어 있습니다.
- [React 공식 문서 - `<meta>` 컴포넌트](https://ko.react.dev/reference/react-dom/components/meta): React 컴포넌트 내부에서 `<meta>` 태그를 직접 사용할 수 있는 기능과 동작 방식에 대해 설명합니다.





