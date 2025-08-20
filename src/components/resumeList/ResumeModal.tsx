interface ResumeModalProps {
  data: {
    name: string;
    age: number;
    address: string;
    certs: string[];
    summary: string;
  };
  onClose: () => void;
}

const ResumeModal = ({ data, onClose }: ResumeModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="w-[600px] bg-white rounded-xl p-6 relative font-[Pretendard]">
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-4 right-4 text-xl">
          ✕
        </button>

        {/* 인적사항 */}
        <h2 className="text-xl font-bold mb-2">인적사항</h2>
        <table className="w-full border mb-4 text-sm">
          <tbody>
            <tr>
              <td className="border px-2 py-1">이름</td>
              <td className="border px-2 py-1">{data.name}</td>
              <td className="border px-2 py-1">나이</td>
              <td className="border px-2 py-1">{data.age}세</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">주소</td>
              <td colSpan={3} className="border px-2 py-1">
                {data.address}
              </td>
            </tr>
          </tbody>
        </table>

        {/* 자격증 */}
        <h2 className="text-xl font-bold mb-2">자격증</h2>
        <ul className="list-disc list-inside mb-4 text-sm">
          {data.certs.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>

        {/* 자기소개 (AI 요약 대신 원문) */}
        <h2 className="text-xl font-bold mb-2">자기소개서</h2>
        <div className="border p-4 text-sm leading-relaxed">{data.summary}</div>
      </div>
    </div>
  );
};

export default ResumeModal;
