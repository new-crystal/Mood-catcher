import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "./cookie";
import Swal from "sweetalert2";

// axios 기본 주소 & header 타입 세팅
export const instance = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
});

// 매 실행 시 토큰값 넣기, 없으면 null값이 들어간다
instance.interceptors.request.use(function (config) {
  const accessToken = getCookie("token");
  config.headers.common["authorization"] = `Bearer ${accessToken}`;
  return config;
});

// //┏----------interceptor를 통한 header 설정----------┓
// instance.interceptors.request.use(async (config) => {
//   config.headers["content-type"] = "application/json; charset=utf-8";
//   config.headers["X-Requested-With"] = "XMLHttpRequest";
//   config.headers["Accept"] = "*/*";
//   //getToken는 로컬 스토리지에 토큰이 있다면 반환한다 없다면 null 값 반환
//   config.headers["authorization"] = await getToken();
//   return config;
// });

// // ┏----------interceptor를 통한 response 설정----------┓
// instance.interceptors.response.use(
//   async (response) => {
//     if (response.data.message === "new token") {
//       const { config } = response;
//       const originalRequest = config;

//       const newAccessToken = response.data.myNewToken;
//       setCookie("token", newAccessToken);

//       axios.defaults.headers.common.authorization = `Bearer ${newAccessToken}`;
//       originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
//       return axios(originalRequest);
//     }

//     return response;
//   },
//   async (error) => {
//     const {
//       config,
//       response: { status },
//     } = error;

//     if (
//       status === 401 &&
//       error.response.data.message !== "비밀번호가 틀렸습니다."
//     ) {
//       deleteCookie("token");
//       Swal.fire("로그인", "로그인 시간이 만료되었습니다.", "error");
//     }
//     return Promise.reject(error);
//   }
// );

// 알람 관련 axios API 통신
// alarmSlice
export const alarmApi = {
  // 알람 조회하기
  getAlarm: () => instance.get("/notice"),
  // 알람 삭제하기
  deleteAlarm: () => instance.delete("/notice"),
};

// 댓글 관련 axios API 통신
// commentSlice
export const commentApi = {
  // 댓글 조회하기
  getComments: (postId) => instance.get(`/comments?postId=${postId}`),
  // 댓글 작성하기
  addComment: (data) =>
    instance.post(`/comments?postId=${data.postId}`, {
      content: data.comment,
    }),
  // 댓글 수정하기
  editComment: (comment) =>
    instance.put(`/comments/${comment.commentId}`, {
      content: comment.comment,
    }),
  // 댓글 삭제하기
  deleteComment: (comment) => instance.delete(`/comments/${comment.commentId}`),
  // 대댓글 작성하기
  addRecomment: (reComment) =>
    instance.post(`/recomments?commentId=${reComment.commentId}`, {
      content: reComment.comment,
    }),
  // 대댓글 수정하기
  editRecomment: (reComment) =>
    instance.put(`/recomments/${reComment.recommentId}`, {
      content: reComment.comment,
    }),
  // 대댓글 삭제하기
  deleteRecomment: (reComment) =>
    instance.delete(`/recomments/${reComment.recommentId}`),
};

// 카카오 관련 axios API 통신
// kakaoSlice
export const kakaoApi = {
  // kakao맵 유저 위치 보내기
  patchKakaoMap: (data) => instance.patch("/map", { data }),
  // kakao맵 유저들 위치 받기
  getKakaoUsers: () => instance.get("/map?dist=5.0"),
};

// 좋아요 관련 axios API 통신
// likeSlice
export const likeApi = {
  // 게시물 조회하기 (좋아요페이지)
  getLikeAllPosts: (data) =>
    instance.get(
      `/posts?userId=${data.userId}&type=like&page=${data.paging}&count=4`
    ),
  // 무드(좋아요) 등록/취소
  patchMood: (postId) => instance.patch(`/like?postId=${postId}`),
};

// 로그인 관련 axios API 통신
// loginSlice
export const loginApi = {
  // 로그인
  login: (data) => instance.post("auth/login", data),
  // 닉네임 중복 체크
  checkNickname: (nickname) =>
    instance.get(`/auth/checkNickname?nickname=${encodeURI(nickname)}`),
  // 성별, 닉네임, 나이 작성하기
  addLoginDetail: (data) => instance.post("/auth/detail", data),
  // 소셜 로그인
  socialLogin: () => instance.get("/auth/kakao"),
  // 프로필 수정
  editProfile: (data) =>
    instance.put(
      `/users?nickname=${encodeURI(data.nickname)}&gender=${data.gender}&age=${
        data.age
      }`,
      data.userValue,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    ),
  // 회원 탈퇴
  deleteUser: () => instance.delete("/user/signout"),
  // 유저 정보 조회
  getUser: (userId) => instance.get(`/users/${userId}`),
  // 프로필 아이콘 바꾸기
  patchUser: (data) => instance.patch("/users", data),
};

// 게시물 조회 관련 axios API 통신
// rankSlice
export const rankApi = {
  // 인기 게시물 조회하기
  getHotPosts: () => instance.get("/posts/popular"),
  // 게시물 조회하기 (메인페이지)
  getMainAllPosts: (data) =>
    instance.get(
      `/posts?userId=${data.userId}&type=all&page=${data.paging}&count=2`
    ),
  //명예의 전당 게시물 조회하기
  getBestPosts: (data) => instance.get(`/posts/honor?page=${data}&count=3`),
};

// 검색 관련 axios API 통신
// searchSlice
export const searchApi = {
  // 추천 게시물 조회하기 (검색페이지)
  getSearch: (page) => instance.get(`/posts?type=alg&page=${page}&count=4`),
  // 추천 게시물 조회하기 (검색 결과창)
  getSearchResult: (data) =>
    instance.get(
      `/posts?type=search&keyword=${encodeURI(data.key)}&sort=${
        data.sort
      }&page=${data.page}&count=4`
    ),
};

// 회원가입 관련 axios API 통신
// signupSlice
export const signupApi = {
  // 회원가입
  signup: (data) => instance.post("/auth/signup", data),
  // 이메일 중복 체크
  checkEmail: (email) => instance.get(`/auth/checkEmail?email=${email}`),
  // 유저 정보 조회하기
  getUsers: (userId) => instance.get(`/users/${userId}`),
  // 초기화면 조회하기
  getOpen: () => instance.get("/start"),
  //이메일 인증번호 발송하기
  postEmail: (data) => instance.post("/auth/sendEmail?type=signup", data),
  //비밀번호 찾을 때 이메일 발송
  findEmail: (data) => instance.post("/auth/sendEmail?type=password", data),
  //비밀번호 변경
  putPW: (data) =>
    instance.put(
      `/api/auth/updatePw?email=${data.email}&authNum=${data.authNum}`,
      data
    ),
  //인증번호 확인
  postAuthNum: (data) =>
    instance.get(
      `/auth/check-authnum?email=${data.email}&autnNum=${data.authNum}`
    ),
};

// 업로드 관련 axios API 통신
// uploadSlice
export const uploadApi = {
  // 게시물 작성하기
  addPost: (post) => instance.post("/posts", post),
  // 게시물 수정하기
  editPost: (post) => instance.put(`/posts/${post.postId}`, post.totalPost),
  // 게시물 삭제하기
  deletePost: (post_id) => instance.delete(`/posts/${post_id}`),
  // 이미지 업로드하기
  uploadImage: (data) =>
    instance.put(`/posts/${data.postId}/image`, data.postImage, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    }),
  // 상품 찾기(무신사)
  getMusinsa: (data) => instance.get(`/musinsa/${data}?page=1&count=9`),
  // 게시물 상세 조회하기
  getDetail: (postId) => instance.get(`/posts/detail/${postId}`),
  // 옷장 게시물 가져오기
  getMyPage: (userId) => instance.get(`/posts?userId=${userId}&type=my`),
  // 옷장 게시물 가져오기 (옷장페이지)
  getMyCloset: (data) =>
    instance.get(
      `/posts?userId=${data.userId}&type=my&page=${data.paging}&count=4`
    ),
  // 대표 게시물 조회하기
  getRepresentative: (userId) => instance.get(`/posts/rep?userId=${userId}`),
  // 대표 게시물 지정 및 수정하기
  editRepresentative: (postId) => instance.patch(`/posts/${postId}`),
};

export default instance;
