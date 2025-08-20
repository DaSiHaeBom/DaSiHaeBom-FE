import { useEffect, useState } from 'react';
import type { ModalType } from '../../types/ModalType';
import Modal from '../Modal';
import {
  deleteLicense,
  fetchLicenses,
  updateLicense,
} from '../../api/licenseApi';
import type { License } from '../../types/License';

type LicenseListModalProps = {
  modalType: ModalType;
  handleClose: () => void;
  certList: License[];
  setCertList: React.Dispatch<React.SetStateAction<License[]>>;
  setModalType: (modal: ModalType) => void;
};

const inputCls =
  'w-full h-[44px] rounded-[10px] border border-[#D9D9D9] focus:border-black px-[12px] py-[8px] text-[14px]';

const LicenseListModal = ({
  modalType,
  handleClose,
  certList,
  setCertList,
  setModalType,
}: LicenseListModalProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    issuer: '',
    issuedAt: '',
  });

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

  // 수정 저장
  const handleEditSave = async (licenseId: number) => {
    try {
      await updateLicense(licenseId, editForm);
      setCertList(prev =>
        prev.map(c => (c.licenseId === licenseId ? { ...c, ...editForm } : c))
      );
      setEditingId(null);
    } catch (err) {
      console.error('자격증 수정 실패:', err);
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
                className="flex flex-col border border-[#E5E7EB] rounded-[10px] p-4"
              >
                {editingId === cert.licenseId ? (
                  <div className="flex flex-col gap-3">
                    <input
                      value={editForm.name}
                      onChange={e =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      placeholder="자격증 이름"
                      className={inputCls}
                    />
                    <input
                      value={editForm.issuer}
                      onChange={e =>
                        setEditForm({ ...editForm, issuer: e.target.value })
                      }
                      placeholder="발급 기관"
                      className={inputCls}
                    />
                    <input
                      type="date"
                      value={editForm.issuedAt}
                      onChange={e =>
                        setEditForm({ ...editForm, issuedAt: e.target.value })
                      }
                      className={inputCls}
                    />
                    <div className="flex gap-2 justify-end mt-2">
                      <button
                        onClick={() => handleEditSave(cert.licenseId)}
                        className="px-4 py-2 rounded-[8px] border border-green-500 text-green-600 hover:bg-green-50"
                      >
                        저장
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 rounded-[8px] border border-gray-300 text-gray-600 hover:bg-gray-50"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    {/* 왼쪽: 텍스트 */}
                    <div className="flex-1 min-w-0">
                      {' '}
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
                          setEditingId(cert.licenseId);
                          setEditForm({
                            name: cert.name,
                            issuer: cert.issuer,
                            issuedAt: cert.issuedAt,
                          });
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
                  </div>
                )}
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
          onClick={() => setModalType('LICENSE_FORM')}
        >
          + 자격증 추가
        </button>
      </Modal>
    </div>
  );
};

export default LicenseListModal;
