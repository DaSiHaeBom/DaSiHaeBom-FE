import React, { useState } from 'react';
import ConfirmModals from '../components/mypage/ConfirmModals';
import UserInfoSection from '../components/mypage/UserInfoSection';
import ActionButtons from '../components/mypage/ActionButtons';
import type { ModalType } from '../types/ModalType';

const BusinessMyPage = () => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const handleClose = () => setModalType(null);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="max-w-[432px] w-full text-center">
        {/* 상단 기업 정보 */}
        <UserInfoSection
          user={{
            memberType: 'business',
            name: '김멋사',
            phone: '02-2278-5514',
            companyType: '상명학원',
          }}
        />

        {/* 버튼 영역 (기업 모드) */}
        <div className="mx-auto max-w-[432px]">
          <ActionButtons memberType="business" setModalType={setModalType} />
        </div>

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
