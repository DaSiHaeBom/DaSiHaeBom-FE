// 회원 탈퇴 관련 모달
import React from 'react';
import Modal from '../Modal';
import WarningIcon from '../../assets/MyPageAssets/WarningIcon';
import CheckIcon from '../../assets/MyPageAssets/CheckIcon';
import type { ModalType } from '../../types/ModalType';

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
  onConfirmDelete,
}: DeleteModalsProps) => {
  const handleConfirm = async () => {
    // 실제 탈퇴 api 추가 예정
    if (onConfirmDelete) await onConfirmDelete();
    setModalType('DELETE_DONE');
  };

  return (
    <>
      {/* 탈퇴 확인 */}
      <Modal isOpen={modalType === 'DELETE_CONFIRM'} onClose={handleClose}>
        <div className="text-center font-[Pretendard]">
          <div className="flex justify-center">
            <WarningIcon />
          </div>
          <h2 className="mt-4 text-[20px] font-semibold text-[#3C3C3C]">
            정말 탈퇴하시겠어요?
          </h2>
          <p className="mt-1 text-[14px] text-[#6B6B6B]">
            탈퇴 버튼 선택 시, 계정은
            <br />
            삭제되어 복구되지 않습니다.
          </p>

          <div className="mt-6 flex gap-3 justify-center">
            <button
              className="min-w-[96px] px-4 py-2 rounded-[12px] bg-[#FF2D2D] text-white font-semibold hover:opacity-90"
              onClick={handleConfirm}
            >
              확인
            </button>
            <button
              className="min-w-[96px] px-4 py-2 rounded-[12px] border-2 border-[#FF2D2D] text-[#FF2D2D] font-semibold bg-white/0 hover:bg-white/50"
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
          <p className="mt-5 text-[18px] text-[#3C3C3C] font-medium">
            탈퇴 되었습니다.
          </p>
          <button
            className="mt-6 min-w-[120px] px-5 py-2 rounded-[12px] bg-[#FF2D2D] text-white font-semibold hover:opacity-90"
            onClick={handleClose}
          >
            확인
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModals;
