import baseAxiosInstance from './baseAxiosApi';

export const fetchPersonalInfo = async () => {
  const { data } = await baseAxiosInstance.get('/users/workers/me');
  return data.result;
};

export async function updatePersonalInfo(data: {
  phoneNumber: string;
  username: string;
  birthDate: string;
  address: string;
}) {
  const res = await baseAxiosInstance.patch('/users/workers/me', data);
  return res.data;
}
