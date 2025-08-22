import { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';
import { fetchPersonalInfo } from '../api/userApi';
import { useNavigate } from 'react-router-dom';

export const BusinessHeader = () => {
  const [userName, setUserName] = useState<string>('');
  const navigate = useNavigate();
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userData = await fetchPersonalInfo();
        setUserName(userData.username);
      } catch (error) {
        console.error('사용자 정보 불러오기 실패:', error);
      }
    };

    loadUserInfo();
  }, []);

  return (
    <div className="top-0 flex justify-between items-center w-full px-4 bg-white h-16 z-10">
      <img
        src={logo}
        alt="logo"
        className="w-20 h-20 cursor-pointer"
        onClick={() => navigate('/business/home')}
      />
      <div className="flex items-center gap-3">
        <span className="text-gray-700 text-lg">{userName}님</span>
        <span className="bg-[#FF9555] text-white px-3 py-1 rounded-full text-sm">
          개인
        </span>
      </div>
    </div>
  );
};
