import { useState } from 'react';
import { sendPasswordResetCode } from '../api/authApi';

interface PasswordFindModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PasswordFindModal({
  isOpen,
  onClose,
}: PasswordFindModalProps) {
  const [loginId, setLoginId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginId || loginId.length < 10) {
      alert('올바른 휴대폰 번호를 입력해주세요');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await sendPasswordResetCode(loginId);
      if (result.isSuccess) {
        alert('임시 비밀번호가 발송되었습니다. 문자를 확인해주세요.');
        handleClose();
      } else {
        alert(
          result.message ||
            '임시 비밀번호 발송에 실패했습니다. 다시 시도해주세요.'
        );
      }
    } catch (error: unknown) {
      console.error('임시 비밀번호 발송 실패:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : '임시 비밀번호 발송에 실패했습니다. 다시 시도해주세요.';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setLoginId('');
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="relative flex flex-col gap-10 w-121 h-83 justify-center bg-white rounded-lg border border-gray-200 p-8 max-h-[90vh] overflow-y-auto shadow-xl">
        <div>
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-black font-bold text-2xl hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            ✕
          </button>
          <div className="flex flex-col gap-2">
            <p className="text-3xl font-bold text-black text-center">
              비밀번호 찾기
            </p>
            <p className="text-sm text-gray-500 text-center">
              전화번호를 입력해주세요
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <input
              type="tel"
              value={loginId}
              onChange={handleLoginIdChange}
              className="w-full h-14 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9555] focus:border-transparent"
              placeholder="휴대폰 번호 '-'제외하고 입력"
              maxLength={11}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !loginId}
            className="w-full bg-orange-400 text-white py-3 px-4 rounded-lg hover:bg-[#E67E22] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '발송 중...' : '임시 비밀번호 발송'}
          </button>
        </form>
      </div>
    </div>
  );
}
