import React from 'react';

interface Props {
  selectedCerts: string[];
  setSelectedCerts: React.Dispatch<React.SetStateAction<string[]>>;
  ageRange: { min: number | null; max: number | null };
  setAgeRange: (v: { min: number | null; max: number | null }) => void;
}

const FilterChips = ({
  selectedCerts,
  setSelectedCerts,
  ageRange,
  setAgeRange,
}: Props) => {
  // 칩이 없을 땐 렌더링 x
  if (
    (ageRange.min === null || ageRange.max === null) &&
    selectedCerts.length === 0
  ) {
    return null;
  }
  return (
    <div className="flex flex-wrap gap-2 px-[20px] py-4 border-b border-[#D9D9D9]">
      {/* 연령 칩 선택 */}
      {ageRange.min && ageRange.max && (
        <span className="flex items-center justify-center px-[15px] py-[10px] bg-[#FFFEFD] border border-[#d9d9d9] rounded-full text-[16px] text-[#3C3C3C] font-[400]">
          {ageRange.min}세 ~ {ageRange.max}세
          <button
            onClick={() => setAgeRange({ min: null, max: null })}
            className="ml-[6px] text-[#3C3C3C]"
          >
            ×
          </button>
        </span>
      )}
      {/* 선택된 연령 칩 ex) 20세~39세 x */}
      {selectedCerts.map(c => (
        <span
          key={c}
          className="flex items-center justify-center px-[15px] py-[10px] bg-[#FFFEFD] border border-[#d9d9d9] rounded-full text-[16px] text-[#3C3C3C] font-[400]"
        >
          {c}
          <button
            onClick={() => setSelectedCerts(prev => prev.filter(x => x !== c))}
            className="ml-[6px] text-[#3C3C3C]"
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
};

export default FilterChips;
