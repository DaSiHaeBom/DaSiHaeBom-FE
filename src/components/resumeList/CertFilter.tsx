import React, { useEffect, useRef, useState } from 'react';
import Search from '../../assets/ResumeListAssets/Search.svg';
import { searchLicenses } from '../../api/resumeListApi';

interface Props {
  draftCerts: string[];
  setDraftCerts: React.Dispatch<React.SetStateAction<string[]>>;
}

interface License {
  id: number;
  name: string;
  issuer: string;
}

const CertFilter = ({ draftCerts, setDraftCerts }: Props) => {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<License[]>([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 검색 API 호출
  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }

    const fetchCerts = async () => {
      try {
        setLoading(true);
        const data = await searchLicenses(q);
        setResults(data || []);
      } catch (err) {
        console.error('자격증 검색 실패:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchCerts, 100); // 검색 효율을 위해 일시적인 디바운스 허용
    return () => clearTimeout(delay);
  }, [q]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setQ(''); // 입력값 초기화 → 드롭다운 닫힘
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDraft = (c: string) =>
    setDraftCerts(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    );

  return (
    <div className="px-[20px] py-[14px] border-b border-[#d9d9d9] relative">
      <div className="text-[20px] text-[#3C3C3C] mb-2 font-semibold font-[Pretendard]">
        자격증
      </div>

      {/* 검색 인풋 + 드롭다운 감싸는 박스 */}
      <div className="relative w-full" ref={dropdownRef}>
        {/* 검색 인풋 */}
        <div className="w-full h-[56px] rounded-[10px] border border-[#D9D9D9] bg-[#FFFEFD] px-4 text-[16px] flex items-center justify-between">
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="자격증명 입력"
            className="w-full h-full outline-none"
          />
          <img src={Search} alt="search" title="search" />
        </div>

        {/* 드롭다운 */}
        {q.trim() && (
          <div className="absolute top-full left-0 mt-1 py-2 w-full bg-white border border-[#D9D9D9] rounded-[10px] z-10 overflow-hidden shadow-[0_4px_10px_0_rgba(0,0,0,0.25)]">
            <div className="max-h-48 overflow-auto">
              {loading && (
                <div className="px-4 py-3 text-sm text-gray-400">
                  검색 중...
                </div>
              )}
              {!loading && results.length === 0 && (
                <div className="px-4 py-3 text-sm text-gray-400">
                  검색 결과가 없어요
                </div>
              )}
              {results.map(c => {
                const checked = draftCerts.includes(c.name);
                return (
                  <label
                    key={c.id}
                    className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      className="hidden peer"
                      checked={checked}
                      onChange={() => toggleDraft(c.name)}
                    />
                    <span
                      className={`
                        w-4 h-4 flex items-center justify-center rounded-[4px] border bg-white border-[#c9c9c9] peer-checked:after:content-['✓'] peer-checked:after:text-[#FF9555] peer-checked:after:text-[13px] peer-checked:font-bold`}
                    ></span>
                    <span className="text-[16px] text-[#3C3C3C]">{c.name}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertFilter;
