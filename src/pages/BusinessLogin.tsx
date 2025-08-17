import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface BusinessLoginForm {
  id: string;
  password: string;
}

export default function BusinessLogin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BusinessLoginForm>();

  const onSubmit = (data: BusinessLoginForm) => {
    // TODO: 기업회원 로그인 API 호출 로직 구현
    console.log('기업회원 로그인:', data);
  };

  const handleBack = () => {
    navigate('/login');
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
              기업 회원 로그인
            </h1>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input
                  type="text"
                  id="id"
                  {...register('id', {
                    required: '아이디를 입력해주세요',
                    minLength: {
                      value: 3,
                      message: '아이디는 최소 3자 이상이어야 합니다',
                    },
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF9555] focus:border-transparent ${
                    errors.id ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="아이디"
                />
                {errors.id && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.id.message}
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

          <div className="mt-6">
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/signup')}
                className="flex-1 bg-white border border-gray-300 text-lg text-[#FF9555] py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                회원가입
              </button>
              <button
                type="button"
                className="flex-1 bg-white border border-gray-300 text-lg text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                아이디 찾기
              </button>
              <button
                type="button"
                className="flex-1 bg-white border border-gray-300 text-lg text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                비밀번호 찾기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
