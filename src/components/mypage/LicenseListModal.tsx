// 자격증 리스트 모달
import type { ModalType } from '../../types/ModalType';
import Modal from '../Modal';

type License = {
  id: number;
  name: string;
  agency: string;
  date: string;
};

type LicenseListModalProps = {
  modalType: ModalType;
  handleClose: () => void;
  certList: License[];
  setCertList: (updater: (prev: License[]) => License[]) => void;
  setModalType: (modal: ModalType) => void;
};

const LicenseListModal = ({
  modalType,
  handleClose,
  certList,
  setCertList,
  setModalType,
}: LicenseListModalProps) => {
  return (
    <div className="font-[Pretendard]">
      <Modal isOpen={modalType === 'LICENSE_LIST'} onClose={handleClose}>
        <h2 className="text-xl font-bold mb-4">자격증 등록</h2>
        <ul className="text-left flex flex-col gap-4 mb-6">
          {certList.map(cert => (
            <li
              key={cert.id}
              className="flex flex-col border border-[#D9D9D9] rounded-[10px] p-3"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{cert.name}</span>
                <div className="flex gap-2">
                  <button className="text-sm px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100">
                    수정
                  </button>
                  <button
                    className="text-sm px-3 py-1 rounded-md border border-red-300 text-red-500 hover:bg-red-100"
                    onClick={() =>
                      setCertList(prev => prev.filter(c => c.id !== cert.id))
                    }
                  >
                    삭제
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {cert.agency}, {cert.date}
              </p>
            </li>
          ))}
        </ul>

        <button
          className="w-full py-3 rounded-[10px] border border-orange-400 text-orange-500 font-semibold hover:bg-orange-50"
          onClick={() => setModalType('LICENSE_FORM')}
        >
          + 자격증 추가
        </button>
      </Modal>
    </div>
  );
};

export default LicenseListModal;
