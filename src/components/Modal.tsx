import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  icon?: React.ReactNode; // JSX 안에 모든 걸 포함 가능
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  showCancel?: boolean;
  confirmColor?: 'primary' | 'red';
  children?: React.ReactNode;
};

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  icon,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  showCancel = false,
  confirmColor = 'primary',
  children,
}: ModalProps) => {
  if (!isOpen) return null;

  const confirmBtnStyle =
    confirmColor === 'primary'
      ? 'bg-[#FF9555] text-white'
      : 'bg-red-500 hover:bg-red-600 text-white';

  return (
    <div
      onClick={onClose} // 모달 외부 클릭 시 종료
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <div
        className="bg-white rounded-[10px] border border-[#D9D9D9] w-full max-w-md p-[30px] text-center shadow-md"
        onClick={e => e.stopPropagation()}
      >
        {children ? (
          children
        ) : (
          <>
            {icon && <div className="mb-4 flex justify-center">{icon}</div>}
            {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
            {description && (
              <p className="text-gray-600 text-sm mb-6">{description}</p>
            )}
            <div className="flex justify-center gap-4">
              {showCancel && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="px-6 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                >
                  {cancelText}
                </button>
              )}
              <button
                onClick={e => {
                  e.stopPropagation();
                  onConfirm?.();
                }}
                className={`px-6 py-2 rounded-md ${confirmBtnStyle}`}
              >
                {confirmText}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
