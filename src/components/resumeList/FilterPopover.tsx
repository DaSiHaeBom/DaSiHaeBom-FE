import React, { useState, useEffect } from 'react';
import AgeFilter from './AgeFilter';
import CertFilter from './CertFilter';
import FilterChips from './FilterChips';

interface Props {
  selectedCerts: string[]; // 자격증 필터 목록
  setSelectedCerts: (v: string[]) => void;
  ageRange: { min: number | null; max: number | null };
  setAgeRange: (v: { min: number | null; max: number | null }) => void;
}

const FilterPopover = ({
  selectedCerts,
  setSelectedCerts,
  ageRange,
  setAgeRange,
}: Props) => {
  // 자격증 상태 임시 저장
  const [draftCerts, setDraftCerts] = useState<string[]>([]);
  const [draftAge, setDraftAge] = useState(ageRange);

  // 필터 값 변경 시 draft 동기화
  useEffect(() => {
    setDraftCerts(selectedCerts);
    setDraftAge(ageRange);
  }, [selectedCerts, ageRange]);

  return (
    <div className="w-[400px] rounded-[12px] border border-[#E7E5E4] bg-white shadow z-20">
      {/* 선택된 값들 렌더링되는 chip 영역 */}
      <FilterChips
        selectedCerts={draftCerts}
        setSelectedCerts={setDraftCerts}
        ageRange={ageRange}
        setAgeRange={setAgeRange}
      />

      {/* 연령선택 UI */}
      <AgeFilter draftAge={draftAge} setDraftAge={setDraftAge} />

      {/* 자격증 선택 UI */}
      <CertFilter draftCerts={draftCerts} setDraftCerts={setDraftCerts} />

      {/* 하단 버튼 UI */}
      <div className="flex items-center justify-end gap-2 px-3 py-3">
        <button
          onClick={() => {
            setSelectedCerts([]);
            setAgeRange({ min: null, max: null });
          }}
          className="px-3 h-9 rounded-[8px] text-[14px] text-[#6B7280] hover:bg-gray-50"
        >
          취소
        </button>
        <button
          onClick={() => {
            setSelectedCerts(draftCerts);
            setAgeRange(draftAge);
          }}
          className="px-4 h-9 rounded-[8px] bg-[#FF9555] text-white text-[14px] hover:opacity-90"
        >
          적용
        </button>
      </div>
    </div>
  );
};

export default FilterPopover;
