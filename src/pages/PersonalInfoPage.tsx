import React, { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import CheckIcon from '../assets/MyPageAssets/CheckIcon';
import GenderSelect from '../components/GenderSelect';
import { fetchPersonalInfo, updatePersonalInfo } from '../api/userApi';
import { sendPhoneVerificationCode, verifyPhoneCode } from '../api/authApi';

/** ===== Types ===== */
type PersonalProfile = {
  memberType: '개인';
  phone: string;
  name: string; // 이름
  birth: string; // yymmdd
  gender: '남성' | '여성' | '';
  address: string; // 기본 주소
  detailAddress: string;
};

/** ===== UI classes ===== */
const labelCls =
  'text-[#3C3C3C] font-[Pretendard] text-[24px] font-semibold leading-[36px]';
const inputCls =
  'w-full h-[56px] rounded-[10px] border border-[#D9D9D9] focus:border-black px-[20px] py-[12px] text-[16px]';
const noteRedCls =
  'ml-[10px] text-[#F00] font-[Pretendard] text-[16px] font-normal leading-[150%]';
const ctaPrimary =
  'w-full h-12 rounded-[10px] bg-[#FF9555] text-[#fffefd] text-[20px] font-semibold leading-[150%] font-semibold hover:opacity-90';
const ctaGhost =
  'w-1/2 h-12 rounded-[10px] border border-gray-300 hover:bg-gray-100  text-[#FF9555] text-[20px] font-semibold leading-[150%]';

export default function PersonalInfoPage() {
  /** 상태 */
  const [data, setData] = useState<PersonalProfile>({
    memberType: '개인',
    phone: '',
    name: '',
    birth: '',
    gender: '',
    address: '',
    detailAddress: '',
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  /** 회원정보 불러오기 */
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await fetchPersonalInfo();
        setData({
          memberType: '개인',
          phone: user.phoneNumber,
          name: user.username,
          birth: user.birthDate, // "yymmdd"
          gender: user.gender === 'MALE' ? '남성' : '여성',
          address: user.baseAddress ?? '',
          detailAddress: user.detailAddress ?? '',
        });
      } catch (err) {
        console.error('회원 정보 불러오기 실패:', err);
      }
    };
    loadUser();
  }, []);

  /** change 헬퍼 */
  const updateField =
    <K extends keyof PersonalProfile>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setData(prev => (prev ? { ...prev, [key]: e.target.value } : prev));

  /** 카카오 우편번호 검색 */
  const openDaumPostcode = () => {
    type DaumPostcodeData = {
      zonecode: string;
      roadAddress?: string;
      jibunAddress?: string;
    };

    const loadPostcode = () => {
      new window.daum.Postcode({
        oncomplete: function (data: DaumPostcodeData) {
          const address = data.roadAddress || data.jibunAddress;
          if (address) {
            setData(prev => ({
              ...prev,
              address: address,
            }));
          }
        },
      }).open();
    };

    if (window.daum && window.daum.Postcode) {
      loadPostcode();
    } else {
      const script = document.createElement('script');
      script.src =
        '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.async = true;
      script.onload = loadPostcode;
      document.body.appendChild(script);
    }
  };

  // 휴대폰 인증번호 발송 핸들러
  const handleSendCode = async () => {
    if (!data.phone) {
      alert('휴대폰 번호를 입력해주세요.');
      return;
    }
    try {
      const res = await sendPhoneVerificationCode(data.phone);
      console.log('인증번호 전송 성공:', res);
      alert('인증번호가 전송되었습니다.');
    } catch (err) {
      console.error('인증번호 전송 실패:', err);
      alert('인증번호 전송 중 오류가 발생했습니다.');
    }
  };

  // 휴대폰 인증번호 인증 로직
  const handleVerifyCode = async () => {
    try {
      const res = await verifyPhoneCode(
        data.phone.replace(/[^0-9]/g, ''),
        verificationCode
      );

      if (res.isSuccess) {
        setIsVerified(true);
        alert('휴대폰 인증이 완료되었습니다.');
      } else {
        alert(res.message || '인증 실패');
      }
    } catch (err) {
      console.error('인증번호 검증 실패:', err);
      alert('인증번호 검증 중 오류가 발생했습니다.');
    }
  };

  /** 액션 */
  const startEdit = () => setIsEditing(true);
  const cancelEdit = () => {
    setIsEditing(false);
  };
  const saveEdit = async () => {
    if (!data) return;

    try {
      const suc = await updatePersonalInfo({
        phoneNumber: data.phone,
        username: data.name,
        birthDate: data.birth,
        baseAddress: data.address,
        detailAddress: data.detailAddress,
      });
      console.log(suc);

      setIsEditing(false);
      setIsSavedModalOpen(true);
      console.log(suc);
    } catch (err) {
      console.error('개인정보 수정 실패:', err);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  /** 스타일 */
  const readonlyStyle = !isEditing
    ? 'bg-[#F5F5F5] text-[#737373] border-[#D9D9D9]'
    : 'bg-white';

  if (!data) {
    return (
      <div className="mt-20 text-center text-lg text-gray-600">
        회원 정보를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div className="mx-auto w-full mt-16 max-w-[512px] py-8 font-[Pretendard] leading-[150%]">
      <h1 className="mb-[67px] text-center text-[36px] font-bold text-[#3C3C3C]">
        {isEditing ? '개인정보 수정' : '개인정보 조회'}
      </h1>

      {data && (
        <div className="mb-[30px]">
          <div className="flex items-end gap-2 mb-2">
            <span className="text-[#3C3C3C] text-[24px] font-semibold leading-[150%]">
              회원 유형
            </span>
            <span className={`${noteRedCls} pb-[2px]`}>수정 불가능한 항목</span>
          </div>

          <div className="flex max-w-[116px] items-center justify-center rounded-[10px] bg-[#d9d9d9] border border-[#d9d9d9] px-6 py-3 text-[#737373] text-[20px] font-semibold">
            {data.memberType}
          </div>
        </div>
      )}

      {/* 휴대폰 */}
      <div className="mb-[30px]">
        <label className={labelCls}>휴대폰 번호</label>
        <div className="mt-[10px] flex gap-2">
          <input
            className={`${inputCls} ${readonlyStyle} flex-1`}
            placeholder="01012345678"
            value={data.phone}
            onChange={updateField('phone')}
            disabled={!isEditing}
          />
          <button
            type="button"
            className="h-[56px] min-w-[116px] px-[13px] rounded-[10px] bg-[#FF9555] text-[#FFFEFD] text-[20px] font-semibold leading-[150%] disabled:opacity-50 cursor-pointer"
            disabled={!isEditing}
            onClick={handleSendCode}
          >
            인증번호
          </button>
        </div>
        {isEditing && (
          <div className="mt-2 flex gap-2">
            <input
              className={`${inputCls} flex-1`}
              placeholder="인증번호 입력"
              value={verificationCode}
              onChange={e => setVerificationCode(e.target.value)}
            />
            <button
              type="button"
              className="h-[56px] min-w-[116px] px-4 rounded-[10px] border border-[#D9D9D9] text-[#FF9555] text-[20px] font-semibold leading-[150%] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleVerifyCode}
              disabled={isVerified}
            >
              {isVerified ? '인증완료' : '인증'}
            </button>
          </div>
        )}
      </div>

      {/* 이름 */}
      <div className="mb-[30px]">
        <label className={labelCls}>이름</label>
        <input
          className={`${inputCls} ${readonlyStyle} mt-[10px]`}
          value={data.name}
          onChange={updateField('name')}
          disabled={!isEditing}
        />
      </div>

      {/* 생년월일 */}
      <div className="mb-[30px]">
        <label className={labelCls}>생년월일</label>
        <input
          className={`${inputCls} ${readonlyStyle} mt-[10px]`}
          placeholder="yymmdd"
          value={data.birth}
          onChange={updateField('birth')}
          disabled={!isEditing}
        />
      </div>

      {/* 성별 */}
      <div className="mb-[30px]">
        <label className={labelCls}>
          성별 <span className={noteRedCls}>수정 불가능한 항목</span>
        </label>
        <div className="mt-[10px]">
          <GenderSelect
            value={data.gender}
            onChange={val => setData(prev => ({ ...prev, gender: val }))}
            disabled={true}
          />
        </div>
      </div>

      {/* 주소 */}
      <div className="mb-[60px]">
        <label className={labelCls}>주소</label>

        {isEditing ? (
          <>
            {/* 기본 주소 (검색 결과) */}
            <div className="mt-[10px] flex gap-2">
              <input
                className={`${inputCls} flex-1`}
                placeholder="주소"
                value={data.address || ''}
                disabled
              />
              <button
                type="button"
                className="h-[56px] min-w-[116px] px-4 rounded-[10px] bg-[#FF9555] text-[#FFFEFD] text-[20px] font-semibold leading-[150%] cursor-pointer"
                onClick={openDaumPostcode}
              >
                주소 검색
              </button>
            </div>

            {/* 상세주소 입력 */}
            <input
              className={`${inputCls} mt-[10px]`}
              placeholder="상세 주소 입력"
              value={data.detailAddress || ''}
              onChange={e =>
                setData(prev => ({ ...prev, detailAddress: e.target.value }))
              }
            />
          </>
        ) : (
          // 조회 모드 → 기본주소 + 상세주소 합쳐서 표시
          <input
            className={`${inputCls} ${readonlyStyle} mt-[10px]`}
            value={`${data.address || ''} ${data.detailAddress || ''}`.trim()}
            disabled
          />
        )}
      </div>

      {/* CTA */}
      {!isEditing ? (
        <button className={ctaPrimary} onClick={startEdit}>
          수정하기
        </button>
      ) : (
        <div className="flex gap-3">
          <button className={ctaGhost} onClick={cancelEdit}>
            취소
          </button>
          <button
            className="w-1/2 h-12 rounded-[10px] bg-[#FF9555] text-[#FFFEFD] text-[20px] font-semibold leading-[150%] hover:opacity-90 cursor-pointer"
            onClick={saveEdit}
          >
            저장
          </button>
        </div>
      )}
      <Modal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
      >
        <div className="rounded-[12px] p-6 text-center font-[Pretendard]">
          <div className="flex items-center justify-center mb-5">
            <CheckIcon />
          </div>
          <p className="text-[#3c3c3c] text-[24px] font-semibold leading-[150%] mb-5">
            저장되었습니다.
          </p>
          <button
            className="min-w-[126px] min-h-[56px] px-5 py-2 rounded-[10px] bg-[#FF6B00] text-white font-semibold hover:opacity-90"
            onClick={() => setIsSavedModalOpen(false)}
          >
            확인
          </button>
        </div>
      </Modal>
    </div>
  );
}
