import { useEffect } from 'react';
import type { ModalType } from '../../types/ModalType';
import Modal from '../Modal';
import { deleteLicense, fetchLicenses } from '../../api/licenseApi';
import type { License } from '../../types/License';

type LicenseListModalProps = {
  modalType: ModalType;
  handleClose: () => void;
  certList: License[];
  setCertList: React.Dispatch<React.SetStateAction<License[]>>;
  setModalType: (modal: ModalType) => void;
  setLicenseData: React.Dispatch<React.SetStateAction<License>>;
  setMode: React.Dispatch<React.SetStateAction<'create' | 'edit'>>;
};

const LicenseListModal = ({
  modalType,
  handleClose,
  certList,
  setCertList,
  setModalType,
  setLicenseData,
  setMode,
}: LicenseListModalProps) => {
  // 모달 열릴 때 데이터 불러오기
  useEffect(() => {
    if (modalType === 'LICENSE_LIST') {
      fetchLicenses()
        .then(licenses => setCertList(licenses))
        .catch(err => console.error('자격증 불러오기 실패:', err));
    }
  }, [modalType, setCertList]);

  // 삭제
  const handleDelete = async (licenseId: number) => {
    try {
      await deleteLicense(licenseId);
      setCertList(prev => prev.filter(c => c.licenseId !== licenseId));
    } catch (err) {
      console.error('자격증 삭제 실패:', err);
      alert('삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="font-[Pretendard]">
      <Modal isOpen={modalType === 'LICENSE_LIST'} onClose={handleClose}>
        {/* 타이틀 */}
        <h2 className="text-[20px] font-semibold text-[#3C3C3C] mb-5">
          내 자격증
        </h2>

        {/* 리스트 */}
        <ul className="text-left flex flex-col gap-4 mb-6">
          {certList.length > 0 ? (
            certList.map(cert => (
              <li
                key={cert.licenseId}
                className="flex justify-between items-center border border-[#E5E7EB] rounded-[10px] p-4"
              >
                {/* 왼쪽: 텍스트 */}
                <div className="flex-1 min-w-0">
                  <p
                    title={cert.name}
                    className="font-semibold text-[#3C3C3C] text-[16px] truncate"
                  >
                    {cert.name}
                  </p>
                  <p
                    title={cert.issuer}
                    className="text-sm text-gray-500 mt-1 truncate"
                  >
                    {cert.issuer} · {cert.issuedAt}
                  </p>
                </div>

                {/* 오른쪽: 버튼 */}
                <div className="flex gap-2 flex-shrink-0 ml-2">
                  <button
                    className="px-3 py-1 rounded-[8px] border border-gray-300 hover:bg-gray-50"
                    onClick={() => {
                      setLicenseData(cert); // 수정할 자격증 데이터 넘김
                      setMode('edit');
                      setModalType('LICENSE_FORM');
                    }}
                  >
                    수정
                  </button>
                  <button
                    className="px-3 py-1 rounded-[8px] border border-red-400 text-red-500 hover:bg-red-50"
                    onClick={() => handleDelete(cert.licenseId)}
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-400 text-center">
              등록된 자격증이 없습니다.
            </p>
          )}
        </ul>

        {/* 추가 버튼 */}
        <button
          className="w-full py-3 rounded-[10px] border border-[#FF9555] text-[#FF9555] font-semibold hover:bg-orange-50"
          onClick={() => {
            setMode('create');
            setModalType('LICENSE_FORM');
          }}
        >
          + 자격증 추가
        </button>
      </Modal>
    </div>
  );
};

export default LicenseListModal;
