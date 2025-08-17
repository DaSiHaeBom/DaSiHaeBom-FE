import React, { useMemo, useState } from 'react';

/** ===== Types ===== */
type BusinessProfile = {
  memberType: '기업';
  phone: string; // 대표번호
  name: string; // 대표자명
  bizRegNo: string; // 사업자 등록 번호
  companyName: string; // 회사/점포명
  address: string; // 주소(상세 포함)
  zip?: string; // 우편번호(선택)
};

/** ===== UI classes ===== */
const labelCls =
  'text-[#3C3C3C] font-[Pretendard] text-[24px] font-semibold leading-[36px]';
const inputCls =
  'w-full h-[56px] rounded-[10px] border border-[#D9D9D9] focus:border-black px-[20px] py-[12px] text-[16px]';
const noteRedCls =
  'ml-[10px] text-[#F00] font-[Pretendard] text-[16px] font-normal leading-[160%]';
const ctaPrimary =
  'w-full h-12 rounded-[10px] bg-[#FF9555] text-white font-semibold hover:opacity-90';
const ctaGhost =
  'w-1/2 h-12 rounded-[10px] border border-gray-300 hover:bg-gray-100';

export default function BusinessInfoPage() {
  /** 초기값 */
  const initialData = useMemo<BusinessProfile>(
    () => ({
      memberType: '기업',
      phone: '02-123-4567',
      name: '홍길동',
      bizRegNo: '000-00-00000',
      companyName: '주식회사 상명',
      address: '서울 종로구 ...',
      zip: '00000',
    }),
    []
  );

  /** 상태 */
  const [data, setData] = useState<BusinessProfile>(initialData);
  const [isEditing, setIsEditing] = useState(false);

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
  const saveEdit = () => {
    // TODO: API 연동
    setIsEditing(false);
    alert('저장되었습니다.');
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

      {/* 회원 유형 (항상 수정 불가) */}
      <div className="mb-[30px]">
        <label className={labelCls}>
          회원 유형 <span className={noteRedCls}>수정 불가능한 항목</span>
        </label>
        <input
          className={`${inputCls} ${readonlyStyle} mt-[10px]`}
          value={data.memberType}
          disabled
          readOnly
        />
      </div>

      {/* 대표번호 */}
      <div className="mb-[30px]">
        <label className={labelCls}>전화번호</label>
        <div className="mt-[10px] flex gap-2">
          <input
            className={`${inputCls} ${readonlyStyle} flex-1`}
            placeholder="02-0000-0000"
            value={data.phone}
            onChange={updateField('phone')}
            disabled={!isEditing}
          />
          <button
            type="button"
            className="h-[56px] min-w-[116px] px-[13px] rounded-[10px] bg-[#FF9555] text-white font-semibold disabled:opacity-50"
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
              className="h-[56px] min-w-[116px] px-4 rounded-[10px] border border-[#D9D9D9] text-[#FF9555] font-semibold"
            >
              인증
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
              className="h-[56px] min-w-[116px] px-4 rounded-[10px] bg-[#FFA66F] text-white hover:opacity-90"
              // TODO: 사업자번호 유효성/조회 로직 연결 (onClick)
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
              className="h-[56px] min-w-[116px] px-4 rounded-[10px] bg-[#FF9555] text-white font-semibold"
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
            className="w-1/2 h-12 rounded-[10px] bg-[#FF9555] text-white font-semibold hover:opacity-90"
            onClick={saveEdit}
          >
            저장
          </button>
        </div>
      )}
    </div>
  );
}
