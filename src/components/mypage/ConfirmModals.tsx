// 기타 모달들 처리
import PasswordModals from './PasswordModals';
import DeleteModals from './DeleteModals';
import type { ModalType } from '../../types/ModalType';

type Props = {
  modalType: ModalType;
  setModalType: (m: ModalType) => void;
  handleClose: () => void;
};

const ConfirmModals = ({ modalType, setModalType, handleClose }: Props) => {
  return (
    <>
      <PasswordModals
        modalType={modalType}
        setModalType={setModalType}
        handleClose={handleClose}
      />
      <DeleteModals
        modalType={modalType}
        setModalType={setModalType}
        handleClose={handleClose}
      />
    </>
  );
};

export default ConfirmModals;
