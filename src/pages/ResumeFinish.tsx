import { useNavigate } from 'react-router-dom';
import EndPage from '../components/MakeResume/EndPage';
import ResumeLongBtn from '../components/MakeResume/ResumeLongBtn';

const ResumeFinish = () => {
  const navigate = useNavigate();

  const handleFinish = async () => {
    // 이력서 확인 페이지로 이동
    navigate('/resume/confirm');
  };

  return (
    <>
      <EndPage />
      <ResumeLongBtn btnName="이력서 확인하기" onClick={handleFinish} />
    </>
  );
};

export default ResumeFinish;
