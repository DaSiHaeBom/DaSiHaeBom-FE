const EndPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 w-[681px] h-96 bg-stone-100 rounded-[10px]">
      <div className="text-start">
        <h2 className="text-neutral-700 text-4xl font-bold mb-4 leading-[54px]">
          모든 질문의 답변이 등록되었습니다.
          <br />
          결과물을 확인해 주세요!
        </h2>
        <span className="text-neutral-700 text-2xl">
          확인하기 버튼을 눌러주세요
        </span>
      </div>
    </div>
  );
};

export default EndPage;
