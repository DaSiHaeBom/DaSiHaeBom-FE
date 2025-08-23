import { useState, useEffect } from 'react';
import UserInfoSection from '../components/mypage/UserInfoSection';
import ActionButtons from '../components/mypage/ActionButtons';
import LicenseListModal from '../components/mypage/LicenseListModal';
import LicenseFormModal from '../components/mypage/LicenseFormModal';
import ConfirmModals from '../components/mypage/ConfirmModals';
import type { ModalType } from '../types/ModalType';
import { fetchPersonalInfo } from '../api/userApi';
import type { License } from '../types/License';

const PersonalMyPage = () => {
  // 모달/자격증 관련 상태
  const [modalType, setModalType] = useState<ModalType>(null);
  const [licenseData, setLicenseData] = useState<License>({
    licenseId: 0, // 새로 등록 시 임시로 0
    name: '',
    issuer: '',
    issuedAt: '',
  });
  const [certList, setCertList] = useState<License[]>([]);

  // create | edit 모드 추가
  const [mode, setMode] = useState<'create' | 'edit'>('create');

  // 유저정보
  type User = {
    memberType: 'personal';
    name: string;
    phone: string;
    age: number;
    gender: '남성' | '여성';
  };

  const [user, setUser] = useState<User | null>(null);

  // 전화번호 형식 변경 함수 (01012345678 → 010-1234-5678)
  function formatPhoneNumber(phone: string): string {
    if (!phone) return '';
    return phone
      .replace(/[^0-9]/g, '') // 숫자만 남기기
      .replace(/(^02|^0505|^1\d{3}|^0\d{2})(\d+)(\d{4})$/, '$1-$2-$3');
  }

  // 만나이 계산기 (YYMMDD → xx세)
  function calcInternationalAge(birth: string): number {
    if (birth.length !== 6) return 0;

    const now = new Date();
    let year = parseInt(birth.substring(0, 2), 10);
    const month = parseInt(birth.substring(2, 4), 10) - 1;
    const day = parseInt(birth.substring(4, 6), 10);

    // 2000년 이후 출생인지 1900년대 출생인지 판별
    const currentYearTwoDigit = now.getFullYear() % 100;
    if (year <= currentYearTwoDigit) {
      year += 2000;
    } else {
      year += 1900;
    }

    const birthDate = new Date(year, month, day);
    let age = now.getFullYear() - year;

    // 생일 안 지났으면 -1
    const hasBirthdayPassed =
      now.getMonth() > birthDate.getMonth() ||
      (now.getMonth() === birthDate.getMonth() &&
        now.getDate() >= birthDate.getDate());

    if (!hasBirthdayPassed) {
      age -= 1;
    }

    return age;
  }

  // 초기 데이터 로드
  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchPersonalInfo();
        const age = calcInternationalAge(data.birthDate);
        setUser({
          memberType: 'personal',
          name: data.username,
          phone: formatPhoneNumber(data.phoneNumber), // 포맷 적용
          age,
          gender: data.gender === 'MALE' ? '남성' : '여성',
        });
        console.log('회원 정보:', data);
      } catch (err) {
        console.error('회원 정보 불러오기 실패:', err);
      }
    };

    loadUser();
  }, []);

  // 모달 닫는 핸들러
  const handleClose = () => setModalType(null);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="max-w-[432px] w-full text-center">
        {/* 유저 정보 섹션 */}
        {user ? (
          <>
            <UserInfoSection user={user} />
            <ActionButtons memberType="personal" setModalType={setModalType} />
          </>
        ) : (
          <p className="text-gray-500">회원 정보를 불러오는 중...</p>
        )}
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
        setLicenseData={setLicenseData}
        setMode={setMode}
      />
      <LicenseFormModal
        modalType={modalType}
        handleClose={handleClose}
        licenseData={licenseData}
        setLicenseData={setLicenseData}
        certList={certList}
        setCertList={setCertList}
        setModalType={setModalType}
        mode={mode}
      />
    </div>
  );
};

export default PersonalMyPage;
