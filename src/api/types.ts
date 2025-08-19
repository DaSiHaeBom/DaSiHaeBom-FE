// API 응답 기본 타입
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

// 휴대폰 인증 응답 타입
export interface PhoneVerificationResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}

// 회원가입 응답 타입
export interface SignupResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}
