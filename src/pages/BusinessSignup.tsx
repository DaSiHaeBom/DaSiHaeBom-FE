import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  sendPhoneVerificationCode,
  verifyPhoneCode,
  validateBusinessNumber,
  businessSignup,
  checkBusinessIdDuplicate,
} from '../api/authApi';
import SuccessModal from '../components/SuccessModal';

interface BusinessSignupForm {
  loginId: string;
  password: string;
  representativeName: string;
  phoneNumber: string;
  verificationCode: string;
  businessNumber: string;
  companyName: string;
  baseAddress: string;
  detailAddress: string;
}

export default function BusinessSignup() {
  const navigate = useNavigate();
  const [isIdVerified, setIsIdVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerificationCompleted, setIsVerificationCompleted] = useState(false);
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [isCheckingBusinessNumber, setIsCheckingBusinessNumber] =
    useState(false);
  const [isBusinessNumberValid, setIsBusinessNumberValid] = useState(false);
  const [businessNumberError, setBusinessNumberError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<BusinessSignupForm>();

  const watchedLoginId = watch('loginId');
  const watchedPhoneNumber = watch('phoneNumber');

  const handleIdDuplicateCheck = async () => {
    if (!watchedLoginId || watchedLoginId.length < 8) {
      alert('올바른 아이디를 입력해주세요 (8자 이상)');
      return;
    }

    setIsCheckingId(true);
    try {
      const result = await checkBusinessIdDuplicate(watchedLoginId);
      if (result.isSuccess) {
        if (result.result.isAlreadyRegistered) {
          // 이미 등록된 아이디
          setIsIdVerified(false);
          alert('이미 사용 중인 아이디입니다. 다른 아이디를 입력해주세요.');
        } else {
          // 사용 가능한 아이디
          setIsIdVerified(true);
          alert('사용 가능한 아이디입니다');
        }
      } else {
        alert(
          result.message || '아이디 중복검사에 실패했습니다. 다시 시도해주세요.'
        );
      }
    } catch (error) {
      console.error('아이디 중복검사 실패:', error);
      alert('아이디 중복검사에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsCheckingId(false);
    }
  };

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

  const handleBusinessNumberCheck = async () => {
    const businessNumber = watch('businessNumber');
    if (!businessNumber || businessNumber.length < 10) {
      setBusinessNumberError('올바른 사업자등록번호를 입력해주세요');
      return;
    }

    setIsCheckingBusinessNumber(true);
    setBusinessNumberError('');
    try {
      const result = await validateBusinessNumber(businessNumber);
      if (result.isSuccess && result.result.isValid) {
        setIsBusinessNumberValid(true);
        setBusinessNumberError('');
        alert('인증되었습니다');
      } else {
        setIsBusinessNumberValid(false);
        setBusinessNumberError('올바르지 않은 사업자등록번호');
      }
    } catch (error: unknown) {
      console.error('사업자등록번호 확인 실패:', error);
      setIsBusinessNumberValid(false);
      setBusinessNumberError('올바르지 않은 사업자등록번호');
      const errorMessage =
        error instanceof Error
          ? error.message
          : '사업자등록번호 확인에 실패했습니다. 다시 시도해주세요.';
      alert(errorMessage);
    } finally {
      setIsCheckingBusinessNumber(false);
    }
  };

  const handleAddressSearch = () => {
    if (window.daum && window.daum.Postcode) {
      openDaumPostcode();
    } else {
      const script = document.createElement('script');
      script.src =
        '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.async = true;
      script.onload = () => {
        openDaumPostcode();
      };
      document.head.appendChild(script);
    }
  };

  const openDaumPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data: {
        roadAddress?: string;
        jibunAddress?: string;
      }) {
        const address = data.roadAddress || data.jibunAddress;
        if (address) {
          setValue('baseAddress', address);
        }
      },
      onclose: function () {},
    }).open();
  };

  const onSubmit = async (data: BusinessSignupForm) => {
    if (!isIdVerified) {
      alert('아이디 중복검사를 완료해주세요');
      return;
    }

    if (!isPhoneVerified) {
      alert('휴대폰 인증을 완료해주세요');
      return;
    }

    if (!isBusinessNumberValid) {
      alert('사업자등록번호 확인을 완료해주세요');
      return;
    }

    try {
      // 데이터 검증
      if (!data.representativeName || !data.companyName || !data.baseAddress) {
        alert('모든 필수 항목을 입력해주세요.');
        return;
      }

      const signupData = {
        loginId: data.loginId,
        password: data.password,
        ceoName: data.representativeName,
        phoneNumber: data.phoneNumber,
        corpNumber: data.businessNumber,
        corpName: data.companyName,
        corpBaseAddress: data.baseAddress,
        corpDetailAddress: data.detailAddress,
      };

      console.log('전송할 데이터:', signupData);

      const result = await businessSignup(signupData);
      if (result.isSuccess) {
        setShowSuccessModal(true);
      } else {
        alert(result.message || '회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error: unknown) {
      console.error('회원가입 실패:', error);

      // 409 Conflict 오류 처리
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as {
          response?: { status?: number; data?: { message?: string } };
        };
        if (axiosError.response?.status === 409) {
          alert(
            '이미 가입된 정보가 있습니다. 아이디, 전화번호, 사업자등록번호를 확인해주세요.'
          );
        } else {
          const errorMessage =
            axiosError.response?.data?.message ||
            '회원가입에 실패했습니다. 다시 시도해주세요.';
          alert(errorMessage);
        }
      } else {
        const errorMessage =
          error instanceof Error
            ? error.message
            : '회원가입에 실패했습니다. 다시 시도해주세요.';
        alert(errorMessage);
      }
    }
  };

  const handleBack = () => {
    navigate('/login/business');
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/login/business');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white my-40">
      <div className="flex items-center justify-center">
        <div className="w-114">
          <button
            onClick={handleBack}
            className="text-gray-500 hover:text-gray-700 mb-4"
          >
            ← 뒤로가기
          </button>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-8">
              기업 회원가입
            </h1>
          </div>

          <div className="bg-white">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="flex gap-2 items-center text-sm font-medium text-gray-700 mb-2">
                  아이디
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    {...register('loginId', {
                      required: '아이디를 입력해주세요',
                      minLength: {
                        value: 5,
                        message: '아이디는 5자 이상 입력해주세요',
                      },
                      maxLength: {
                        value: 16,
                        message: '아이디는 16자 이하로 입력해주세요',
                      },
                      pattern: {
                        value: /^(?=.*[a-zA-Z])[a-zA-Z0-9]{5,16}$/,
                        message:
                          '영문과 숫자만 사용 가능하며, 영문을 포함해야 합니다',
                      },
                      validate: {
                        noOnlyNumbers: value => {
                          if (/^\d+$/.test(value)) {
                            return '숫자로만 이루어진 아이디는 사용할 수 없습니다';
                          }
                          return true;
                        },
                        noSpaces: value => {
                          if (/\s/.test(value)) {
                            return '공백을 포함할 수 없습니다';
                          }
                          return true;
                        },
                      },
                    })}
                    disabled={isIdVerified}
                    className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF9555] focus:border-transparent ${
                      errors.loginId ? 'border-red-500' : 'border-gray-300'
                    } ${isIdVerified ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    placeholder="아이디 (5-16자, 영문+숫자)"
                  />
                  <button
                    type="button"
                    onClick={handleIdDuplicateCheck}
                    disabled={isCheckingId || isIdVerified}
                    className={`w-28 h-14 px-4 py-3 text-xl bg-orange-500 text-white rounded-lg transition-colors font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${
                      isIdVerified ? '' : 'hover:bg-[#E67E22]'
                    }`}
                  >
                    {isIdVerified
                      ? '확인완료'
                      : isCheckingId
                        ? '확인중...'
                        : '중복검사'}
                  </button>
                </div>
                {errors.loginId && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.loginId.message}
                  </p>
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
                  대표자명
                </label>
                <input
                  type="text"
                  {...register('representativeName', {
                    required: '대표자명을 입력해주세요',
                    minLength: {
                      value: 2,
                      message: '대표자명은 2자 이상 입력해주세요',
                    },
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF9555] focus:border-transparent ${
                    errors.representativeName
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder="대표자명"
                />
                {errors.representativeName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.representativeName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">
                  휴대폰 번호
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="tel"
                    {...register('phoneNumber', {
                      required: '휴대폰 번호를 입력해주세요',
                      pattern: {
                        value: /^[0-9]{10,11}$/,
                        message: '올바른 휴대폰 번호를 입력해주세요',
                      },
                    })}
                    disabled={isPhoneVerified}
                    className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF9555] focus:border-transparent ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    } ${isPhoneVerified ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    placeholder="휴대폰 번호 '-'제외하고 입력"
                  />
                  <button
                    type="button"
                    onClick={handleSendVerificationCode}
                    disabled={isSendingCode || isPhoneVerified}
                    className={`w-28 h-14 px-4 py-3 text-xl bg-orange-500 text-white rounded-lg transition-colors font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${
                      isPhoneVerified ? '' : 'hover:bg-[#E67E22]'
                    }`}
                  >
                    {isPhoneVerified
                      ? '인증완료'
                      : isSendingCode
                        ? '발송중...'
                        : '인증번호'}
                  </button>
                </div>
                {isVerificationSent && (
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
                      disabled={isVerificationCompleted}
                      className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF9555] focus:border-transparent ${
                        errors.verificationCode
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } ${isVerificationCompleted ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                      placeholder="인증번호 입력"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyCode}
                      disabled={isVerificationCompleted || isVerifyingCode}
                      className={`w-28 h-14 px-4 py-3 text-xl text-[#FF9555] bg-white border border-[#FF9555] rounded-lg transition-colors font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${
                        isVerificationCompleted ? '' : 'hover:bg-orange-50'
                      }`}
                    >
                      {isVerificationCompleted
                        ? '인증완료'
                        : isVerifyingCode
                          ? '인증중...'
                          : '인증'}
                    </button>
                  </div>
                )}
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phoneNumber.message}
                  </p>
                )}
                {errors.verificationCode && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.verificationCode.message}
                  </p>
                )}
              </div>

              <div>
                <label className="flex gap-2 items-center text-sm font-medium text-gray-700 mb-2">
                  사업자등록번호
                  {businessNumberError && (
                    <span className="text-xs text-red-500">
                      {businessNumberError}
                    </span>
                  )}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    {...register('businessNumber', {
                      required: '사업자등록번호를 입력해주세요',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: '10자리 사업자등록번호를 입력해주세요',
                      },
                    })}
                    disabled={isBusinessNumberValid}
                    maxLength={10}
                    className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF9555] focus:border-transparent ${
                      errors.businessNumber
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } ${isBusinessNumberValid ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    placeholder="사업자등록번호(10자리)"
                  />
                  <button
                    type="button"
                    onClick={handleBusinessNumberCheck}
                    disabled={isCheckingBusinessNumber || isBusinessNumberValid}
                    className={`w-28 h-14 px-4 py-3 text-xl bg-orange-500 text-white rounded-lg transition-colors font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${
                      isBusinessNumberValid ? '' : 'hover:bg-[#E67E22]'
                    }`}
                  >
                    {isBusinessNumberValid
                      ? '확인완료'
                      : isCheckingBusinessNumber
                        ? '확인중...'
                        : '확인'}
                  </button>
                </div>
                {errors.businessNumber && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.businessNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">
                  회사/점포명
                </label>
                <input
                  type="text"
                  {...register('companyName', {
                    required: '회사/점포명을 입력해주세요',
                    minLength: {
                      value: 2,
                      message: '회사/점포명은 2자 이상 입력해주세요',
                    },
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF9555] focus:border-transparent ${
                    errors.companyName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="회사/점포명"
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">
                  회사/점포 주소
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    {...register('baseAddress', {
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
                  {...register('detailAddress', {
                    required: '상세주소를 입력해주세요',
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9555] focus:border-transparent"
                  placeholder="상세주소"
                />
                {errors.baseAddress && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.baseAddress.message}
                  </p>
                )}
                {errors.detailAddress && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.detailAddress.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !isIdVerified ||
                  !isPhoneVerified ||
                  !isBusinessNumberValid
                }
                className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '가입 중...' : '가입하기'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleModalClose}
        message="가입이 완료되었습니다."
      />
    </div>
  );
}
