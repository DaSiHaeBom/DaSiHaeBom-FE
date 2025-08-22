// 마이페이지 버튼 (개인/기업 겸용)
import Person from '../../assets/MyPageAssets/Person.svg';
import Resume from '../../assets/MyPageAssets/Resume.svg';
import Qualify from '../../assets/MyPageAssets/Qualify.svg';
import Password from '../../assets/MyPageAssets/Password.svg';
import Withdraw from '../../assets/MyPageAssets/Withdraw.svg';
import { useNavigate } from 'react-router-dom';
import type { ModalType } from '../../types/ModalType';
import { getResumeIsOrNot } from '../../api/home';

type Props = {
  memberType: 'personal' | 'business';
  setModalType: (m: ModalType) => void;
};

const baseBtn =
  'h-[56px] rounded-[10px] border border-[#d9d9d9] bg-[#fffefd] ' +
  'font-[Pretendard] font-semibold text-[20px] leading-[30px] ' +
  'flex items-center justify-center gap-2 text-[#3C3C3C] hover:bg-gray-100';

const dangerBtn =
  'h-[56px] rounded-[10px] border border-[#d9d9d9] bg-[#fffefd] ' +
  'font-[Pretendard] font-semibold text-[20px] leading-[30px] ' +
  'flex items-center justify-center gap-2 text-[#EF4444] hover:bg-red-100';

const ActionButtons = ({ memberType, setModalType }: Props) => {
  const navigate = useNavigate();

  // 자기소개서 버튼 클릭
  const handleResumeClick = async () => {
    try {
      const data = await getResumeIsOrNot();
      const exists = data.result.exists; // true / false
      if (exists) {
        navigate('/personal/resume/result');
      } else {
        navigate('/personal/resume');
      }
    } catch (err) {
      console.error('자기소개서 존재 여부 확인 실패:', err);
      alert('자기소개서 확인 중 오류가 발생했습니다.');
    }
  };

  // 라우팅에 맞춘 프로필 경로
  const profilePath =
    memberType === 'personal'
      ? '/personal/mypage/profile'
      : '/business/mypage/profile';

  // 레이아웃: personal = 2열, business = 1열
  const gridCls =
    memberType === 'business'
      ? 'grid grid-cols-1 gap-4'
      : 'grid grid-cols-2 gap-4';

  return (
    <div className={gridCls}>
      {/* 개인정보/기업정보 (공통) */}
      <button
        onClick={() => navigate(profilePath)}
        className={`${baseBtn} ${memberType === 'personal' ? 'col-span-2' : ''}`}
      >
        <img src={Person} alt="개인/기업 정보 아이콘" className="mr-[2px]" />
        {memberType === 'personal' ? '개인정보' : '기업정보'}
      </button>

      {/* 개인회원 전용: 자기소개서 / 자격증 등록 */}
      {memberType === 'personal' && (
        <>
          <button onClick={handleResumeClick} className={baseBtn}>
            <img src={Resume} alt="자기소개서 아이콘" className="mr-[2px]" />
            자기소개서
          </button>

          <button
            onClick={() => setModalType('LICENSE_LIST')}
            className={baseBtn}
          >
            <img src={Qualify} alt="자격증 아이콘" className="mr-[2px]" />
            자격증 등록
          </button>
        </>
      )}

      {/* 비밀번호 변경 (공통) */}
      <button onClick={() => setModalType('PASSWORD')} className={baseBtn}>
        <img src={Password} alt="비밀번호 아이콘" className="mr-[2px]" />
        비밀번호 변경
      </button>

      {/* 회원 탈퇴 (공통) */}
      <button
        onClick={() => setModalType('DELETE_CONFIRM')}
        className={dangerBtn}
      >
        <img src={Withdraw} alt="회원탈퇴 아이콘" className="mr-[2px]" />
        회원탈퇴
      </button>
    </div>
  );
};

export default ActionButtons;
