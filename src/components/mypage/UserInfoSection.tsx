// 상단 사용자 정보

type UserInfo = {
  name: string;
  phone: string;
  age: number;
  gender: '남성' | '여성';
};

type Props = {
  user: UserInfo;
};

const UserInfoSection = ({ user }: Props) => {
  return (
    <div className="flex flex-row items-center justify-center mb-10 font-[Pretendard]">
      {/* 왼쪽: 아이콘 */}
      <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-700 mr-[22px]">
        개인/기업
        <br />
        아이콘
      </div>

      {/* 오른쪽: 사용자 정보 */}
      <div className="text-left">
        <h2
          className="text-[#3C3C3C] font-[Pretendard] text-[36px] font-bold leading-[150%] mb-1
"
        >
          {user.name}님 안녕하세요
        </h2>
        <p
          className="text-[#737373] font-[Pretendard] text-[18px] font-medium leading-[180%]
"
        >
          {user.phone} / {user.age}세 / {user.gender}
        </p>
      </div>
    </div>
  );
};

export default UserInfoSection;
