import request from '@/utils/request';


export async function querySetting() {
  return request('/api/setting/');
}

export async function updateSetting(setting) {
  return request('/api/setting/', {
    method: 'put',
    data: {
      ...setting,
    },
  });
}