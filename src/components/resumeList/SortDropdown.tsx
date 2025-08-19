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
        className="h-[50px] w-[136px] px-3 rounded-[8px] border border-[#D9D9D9] bg-[#FFFEFD] text-[#3C3C3C] flex justify-around items-center text-[20px] font-semibold hover:bg-gray-50"
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
        <div className="absolute left-0 mt-2 w-[160px] rounded-[10px] border border-[#E7E5E4] bg-white shadow">
          <button
            onClick={() => handleSelect('latest')}
            className={`w-full text-left px-3 py-2 text-[14px] ${
              sort === 'latest' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
            }`}
          >
            최신순
          </button>
          <button
            onClick={() => handleSelect('distance')}
            className={`w-full text-left px-3 py-2 text-[14px] ${
              sort === 'distance'
                ? 'bg-gray-100 font-medium'
                : 'hover:bg-gray-50'
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
