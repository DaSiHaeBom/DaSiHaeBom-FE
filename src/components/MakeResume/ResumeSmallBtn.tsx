interface ResumeSmallBtnProps {
  name: string;
  clickEvent: () => void;
  color: boolean;
}

const ResumeSmallBtn = ({ name, clickEvent, color }: ResumeSmallBtnProps) => {
  const extraCss = color
    ? 'bg-orange-400 text-[#FFFEFD]'
    : 'bg-[#FFFEFD] border border-neutral-500 text-neutral-500';

  return (
    <button
      onClick={clickEvent}
      className={`max-w-80 w-full h-14 rounded-[10px] text-3xl font-semibold hover:opacity-75 cursor-pointer ${extraCss}`}
    >
      {name}
    </button>
  );
};

export default ResumeSmallBtn;
