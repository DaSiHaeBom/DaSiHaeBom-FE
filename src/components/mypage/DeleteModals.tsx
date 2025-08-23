// 회원 탈퇴 관련 모달
import Modal from '../Modal';
import WarningIcon from '../../assets/MyPageAssets/WarningIcon';
import CheckIcon from '../../assets/MyPageAssets/CheckIcon';
import type { ModalType } from '../../types/ModalType';
import { deleteUser } from '../../api/userApi';
import { useNavigate } from 'react-router-dom';

type DeleteModalsProps = {
  modalType: ModalType;
  setModalType: (m: ModalType) => void;
  handleClose: () => void;
  onConfirmDelete?: () => Promise<void> | void; // 탈퇴 api 대비
};

const DeleteModals = ({
  modalType,
  setModalType,
  handleClose,
}: DeleteModalsProps) => {
  const navigate = useNavigate();
  // 회원 탈퇴 핸들러
  const handleConfirm = async () => {
    try {
      await deleteUser();
      setModalType('DELETE_DONE');
      // navigate('/login', { replace: true });
    } catch (err) {
      console.error('회원 탈퇴 실패:', err);
      alert('회원 탈퇴 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      {/* 탈퇴 확인 */}
      <Modal isOpen={modalType === 'DELETE_CONFIRM'} onClose={handleClose}>
        <div className="text-center font-[Pretendard]">
          <div className="flex justify-center">
            <WarningIcon />
          </div>
          <h2 className="mt-4 text-[28px] font-semibold text-[#3C3C3C]">
            정말 탈퇴하시겠어요?
          </h2>
          <p className="mt-1 text-[16px] font-[400] text-[#3c3c3c]">
            탈퇴 버튼 선택 시, 계정은
            <br />
            삭제되어 복구되지 않습니다.
          </p>

          <div className="mt-4 flex gap-3 justify-center">
            <button
              className="min-w-[106px] px-4 py-2 rounded-[10px] bg-[#ff0000] text-white font-semibold hover:opacity-90"
              onClick={handleConfirm}
            >
              확인
            </button>
            <button
              className="min-w-[106px] px-4 py-2 rounded-[10px] border-2 border-[#FF2D2D] text-[#FF2D2D] font-semibold bg-white/0 hover:bg-white/50"
              onClick={handleClose}
            >
              취소
            </button>
          </div>
        </div>
      </Modal>

      {/* 탈퇴 완료 */}
      <Modal isOpen={modalType === 'DELETE_DONE'} onClose={handleClose}>
        <div className="text-center font-[Pretendard]">
          <div className="flex justify-center">
            <CheckIcon checkColor="#ff0000" />
          </div>
          <p className="mt-5 text-[28px] text-[#3C3C3C] font-medium">
            탈퇴 되었습니다.
          </p>
          <button
            className="mt-5 min-w-[106px] h-[50px] px-5 py-2 text-[20px] rounded-[10px] bg-[#FF0000] text-white font-semibold hover:opacity-90"
            onClick={() => {
              navigate('/login', { replace: true });
            }}
          >
            확인
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModals;
