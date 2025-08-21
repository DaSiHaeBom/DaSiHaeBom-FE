import { useNavigate } from 'react-router-dom';
import EndPage from '../components/resumeMake/EndPage';
import ResumeLongBtn from '../components/resumeMake/ResumeLongBtn';

const ResumeFinish = () => {
  const navigate = useNavigate();

  const handleFinish = async () => {
    // 이력서 결과 페이지로 이동
    navigate('/resume/result');
  };

  return (
    <>
      <EndPage />
      <ResumeLongBtn btnName="이력서 확인하기" onClick={handleFinish} />
    </>
  );
};

export default ResumeFinish;
