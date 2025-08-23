import Modal from '../Modal';
import CheckIcon from '../../assets/MyPageAssets/CheckIcon';
import type { ModalType } from '../../types/ModalType';
import { updatePassword } from '../../api/userApi';
import { useState } from 'react';

type PasswordModalsProps = {
  modalType: ModalType;
  setModalType: (m: ModalType) => void;
  handleClose: () => void;
};

const PasswordModals = ({
  modalType,
  setModalType,
  handleClose,
}: PasswordModalsProps) => {
  // 현재 비번, 새로운 비번 및 기타 모달 관리를 위한 상태
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [error, setError] = useState('');

  // 입력 초기화 로직
  const resetForm = () => {
    setCurrentPw('');
    setNewPw('');
    setConfirmPw('');
    setError('');
  };

  // 유효성 검증
  const validate = () => {
    if (!currentPw || !newPw || !confirmPw) {
      setError('모든 항목을 입력해주세요.');
      return false;
    }
    if (newPw.length < 8) {
      setError('새 비밀번호는 8자 이상이어야 합니다.');
      return false;
    }
    if (newPw !== confirmPw) {
      setError('새 비밀번호와 확인이 일치하지 않습니다.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await updatePassword({
        currentPassword: currentPw,
        newPassword: newPw,
        newPasswordConfirmation: confirmPw,
      });

      resetForm();
      setModalType('PASSWORD_DONE'); // 비번 변경 성공 시 모달처리
    } catch (err: unknown) {
      console.error(err);
      setError('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      {/* 비밀번호 변경 */}
      <Modal
        isOpen={modalType === 'PASSWORD'}
        onClose={() => {
          resetForm();
          handleClose();
        }}
      >
        <div className="rounded-[12px]">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-[#3C3C3C] font-[Pretendard] text-[24px] text-left font-bold leading-[150%]">
                비밀번호 변경
              </h2>
              <p className="text-[#737373] text-[14px] leading-[160%]">
                특수문자 포함 8자 이상 입력
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <input
              type="password"
              placeholder="현재 비밀번호 입력"
              value={currentPw}
              onChange={e => setCurrentPw(e.target.value)}
              className="w-full border border-[#D9D9D9] rounded-[8px] p-3 bg-white placeholder:text-[#BDBDBD] focus:outline-none focus:ring-1 focus:ring-orange-200"
            />
            <input
              type="password"
              placeholder="새 비밀번호 입력"
              value={newPw}
              onChange={e => setNewPw(e.target.value)}
              className="w-full border border-[#D9D9D9] rounded-[8px] p-3 bg-white placeholder:text-[#BDBDBD] focus:outline-none focus:ring-1 focus:ring-orange-200"
            />
            <input
              type="password"
              placeholder="새 비밀번호 확인"
              value={confirmPw}
              onChange={e => setConfirmPw(e.target.value)}
              className="w-full border border-[#D9D9D9] rounded-[8px] p-3 bg-white placeholder:text-[#BDBDBD] focus:outline-none focus:ring-1 focus:ring-orange-200"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <button
            className="mt-6 w-full py-3 rounded-[10px] bg-[#FF9555] text-white font-semibold hover:opacity-90"
            onClick={handleSubmit}
          >
            변경하기
          </button>
        </div>
      </Modal>

      {/* 변경 완료 */}
      <Modal isOpen={modalType === 'PASSWORD_DONE'} onClose={handleClose}>
        <div className="rounded-[12px] p-3 text-center font-[Pretendard]">
          <div className="flex items-center justify-center mb-5">
            <CheckIcon />
          </div>
          <p className="text-[#3c3c3c] font-[Pretendard] text-[28px] font-semibold leading-[150%] mb-5">
            변경되었습니다.
          </p>
          <button
            className="min-w-[126px] min-h-[56px] px-5 py-2 rounded-[10px] bg-[#FF6B00] text-white font-semibold hover:opacity-90"
            onClick={handleClose}
          >
            <p className="text-[#fffefd] font-[Pretendard] text-[20px] font-semibold leading-[150%]">
              확인
            </p>
          </button>
        </div>
      </Modal>
    </>
  );
};

export default PasswordModals;
