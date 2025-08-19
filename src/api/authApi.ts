import baseAxiosInstance from './baseAxiosApi';
import type { PhoneVerificationResponse, SignupResponse } from './types';

// 휴대폰 인증번호 발송 (회원가입용)
export const sendPhoneVerificationCode = async (
  phoneNumber: string
): Promise<PhoneVerificationResponse> => {
  const response = await baseAxiosInstance.post(
    '/api/v1/validations/phone/code/sign-up',
    {
      phoneNumber,
    }
  );
  console.log(response.data);
  return response.data;
};

// 휴대폰 인증번호 검증
export const verifyPhoneCode = async (
  phoneNumber: string,
  code: string
): Promise<PhoneVerificationResponse> => {
  const response = await baseAxiosInstance.post(
    '/api/v1/validations/phone/code/confirmation',
    {
      phoneNumber,
      code,
    }
  );
  return response.data;
};

// 개인 회원가입
export const personalSignup = async (signupData: {
  phoneNumber: string;
  password: string;
  name: string;
  birthDate: string;
  gender: 'male' | 'female';
  address: string;
  detailedAddress: string;
}): Promise<SignupResponse> => {
  const response = await baseAxiosInstance.post(
    '/api/v1/auth/signup/personal',
    signupData
  );
  return response.data;
};

// 비밀번호 찾기용 휴대폰 인증번호 발송
export const sendPasswordResetCode = async (
  phoneNumber: string
): Promise<PhoneVerificationResponse> => {
  const response = await baseAxiosInstance.post(
    '/api/v1/validations/phone/code/reset-password',
    {
      phoneNumber,
    }
  );
  console.log(response.data);
  return response.data;
};

// 개인 로그인
export const login = async (loginData: {
  phoneNumber: string;
  password: string;
}): Promise<SignupResponse> => {
  const response = await baseAxiosInstance.post(
    '/api/v1/auth/login',
    loginData
  );
  return response.data;
};
