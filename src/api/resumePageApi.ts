import baseAxiosInstance from './baseAxiosApi';

export const login = async () => {
  const { data } = await baseAxiosInstance.post('api/v1/auth/login', {
    loginId: 'qwe123',
    password: 'qwe123!!!',
  });
  console.log('로그인 정보:', data.result);
  return data;
};

// 이력서 필터 api
export const searchLicenses = async (keyword: string) => {
  const { data } = await baseAxiosInstance.get(
    `api/v1/licenses/search?keyword=${encodeURIComponent(keyword)}`
  );
  return data.result.licenseTypes;
};

// 이력서 조회
export const searchResume = async ({
  size = 12,
  sortBy = 'latest',
  minAge,
  maxAge,
  licenses = [],
  latitude,
  longitude,
}: {
  size?: number;
  sortBy?: string;
  minAge?: number | null;
  maxAge?: number | null;
  licenses?: string[];
  latitude?: number;
  longitude?: number;
}) => {
  const { data } = await baseAxiosInstance.post('api/v1/resume/search', {
    size,
    cursorId: 0,
    cursorDistance: 0.1, // 기본값
    sortBy,
    minAge: minAge ?? 0,
    maxAge: maxAge ?? 0,
    latitude: latitude ?? 37.5665, // 임시: 서울 위도
    longitude: longitude ?? 126.978, // 임시: 서울 경도
    licenses,
  });
  console.log('이력서 조회 목록:', data.result.resumes);
  return data.result.resumes;
};
