import { useState, useEffect } from 'react';
import { getResumeIsOrNot } from '../api/home';
import { useNavigate } from 'react-router-dom';
import HomeImage from '../assets/HomeAssets/homeImage.svg';
import { HomeCard } from '../components/Home/HomeCard';
import step1Image from '../assets/HomeAssets/PersonalHomeAssets/step1Image.svg';
import step2Image from '../assets/HomeAssets/PersonalHomeAssets/step2Image.svg';
import step3Image from '../assets/HomeAssets/PersonalHomeAssets/step3Image.svg';

export default function PersonalHome() {
  const navigate = useNavigate();
  const [isResumeCreated, setIsResumeCreated] = useState(false);

  useEffect(() => {
    const checkResumeExistence = async () => {
      const res = await getResumeIsOrNot();
      if (res.isSuccess) {
        setIsResumeCreated(res.result.exists);
      }
    };
    checkResumeExistence();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-30 mt-16">
      <div className="flex flex-col items-center justify-center">
        <p className="text-center text-neutral-700 text-4xl font-bold leading-16">
          이력서를 쓰면, 기업이 먼저 연락합니다.
        </p>
        <img
          src={HomeImage}
          alt="homeimage"
          className="w-96 h-80 object-cover rounded-3xl"
        />
        <p className="text-neutral-700 text-lg font-medium leading-loose mb-10">
          아직 이력서가 없어요. 먼저 이력서를 작성해 주세요.
        </p>
        {isResumeCreated ? (
          <button
            className="w-40 h-14 rounded-lg bg-white text-[#FF6B01] border border-[#FF6B01] text-xl font-semibold px-4 py-2 leading-loose"
            onClick={() => navigate('/personal/resume/result')}
          >
            이력서 보기
          </button>
        ) : (
          <button
            className="w-40 h-14 rounded-xl bg-[#FF6B01] text-white text-xl font-semibold px-4 py-2 leading-loose"
            onClick={() => navigate('/personal/resume')}
          >
            이력서 작성
          </button>
        )}
      </div>
      <div className="flex flex-col justify-center items-center gap-10 mb-30">
        <p className="text-neutral-700 text-4xl font-bold leading-16">
          우리 서비스는 이렇게 진행됩니다.
        </p>
        <div className="flex gap-8 justify-center">
          <HomeCard
            step="1단계"
            imageSrc={step1Image}
            altText="1단계 이미지"
            text="말로 질문에 답해요"
          />
          <HomeCard
            step="2단계"
            imageSrc={step2Image}
            altText="2단계 이미지"
            text="이력서가 만들어져요"
          />
          <HomeCard
            step="3단계"
            imageSrc={step3Image}
            altText="3단계 이미지"
            text="기업이 먼저 연락해요"
          />
        </div>
      </div>
    </div>
  );
}
