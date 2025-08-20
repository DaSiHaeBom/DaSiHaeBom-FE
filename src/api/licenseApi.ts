import type { License } from '../types/License';
import baseAxiosInstance from './baseAxiosApi';

// 내 자격증 조회
export const fetchLicenses = async (): Promise<License[]> => {
  const { data } = await baseAxiosInstance.get('/api/v1/licenses');
  console.log('내 자격증 목록:', data.result);
  return data.result.licenses;
};

// 자격증 등록
export async function createLicense(data: {
  name: string;
  issuer: string;
  issuedAt: string;
}) {
  const res = await baseAxiosInstance.post('/api/v1/licenses', data);
  return res.data;
}

// 자격증 삭제
export async function deleteLicense(licenseId: number) {
  const res = await baseAxiosInstance.delete(`/api/v1/licenses/${licenseId}`);
  return res.data;
}

// 자격증 수정
export async function updateLicense(
  licenseId: number,
  data: { name: string; issuedAt: string; issuer: string }
) {
  const res = await baseAxiosInstance.patch(
    `/api/v1/licenses/${licenseId}`,
    data
  );
  return res.data;
}

// 자격증 목록 검색
export const searchLicenses = async (keyword: string) => {
  const { data } = await baseAxiosInstance.get(
    `/api/v1/licenses/search?keyword=${keyword}`
  );
  return data.result.licenseTypes; // [{id, name, issuer}, ...]
};
