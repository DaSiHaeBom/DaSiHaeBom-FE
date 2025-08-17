import React, { useMemo, useState } from 'react';
import Modal from '../components/Modal';
import CheckIcon from '../assets/MyPageAssets/CheckIcon';
import GenderSelect from '../components/GenderSelect';

/** ===== Types ===== */
type PersonalProfile = {
  memberType: '개인';
  phone: string;
  name: string; // 이름
  birth: string; // yymmdd
  gender: '남성' | '여성' | '';
  address: string;
  zip: string;
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
  /** 초기값 */
  const initialData = useMemo<PersonalProfile>(
    () => ({
      memberType: '개인',
      phone: '01012345678',
      name: '김상명',
      birth: '600801',
      gender: '남성',
      address: '서울 종로구 ...',
      zip: '00000',
    }),
    []
  );

  /** 상태 */
  const [data, setData] = useState<PersonalProfile>(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  /** change 헬퍼 */
  const updateField =
    <K extends keyof PersonalProfile>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setData(prev => ({ ...prev, [key]: e.target.value }));

  /** 액션 */
  const startEdit = () => setIsEditing(true);
  const cancelEdit = () => {
    setData(initialData);
    setIsEditing(false);
  };
  const saveEdit = () => {
    setIsEditing(false);
    setIsSavedModalOpen(true);
  };

  /** 스타일 */
  const readonlyStyle = !isEditing
    ? 'bg-[#F5F5F5] text-[#737373] border-[#D9D9D9]'
    : 'bg-white';

  return (
    <div className="mx-auto w-full mt-16 max-w-[512px] py-8 font-[Pretendard] leading-[150%]">
      <h1 className="mb-[67px] text-center text-[36px] font-bold text-[#3C3C3C]">
        {isEditing ? '개인정보 수정' : '개인정보 조회'}
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
          >
            인증번호
          </button>
        </div>
        {isEditing && (
          <div className="mt-2 flex gap-2">
            <input
              className={`${inputCls} flex-1`}
              placeholder="인증번호 입력"
            />
            <button
              type="button"
              className="h-[56px] min-w-[116px] px-4 rounded-[10px] border border-[#D9D9D9] text-[#FF9555] text-[20px] font-semibold leading-[150%] cursor-pointer"
            >
              인증
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

      {/* 주소(기업: 우편번호 + 검색 버튼 노출) */}
      <div className="mb-[60px]">
        <label className={labelCls}>주소</label>

        {isEditing && (
          <div className="mt-[10px] flex gap-2">
            <input
              className={`${inputCls} w-[180px]`}
              placeholder="우편번호"
              value={data.zip ?? ''}
              onChange={updateField('zip')}
            />
            <button
              type="button"
              className="h-[56px] min-w-[116px] px-4 rounded-[10px] bg-[#FF9555] text-[#FFFEFD] text-[20px] font-semibold leading-[150%] cursor-pointer"
              // TODO: 주소 검색 모달/다음우편번호 연동
            >
              주소 검색
            </button>
          </div>
        )}

        <input
          className={`${inputCls} ${readonlyStyle} mt-[10px]`}
          placeholder="기본 주소"
          value={data.address}
          onChange={updateField('address')}
          disabled={!isEditing}
        />
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
