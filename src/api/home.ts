import baseAxiosInstance from './baseAxiosApi';

//자기소개서 작성 여부 조회
export const getResumeIsOrNot = async () => {
  const response = await baseAxiosInstance.get(`/api/v1/resume/existence`, {});
  return response.data;
};
