import React, { useEffect, useState } from 'react';
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
        console.log('검색 결과:', data);
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

  const toggleDraft = (c: string) =>
    setDraftCerts(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    );

  return (
    <div className="px-[20px] py-[14px] border-b border-[#d9d9d9]">
      <div className="text-[20px] text-[#3C3C3C] mb-2 font-semibold font-[Pretendard]">
        자격증
      </div>

      {/* 검색 인풋 */}
      <div className="relative w-full h-[56px] rounded-[10px] border border-[#D9D9D9] bg-[#FFFEFD] px-4 text-[16px] outline-none focus-within:border-[#FF9555] flex items-center justify-between">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="자격증명 입력"
          className="w-full h-full outline-none"
        />
        <img src={Search} alt="search" title="search" />
      </div>

      {/* 검색 결과 */}
      {q.trim() && (
        <div className="max-h-40 overflow-auto pt-3">
          {loading && (
            <div className="px-2 py-3 text-[13px] text-[#9CA3AF]">
              검색 중...
            </div>
          )}
          {!loading && results.length === 0 && (
            <div className="px-2 py-3 text-[13px] text-[#9CA3AF]">
              검색 결과가 없어요
            </div>
          )}
          {results.map(c => {
            const checked = draftCerts.includes(c.name);
            return (
              <label
                key={c.id}
                className="flex items-center justify-between px-2 py-1.5 hover:bg-gray-50 rounded-[6px] cursor-pointer"
              >
                <span className="text-[14px] text-[#3C3C3C]">
                  {c.name}{' '}
                  <span className="text-xs text-gray-400">({c.issuer})</span>
                </span>
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#FF9555]"
                  checked={checked}
                  onChange={() => toggleDraft(c.name)}
                />
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CertFilter;
