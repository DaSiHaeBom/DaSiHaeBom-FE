import { useState, useEffect } from 'react';
import ConfirmModals from '../components/mypage/ConfirmModals';
import UserInfoSection from '../components/mypage/UserInfoSection';
import ActionButtons from '../components/mypage/ActionButtons';
import type { ModalType } from '../types/ModalType';
import { fetchCorpInfo } from '../api/userApi';
const BusinessMyPage = () => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const handleClose = () => setModalType(null);

  type BusinessUser = {
    memberType: 'business';
    name: string; // 대표자명
    phone: string;
    companyType: string; // 회사/점포명
  };

  const [user, setUser] = useState<BusinessUser | null>(null);

  // 전화번호 형식 변경 함수 (01012345678 → 010-1234-5678)
  function formatPhoneNumber(phone: string): string {
    if (!phone) return '';
    return phone
      .replace(/[^0-9]/g, '') // 숫자만 남기기
      .replace(/(^02|^0505|^1\d{3}|^0\d{2})(\d+)(\d{4})$/, '$1-$2-$3');
  }

  // 초기 데이터 로드
  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchCorpInfo(); // 서버에서 기업회원 정보 가져오기
        setUser({
          memberType: 'business',
          name: data.ceoName, // 서버 필드명 맞춰 매핑
          phone: formatPhoneNumber(data.phoneNumber),
          companyType: data.corpName, // 회사/점포명
        });
        console.log('기업회원 정보:', data);
      } catch (err) {
        console.error('기업회원 정보 불러오기 실패:', err);
      }
    };

    loadUser();
  }, []);

  return (
    <div className="min-h-screen -mt-16 w-full flex items-center justify-center bg-white">
      <div className="max-w-[432px] w-full text-center">
        {/* 상단 기업 정보 */}
        {user ? (
          <>
            <UserInfoSection user={user} />
            <ActionButtons memberType="business" setModalType={setModalType} />
          </>
        ) : (
          <p className="text-gray-500">기업 회원 정보를 불러오는 중...</p>
        )}

        {/* 공통 모달 */}
        <ConfirmModals
          modalType={modalType}
          setModalType={setModalType}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
};

export default BusinessMyPage;
