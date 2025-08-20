import React from 'react';

interface Props {
  draftAge: { min: number | null; max: number | null };
  setDraftAge: React.Dispatch<
    React.SetStateAction<{ min: number | null; max: number | null }>
  >;
}

const AgeFilter = ({ draftAge, setDraftAge }: Props) => {
  return (
    <div className="px-[20px] py-[14px] border-b border-[#D9D9D9]">
      <div className="text-[20px] text-[#3C3C3C] mb-2 font-semibold font-[Pretendard]">
        연령
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={20}
          max={100}
          value={draftAge.min ?? ''}
          onChange={e =>
            setDraftAge(prev => ({
              ...prev,
              min: e.target.value ? Number(e.target.value) : null,
            }))
          }
          className="w-[62px] h-[38px] border border-[#d9d9d9] bg-[#FFFEFD] rounded-[10px] px-2 text-[18px] flex items-center justify-center"
        />
        <span>세 ~</span>
        <input
          type="number"
          min={20}
          max={100}
          value={draftAge.max ?? ''}
          onChange={e =>
            setDraftAge(prev => ({
              ...prev,
              max: e.target.value ? Number(e.target.value) : null,
            }))
          }
          className="w-[62px] h-[38px] border border-[#d9d9d9] bg-[#FFFEFD] rounded-[10px] px-2 text-[18px] flex items-center justify-center]"
        />
        <span>세</span>
      </div>
    </div>
  );
};

export default AgeFilter;
