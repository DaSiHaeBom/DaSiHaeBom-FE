import pencil from '../../assets/ResumeAssets/pencil.svg';

interface EditNBtnProps {
  onClick: () => void;
}

const EditNBtn = ({ onClick }: EditNBtnProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center rounded-[10px] border border-neutral-500 w-52 h-52 bg-[#FFFEFD] text-neutral-700 cursor-pointer"
    >
      <img className="mb-2" src={pencil} />
      <span className="text-3xl">직접수정</span>
    </button>
  );
};

export default EditNBtn;
