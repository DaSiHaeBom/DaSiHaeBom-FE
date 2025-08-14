type Props = {
  inputData: string;
  handleChange: (value: string) => void;
};

const InputField = ({ inputData, handleChange }: Props) => {
  return (
    <div>
      <textarea
        value={inputData}
        onChange={e => handleChange(e.target.value)}
        placeholder="답변을 입력하세요..."
        className="w-96 h-36 p-2 bg-white rounded-[10px] border border-zinc-300 overflow-y-scroll resize-none"
      />
    </div>
  );
};

export default InputField;
