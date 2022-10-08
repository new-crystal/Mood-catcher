![192130770-c8eda380-621c-4d14-b3d0-bf489260ef65](https://user-images.githubusercontent.com/109053875/194685680-415a896c-197c-4c19-bf17-9c96970c2477.png)

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
<img width="862" alt="스크린샷 2022-10-08 오후 12 23 35" src="https://user-images.githubusercontent.com/109053875/194685724-265a98a0-3364-4161-a80f-e0260f67a955.png">

<details>
<summary>무한스크롤 기능</summary>
<div markdown="1">       
 <img width="462" alt="ezgif com-gif-maker" src="https://user-images.githubusercontent.com/109053875/194686473-4b3779de-3c45-4d6c-8f60-5964f6079487.gif">
 <img width="462" alt="code" src="https://user-images.githubusercontent.com/109053875/194686572-fd606a7e-1e00-45af-be04-6cb70be1237d.png">

 - lodash 라이브러리의 throttle을 이용하여 동일 이벤트가 반복적으로 시행되는 경우, 
  이벤트의 실제 반복 주기와 상관 없이 임의로 설정한 일정 시간 간격으로 실행하게 하여 함수호출의 빈도를 감소시킴
</div>
</details>

<details>
<summary>카카오 맵 구현</summary>
<div markdown="1">       
<img width="428" alt="스크린샷 2022-10-08 오후 1 03 05" src="https://user-images.githubusercontent.com/109053875/194687298-5e235fc6-0dda-427c-95b2-b22481865c79.png">

😎😎

</div>
</details>
</details>

<details>
<summary>검색 기능</summary>
<div markdown="1">       
<img width="423" alt="스크린샷 2022-10-08 오후 12 49 50" src="https://user-images.githubusercontent.com/109053875/194686831-c3898fd8-1e18-4ab2-b066-138533e56c7d.png">
<img width="511" alt="스크린샷 2022-10-08 오후 12 49 38" src="https://user-images.githubusercontent.com/109053875/194686845-43056546-0767-49a3-a491-03cf81035de5.png">
 
- url로 keyword와 sort를 넘겨주어 검색하는 방식
- 검색 결과 페이지에서 재검색을 했을 경우 state를 변경시켜 재렌더링 함
</div>
</details>

<details>
<summary>PWA 구현</summary>
<div markdown="1">      
<img width="425" alt="스크린샷 2022-10-08 오후 12 52 04" src="https://user-images.githubusercontent.com/109053875/194687010-8ad189d2-2db7-4fb3-b101-3a1d8755d93f.png">


😎😎

</div>
</details>
<details>
<summary>kakao 로그인 구현</summary>
<div markdown="1">       
<img width="425" alt="카카오" src="https://user-images.githubusercontent.com/109053875/194687017-ec056e3a-b91e-4e9c-869c-cbcbe21de44f.png">
<img width="1269" alt="스크린샷 2022-10-08 오후 12 56 10" src="https://user-images.githubusercontent.com/109053875/194687063-27ce6d13-3cc7-4055-9750-63f08fae3925.png">
 
- 카카오 개발자 페이지에서 닉네임/성별 창으로 토큰을 url로 주어 리다리엑트 하는 방식

</div>
</details>
<details>
<summary>회원가입, 로그인 시 비밀번호 암호화 구현</summary>
<div markdown="1">       
<img width="589" alt="스크린샷 2022-10-08 오후 12 59 13" src="https://user-images.githubusercontent.com/109053875/194687181-dcffc72a-1fd9-454b-828e-3a54d2ee7981.png">
<img width="566" alt="스크린샷 2022-10-08 오후 12 57 59" src="https://user-images.githubusercontent.com/109053875/194687185-cd7805ad-a6f0-4eb9-afc0-c14ec07c1392.png">
 
- 백엔드에서 DB로 저장할 때 암호화를 하기는 하지만 회원가입과 로그인 때 네트워크 창에서 비밀번호가 공개되는 것을 방지하기 위해 암호화 해서 전송

</div>
</details>
<details>
<summary>상태관리(redux)</summary>
<div markdown="1">       



</div>
</details>
<details>
<summary>코드분할(code-splitting)</summary>
<div markdown="1">       



</div>
</details>

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

```

# 4. 데이터 흐름도

![image](https://user-images.githubusercontent.com/87622597/188310315-d59f7259-d564-4819-ab2c-4f7e7c5991cb.png)

# 5. 와이어 프레임

[https://www.figma.com/file/jtjWzOYOVgJ5I4dtneHYwG/무드캐쳐?node-id=117%3A247](https://www.figma.com/file/jtjWzOYOVgJ5I4dtneHYwG/%EB%AC%B4%EB%93%9C%EC%BA%90%EC%B3%90?node-id=117%3A247)

# 6. 주요 트러블 슈팅

