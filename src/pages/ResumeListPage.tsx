import { useState, useEffect, useRef } from 'react';
import SortDropdown from '../components/resumeList/SortDropdown';
import FilterPopover from '../components/resumeList/FilterPopover';
import ResumeCard from '../components/resumeList/ResumeCard';
import Filter from '../assets/ResumeListAssets/Filter.svg';
import ResumeModal from '../components/resumeList/ResumeModal';
import { fetchResumeByWorkerId, searchResume } from '../api/resumeListApi';
import type { ResumeDetail, ResumeSummary } from '../types/resumeList';
import Loading from '../utils/Loading/Loading';

type SortKey = 'latest' | 'distance'; // 최신순 + 거리별

const ResumeListPage = () => {
  const [sort, setSort] = useState<SortKey>('latest');
  const [allResumes, setAllResumes] = useState<ResumeSummary[]>([]);
  const [resumeList, setResumeList] = useState<ResumeSummary[]>([]);
  const [page, setPage] = useState(1);
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
  const [loading, setLoading] = useState(false);

  const pageSize = 12;

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
      setLoading(true);
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
    } finally {
      setLoading(false);
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

  return (
    <>
      {loading && <Loading />}
      <div className="mt-30 flex justify-center px-4 font-[Pretendard] over">
        <div className="w-[900px]">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-[60px] relative pr-1">
            <h1 className="text-[36px] font-bold text-[#3C3C3C]">
              이력서 조회
            </h1>
            <div className="flex gap-6">
              <SortDropdown sort={sort} setSort={setSort} />
              {/* 필터 버튼 */}
              <div className="relative" ref={popoverRef}>
                <button
                  onClick={() => setFilterOpen(prev => !prev)}
                  className="h-[50px] w-[136px] flex gap-3 justify-center items-center px-3 rounded-[10px] bg-[#FF9555] text-white text-[20px] font-semibold hover:bg-orange-400"
                >
                  <img src={Filter} alt="filter" />
                  필터
                </button>

                {filterOpen && (
                  <div className="absolute right-0 mt-1 z-20">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
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
          <div className="flex items-center justify-center gap-4 mb-20 text-gray-700">
            {/* 이전 버튼 */}
            <button
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="disabled:opacity-40"
            >
              &lt;
            </button>

            {(() => {
              const totalPages = Math.ceil(allResumes.length / pageSize);
              const pages: (number | string)[] = [];

              if (totalPages <= 7) {
                // 페이지 7 이하 -> 전부 표시
                for (let i = 1; i <= totalPages; i++) {
                  pages.push(i);
                }
              } else {
                // 페이지 8 이상 -> ... 표시
                pages.push(1); // 항상 첫 페이지

                if (page > 4) pages.push('...');

                for (
                  let i = Math.max(2, page - 2);
                  i <= Math.min(totalPages - 1, page + 2);
                  i++
                ) {
                  pages.push(i);
                }

                if (page < totalPages - 3) pages.push('...');
                pages.push(totalPages); // 항상 마지막 페이지
              }

              return pages.map((p, idx) =>
                p === '...' ? (
                  <span key={idx} className="px-2">
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p as number)}
                    className={`px-2 text-[16px] ${
                      page === p
                        ? 'underline font-semibold text-black'
                        : 'hover:text-black'
                    }`}
                  >
                    {p}
                  </button>
                )
              );
            })()}

            {/* 다음 버튼 */}
            <button
              onClick={() =>
                setPage(prev =>
                  Math.min(prev + 1, Math.ceil(allResumes.length / pageSize))
                )
              }
              disabled={page === Math.ceil(allResumes.length / pageSize)}
              className="disabled:opacity-40"
            >
              &gt;
            </button>
          </div>
        </div>

        {/* 모달 */}
        {selectedResume && (
          <ResumeModal
            data={{
              name: selectedResume.username,
              age: selectedResume.birthDate,
              gender: selectedResume.gender,
              phoneNumber: selectedResume.phoneNumber,
              address: selectedResume.address,
              certs: selectedResume.licenses ?? [],
              summary: selectedResume.introductionFullText ?? '',
            }}
            onClose={() => setSelectedResume(null)}
          />
        )}
      </div>
    </>
  );
};

export default ResumeListPage;
