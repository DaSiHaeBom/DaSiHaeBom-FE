import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getResume, editResume } from '../api/resumeApi';
import ResumeSmallBtn from '../components/MakeResume/ResumeSmallBtn';
import ResumeLongBtn from '../components/MakeResume/ResumeLongBtn';
import InputField from '../components/MakeResume/InputField';

const ResumeConfirm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 데이터 가져오기
    const fetchData = async () => {
      const res = await getResume();
      if (res.isSuccess) {
        setContent(res.result.fullText);
        setName(res.result.userName);
        console.log('자기소개서 조회 성공:', res.result);
        console.log('자기소개서 조회 결과:', res.result.fullText);
      }
    };
    fetchData();
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [isEdit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(true);
    setIsEditing(true);
  };

  const handleTextChange = async (text: string) => {
    setContent(text);
  };

  const handleClick = () => {
    navigate('/resume/qna/1'); // 이력서 작성 페이지로 이동
  };

  const handleEditFinish = async () => {
    const res = await editResume(content);
    console.log('자기소개서 수정 결과:', res);
    setIsEditing(false);
    setEdit(false);
  };

  return (
    <div className="flex items-center justify-center h-full mt-16">
      <div className="flex flex-col items-center justify-start gap-6 w-[894px] max-w-full bg-stone-100 rounded-[10px] px-30 py-20 h-fit min-h-[400px]">
        <h2 className="text-neutral-700 text-4xl font-bold w-full text-start">
          {name}님 자기소개서
        </h2>
        {isEdit ? (
          <InputField
            inputData={content}
            size={'w-full h-80'}
            handleChange={handleTextChange}
          />
        ) : (
          <p className="text-neutral-700 text-lg leading-relaxed text-justify w-full ">
            {content}
          </p>
        )}
        {isEditing ? (
          <ResumeLongBtn btnName="수정 완료" onClick={handleEditFinish} />
        ) : (
          <div className="flex gap-4 w-full">
            <ResumeSmallBtn
              name="다시하기"
              clickEvent={handleClick}
              color={true}
            />
            <ResumeSmallBtn
              name="수정하기"
              clickEvent={handleEdit}
              color={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeConfirm;
