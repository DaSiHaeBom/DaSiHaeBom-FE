import { useEffect, useState } from 'react';
import { createLicense, searchLicenses } from '../../api/licenseApi';
import type { ModalType } from '../../types/ModalType';
import Modal from '../Modal';
import type React from 'react';
import type { License } from '../../types/License';

type LicenseFormModalProps = {
  modalType: ModalType;
  handleClose: () => void;
  licenseData: License;
  certList: License[];
  setLicenseData: React.Dispatch<React.SetStateAction<License>>;
  setCertList: React.Dispatch<React.SetStateAction<License[]>>;
  setModalType: React.Dispatch<React.SetStateAction<ModalType>>;
};

const LicenseFormModal = ({
  modalType,
  handleClose,
  licenseData,
  setLicenseData,
  setCertList,
  setModalType,
}: LicenseFormModalProps) => {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState<
    { id: number; name: string; issuer: string }[]
  >([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // 검색 api 호출 + 디바운스
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!query.trim()) {
        setOptions([]);
        setShowDropdown(false);
        return;
      }
      try {
        const results = await searchLicenses(query);
        setOptions(results);
        setShowDropdown(true);
      } catch (err) {
        console.error('자격증 검색 실패:', err);
      }
    }, 150); // 원활한 입력을 위한 디바운스 적용 (없어도 됨.)

    return () => clearTimeout(delay);
  }, [query]);

  // 일반 입력 변경 핸들러
  const onChange =
    (key: keyof License) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setLicenseData(prev => ({ ...prev, [key]: e.target.value }));
    };

  // 검색 결과 렌더링
  const handleSelectOption = (opt: {
    id: number;
    name: string;
    issuer: string;
  }) => {
    setLicenseData(prev => ({
      ...prev,
      name: opt.name,
      issuer: opt.issuer,
    }));
    setQuery(opt.name);
    setShowDropdown(false);
  };

  //  자격증 등록 핸들러
  const handleRegister = async () => {
    if (!licenseData.name.trim()) return alert('자격증명을 입력하세요.');
    if (!licenseData.issuer.trim()) return alert('발급기관을 입력하세요.');
    if (!licenseData.issuedAt) return alert('발급일을 선택하세요.');

    try {
      const res = await createLicense({
        name: licenseData.name.trim(),
        issuer: licenseData.issuer.trim(),
        issuedAt: licenseData.issuedAt,
      });

      const newItem: License = {
        licenseId: res.result.licenseId,
        name: licenseData.name.trim(),
        issuer: licenseData.issuer.trim(),
        issuedAt: licenseData.issuedAt,
      };

      setCertList(prev => [...prev, newItem]);
      setLicenseData({ licenseId: 0, name: '', issuedAt: '', issuer: '' });
      setModalType('LICENSE_LIST');
    } catch (err) {
      console.error('자격증 등록 실패:', err);
      alert('자격증 등록에 실패했습니다.');
    }
  };

  return (
    <Modal isOpen={modalType === 'LICENSE_FORM'} onClose={handleClose}>
      <h2 className="text-[#3C3C3C] font-[Pretendard] text-[20px] font-bold leading-[150%] mb-4">
        자격증 등록
      </h2>

      <div className="flex flex-col gap-3 text-left text-sm text-[#3C3C3C]">
        {/* 자격증명 + 검색 드롭다운 */}
        <label className="space-y-1 relative">
          <span className="text-[14px] leading-[160%]">자격증명</span>
          <input
            className="w-full border border-[#D9D9D9] rounded-[8px] p-2 focus:outline-none focus:ring-1 focus:ring-orange-300"
            placeholder="자격증 명을 입력하세요."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {showDropdown && options.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white border rounded-[8px] mt-1 max-h-48 overflow-y-auto shadow z-10">
              {options.map(opt => (
                <li
                  key={opt.id}
                  onClick={() => handleSelectOption(opt)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {opt.name}
                </li>
              ))}
            </ul>
          )}
        </label>

        {/* 발급일 */}
        <label className="space-y-1">
          <span className="text-[14px] leading-[160%]">발급일</span>
          <input
            type="date"
            className="w-full border border-[#D9D9D9] rounded-[8px] p-2 focus:outline-none focus:ring-1 focus:ring-orange-300"
            value={licenseData.issuedAt}
            onChange={onChange('issuedAt')}
          />
        </label>

        {/* 발급기관 */}
        <label className="space-y-1">
          <span className="text-[14px] leading-[160%]">발급기관</span>
          <input
            className="w-full border border-[#D9D9D9] rounded-[8px] p-2 focus:outline-none focus:ring-1 focus:ring-orange-300"
            placeholder="자격증 발급기관을 입력하세요."
            value={licenseData.issuer}
            onChange={onChange('issuer')}
          />
        </label>
      </div>

      {/* 버튼 영역 */}
      <div className="mt-6 flex gap-3">
        <button
          className="flex-1 py-3 rounded-[10px] border border-gray-300 hover:bg-gray-100"
          onClick={handleClose}
        >
          취소
        </button>
        <button
          className="flex-1 py-3 rounded-[10px] bg-[#FF9555] text-white font-semibold hover:opacity-90"
          onClick={handleRegister}
        >
          + 등록하기
        </button>
      </div>
    </Modal>
  );
};

export default LicenseFormModal;
