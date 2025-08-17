import React, { useEffect, useState } from 'react';

type Profile = {
  memberType: '개인' | '기업';
  phone: string;
  name: string;
  birth: string; // yymmdd 예시: 600802
  gender: '남성' | '여성' | '';
  address: string;
};

const labelCls =
  'text-[#3C3C3C] font-[Pretendard] text-[24px] font-semibold leading-[36px]';
const inputCls =
  'w-full h-[56px] rounded-[10px] border  border-[#D9D9D9] focus:border-[#000000] px-[20px] py-[12px] text-[16px]';
const noteRedCls =
  'ml-[10px] text-[#F00] font-[Pretendard] text-[16px] font-normal leading-[160%]';

export default function PersonInfoPage() {
  // 더미데이터 활용 추후 api 연동을 통해 초기값 제거
  const [data, setData] = useState<Profile>({
    memberType: '개인',
    phone: '01012345678',
    name: '김상명',
    birth: '600801',
    gender: '남성',
    address: '서울특별시 종로구 자하문로 15길',
  });

  // 읽기/편집 모드 관리
  const [isEditing, setIsEditing] = useState(false);

  // useEffect(() => {
  //   // api 호출하여 초기 데이터 렌더링
  // }, []);

  const handleChange =
    (key: keyof Profile) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setData(prev => ({ ...prev, [key]: e.target.value }));
    };

  const startEdit = () => setIsEditing(true);

  const cancelEdit = () => {
    // 원본으로 다시 초기화
    setIsEditing(false);
  };

  const saveEdit = async () => {
    // 추후 개인정보 수정 api 호출
    setIsEditing(false);
    alert('저장되었습니다.');
  };

  // 수정 비활성(회색) 스타일
  const readonlyStyle = !isEditing
    ? 'bg-[#F5F5F5] text-[#737373] border-[#D9D9D9]'
    : 'bg-white border-[#D9D9D9] focus:border-[#000000]';

  return (
    <div className="mx-auto w-full mt-16 max-w-[512px] py-8 font-[Pretendard] leading-[150%]">
      <h1 className="mb-[67px] text-center text-[36px] font-bold text-[#3C3C3C] ">
        {isEditing ? '개인정보 수정' : '개인정보 조회'}
      </h1>

      {/* 회원 유형 (항상 수정 불가) */}
      <div className="mb-[30px]">
        <label className={labelCls}>
          회원 유형
          <span className={noteRedCls}>수정 불가능한 항목</span>
        </label>
        <input
          className={`${inputCls} ${readonlyStyle} mt-[10px]`}
          value={data.memberType}
          disabled
          readOnly
        />
      </div>

      {/* 휴대폰 번호 */}
      <div className="mb-[30px]">
        <label className={labelCls}>휴대폰 번호</label>

        {/* 번호 입력 + 인증번호 버튼 */}
        <div className="mt-[10px] flex gap-2">
          <input
            className={`${inputCls} ${readonlyStyle} flex-1`}
            placeholder="01012345678"
            value={data.phone}
            onChange={handleChange('phone')}
            disabled={!isEditing}
          />
          <button
            type="button"
            className="h-[56px] min-w-[116px] px-[13px] rounded-[10px] bg-[#FF9555]  disabled:opacity-50 cursor-pointer text-[#fff] font-[Pretendard] text-[20px] font-semibold leading-[150%]"
            disabled={!isEditing}
          >
            <p className="">인증번호</p>
          </button>
        </div>

        {/* 인증번호 입력 + 인증 버튼 (수정 모드에서만 보임 / 동작 없음) */}
        {isEditing && (
          <div className="mt-2 flex gap-2">
            <input
              className={`${inputCls} flex-1`}
              placeholder="인증번호 입력"
            />
            <button
              type="button"
              className="h-[56px] min-w-[116px] px-4 rounded-[10px] cursor-pointer border border-[#D9D9D9] text-[#FF9555] font-semibold  font-[Pretendard] text-[20px] leading-[150%]"
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
          placeholder="이름"
          value={data.name}
          onChange={handleChange('name')}
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
          onChange={handleChange('birth')}
          disabled={!isEditing}
        />
      </div>

      {/* 성별 (항상 수정 불가) */}
      <div className="mb-[30px]">
        <label className={labelCls}>
          성별
          <span className={noteRedCls}>수정 불가능한 항목</span>
        </label>
        <div className="mt-[10px] flex items-center gap-6 text-[14px] text-[#3C3C3C]">
          <label className="flex items-center gap-2">
            <input type="radio" checked={data.gender === '남성'} disabled />
            남성
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" checked={data.gender === '여성'} disabled />
            여성
          </label>
        </div>
      </div>

      {/* 주소 */}
      <div className="mb-[60px]">
        <label className={labelCls}>주소</label>

        {/* 우편번호 + 주소검색 버튼 (수정 모드에서만 보임 / 동작 없음) */}
        {isEditing && (
          <div className="mt-[10px] flex gap-2">
            <input className={`${inputCls} w-[180px]`} placeholder="우편번호" />
            <button
              type="button"
              className="h-[56px] min-w-[116px] px-4 rounded-[10px] bg-[#FF9555] text-white font-semibold cursor-pointer"
            >
              주소 검색
            </button>
          </div>
        )}

        {/* 기본 주소 */}
        <input
          className={`${inputCls} ${readonlyStyle} mt-[10px]`}
          placeholder="기본 주소"
          value={data.address}
          onChange={handleChange('address')}
          disabled={!isEditing}
        />
      </div>

      {/* 하단 버튼 */}
      {!isEditing ? (
        <button
          className="w-full h-12 rounded-[10px] bg-[#FF9555] text-white font-semibold hover:opacity-90"
          onClick={startEdit}
        >
          수정하기
        </button>
      ) : (
        <div className="flex gap-3">
          <button
            className="w-1/2 h-12 rounded-[10px] border border-gray-300 hover:bg-gray-100"
            onClick={cancelEdit}
          >
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
