import { useState } from 'react';
import VoiceRecordBtn from '../components/MakeResume/VoiceRecordBtn';
import InputField from '../components/MakeResume/InputField';
import EditNBtn from '../components/MakeResume/EditBtn';
import ResumeLongBtn from '../components/MakeResume/ResumeLongBtn';
import EndPage from '../components/MakeResume/EndPage';

//타입
import type { QnA } from '../utils/interface';

// 이미지
import rightArrow from '../assets/ResumeAssets/rightArrow.svg';
import leftArrow from '../assets/ResumeAssets/leftArrow.svg';

const Resume = () => {
  // 임시 질문 리스트
  const questions = [
    '당신의 이름은 무엇인가요?',
    '취미가 무엇인가요?',
    '좋아하는 음식은 무엇인가요?',
    '가장 기억에 남는 여행지는?',
    '앞으로의 목표는 무엇인가요?',
  ];

  // 질문들로 동적으로 상태 생성
  // 질문들에 대한 상태
  const [qnaList, setQnaList] = useState<QnA[]>(
    questions.map(q => ({
      question: q,
      answer: null,
      isSubmitted: false,
      isAnswered: false,
      hasEverAnswered: false,
    }))
  );
  //종료 여부 판단
  const [isFinished, setIsFinished] = useState(false);

  // 음성 인식 상태
  const [isListening, setIsListening] = useState(false);

  // 현재 질문 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);

  // 다음 버튼 클릭 시
  const goNext = () => {
    if (!qnaList[currentIndex]?.answer) {
      alert('답변을 입력해주세요');
      return;
    }
    if (currentIndex === qnaList.length - 1) {
      setIsFinished(true);
    }
    if (currentIndex < qnaList.length - 1) {
      setCurrentIndex(prev => prev + 1); // 다음 질문으로 이동
    }
  };

  // 이전 질문 이동
  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  // 답변 완료 시 답변 저장
  const handleTextChange = (text: string) => {
    setQnaList(prev => {
      const updated = [...prev];
      updated[currentIndex].answer = text;
      updated[currentIndex].isSubmitted = true; // 답변 완료 시 제출 상태로 변경
      return updated;
    });
  };

  // 완료 버튼 클릭 시
  const handleSubmit = () => {
    if (!qnaList[currentIndex]?.answer) {
      alert('답변을 입력해주세요');
      return;
    }
    if (qnaList[currentIndex].hasEverAnswered) {
      console.log('PUT 로직');
    } else {
      console.log('POST 로직');
    }

    // 제출 상태 초기화 (수정 모드로 돌아가기)
    setQnaList(prev => {
      const updated = [...prev];
      updated[currentIndex].isSubmitted = false;
      updated[currentIndex].isAnswered = true;
      updated[currentIndex].hasEverAnswered = true;
      return updated;
    });
  };

  const handleEdit = () => {
    // 수정 로직
    setQnaList(prev => {
      const updated = [...prev];
      updated[currentIndex].isSubmitted = true; // 수정 시 제출 상태 초기화
      return updated;
    });
  };

  const handleReAnswer = () => {
    setQnaList(prev => {
      const updated = [...prev];
      updated[currentIndex].answer = null;
      updated[currentIndex].isAnswered = false;
      updated[currentIndex].isSubmitted = false; // 수정 모드로 전환
      return updated;
    });
  };

  const handleFinish = () => {
    // 마지막 질문인 경우
    console.log(
      '제출된 답변들:',
      qnaList.map(qna => qna.answer).filter(answer => answer)
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      {isFinished ? (
        <EndPage />
      ) : (
        <div className="flex justify-around w-full">
          {/* 이전 */}
          {!qnaList[currentIndex].isSubmitted && !isListening && (
            <button
              onClick={goPrev}
              className={`${currentIndex === 0 ? 'invisible' : ''}`}
            >
              <img src={leftArrow} alt="이전" />
            </button>
          )}
          <div
            className={`flex flex-col items-center justify-center gap-6 w-[681px] ${
              qnaList[currentIndex].isSubmitted ? 'h-96' : 'h-[457px]'
            } bg-stone-100 rounded-[10px]`}
          >
            <h2 className="text-neutral-700 text-4xl font-bold">
              Q{currentIndex + 1}.<br /> {qnaList[currentIndex].question}
            </h2>
            {qnaList[currentIndex].isAnswered && (
              <div className="w-96 max-h-28 overflow-y-scroll text-neutral-700 text-lg font-medium whitespace-pre-line">
                {qnaList[currentIndex].answer || '아직 없음'}
              </div>
            )}
            {/* 입력에 따른 컴포넌트 렌더링 */}
            {qnaList[currentIndex].isSubmitted ? (
              <InputField
                inputData={qnaList[currentIndex].answer ?? ''}
                handleChange={handleTextChange}
              />
            ) : !qnaList[currentIndex].isAnswered ? (
              <div className="flex justify-center gap-6 w-full">
                <VoiceRecordBtn
                  handleChange={handleTextChange}
                  isListening={isListening}
                  setIsListening={setIsListening}
                />
                <EditNBtn onClick={handleEdit} />
              </div>
            ) : null}
            {qnaList[currentIndex].isAnswered && (
              <button
                className="w-96 h-14 bg-orange-500 rounded-[10px] border text-white text-3xl font-semibold"
                onClick={goNext}
              >
                {currentIndex < qnaList.length - 1 ? '다음 질문' : '완료하기'}
              </button>
            )}
            {qnaList[currentIndex].isAnswered && (
              <button
                className="w-96 h-14 bg-white rounded-[10px] border border-neutral-500 text-neutral-500 text-3xl font-semibold"
                onClick={handleReAnswer}
              >
                다시 답변하기
              </button>
            )}
          </div>
          {/* 다음 */}
          {!qnaList[currentIndex].isSubmitted && !isListening && (
            <button
              onClick={goNext}
              className={`${currentIndex < qnaList.length - 1 ? '' : 'invisible'}`}
            >
              <img src={rightArrow} alt="다음" />
            </button>
          )}
        </div>
      )}
      {qnaList[currentIndex].isSubmitted && (
        <ResumeLongBtn btnName="제출하기" onClick={handleSubmit} />
      )}
      {isFinished && (
        <ResumeLongBtn btnName="이력서 확인하기" onClick={handleFinish} />
      )}
    </div>
  );
};

export default Resume;
