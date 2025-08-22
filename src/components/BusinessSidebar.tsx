import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/authApi';

const BusinessSidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 로그아웃 API 호출
      const response = await logout();

      if (response.isSuccess) {
        // 쿠키에 저장된 토큰 제거
        document.cookie =
          'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie =
          'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        // 로그아웃 로직 구현
        console.log('로그아웃 - 토큰 제거됨');
        navigate('/login');
      } else {
        console.error('로그아웃 실패:', response.message);
        alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('로그아웃 에러:', error);
      // 에러가 발생해도 클라이언트 측에서 토큰 제거
      document.cookie =
        'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie =
        'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      alert('로그아웃 중 오류가 발생했습니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
    }
  };

  const handleHome = () => {
    navigate('/business/home');
  };

  const handleMyInfo = () => {
    navigate('/business/mypage');
  };

  return (
    <div className="w-28 h-screen bg-[#F8F3F0] flex flex-col py-5 fixed left-0 top-0">
      <div className="px-5 pb-5 border-b border-gray-200 mb-5">
        <div className="flex justify-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-400"
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1="9"
              y1="9"
              x2="15"
              y2="9"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1="9"
              y1="12"
              x2="15"
              y2="12"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1="9"
              y1="15"
              x2="15"
              y2="15"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>

      <nav className="flex flex-col gap-8 px-5">
        <div
          className="flex flex-col items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors"
          onClick={handleHome}
        >
          <div className="w-8 h-8 mb-2">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-orange-500"
            >
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" />
              <path d="M9 22V12H15V22" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-800">홈</span>
        </div>

        <div
          className="flex flex-col items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors"
          onClick={handleMyInfo}
        >
          <div className="w-8 h-8 mb-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-gray-600"
            >
              <path
                d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 2V8H20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="16"
                y1="13"
                x2="8"
                y2="13"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="16"
                y1="17"
                x2="8"
                y2="17"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-800">내 정보</span>
        </div>

        <div
          className="flex flex-col items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors"
          onClick={() => navigate('/resume')}
        >
          <div className="w-8 h-8 mb-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-gray-600"
            >
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-800">이력서 추가</span>
        </div>

        <div
          className="flex flex-col items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors mt-auto"
          onClick={handleLogout}
        >
          <div className="w-8 h-8 mb-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-gray-600"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M16 17L21 12L16 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12H9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-800">로그아웃</span>
        </div>
      </nav>
    </div>
  );
};

export default BusinessSidebar;
