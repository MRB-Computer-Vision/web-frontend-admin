import api from './api';

interface Params {
  email: string;
  password: string;
}

interface Response {
  data: {
    success: boolean;
    message: string;
    Authorization: string;
  };
}

export function signIn(params: Params): Promise<Response> {
  return api.post('/auth/login', params);
}
