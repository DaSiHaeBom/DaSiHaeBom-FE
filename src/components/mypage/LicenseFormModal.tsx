import { useEffect, useState } from 'react';
import {
  createLicense,
  searchLicenses,
  updateLicense,
} from '../../api/licenseApi';
import type { ModalType } from '../../types/ModalType';
import Modal from '../Modal';
import type React from 'react';
import type { License } from '../../types/License';
import Plus from '../../assets/MyPageAssets/Plus.svg';

type LicenseFormModalProps = {
  modalType: ModalType;
  handleClose: () => void;
  licenseData: License;
  certList: License[];
  setLicenseData: React.Dispatch<React.SetStateAction<License>>;
  setCertList: React.Dispatch<React.SetStateAction<License[]>>;
  setModalType: React.Dispatch<React.SetStateAction<ModalType>>;
  mode: 'create' | 'edit';
};

const LicenseFormModal = ({
  modalType,
  handleClose,
  licenseData,
  setLicenseData,
  setCertList,
  setModalType,
  mode,
}: LicenseFormModalProps) => {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState<
    { id: number; name: string; issuer: string }[]
  >([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // 모달 열릴 때 초기화 or 값 세팅
  useEffect(() => {
    if (modalType === 'LICENSE_FORM') {
      if (mode === 'create') {
        setLicenseData({ licenseId: 0, name: '', issuer: '', issuedAt: '' });
        setQuery('');
      } else {
        setQuery(licenseData.name); // 수정 모드에서는 기존 이름 표시
      }
    }
  }, [modalType, mode]);

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
      if (key === 'name') setQuery(e.target.value);
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

  // 등록/수정 공용 핸들러
  const handleSubmit = async () => {
    if (!licenseData.name.trim()) return alert('자격증명을 입력하세요.');
    if (!licenseData.issuer.trim()) return alert('발급기관을 입력하세요.');
    if (!licenseData.issuedAt) return alert('발급일을 선택하세요.');

    try {
      if (mode === 'create') {
        // 등록
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
      } else {
        // 수정
        await updateLicense(licenseData.licenseId, {
          name: licenseData.name.trim(),
          issuer: licenseData.issuer.trim(),
          issuedAt: licenseData.issuedAt,
        });
        setCertList(prev =>
          prev.map(c =>
            c.licenseId === licenseData.licenseId ? licenseData : c
          )
        );
      }

      setLicenseData({ licenseId: 0, name: '', issuer: '', issuedAt: '' });
      setModalType('LICENSE_LIST');
    } catch (err) {
      console.error(`${mode === 'create' ? '등록' : '수정'} 실패:`, err);
      alert(`${mode === 'create' ? '등록' : '수정'}에 실패했습니다.`);
    }
  };

  return (
    <Modal isOpen={modalType === 'LICENSE_FORM'} onClose={handleClose}>
      <h2 className="text-[#3C3C3C] font-[Pretendard] text-[30px] pl-2 text-left font-bold leading-[150%] mb-6">
        {mode === 'create' ? '자격증 등록' : '자격증 수정'}
      </h2>

      <div className="flex flex-col gap-4 text-[#3C3C3C] text-[17px]">
        {/* 자격증명 */}
        <div className="flex items-center gap-4">
          <label className="w-[100px] text-left pl-2 font-semibold text-[20px]">
            자격증
          </label>
          <div className="flex-1 relative">
            <input
              className="w-full h-[44px] border rounded-[8px] px-3 pr-10 focus:outline-none focus:ring-1 focus:ring-orange-300"
              placeholder="자격증명 입력"
              value={licenseData.name}
              onChange={onChange('name')}
            />
            {showDropdown && (
              <ul className="absolute left-0 right-0 bg-white border rounded-[8px] max-h-48 overflow-y-auto shadow z-10 mt-1">
                {options.length > 0 ? (
                  options.map(opt => (
                    <li
                      key={opt.id}
                      onClick={() => handleSelectOption(opt)}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-left"
                    >
                      {opt.name}
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-2 text-gray-500 select-none">
                    검색 결과 없음 — 직접 입력을 사용 중
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>

        {/* 발급일 */}
        <div className="flex items-center gap-4">
          <label className="w-[100px] text-left pl-2 font-semibold text-[20px]">
            발급일
          </label>
          <input
            type="date"
            className="flex-1 h-[44px] border rounded-[8px] px-3 focus:outline-none focus:ring-1 focus:ring-orange-300"
            value={licenseData.issuedAt}
            onChange={onChange('issuedAt')}
          />
        </div>

        {/* 발급기관 */}
        <div className="flex items-center gap-4">
          <label className="w-[100px] text-left pl-2 font-semibold text-[20px]">
            발급 기관
          </label>
          <input
            className="flex-1 h-[44px] border rounded-[8px] px-3 focus:outline-none focus:ring-1 focus:ring-orange-300"
            placeholder="입력"
            maxLength={15}
            value={licenseData.issuer}
            onChange={onChange('issuer')}
          />
        </div>
      </div>

      {/* 버튼 */}
      <div className="mt-8">
        <button
          className="w-full h-[48px] rounded-[8px] text-[20px] bg-[#FF6B01] text-white font-semibold hover:opacity-90 flex items-center justify-center gap-2"
          onClick={handleSubmit}
        >
          <img src={Plus} alt="plus" className="w-5 h-5" />
          {mode === 'create' ? '등록하기' : '수정하기'}
        </button>
      </div>
    </Modal>
  );
};

export default LicenseFormModal;
