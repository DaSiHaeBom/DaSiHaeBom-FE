import { useState, useEffect, useRef } from 'react';
import SortDropdown from '../components/resumeList/SortDropdown';
import FilterPopover from '../components/resumeList/FilterPopover';
import ResumeCard from '../components/resumeList/ResumeCard';
import Filter from '../assets/ResumeListAssets/Filter.svg';
import ResumeModal from '../components/resumeList/ResumeModal';
import { fetchResumeByWorkerId, searchResume } from '../api/resumeListApi';
import type { ResumeDetail, ResumeSummary } from '../types/resumeList';

type SortKey = 'latest' | 'distance'; // 최신순 + 거리별

const ResumeListPage = () => {
  const [sort, setSort] = useState<SortKey | null>(null);
  const [allResumes, setAllResumes] = useState<ResumeSummary[]>([]);
  const [resumeList, setResumeList] = useState<ResumeSummary[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 12;

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

  const [selectedResume, setSelectedResume] = useState<ResumeDetail | null>(
    null
  );

  // 카드 클릭 후 모달 여는 핸들러
  const handleOpenResumeModal = async (workerId: number) => {
    try {
      const detail = await fetchResumeByWorkerId(workerId);
      setSelectedResume(detail);
    } catch (err) {
      console.error('❌ 이력서 상세 조회 실패:', err);
    }
  };

  // 리스트 데이터 불러오기(커서 기반)
  const loadAllResumes = async () => {
    try {
      let results: ResumeSummary[] = [];
      let nextCursorId: number | null = null;
      let nextCursorDistance: number | null = null;

      while (true) {
        const body = {
          size: 100,
          cursorId: nextCursorId ?? undefined,
          cursorDistance: nextCursorDistance ?? undefined,
          sortBy: sort ?? 'latest', // 기본값은 최신순
          minAge: ageRange.min ?? 0,
          maxAge: ageRange.max ?? 100,
          licenses: selectedCerts.length > 0 ? selectedCerts : null,
          latitude: 0.1,
          longitude: 0.1,
        };

        const data = await searchResume(body);
        results = [...results, ...data.resumes];

        if (!data.nextCursorId && !data.nextCursorDistance) break;

        nextCursorId = data.nextCursorId;
        nextCursorDistance = data.nextCursorDistance;
      }

      setAllResumes(results);
    } catch (err) {
      console.error('❌ 이력서 전체 불러오기 실패:', err);
    }
  };

  // 페이지네이션 처리
  useEffect(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    setResumeList(allResumes.slice(start, end));
  }, [page, allResumes]);

  // 필터 정렬 사용 시 리스트 다시 불러오기
  useEffect(() => {
    setPage(1);
    loadAllResumes();
  }, [sort, selectedCerts, ageRange]);

  // 바깥 클릭 시 모달 닫기
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

  // 나이 계산 유틸
  const calculateAge = (birthDate: string): number => {
    const birthYear = Number(birthDate.split('.')[0]);
    return new Date().getFullYear() - birthYear;
  };

  return (
    <div className="mt-30 flex justify-center px-4 font-[Pretendard]">
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
                className="h-[50px] w-[136px] flex gap-3 justify-center items-center px-3 rounded-[8px] bg-[#FF9555] text-white text-[20px] font-semibold hover:bg-orange-400"
              >
                <img src={Filter} alt="filter" />
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
        <div className="grid grid-cols-3 gap-6 mb-16">
          {resumeList.map(resume => (
            <div
              key={resume.resumeId}
              onClick={() => handleOpenResumeModal(resume.workerId)}
            >
              <ResumeCard
                name={resume.username}
                age={resume.age}
                address={resume.address}
                certs={resume.licenseNames ?? []}
                summary={resume.introductionSummary}
              />
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center gap-2 mb-20">
          {Array.from(
            { length: Math.ceil(allResumes.length / pageSize) },
            (_, i) => i + 1
          ).map(num => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-3 py-1 rounded ${
                page === num
                  ? 'bg-orange-400 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* 모달 */}
      {selectedResume && (
        <ResumeModal
          data={{
            name: selectedResume.username,
            age: calculateAge(selectedResume.birthDate),
            address: selectedResume.address,
            certs: selectedResume.licenses?.map(l => l.name) ?? [],
            summary: selectedResume.introductionFullText ?? '',
          }}
          onClose={() => setSelectedResume(null)}
        />
      )}
    </div>
  );
};

export default ResumeListPage;
