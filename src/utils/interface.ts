export interface QnA {
  question: string; // 질문
  answer: string | null; // 답변
  isSubmitted: boolean; // 답변 제출 여부
  isAnswered: boolean; // 답변 완료 여부
  hasEverAnswered: boolean; //한번이라도 답변한 적이 있는지
}
