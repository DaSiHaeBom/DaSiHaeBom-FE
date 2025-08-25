import { useNavigate } from 'react-router-dom';
import HomeImage from '../assets/HomeAssets/homeImage.svg';
import { HomeCard } from '../components/Home/HomeCard';
import step1Image from '../assets/HomeAssets/BusinessHomeAssets/step1Image.svg';
import step2Image from '../assets/HomeAssets/BusinessHomeAssets/step2Image.svg';
import step3Image from '../assets/HomeAssets/BusinessHomeAssets/step3Image.svg';

export default function BusinessHome() {
  const navigate = useNavigate();

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
          필요한 인재가 기다리고 있어요. 지금 이력서를 확인해보세요.
        </p>

        <button
          className="w-40 h-14 rounded-lg bg-[#FF6B01] text-white text-xl font-semibold px-4 py-2 leading-loose"
          onClick={() => navigate('/business/resume/list')}
        >
          이력서 조회
        </button>
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
            text="지원자 이력서를
            확인해요"
          />
          <HomeCard
            step="2단계"
            imageSrc={step2Image}
            altText="2단계 이미지"
            text="조건에 맞는
            인재를 찾아요"
          />
          <HomeCard
            step="3단계"
            imageSrc={step3Image}
            altText="3단계 이미지"
            text="직접 연락해
            채용을 시작해요"
          />
        </div>
      </div>
    </div>
  );
}
