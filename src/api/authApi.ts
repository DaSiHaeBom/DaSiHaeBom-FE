import axios from 'axios';
import baseAxiosInstance from './baseAxiosApi';
import type {
  BusinessNumberValidationResponse,
  PhoneVerificationResponse,
  SignupResponse,
} from './types';

// 휴대폰 인증번호 발송 (회원가입용)
export const sendPhoneVerificationCode = async (
  phoneNumber: string
): Promise<PhoneVerificationResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/validations/phone/code/sign-up`,
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

// 휴대폰 인증번호 발송 (기업 회원 아이디 찾기용)
export const sendIdFindVerificationCode = async (
  phoneNumber: string
): Promise<PhoneVerificationResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/validations/phone/code/find-id`,
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
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/validations/phone/code/confirmation`,
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
  console.log(response.data);
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
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/workers`,
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
  alert(response.data);

  return response.data;
};

export const businessLogin = async (loginData: {
  loginId: string;
  password: string;
}): Promise<SignupResponse> => {
  const response = await baseAxiosInstance.post(
    '/api/v1/auth/login',
    loginData
  );
  return response.data;
};

// 비밀번호 찾기에서 휴대폰 인증번호 발송
export const sendPasswordResetCode = async (
  phoneNumber: string
): Promise<PhoneVerificationResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/validations/phone/code/reset-password`,
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

// 임시 비밀번호 발급 (개인, 기업 비밀번호 찾기용)
export const sendTempPassword = async (
  phoneNumber: string
): Promise<PhoneVerificationResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/temp-password`,
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

// 사업자 번호 유효성 검사
export const validateBusinessNumber = async (
  corpNumber: string
): Promise<BusinessNumberValidationResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/corps/business-validation`,
    {
      corpNumber,
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

// 기업 회원가입
export const businessSignup = async (signupData: {
  loginId: string;
  password: string;
  ceoName: string;
  phoneNumber: string;
  corpNumber: string;
  corpName: string;
  corpBaseAddress: string;
  corpDetailAddress: string;
}): Promise<SignupResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/corps`,
    signupData,
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

// 기업 회원 아이디 중복검사
export const checkBusinessIdDuplicate = async (
  loginId: string
): Promise<{
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    loginId: string;
    isAlreadyRegistered: boolean;
  };
}> => {
  // 프록시를 통해 호출 (로컬호스트로 요청하면 프록시가 실제 서버로 전달)
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/corps/check-id?loginId=${loginId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    }
  );
  return response.data;
};

// 기업 회원 아이디 찾기
export const findBusinessId = async (
  phoneNumber: string
): Promise<{
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    loginId: string;
  };
}> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/corps/find-id`,
    { phoneNumber },
    {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    }
  );
  return response.data;
};

// 로그아웃
export const logout = async (): Promise<{
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}> => {
  const response = await baseAxiosInstance.post('/api/v1/auth/logout');
  return response.data;
};

// 기업 회원 전화번호 변경
export const sendProfilePhoneVerificationCode = async (phoneNumber: string) => {
  const response = await axios.post(
    '/api/v1/validations/phone/code/profile',
    { phoneNumber },
    {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    }
  );
  return response.data;
};
