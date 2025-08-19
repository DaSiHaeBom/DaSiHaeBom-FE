import { useState, useEffect, useRef } from 'react';
import SortDropdown from '../components/resumeList/SortDropdown';
import FilterPopover from '../components/resumeList/FilterPopover';
import ResumeCard from '../components/resumeList/ResumeCard';
import Filter from '../assets/ResumeListAssets/Filter.svg';
import ResumeModal from '../components/resumeList/ResumeModal';
import { login } from '../api/ResumeApi';

const ResumeListPage = () => {
  type SortKey = 'latest' | 'distance';
  const [sort, setSort] = useState<SortKey>('latest');

  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState<{
    min: number | null;
    max: number | null;
  }>({
    min: null,
    max: null,
  });

  const [filterOpen, setFilterOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [selectedResume, setSelectedResume] = useState<any | null>(null); // ✅ 모달용

  // 임시 로그인
  useEffect(() => {
    const doLogin = async () => {
      try {
        const res = await login();
        console.log('로그인 성공:', res.result);
      } catch (err) {
        console.error('로그인 실패:', err);
      }
    };
    doLogin();
  }, []);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dummy = {
    name: '김상명',
    age: 66,
    address: '서울특별시 종로구 자하문로 15길',
    certs: ['운전면허증 (2종)', '요양보호사 자격증', '귀멸의 칼날 시청'],
    summary:
      '사람이 좋다 사람이 좋아 사람이 좋다 사람이 좋다 사람이 좋아 사람이 좋다 나는 나비다 나는 벌이다 나는 나비다 나는 벌이다 나는 나비다 나는 벌이다',
  };

  return (
    <div className="mt-26 flex justify-center px-4 font-[Pretendard]">
      <div className="w-[900px]">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-[60px] relative pr-1">
          <h1 className="text-[36px] font-bold text-[#3C3C3C]">이력서 조회</h1>
          <div className="flex gap-2">
            <SortDropdown sort={sort} setSort={setSort} />

            {/* 필터 버튼 */}
            <div className="relative" ref={popoverRef}>
              <button
                onClick={() => setFilterOpen(prev => !prev)}
                className="h-[50px] w-[136px] justify-center flex gap-3 text-white items-center px-3 rounded-[8px] border-none bg-[#FF9555] text-[20px] font-semibold cursor-pointer hover:bg-orange-400"
              >
                <img src={Filter} alt="filter" title="filter" />
                필터
              </button>

              {filterOpen && (
                <div className="absolute right-0 mt-2 z-20">
                  <FilterPopover
                    selectedCerts={selectedCerts}
                    setSelectedCerts={setSelectedCerts}
                    ageRange={ageRange}
                    setAgeRange={setAgeRange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 카드 리스트 */}
        <div className="grid grid-cols-3 gap-6 mb-26">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} onClick={() => setSelectedResume(dummy)}>
              <ResumeCard {...dummy} />
            </div>
          ))}
        </div>
      </div>
      {/* 모달 */}
      {selectedResume && (
        <ResumeModal
          data={selectedResume}
          onClose={() => setSelectedResume(null)}
        />
      )}
    </div>
  );
};

export default ResumeListPage;
