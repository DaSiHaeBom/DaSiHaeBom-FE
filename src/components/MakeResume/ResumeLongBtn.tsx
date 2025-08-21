interface Props {
  btnName: string;
  onClick: () => void;
}

const ResumeLongBtn = ({ btnName, onClick }: Props) => {
  return (
    <button
      className={`w-[681px] max-w-full h-14 bg-orange-500 rounded-[10px] text-[#FFFEFD] text-3xl font-semibold hover:opacity-75 cursor-pointer`}
      onClick={onClick}
    >
      {btnName}
    </button>
  );
};

export default ResumeLongBtn;
