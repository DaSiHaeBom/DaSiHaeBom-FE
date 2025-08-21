// 리스트에서 내려오는 간략 이력서 타입
export interface ResumeSummary {
  resumeId: number;
  workerId: number;
  username: string;
  age: number;
  address: string;
  introductionSummary: string;
  licenseNames: string[];
}

// 상세 조회 시 내려오는 개인 이력서 타입
export interface ResumeDetail {
  resumeId: number;
  username: string;
  birthDate: string; // "2001.03.13" 형태
  gender: string;
  address: string;
  phoneNumber: string;
  introductionFullText: string;
  licenses: {
    name: string;
    issuedAt: string;
    issuer: string;
  }[];
}

// 리스트 모달에 넘겨줄 데이터 타입
export interface ResumeModalData {
  name: string;
  age: number;
  address: string;
  certs: string[];
  summary: string;
}

// 리스트 조회 응답 타입
export interface SearchResumeResponse {
  resumes: ResumeSummary[];
  nextCursorId: number | null;
  nextCursorDistance: number | null;
}

// ResumeModal.tsx에 넘길 Props 타입
export interface ResumeModalProps {
  data: ResumeModalData; // ← UI 전용 데이터 타입
  onClose: () => void;
}
