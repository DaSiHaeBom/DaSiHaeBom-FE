import { useState } from 'react';
import UserInfoSection from '../components/mypage/UserInfoSection';
import ActionButtons from '../components/mypage/ActionButtons';
import LicenseListModal from '../components/mypage/LicenseListModal';
import LicenseFormModal from '../components/mypage/LicenseFormModal';
import ConfirmModals from '../components/mypage/ConfirmModals';
import type { ModalType } from '../types/ModalType';

const PersonalMyPage = () => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [licenseData, setLicenseData] = useState({
    id: Date.now(),
    name: '',
    date: '',
    agency: '',
  });
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

  const handleClose = () => setModalType(null);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="max-w-[432px] w-full text-center">
        <UserInfoSection
          user={{
            memberType: 'personal',
            name: '김상명',
            phone: '010-1234-5678',
            age: 68,
            gender: '남성',
          }}
        />
        <ActionButtons memberType="personal" setModalType={setModalType} />
      </div>

      {/* 모달들 */}
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

export default PersonalMyPage;
