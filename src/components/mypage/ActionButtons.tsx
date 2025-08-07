// 마이페이지 버튼 5개 렌더링
import React from 'react';
import Person from '../../assets/MyPageAssets/Person.svg';
import Resume from '../../assets/MyPageAssets/Resume.svg';
import Qualify from '../../assets/MyPageAssets/Qualify.svg';
import Password from '../../assets/MyPageAssets/Password.svg';
import Withdraw from '../../assets/MyPageAssets/Withdraw.svg';

type ModalType =
  | 'PASSWORD'
  | 'DELETE_CONFIRM'
  | 'DELETE_DONE'
  | 'LICENSE_LIST'
  | 'LICENSE_FORM'
  | null;

type ActionButtonsProps = {
  setModalType: (modal: ModalType) => void;
};

const ActionButtons = ({ setModalType }: ActionButtonsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 font-[Pretendard]">
      <button className="flex items-center justify-center col-span-2 border border-[#d9d9d9] bg-[#fffefd] rounded-[10px] text-[#3C3C3C] font-semibold text-[20px] leading-[30px] font-[Pretendard] py-3 px-4 hover:bg-gray-100">
        <img src={Person} alt="개인정보 아이콘" className="mr-2" />
        개인정보
      </button>

      <button className="flex items-center justify-center border border-[#d9d9d9] bg-[#fffefd] rounded-[10px] text-[#3C3C3C] font-semibold text-[20px] leading-[30px] font-[Pretendard] py-3 px-4 hover:bg-gray-100">
        <img src={Resume} alt="개인정보 아이콘" className="mr-2" />
        자기소개서
      </button>

      <button
        onClick={() => setModalType('LICENSE_LIST')}
        className="flex items-center justify-center border border-[#d9d9d9] bg-[#fffefd] rounded-[10px] text-[#3C3C3C] font-semibold text-[20px] leading-[30px] font-[Pretendard] py-3 px-4 hover:bg-gray-100"
      >
        <img src={Qualify} alt="개인정보 아이콘" className="mr-2" />
        자격증 등록
      </button>

      <button
        onClick={() => setModalType('PASSWORD')}
        className="flex items-center justify-center border border-[#d9d9d9] bg-[#fffefd] rounded-[10px] text-[#3C3C3C] font-semibold text-[20px] leading-[30px] font-[Pretendard] py-3 px-4 hover:bg-gray-100"
      >
        <img src={Password} alt="개인정보 아이콘" className="mr-2" />
        비밀번호 변경
      </button>

      <button
        onClick={() => setModalType('DELETE_CONFIRM')}
        className="flex items-center justify-center border border-[#d9d9d9] bg-[#fffefd] rounded-[10px] text-[#ff0000] font-semibold text-[20px] leading-[30px] font-[Pretendard] py-3 px-4 hover:bg-red-100"
      >
        <img src={Withdraw} alt="개인정보 아이콘" className="mr-2" />
        회원 탈퇴
      </button>
    </div>
  );
};

export default ActionButtons;
