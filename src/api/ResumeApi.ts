import baseAxiosInstance from './baseAxiosApi';

export const login = async () => {
  const { data } = await baseAxiosInstance.post('/auth/login', {
    loginId: '01041363945',
    password: 'qwe123!!!',
  });
  return data;
};
