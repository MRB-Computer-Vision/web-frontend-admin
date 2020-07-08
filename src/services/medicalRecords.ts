import axios from 'axios';

const getMedicalRecords = (token: string): Promise<any> => {
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${token}` },
  });
  return instance.get('/medical_records/');
};

export default getMedicalRecords;
