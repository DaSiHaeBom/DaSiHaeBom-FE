import { useNavigate } from 'react-router-dom';

import ResumeLongBtn from '../components/MakeResume/ResumeLongBtn';

const ResumeStart = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/Resume/qna'); // 이력서 작성 페이지로 이동
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6 w-[681px] h-96 bg-stone-100 rounded-[10px]">
        <div className="text-start">
          <h2 className="text-neutral-700 text-4xl font-bold mb-4 leading-[54px]">
            안녕하세요.
            <br />
            간단한 질문들에 답해주시면,
            <br />
            멋진 이력서를 만들어 드릴게요!
          </h2>
          <span className="text-neutral-700 text-2xl">
            준비 되셨다면, 시작하기 버튼을 눌러주세요
          </span>
        </div>
      </div>
      <ResumeLongBtn btnName="이력서 작성 시작하기" onClick={handleClick} />
    </>
  );
};

export default ResumeStart;
