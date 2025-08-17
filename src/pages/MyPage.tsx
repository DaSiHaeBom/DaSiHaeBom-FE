import { useState } from 'react';
import UserInfoSection from '../components/mypage/UserInfoSection';
import ActionButtons from '../components/mypage/ActionButtons';
import LicenseListModal from '../components/mypage/LicenseListModal';
import LicenseFormModal from '../components/mypage/LicenseFormModal';
import ConfirmModals from '../components/mypage/ConfirmModals';
import type { ModalType } from '../types/ModalType';

const MyPage = () => {
  // 현재 열려있는 모달 종류 상태로 관리
  const [modalType, setModalType] = useState<ModalType>(null);
  // 자격증 폼 입력 형태
  const [licenseData, setLicenseData] = useState({
    id: Date.now(),
    name: '',
    date: '',
    agency: '',
  });
  // 더미 데이터
  const [certList, setCertList] = useState([
    {
      id: 1,
      name: '운전면허증 (2종)',
      agency: '도로교통공단',
      date: '1987-09-15',
    },
    {
      id: 2,
      name: '요양보호사 자격증',
      agency: '보건복지부',
      date: '2020-06-28',
    },
  ]);
  // 모달 닫기
  const handleClose = () => setModalType(null);

  return (
    <div className="flex flex-col items-center justify-center py-30 px-4 mt-16">
      <div className="max-w-[432px] w-full text-center">
        <UserInfoSection
          user={{
            name: '김상명',
            phone: '010-1234-5678',
            age: 68,
            gender: '남성',
          }}
        />
        <ActionButtons setModalType={setModalType} />
      </div>
      {/* 모달 컴포넌트 영역 */}
      <ConfirmModals
        modalType={modalType}
        handleClose={handleClose}
        setModalType={setModalType}
      />
      <LicenseListModal
        modalType={modalType}
        handleClose={handleClose}
        certList={certList}
        setCertList={setCertList}
        setModalType={setModalType}
      />
      <LicenseFormModal
        modalType={modalType}
        handleClose={handleClose}
        licenseData={licenseData}
        certList={certList}
        setLicenseData={setLicenseData}
        setCertList={setCertList}
        setModalType={setModalType}
      />
    </div>
  );
};

export default MyPage;
