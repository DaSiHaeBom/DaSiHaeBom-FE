import { useState } from 'react';
import Bottom from '../../assets/ResumeListAssets/Bottom.svg';

// 정렬 기준 타입
type SortKey = 'latest' | 'distance';

interface Props {
  sort: SortKey;
  setSort: (s: SortKey) => void;
}

const SortDropdown = ({ sort, setSort }: Props) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: SortKey) => {
    setSort(value);
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* 드롭다운 열기 버튼 */}
      <button
        onClick={() => setOpen(!open)}
        className="h-[50px] w-full min-w-[136px] px-3 rounded-[10px] border border-[#D9D9D9] bg-[#FFFEFD] text-[#3C3C3C] flex justify-center gap-3 items-center text-[20px] font-semibold hover:bg-gray-50"
      >
        {sort === 'latest' ? '최신순' : '거리순'}
        <img
          src={Bottom}
          alt="화살표"
          className={`w-4 h-4 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* 열렸을 때만 메뉴 보여주기 */}
      {open && (
        <div className="absolute left-0 mt-1 w-[136px] rounded-[10px] border border-[#E7E5E4] bg-white shadow overflow-hidden">
          <button
            onClick={() => handleSelect('latest')}
            className={`w-full font-semibold text-[#3c3c3c] text-left px-6 py-2 text-[20px] hover:bg-gray-100 ${
              sort === 'latest' ? 'bg-gray-100' : ''
            }`}
          >
            최신순
          </button>
          <div className="h-[1px] bg-[#E7E5E4]" />
          <button
            onClick={() => handleSelect('distance')}
            className={`w-full font-semibold text-[#3c3c3c] text-left px-6 py-2 text-[20px] hover:bg-gray-100 ${
              sort === 'distance' ? 'bg-gray-100' : ''
            }`}
          >
            거리순
          </button>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
