import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  sendPhoneVerificationCode,
  verifyPhoneCode,
  personalSignup,
} from '../api/authApi';

interface PersonalSignupForm {
  phoneNumber: string;
  verificationCode: string;
  password: string;
  name: string;
  birthDate: string;
  gender: 'male' | 'female';
  address: string;
  detailedAddress: string;
}

export default function PersonalSignup() {
  const navigate = useNavigate();
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerificationCompleted, setIsVerificationCompleted] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<PersonalSignupForm>();

  const watchedPhoneNumber = watch('phoneNumber');

  const handleSendVerificationCode = async () => {
    if (!watchedPhoneNumber || watchedPhoneNumber.length < 10) {
      alert('올바른 휴대폰 번호를 입력해주세요');
      return;
    }

    setIsSendingCode(true);
    try {
      const result = await sendPhoneVerificationCode(watchedPhoneNumber);
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
    const verificationCode = watch('verificationCode');
    if (!verificationCode) {
      alert('인증번호를 입력해주세요');
      return;
    }

    setIsVerifyingCode(true);
    try {
      const result = await verifyPhoneCode(
        watchedPhoneNumber,
        verificationCode
      );
      if (result.isSuccess) {
        setIsVerificationCompleted(true);
        setIsPhoneVerified(true);
        alert('인증이 완료되었습니다');
      } else {
        alert(result.message || '인증에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error: unknown) {
      console.error('인증 실패:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : '인증에 실패했습니다. 다시 시도해주세요.';
      alert(errorMessage);
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const handleAddressSearch = () => {
    // TODO: 주소 검색 API 연동 (카카오 주소 검색 등)
  };

  const onSubmit = async (data: PersonalSignupForm) => {
    if (!isPhoneVerified) {
      alert('휴대폰 인증을 완료해주세요');
      return;
    }

    try {
      const signupData = {
        phoneNumber: data.phoneNumber,
        password: data.password,
        name: data.name,
        birthDate: data.birthDate,
        gender: data.gender,
        address: data.address,
        detailedAddress: data.detailedAddress,
      };

      const result = await personalSignup(signupData);
      if (result.isSuccess) {
        alert('회원가입이 완료되었습니다!');
        navigate('/login/personal');
      } else {
        alert(result.message || '회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error: unknown) {
      console.error('회원가입 실패:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : '회원가입에 실패했습니다. 다시 시도해주세요.';
      alert(errorMessage);
    }
  };

  const handleBack = () => {
    navigate('/login/personal');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="flex items-center justify-center">
        <div className="w-114">
          <div className="text-center mb-8">
            <button
              onClick={handleBack}
              className="text-gray-500 hover:text-gray-700 mb-4"
            >
              ← 뒤로가기
            </button>
            <h1 className="text-3xl font-bold text-black mb-8">
              개인 회원가입
            </h1>
          </div>

          <div className="bg-white">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    휴대폰 번호
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      {...register('phoneNumber', {
                        required: '휴대폰 번호를 입력해주세요',
                        pattern: {
                          value: /^[0-9]{10,11}$/,
                          message: '올바른 휴대폰 번호를 입력해주세요',
                        },
                      })}
                      className={`w-96 h-14 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF9555] focus:border-transparent ${
                        errors.phoneNumber
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                      placeholder="휴대폰 번호 '-'제외하고 입력"
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
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
                {isVerificationSent && (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        {...register('verificationCode', {
                          required: '인증번호를 입력해주세요',
                          pattern: {
                            value: /^[0-9]{6}$/,
                            message: '6자리 인증번호를 입력해주세요',
                          },
                        })}
                        className={`w-96 h-14 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF9555] focus:border-transparent ${
                          errors.verificationCode
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                        placeholder="인증번호 입력"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyCode}
                        disabled={isVerificationCompleted || isVerifyingCode}
                        className="w-28 h-14 px-4 py-3 text-xl text-orange-400 border border-zinc-300 rounded-lg hover:bg-gray-400 transition-colors font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isVerificationCompleted
                          ? '인증완료'
                          : isVerifyingCode
                            ? '인증중...'
                            : '인증'}
                      </button>
                    </div>
                    {errors.verificationCode && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.verificationCode.message}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="flex gap-2 items-center text-sm font-medium text-gray-700 mb-2">
                  비밀번호
                  <span className="text-xs text-gray-500">
                    특수문자 포함 8자 이상 입력
                  </span>
                </label>

                <input
                  type="password"
                  {...register('password', {
                    required: '비밀번호를 입력해주세요',
                    pattern: {
                      value:
                        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
                      message:
                        '특수문자, 영문, 숫자를 포함하여 8자 이상 입력해주세요',
                    },
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF9555] focus:border-transparent ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="비밀번호"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">
                  이름
                </label>
                <input
                  type="text"
                  {...register('name', {
                    required: '이름을 입력해주세요',
                    minLength: {
                      value: 2,
                      message: '이름은 2자 이상 입력해주세요',
                    },
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF9555] focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="이름"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="flex gap-2 items-center text-sm font-medium text-gray-700 mb-2">
                  생년월일
                  <span className="text-xs text-gray-500">6자리 (YYMMDD)</span>
                </label>

                <input
                  type="text"
                  {...register('birthDate', {
                    required: '생년월일을 입력해주세요',
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: '6자리 생년월일을 입력해주세요 (YYMMDD)',
                    },
                  })}
                  maxLength={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF9555] focus:border-transparent ${
                    errors.birthDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="생년월일 (YYMMDD)"
                />
                {errors.birthDate && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.birthDate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">
                  성별
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="male"
                      {...register('gender', {
                        required: '성별을 선택해주세요',
                      })}
                      className="mr-2 text-[#FF9555] focus:ring-[#FF9555]"
                    />
                    <span className="text-gray-700">남성</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="female"
                      {...register('gender', {
                        required: '성별을 선택해주세요',
                      })}
                      className="mr-2 text-[#FF9555] focus:ring-[#FF9555]"
                    />
                    <span className="text-gray-700">여성</span>
                  </label>
                </div>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">
                  주소
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    {...register('address', {
                      required: '주소를 입력해주세요',
                    })}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9555] focus:border-transparent"
                    placeholder="주소"
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={handleAddressSearch}
                    className="px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-[#E67E22] transition-colors font-medium whitespace-nowrap"
                  >
                    주소 검색
                  </button>
                </div>
                <input
                  type="text"
                  {...register('detailedAddress', {
                    required: '상세주소를 입력해주세요',
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9555] focus:border-transparent"
                  placeholder="상세주소"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.address.message}
                  </p>
                )}
                {errors.detailedAddress && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.detailedAddress.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !isPhoneVerified}
                className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '가입 중...' : '가입하기'}
              </button>
            </form>

            <div className="mt-6">
              <button
                type="button"
                className="w-full bg-white border border-gray-300 text-orange-400 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                카카오톡 회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
