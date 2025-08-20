import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VoiceRecordBtn from '../components/MakeResume/VoiceRecordBtn';
import InputField from '../components/MakeResume/InputField';
import EditNBtn from '../components/MakeResume/EditBtn';
import ResumeLongBtn from '../components/MakeResume/ResumeLongBtn';

//타입
import type { QnA } from '../utils/interface';

//API
import { makeAnswer, getAllAnswer, makeResume } from '../api/resumeApi';

// 이미지
import rightArrow from '../assets/ResumeAssets/rightArrow.svg';
import leftArrow from '../assets/ResumeAssets/leftArrow.svg';

const Resume = () => {
  const navigate = useNavigate();
  const { questionNumber } = useParams<{ questionNumber: string }>();

  // 임시 질문 리스트
  const questions = [
    '연령대별 일대기를 알려주세요.',
    '지원하는 직무나 분야는 무엇인가요?',
    '주요 경력이나 업무 경험 중 자랑하고 싶은 점이 있나요?',
    '학력 및 전공을 간단히 알려주세요.',
    '협업 경험 중 가장 기억에 남는 사례는 무엇인가요?',
    '자신의 강점과 약점은 무엇인가요?',
  ];

  // 질문들로 동적으로 상태 생성
  const [qnaList, setQnaList] = useState<QnA[]>(
    questions.map(q => ({
      question: q,
      answer: null,
      isSubmitted: false,
      isAnswered: false,
    }))
  );

  // 음성 인식 상태
  const [isListening, setIsListening] = useState(false);

  // 현재 질문 인덱스 - URL 파라미터에서 초기화
  const [currentIndex, setCurrentIndex] = useState(() => {
    const questionNum = parseInt(questionNumber || '1');
    return Math.max(0, Math.min(questionNum - 1, questions.length - 1));
  });

  // URL 업데이트 함수
  const updateURL = (index: number) => {
    const questionNum = index + 1;
    navigate(`/resume/qna/${questionNum}`, { replace: true });
  };

  // URL 파라미터 변경 시 currentIndex 업데이트
  useEffect(() => {
    const questionNum = parseInt(questionNumber || '1');
    const newIndex = Math.max(
      0,
      Math.min(questionNum - 1, questions.length - 1)
    );
    setCurrentIndex(newIndex);
  }, [questionNumber, questions.length]);

  // 첫 방문 시 URL 검증 및 리다이렉트
  useEffect(() => {
    if (!questionNumber) {
      navigate('/resume/qna/1', { replace: true });
    }
  }, [questionNumber, navigate]);

  // 기존 답변 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllAnswer();
        let mockApiResponse = [];
        if (res.isSuccess) {
          mockApiResponse = res.result;
        }

        setQnaList(prev => {
          const updated = [...prev];

          mockApiResponse.forEach(
            ({
              questionId,
              answerContent,
            }: {
              questionId: number;
              answerContent: string;
            }) => {
              const arrayIndex = questionId - 1;

              if (arrayIndex >= 0 && arrayIndex < updated.length) {
                updated[arrayIndex] = {
                  ...updated[arrayIndex],
                  answer: answerContent,
                  isAnswered: true,
                };
              }
            }
          );
          return updated;
        });

        console.log('기존 답변 로드 완료:', mockApiResponse);
      } catch (error: unknown) {
        if (error instanceof Error && error.message === '404') {
          console.log('첫 방문자입니다. 새로운 답변 작성을 시작합니다.');
        } else {
          console.error('데이터 로딩 실패:', error);
        }
      }
    };

    fetchData();
  }, []);

  // 다음 버튼 클릭 시
  const goNext = async () => {
    if (!qnaList[currentIndex]?.answer) {
      alert('답변을 입력해주세요');
      return;
    }
    if (currentIndex === qnaList.length - 1) {
      try {
        const res = await makeResume();
        console.log('자기소개서 생성 결과:', res);
        navigate('/resume/result');
      } catch (error) {
        console.error('자기소개서 생성 실패:', error);
        alert('자기소개서 생성에 실패했습니다.');
      }
      return;
    }
    if (currentIndex < qnaList.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      updateURL(nextIndex);
    }
  };

  // 이전 질문 이동
  const goPrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      updateURL(prevIndex);
    }
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
  const handleSubmit = async () => {
    if (!qnaList[currentIndex]?.answer) {
      alert('답변을 입력해주세요');
      return;
    }
    const res = await makeAnswer({
      questionId: currentIndex + 1,
      content: qnaList[currentIndex].answer,
    });

    console.log('답변 제출 결과:', res);

    // 제출 상태 초기화 (수정 모드로 돌아가기)
    setQnaList(prev => {
      const updated = [...prev];
      updated[currentIndex].isSubmitted = false;
      updated[currentIndex].isAnswered = true;
      //updated[currentIndex].hasEverAnswered = true;
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

  return (
    <>
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
          <h2 className="text-neutral-700 text-4xl font-bold text-start w-110">
            Q{currentIndex + 1}.<br /> {qnaList[currentIndex].question}
          </h2>
          {qnaList[currentIndex].isAnswered && (
            <div className="w-110 max-h-28 overflow-y-scroll text-neutral-700 text-lg font-medium whitespace-pre-line">
              {qnaList[currentIndex].answer || '아직 없음'}
            </div>
          )}
          {/* 입력에 따른 컴포넌트 렌더링 */}
          {qnaList[currentIndex].isSubmitted ? (
            <InputField
              inputData={qnaList[currentIndex].answer ?? ''}
              handleChange={handleTextChange}
              size="w-110 h-36"
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
              className="w-110 h-14 bg-orange-500 rounded-[10px] border text-[#FFFEFD] text-3xl font-semibold"
              onClick={goNext}
            >
              {currentIndex < qnaList.length - 1 ? '다음 질문' : '완료하기'}
            </button>
          )}
          {qnaList[currentIndex].isAnswered && (
            <button
              className="w-110 h-14 bg-[#FFFEFD] rounded-[10px] border border-neutral-500 text-neutral-500 text-3xl font-semibold"
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
      {qnaList[currentIndex].isSubmitted && (
        <ResumeLongBtn btnName="제출하기" onClick={handleSubmit} />
      )}
    </>
  );
};

export default Resume;
