interface Props {
  name: string;
  age: number;
  address: string;
  certs: string[];
  summary: string;
}

const ResumeCard = ({ name, age, address, certs, summary }: Props) => {
  return (
    <article className="w-[282px] h-[346px] rounded-[15px] border-none bg-[#F8F3F0] py-5 px-[25px] hover:shadow transition-shadow">
      <h2 className="text-[18px] font-semibold text-[#3C3C3C]">
        {name} {age}세
      </h2>
      <p className="mt-[2px] text-[13px] text-[#6B7280]">{address}</p>

      <div className="my-3 h-px bg-[#d9d9d9]" />

      <div className="mt-3 space-y-1">
        {certs.slice(0, 2).map((c, i) => (
          <p key={i} className="text-[16px] text-[#3C3C3C]">
            # {c}
          </p>
        ))}
        {certs.length > 2 && <p className="text-[16px] text-[#3C3C3C]">…</p>}
      </div>

      <div className="my-3 h-px bg-[#d9d9d9]" />

      <div>
        <div className="mb-1 text-[18px] font-[500] text-[#6B7280]">
          AI 요약
        </div>
        <p className="text-[16px] text-[#4B5563] line-clamp-4">{summary}</p>
      </div>
    </article>
  );
};

export default ResumeCard;
