type Props = {
  inputData: string;
  handleChange: (value: string) => void;
  size: string;
};

const InputField = ({ inputData, handleChange, size }: Props) => {
  return (
    <textarea
      value={inputData}
      onChange={e => handleChange(e.target.value)}
      placeholder="답변을 입력하세요..."
      className={`p-2 bg-[#FFFEFD] rounded-[10px] border border-zinc-300 overflow-y-scroll resize-none ${size}`}
    />
  );
};

export default InputField;
