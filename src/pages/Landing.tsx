import { HomeCard } from '../components/Home/HomeCard';
import { useNavigate } from 'react-router-dom';
//이미지
import landingImage from '../assets/LandingAssets/landingImage.svg';
import imageOne from '../assets/LandingAssets/imageOne.svg';
import imageTwo from '../assets/LandingAssets/imageTwo.svg';
import imageThree from '../assets/LandingAssets/imageThree.svg';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-30 mt-16">
      <div className="flex flex-col items-center justify-center mt-30">
        <p className="text-center text-neutral-700 text-4xl font-bold leading-16">
          이력서를 쓰면, 기업이 먼저 연락합니다.
        </p>
        <img
          src={landingImage}
          alt="landingimage"
          className="w-96 h-80 object-cover rounded-3xl"
        />
        <p className="text-neutral-700 text-lg font-medium leading-loose mb-10">
          아직 이력서가 없어요. 먼저 이력서를 작성해 주세요.
        </p>
        <div className="flex gap-9">
          <button
            className="w-40 h-14 rounded-lg bg-[#FF6B01] text-white text-xl font-semibold px-4 py-2 leading-loose"
            onClick={() => {
              navigate('/login');
            }}
          >
            로그인
          </button>
          <button
            className="w-40 h-14 rounded-lg bg-white text-[#FF6B01] border border-[#FF6B01] text-xl font-semibold px-4 py-2 leading-loose"
            onClick={() => {
              navigate('/signup');
            }}
          >
            회원가입
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-10">
        <p className="text-neutral-700 text-4xl font-bold leading-16">
          우리 서비스는 이렇게 진행됩니다.
        </p>
        <div className="flex gap-6">
          <HomeCard
            step="1단계"
            imageSrc={imageOne}
            altText="예시 이미지"
            text="말로 질문에 답해요"
          />
          <HomeCard
            step="2단계"
            imageSrc={imageTwo}
            altText="예시 이미지"
            text="이력서가 만들어져요"
          />
          <HomeCard
            step="3단계"
            imageSrc={imageThree}
            altText="예시 이미지"
            text="기업이 먼저 연락해요"
          />
        </div>
      </div>
    </div>
  );
}
