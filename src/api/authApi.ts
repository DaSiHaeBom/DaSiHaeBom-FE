import axios from 'axios';
import baseAxiosInstance from './baseAxiosApi';
import type { PhoneVerificationResponse, SignupResponse } from './types';

// 휴대폰 인증번호 발송 (회원가입용)
export const sendPhoneVerificationCode = async (
  phoneNumber: string
): Promise<PhoneVerificationResponse> => {
  const response = await axios.post(
    'https://www.dlrbdjs.store/api/v1/validations/phone/code/sign-up',
    {
      phoneNumber,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
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
  const response = await axios.post(
    'https://www.dlrbdjs.store/api/v1/validations/phone/code/confirmation',
    {
      phoneNumber,
      code,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    }
  );
  return response.data;
};

// 개인 회원가입
export const personalSignup = async (signupData: {
  phoneNumber: string;
  password: string;
  username: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  baseAddress: string;
  detailAddress: string;
}): Promise<SignupResponse> => {
  const response = await axios.post(
    'https://www.dlrbdjs.store/api/v1/users/workers',
    signupData,
    {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    }
  );
  return response.data;
};

// 비밀번호 찾기용 휴대폰 인증번호 발송
export const sendPasswordResetCode = async (
  phoneNumber: string
): Promise<PhoneVerificationResponse> => {
  const response = await axios.post(
    'https://www.dlrbdjs.store/api/v1/validations/phone/code/reset-password',
    {
      phoneNumber,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    }
  );
  console.log(response.data);
  return response.data;
};

// 개인 로그인
export const login = async (loginData: {
  loginId: string;
  password: string;
}): Promise<SignupResponse> => {
  // 로그인 성공 시 쿠키에 토큰이 저장되도록 baseAxiosInstance 사용
  const response = await baseAxiosInstance.post(
    '/api/v1/auth/login',
    loginData
  );
  return response.data;
};

// 임시 비밀번호 발급 (비밀번호 찾기용)
export const sendTempPassword = async (
  phoneNumber: string
): Promise<PhoneVerificationResponse> => {
  const response = await axios.post(
    'https://www.dlrbdjs.store/api/v1/auth/temp-password',
    {
      phoneNumber,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    }
  );
  return response.data;
};
