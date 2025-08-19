import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordFindModal from '../components/signupPage/PasswordFindModal';
import { login } from '../api/authApi';

interface PersonalLoginForm {
  loginId: string;
  password: string;
}

export default function PersonalLogin() {
  const navigate = useNavigate();
  const [isPasswordFindModalOpen, setIsPasswordFindModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PersonalLoginForm>();

  const onSubmit = async (data: PersonalLoginForm) => {
    try {
      const result = await login({
        loginId: data.loginId,
        password: data.password,
      });

      if (result.isSuccess) {
        alert('로그인이 완료되었습니다!');
        navigate('/home');
      } else {
        alert(result.message || '로그인에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error: unknown) {
      console.error('로그인 실패:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : '로그인에 실패했습니다. 다시 시도해주세요.';
      alert(errorMessage);
    }
  };

  const handleBack = () => {
    navigate('/login');
  };

  const handlePasswordFind = () => {
    setIsPasswordFindModalOpen(true);
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
              개인 회원 로그인
            </h1>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input
                  type="tel"
                  id="loginId"
                  {...register('loginId', {
                    required: '휴대폰 번호를 입력해주세요',
                    pattern: {
                      value: /^[0-9]{10,11}$/,
                      message: '올바른 휴대폰 번호 형식이 아닙니다',
                    },
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF9555] focus:border-transparent ${
                    errors.loginId ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="휴대폰 번호 ('-'제외하고 입력)"
                />
                {errors.loginId && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.loginId.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  id="password"
                  {...register('password', {
                    required: '비밀번호를 입력해주세요',
                    minLength: {
                      value: 6,
                      message: '비밀번호는 최소 6자 이상이어야 합니다',
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF9555] text-white py-3 px-4 rounded-lg hover:bg-[#E67E22] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '로그인 중...' : '로그인'}
              </button>
            </form>
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/signup/personal')}
                className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                회원가입
              </button>
              <button
                type="button"
                onClick={handlePasswordFind}
                className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                비밀번호 찾기
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 text-sm underline"
              >
                또는 카카오톡 간편 로그인
              </button>
            </div>
          </div>
        </div>
      </div>

      <PasswordFindModal
        isOpen={isPasswordFindModalOpen}
        onClose={() => setIsPasswordFindModalOpen(false)}
      />
    </div>
  );
}
