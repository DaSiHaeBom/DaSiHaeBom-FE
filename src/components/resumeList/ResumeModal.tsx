import type { ResumeModalProps } from '../../types/resumeList';
import Download from '../../assets/ResumeListAssets/Download.svg';
import CloseOn from '../../assets/ResumeListAssets/CloseOn.svg';
import html2pdf from 'html2pdf.js';

function replaceOKLCH() {
  const elements = document.querySelectorAll<HTMLElement>('*');
  elements.forEach(el => {
    const style = window.getComputedStyle(el);

    // 배경색
    if (style.backgroundColor.includes('oklch')) {
      el.style.backgroundColor = '#ffffff';
    }
    // 글자색
    if (style.color.includes('oklch')) {
      el.style.color = '#3c3c3c';
    }
    // 테두리색
    if (style.borderColor.includes('oklch')) {
      el.style.borderColor = '#d9d9d9';
    }
  });
}

const ResumeModal = ({ data, onClose }: ResumeModalProps) => {
  const handleDownload = async () => {
    const element = document.getElementById('resume-content');
    if (!element) return;

    replaceOKLCH(); // 👈 PDF 만들기 전에 변환

    const opt = {
      margin: 0.5,
      filename: `${data.name}_이력서.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#fff' },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('PDF 변환 실패:', err);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 font-[Pretendard]"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-[700px] bg-white rounded-xl p-8 relative font-[Pretendard] shadow-xl"
      >
        <div className="absolute top-4 right-5 flex w-[55px] items-center justify-between">
          {/* 다운로드 버튼 */}
          <button onClick={handleDownload}>
            <img src={Download} alt="download" />
          </button>
          {/* 닫기 버튼 */}
          <button onClick={onClose}>
            <img src={CloseOn} alt="close" />
          </button>
        </div>
        <div id="resume-content">
          {/* 인적사항 */}
          <h2 className="font-bold mt-2 mb-1 text-[#3c3c3c] text-[25px]">
            인적사항
          </h2>
          <table className="w-full border border-gray-300 mb-4 text-sm">
            <tbody>
              {/* 이름 / 성별 */}
              <tr>
                <td className="border px-3 py-2 text-center h-10 bg-[#F8F3F0] w-[120px] font-medium ">
                  이름
                </td>
                <td className="border px-3 py-2 text-center ">{data.name}</td>
                <td className="border px-3 py-2 text-center bg-[#F8F3F0] font-medium w-[120px]">
                  성별
                </td>
                <td className="border px-3 py-2 text-center">
                  {data.gender === 'MALE' ? '남성' : '여성'}
                </td>
              </tr>

              {/* 생년월일 */}
              <tr>
                <td className="border px-3 py-2 text-center h-10 bg-[#F8F3F0] font-medium">
                  생년월일
                </td>
                <td colSpan={3} className="border px-3 py-2 text-center">
                  {data.age || '-'}
                </td>
              </tr>

              {/* 휴대전화 */}
              <tr>
                <td className="border px-3 py-2 text-center h-10 bg-[#F8F3F0] font-medium">
                  휴대전화
                </td>
                <td colSpan={3} className="border px-3 py-2 text-center">
                  {data.phoneNumber || '-'}
                </td>
              </tr>

              {/* 주소 */}
              <tr>
                <td className="border px-3 py-2 text-center h-10 bg-[#F8F3F0] font-medium">
                  주소
                </td>
                <td colSpan={3} className="border px-3 py-2 text-center">
                  {data.address || '-'}
                </td>
              </tr>
            </tbody>
          </table>

          {/* 자격증 */}
          <h2 className="text-lg font-bold mb-1 text-[#3c3c3c] text-[25px]">
            자격증
          </h2>
          {data.certs?.length > 0 ? (
            <table className="w-full border border-gray-300 mb-4 text-sm">
              <thead className="bg-[#F8F3F0] h-10">
                <tr>
                  <th className="border px-3 py-2 text-center font-medium w-[200px]">
                    자격증명
                  </th>
                  <th className="border px-3 py-2 text-center font-medium w-[200px]">
                    취득날짜
                  </th>
                  <th className="border px-3 py-2 text-center font-medium w-[200px]">
                    발행처
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.certs.map((c: any, i: number) => (
                  <tr key={i}>
                    <td className="border px-3 py-2 text-center h-10">
                      {c.name}
                    </td>
                    <td className="border px-3 py-2 text-center h-10">
                      {c.issuedAt || '-'}
                    </td>
                    <td className="border px-3 py-2 text-center h-10">
                      {c.issuer || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-gray-500 mb-6">
              등록된 자격증이 없습니다.
            </p>
          )}

          {/* 자기소개 */}
          <h2 className="text-lg font-bold mb-1 text-[#3c3c3c] text-[25px]">
            자기소개서
          </h2>
          <div className="border border-[#3C3C3C] py-2 px-4 text-sm leading-relaxed text-[#3c3c3c]">
            {data.summary || '작성된 자기소개서가 없습니다.'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
