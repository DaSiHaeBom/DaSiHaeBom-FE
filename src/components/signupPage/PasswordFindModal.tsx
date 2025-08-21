import { useState } from 'react';
import { sendPasswordResetCode, sendTempPassword } from '../../api/authApi';

interface PasswordFindModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PasswordFindModal({
  isOpen,
  onClose,
}: PasswordFindModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerificationCompleted, setIsVerificationCompleted] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationCode(e.target.value);
  };

  const handleSendVerificationCode = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      alert('올바른 휴대폰 번호를 입력해주세요');
      return;
    }

    setIsSendingCode(true);
    try {
      const result = await sendTempPassword(phoneNumber);
      if (result.isSuccess) {
        setIsVerificationSent(true);
        alert('인증번호가 발송되었습니다');
      } else {
        alert(
          result.message || '인증번호 발송에 실패했습니다. 다시 시도해주세요.'
        );
      }
    } catch (error: unknown) {
      console.error('인증번호 발송 실패:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : '인증번호 발송에 실패했습니다. 다시 시도해주세요.';
      alert(errorMessage);
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      alert('인증번호를 입력해주세요');
      return;
    }

    setIsVerifyingCode(true);
    try {
      // 여기에 인증번호 검증 API 호출
      // const result = await verifyCode(phoneNumber, verificationCode);
      // 임시로 성공 처리
      setTimeout(() => {
        setIsVerificationCompleted(true);
        alert('인증이 완료되었습니다');
        setIsVerifyingCode(false);
      }, 1000);
    } catch (error) {
      console.error('인증 실패:', error);
      alert('인증에 실패했습니다. 다시 시도해주세요.');
      setIsVerifyingCode(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isVerificationCompleted) {
      alert('휴대폰 인증을 완료해주세요');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await sendPasswordResetCode(phoneNumber);
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
    setPhoneNumber('');
    setVerificationCode('');
    setIsVerificationSent(false);
    setIsVerificationCompleted(false);
    setIsSendingCode(false);
    setIsVerifyingCode(false);
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
            <div className="flex gap-2">
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="flex-1 h-14 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9555] focus:border-transparent"
                placeholder="전화번호 입력"
                maxLength={11}
              />
              <button
                type="button"
                onClick={handleSendVerificationCode}
                disabled={isSendingCode}
                className="w-28 h-14 px-4 py-3 text-xl bg-orange-500 text-white rounded-lg hover:bg-[#E67E22] transition-colors font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSendingCode ? '발송중...' : '인증번호'}
              </button>
            </div>
          </div>

          {isVerificationSent && (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={handleVerificationCodeChange}
                  className="flex-1 h-14 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9555] focus:border-transparent"
                  placeholder="인증번호 입력"
                  maxLength={6}
                />
                <button
                  type="button"
                  onClick={handleVerifyCode}
                  disabled={isVerificationCompleted || isVerifyingCode}
                  className="w-28 h-14 px-4 py-3 text-xl text-white bg-gray-400 rounded-lg hover:bg-gray-500 transition-colors font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVerificationCompleted
                    ? '인증완료'
                    : isVerifyingCode
                      ? '인증중...'
                      : '인증'}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !isVerificationCompleted}
            className="w-full bg-orange-400 text-white py-3 px-4 rounded-lg hover:bg-[#E67E22] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '발송 중...' : '임시 비밀번호 발송'}
          </button>
        </form>
      </div>
    </div>
  );
}
