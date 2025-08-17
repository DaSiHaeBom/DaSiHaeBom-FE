import React from 'react';
import RadioChecked from '../assets/MyPageAssets/RadioChecked.svg';
import RadioUnchecked from '../assets/MyPageAssets/RadioUnchecked.svg';

type GenderSelectProps = {
  value: '남성' | '여성' | '';
  onChange: (val: '남성' | '여성') => void;
  disabled?: boolean;
};

const GenderSelect = ({ value, onChange, disabled }: GenderSelectProps) => {
  const baseCls =
    'flex items-center gap-2 cursor-pointer text-[16px] font-[Pretendard]';

  return (
    <div className="flex max-w-[160px] w-full gap-10">
      {/* 남성 */}
      <div
        className={`${baseCls} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && onChange('남성')}
      >
        <img
          src={value === '남성' ? RadioChecked : RadioUnchecked}
          alt="남성 선택"
          className="w-5 h-5"
        />
        <span>남성</span>
      </div>

      {/* 여성 */}
      <div
        className={`${baseCls} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && onChange('여성')}
      >
        <img
          src={value === '여성' ? RadioChecked : RadioUnchecked}
          alt="여성 선택"
          className="w-5 h-5"
        />
        <span>여성</span>
      </div>
    </div>
  );
};

export default GenderSelect;
