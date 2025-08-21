import baseAxiosInstance from './baseAxiosApi';
import type {
  getAnswerResponse,
  makeAnswerResponse,
} from '../types/resumeApiType';

// 내 답변 상세 조회 API
export const getAnswer = async (questionId: getAnswerResponse) => {
  const response = await baseAxiosInstance.get(`/api/v1/answer/${questionId}`, {
    params: {
      questionId,
    },
  });
  return response.data;
};

//답변 생성 및 수정 API
export const makeAnswer = async ({
  questionId,
  content,
}: makeAnswerResponse) => {
  const response = await baseAxiosInstance.put(`/api/v1/answer/${questionId}`, {
    content,
  });
  return response.data;
};

//전체 답변 조회
export const getAllAnswer = async () => {
  const response = await baseAxiosInstance.get(`/api/v1/answer/my`, {});
  return response.data;
};

//자기소개서 생성
export const makeResume = async () => {
  const response = await baseAxiosInstance.post(`/api/v1/answer/generate`, {});
  return response.data;
};

//자기소개서 조회
export const getResume = async () => {
  const response = await baseAxiosInstance.get(
    `/api/v1/answer/introduction`,
    {}
  );
  return response.data;
};

//자기소개서 본문 수정
export const editResume = async (fullText: string) => {
  const response = await baseAxiosInstance.patch(`/api/v1/answer/full-text`, {
    fullText,
  });
  return response.data;
};
