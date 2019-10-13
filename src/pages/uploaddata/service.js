import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  return request('/api/uploaddata', {
    method: 'POST',
    data: params,
  });
}