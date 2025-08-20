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

//답변 생성 API
export const makeAnswer = async ({
  questionId,
  content,
}: makeAnswerResponse) => {
  const response = await baseAxiosInstance.post(
    `/api/v1/answer/${questionId}`,
    {
      content,
    }
  );
  return response.data;
};
