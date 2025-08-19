// LicenseFormModal.tsx
import type { ModalType } from '../../types/ModalType';
import Modal from '../Modal';
import type React from 'react';

type License = {
  id: number;
  name: string;
  date: string;
  agency: string;
};

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
  certList,
  setCertList,
  setModalType,
}: LicenseFormModalProps) => {
  const onChange =
    (key: keyof License) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLicenseData(prev => ({ ...prev, [key]: value })); // ✅ prev 기반
    };

  const handleRegister = () => {
    if (!licenseData.name.trim()) return alert('자격증명을 입력하세요.');
    if (!licenseData.agency.trim()) return alert('발급기관을 입력하세요.');
    if (!licenseData.date) return alert('발급일을 선택하세요.');

    const newItem: License = {
      ...licenseData,
      id: Date.now(),
      name: licenseData.name.trim(),
      agency: licenseData.agency.trim(),
    };

    // ✅ 함수형 업데이트(경쟁 조건 안전)
    setCertList(prev => [...prev, newItem]);

    // 폼 리셋
    setLicenseData({ id: 0, name: '', date: '', agency: '' });

    // 목록으로 전환
    setModalType('LICENSE_LIST');
  };

  return (
    <Modal isOpen={modalType === 'LICENSE_FORM'} onClose={handleClose}>
      <h2 className="text-[#3C3C3C] font-[Pretendard] text-[20px] font-bold leading-[150%] mb-4">
        자격증 등록
      </h2>

      <div className="flex flex-col gap-3 text-left text-sm text-[#3C3C3C]">
        <label className="space-y-1">
          <span className="text-[14px] leading-[160%]">자격증명</span>
          <input
            className="w-full border border-[#D9D9D9] rounded-[8px] p-2 focus:outline-none focus:ring-1 focus:ring-orange-300"
            placeholder="자격증 명을 입력하세요."
            value={licenseData.name}
            onChange={onChange('name')}
          />
        </label>

        <label className="space-y-1">
          <span className="text-[14px] leading-[160%]">발급일</span>
          <input
            type="date"
            className="w-full border border-[#D9D9D9] rounded-[8px] p-2 focus:outline-none focus:ring-1 focus:ring-orange-300"
            value={licenseData.date}
            onChange={onChange('date')}
          />
        </label>

        <label className="space-y-1">
          <span className="text-[14px] leading-[160%]">발급기관</span>
          <input
            className="w-full border border-[#D9D9D9] rounded-[8px] p-2 focus:outline-none focus:ring-1 focus:ring-orange-300"
            placeholder="자격증 발급기관을 입력하세요."
            value={licenseData.agency}
            onChange={onChange('agency')}
          />
        </label>
      </div>

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
