import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handlePersonalLogin = () => {
    navigate('/login/personal');
  };

  const handleBusinessLogin = () => {
    navigate('/login/business');
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <p className="text-4xl font-bold text-black mb-4">로그인</p>
          <p className="text-lg text-black mb-12">회원 유형을 선택해주세요</p>

          <div className="flex gap-16">
            {/* 개인 */}
            <div
              className="flex flex-col items-center justify-center w-80 h-80 border-2 border-[#FF9555] rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={handlePersonalLogin}
            >
              <div className="w-full h-32 bg-amber-50 rounded mb-6 flex items-center justify-center">
                <img
                  src={'https://picsum.photos/200/300'}
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
              <div className="w-full h-32 bg-amber-50 rounded mb-6 flex items-center justify-center">
                <img
                  src={'https://picsum.photos/200/300'}
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
