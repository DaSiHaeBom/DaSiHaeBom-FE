import { useNavigate } from 'react-router-dom';
import personalImage from '../assets/LoginAssets/personalImage.svg';
import businessImage from '../assets/LoginAssets/businessImage.svg';

//이미지
import logo from '/src/assets/logo.svg';

export default function Login() {
  const navigate = useNavigate();

  const handlePersonalLogin = () => {
    navigate('/login/personal');
  };

  const handleBusinessLogin = () => {
    navigate('/login/business');
  };

  const handleBack = () => {
    navigate('/landing');
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="fixed top-0 left-8 z-10">
        <img src={logo} alt="로고" className="w-20 h-20" />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={handleBack}
            className="text-gray-500 hover:text-gray-700 mb-4 self-start"
          >
            <span className="text-[#FF9555]">←</span> 뒤로가기
          </button>
          <p className="text-4xl font-bold text-black mb-4">로그인</p>
          <p className="text-lg text-black mb-12">회원 유형을 선택해주세요</p>

          <div className="flex gap-16">
            {/* 개인 */}
            <div
              className="flex flex-col items-center justify-center w-80 h-80 border-2 border-[#FF9555] rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={handlePersonalLogin}
            >
              <div className="w-full h-32 bg-white rounded mb-6 flex items-center justify-center">
                <img
                  src={personalImage}
                  alt="개인회원"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-2xl font-bold text-black">개인회원</p>
            </div>

            {/* 기업 */}
            <div
              className="flex flex-col items-center justify-center w-80 h-80 border-2 border-[#FF9555] rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={handleBusinessLogin}
            >
              <div className="w-full h-32 bg-white rounded mb-6 flex items-center justify-center">
                <img
                  src={businessImage}
                  alt="기업회원"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-2xl font-bold text-black">기업회원</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
