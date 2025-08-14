interface Props {
  btnName: string;
  onClick: () => void;
}

const ResumeLongBtn = ({ btnName, onClick }: Props) => {
  return (
    <button
      className="w-[681px] h-14 bg-orange-500 rounded-[10px] text-white text-3xl font-semibold"
      onClick={onClick}
    >
      {btnName}
    </button>
  );
};

export default ResumeLongBtn;
