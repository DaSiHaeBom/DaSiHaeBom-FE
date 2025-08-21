// import axios from 'axios';

// // baseURL
// const baseURL = import.meta.env.VITE_API_BASE_URL;

// // _retry 확장 정의
// /**
//  @typedef {import('axios').InternalAxiosRequestConfig & {_retry?: boolean}} RetryableRequestConfig
//  */

// const baseAxiosInstance = axios.create({
//   baseURL,
//   withCredentials: true, // 서버에서 반환해주는 토큰을 자동으로 httpOnly 쿠키에 저장 및 활용
//   timeout: 1000 * 15, // timeout 15초
//   headers: {
//     'Content-Type': 'application/json',
//     accept: 'application/json',
//   },
// });

// // 요청 인터셉터
// baseAxiosInstance.interceptors.request.use(async config => {
//   // await new Promise(resolve => setTimeout(resolve, 1000)); // 로딩 상태 테스트를 위해 1000ms 지연
//   return config;
// });

// // 응답 인터셉터 (로그인 기능 제거로 주석 처리)
// baseAxiosInstance.interceptors.response.use(
//   res => res, // 응답 성공하면 그대로 통과시킴
//   // 에러 나면 아래 로직으로 에러 핸들링
//   async error => {
//     // 이전 요청이 에러났을 때의 config 객체
//     const originalRequest = error.config;

//     // unauthorized(401) 에러인지 확인
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       // 같은 요청이 무한 반복되지 않도록 true로 설정. 같은 요청이 또 실패해도 재시도하지 않음.
//       originalRequest._retry = true;

//       // 토큰 갱신 로직 실행
//       try {
//         await axios.post('/api/v1/auth/refresh', null, {
//           baseURL,
//           withCredentials: true,
//         });

//         return baseAxiosInstance(originalRequest);
//       } catch {
//         // 토큰 갱신에 실패하면 로그인 페이지로 리다이렉트
//         window.location.href = '/login';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default baseAxiosInstance;

// 프록시 설정
import axios from 'axios';

// 개발환경에서는 프록시 사용, 프로덕션에서는 실제 URL
const baseURL = import.meta.env.DEV
  ? '' // 개발환경: 프록시 사용
  : import.meta.env.VITE_API_BASE_URL;

const baseAxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 1000 * 15,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

// 요청 인터셉터
baseAxiosInstance.interceptors.request.use(async config => {
  return config;
});

// 응답 인터셉터
baseAxiosInstance.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 개발환경에서는 프록시 경로 사용
        const refreshURL = import.meta.env.DEV
          ? '/api/v1/auth/refresh'
          : `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/refresh`;

        await axios.post(refreshURL, null, {
          withCredentials: true,
        });

        return baseAxiosInstance(originalRequest);
      } catch {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default baseAxiosInstance;
