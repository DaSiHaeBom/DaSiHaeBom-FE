import baseAxiosInstance from './baseAxiosApi';

// 개인 유저 조회
export const fetchPersonalInfo = async () => {
  const { data } = await baseAxiosInstance.get('/api/v1/users/workers/me');
  return data.result;
};

// 개인 유저 수정
export async function updatePersonalInfo(data: {
  phoneNumber: string;
  username: string;
  birthDate: string;
  baseAddress: string;
  detailAddress: string;
}) {
  const res = await baseAxiosInstance.patch('/api/v1/users/workers/me', data);
  return res.data;
}

// 기업 유저 조회
export const fetchCorpInfo = async () => {
  const { data } = await baseAxiosInstance.get('/api/v1/users/corps/me');
  return data.result;
};

// 기업 유저 수정
export async function updateCorpInfo(data: {
  ceoName: string;
  phoneNumber: string;
  corpNumber: string;
  corpName: string;
  corpBaseAddress: string;
  corpDetailAddress: string;
}) {
  const res = await baseAxiosInstance.patch('/api/v1/users/corps/me', data);
  return res.data;
}

// 비밀번호 변경
export async function updatePassword(data: {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}) {
  const res = await baseAxiosInstance.post('/api/v1/auth/me/password', data);
  return res.data;
}

// 회원 탈퇴
export async function deleteUser() {
  const res = await baseAxiosInstance.delete('/api/v1/users/withdrawal');
  return res.data;
}
