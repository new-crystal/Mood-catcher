# ✨무드캐처 (mood catcher)

- **무드 캐쳐를 꿈꾸는 모든 일반인들을 위한 커뮤니티 사이트.**
- 지도를 통해 내 주변 사람들의 옷장을 볼 수 있습니다.
- 검색을 통해 내가 원하는 정보를 얻을 수 있습니다.
- 좋아요에 따른 메인의 핫게시물에 등재될 수도 있고 역대 핫게시물들을 볼 수 있는 명예의 전당이 있습니다.
- 다른 유저의 착장 정보를 볼 수 있고 착장 정보를 바로 사러 갈 수 있습니다.(무신사 연동)
- 게시물에 달린 댓글과 댓글 안의 댓글로 유저들끼리 소통을 할 수 있습니다.
- 유저들은 참여할 때마다 포인트를 받고 포인트로 레벨이 상승 돼 흥미도를 높일 수 있습니다.
- 무드캐처 바로가기 : https://moodcatch.link/

# 📆 프로젝트 기간

- 2022/08/26 ~ 2022/10/07

 
 # 기술 소개

- 무한스크롤 기능
- 카카오 맵 구현
- 검색 기능
- PWA 구현
- kakao 로그인 구현
- 회원가입, 로그인 시 비밀번호 암호화 구현
- 상태관리(redux)
- 코드분할(code-splitting)

# 1. 팀 소개

- React, Node.js 기반
- 개발인원: 7명
  1. Front-end: 박준수, 신수정
  2. Back-end: 조권영, 황수민, 이수범
  3. Designer: 김유나
  4. PM: 김승빈

# 2. 프로젝트 설명

- 개발언어 : JavaScript, React
- 배포환경 : S3, Route 53, CloudFront
- 협업 툴 : git / notion / figma
- 상태관리 : Reduxjs/toolkit

# 3. 사용한 라이브러리(패키지)

```jsx
    "axios": "^0.27.2", //서버와 통신
    "bcryptjs": "^2.4.3", //회원가입, 로그인시 비밀번호 암호화 전송
    "cross-env": "^7.0.3", //환경변수 관리
    "jwt-decode": "^3.1.2", //토큰 복호화
    "lodash": "^4.17.21", //무한스크롤 
    "react-hook-form": "^7.34.2", //폼 태그 유효성 검사
    "react-pwa-install": "^1.0.12", // PWA
    "react-redux": "^8.0.2", //데이터 전역상태관리
    "react-router-dom": "^6.3.0", // 페이지 전환
    "styled-components": "^5.3.5", //css 관리
    "sweetalert2": "^11.4.33", // alert창 관리

```

# 4. 데이터 흐름도

![image](https://user-images.githubusercontent.com/87622597/188310315-d59f7259-d564-4819-ab2c-4f7e7c5991cb.png)

# 5. 와이어 프레임

[https://www.figma.com/file/jtjWzOYOVgJ5I4dtneHYwG/무드캐쳐?node-id=117%3A247](https://www.figma.com/file/jtjWzOYOVgJ5I4dtneHYwG/%EB%AC%B4%EB%93%9C%EC%BA%90%EC%B3%90?node-id=117%3A247)
