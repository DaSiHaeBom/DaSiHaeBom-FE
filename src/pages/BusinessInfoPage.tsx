import React, { useEffect, useMemo, useState } from 'react';
import Modal from '../components/Modal';
import CheckIcon from '../assets/MyPageAssets/CheckIcon';
import { fetchCorpInfo, updateCorpInfo } from '../api/userApi';
import {
  sendProfilePhoneVerificationCode,
  verifyPhoneCode,
} from '../api/authApi';

/** ===== Types ===== */
type BusinessProfile = {
  memberType: '기업';
  phone: string; // 대표번호
  name: string; // 대표자명
  bizRegNo: string; // 사업자 등록 번호
  companyName: string; // 회사/점포명
  address: string; // 기본 주소
  detailAddress: string; // 상세 주소
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

export default function BusinessInfoPage() {
  // 초기 더미값
  const initialData = useMemo<BusinessProfile>(
    () => ({
      memberType: '기업',
      phone: '',
      name: '',
      bizRegNo: '',
      companyName: '',
      address: '',
      detailAddress: '',
    }),
    []
  );
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [data, setData] = useState<BusinessProfile>(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  // 기업 회원 정보 불러오기
  useEffect(() => {
    const loadCorpUser = async () => {
      try {
        const user = await fetchCorpInfo();
        setData({
          memberType: '기업',
          phone: user.phoneNumber,
          name: user.ceoName,
          bizRegNo: user.corpNumber,
          companyName: user.corpName,
          address: user.corpBaseAddress ?? '',
          detailAddress: user.corpDetailAddress ?? '',
        });
      } catch (err) {
        console.error('기업회원 정보 불러오기 실패', err);
      }
    };

    loadCorpUser();
  }, []);

  // 자주 반복되는 동작을 위해 뺴놓은 함수
  const updateField =
    <K extends keyof BusinessProfile>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setData(prev => ({ ...prev, [key]: e.target.value }));

  /** 액션 */
  const startEdit = () => setIsEditing(true);
  const cancelEdit = () => {
    setData(initialData);
    setIsEditing(false);
  };

  const saveEdit = async () => {
    if (!data) return;
    try {
      const res = await updateCorpInfo({
        ceoName: data.name,
        phoneNumber: data.phone,
        corpNumber: data.bizRegNo,
        corpName: data.companyName,
        corpBaseAddress: data.address,
        corpDetailAddress: data.detailAddress,
      });
      console.log(res);
      setIsEditing(false);
      setIsSavedModalOpen(true);
    } catch (err) {
      console.error('기업정보 수정 실패:', err);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  // 카카오 우편번호 열기
  const openDaumPostcode = () => {
    interface DaumPostcodeData {
      roadAddress?: string;
      jibunAddress?: string;
    }

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
        onclose: () => {},
      }).open();
    };

    // 이미 스크립트 있으면 바로 실행
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
      const res = await sendProfilePhoneVerificationCode(data.phone);
      console.log('인증번호 전송 성공:', res);
      alert('인증번호가 전송되었습니다.');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { status?: number } };
        if (axiosErr.response?.status === 409) {
          console.warn('이미 등록된 번호이거나 중복 요청입니다.');
          alert('이미 사용 중인 번호이거나 요청이 중복되었습니다.');
          return;
        }
      }
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

  /** 스타일 */
  const readonlyStyle = !isEditing
    ? 'bg-[#F5F5F5] text-[#737373] border-[#D9D9D9]'
    : 'bg-white';

  return (
    <div className="mx-auto w-full mt-16 max-w-[512px] py-8 font-[Pretendard] leading-[150%]">
      <h1 className="mb-[67px] text-center text-[36px] font-bold text-[#3C3C3C]">
        {isEditing ? '기업정보 수정' : '기업정보 조회'}
      </h1>

      {/* 회원 유형 */}
      <div className="mb-[30px]">
        <div className="flex items-end gap-2 mb-2">
          <span className="text-[#3C3C3C] font-[Pretendard] text-[24px] font-semibold leading-[150%]">
            회원 유형
          </span>
          <span className={`${noteRedCls} pb-[2px]`}>수정 불가능한 항목</span>
        </div>

        <div className="flex max-w-[116px] items-center justify-center rounded-[10px] bg-[#d9d9d9] border border-[#d9d9d9] px-6 py-3 text-[#737373] text-[20px] font-semibold">
          {data.memberType}
        </div>
      </div>

      {/* 대표번호 */}
      <div className="mb-[30px]">
        <label className={labelCls}>전화번호</label>
        <div className="mt-[10px] flex gap-2">
          <input
            className={`${inputCls} ${readonlyStyle} flex-1`}
            placeholder="010-xxxx-xxxx"
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

      {/* 대표자명 */}
      <div className="mb-[30px]">
        <label className={labelCls}>대표자명</label>
        <input
          className={`${inputCls} ${readonlyStyle} mt-[10px]`}
          value={data.name}
          onChange={updateField('name')}
          disabled={!isEditing}
          placeholder="대표자명"
        />
      </div>

      {/* 사업자 등록 번호 */}
      <div className="mb-[30px]">
        <label className={labelCls}>사업자 등록 번호</label>
        <div className="mt-[10px] flex gap-2">
          <input
            className={`${inputCls} ${readonlyStyle} flex-1`}
            placeholder="000-00-00000"
            value={data.bizRegNo}
            onChange={updateField('bizRegNo')}
            disabled={!isEditing}
          />
          {isEditing && (
            <button
              type="button"
              className="h-[56px] min-w-[116px] px-4 rounded-[10px] bg-[#FF9555] text-[#FFFEFD] text-[20px] font-semibold leading-[150%] hover:opacity-90 cursor-pointer"
            >
              확인
            </button>
          )}
        </div>
      </div>

      {/* 회사/점포명 */}
      <div className="mb-[30px]">
        <label className={labelCls}>회사/점포명</label>
        <input
          className={`${inputCls} ${readonlyStyle} mt-[10px]`}
          value={data.companyName}
          onChange={updateField('companyName')}
          disabled={!isEditing}
          placeholder="회사 또는 점포명"
        />
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
              onChange={updateField('detailAddress')}
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
