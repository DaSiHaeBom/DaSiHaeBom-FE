import baseAxiosInstance from './baseAxiosApi';

export const login = async () => {
  const { data } = await baseAxiosInstance.post('/auth/login', {
    loginId: '01041363945',
    password: 'qwe123!!!',
  });
  return data;
};

// 이력서 필터 api
export const searchLicenses = async (keyword: string) => {
  const { data } = await baseAxiosInstance.get(
    `/licenses/search?keyword=${encodeURIComponent(keyword)}`
  );
  return data.result.licenseTypes;
};
