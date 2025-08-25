import type { ResumeDetail, SearchResumeResponse } from '../types/resumeList';
import baseAxiosInstance from './baseAxiosApi';

// 이력서 필터 api
export const searchLicenses = async (keyword: string) => {
  const { data } = await baseAxiosInstance.get(
    `/api/v1/licenses/search?keyword=${encodeURIComponent(keyword)}`
  );
  return data.result.licenseTypes;
};

// 모든 이력서 리스트 조회
export const searchResume = async (
  body: object
): Promise<SearchResumeResponse> => {
  const { data } = await baseAxiosInstance.post('/api/v1/resume/search', body);
  console.log('서버 원본 응답:', data.result.resumes);
  return data.result;
};

// 특정 개인 이력서 조회
export async function fetchResumeByWorkerId(
  workerId: number
): Promise<ResumeDetail> {
  const { data } = await baseAxiosInstance.get(`/api/v1/resume/${workerId}`);
  return data.result;
}
