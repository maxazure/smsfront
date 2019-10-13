import request from '@/utils/request';

export interface LoginParamsType {
  userName: string;
  password: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/auth/login', {
    method: 'POST',
    data: params,
  });
}

