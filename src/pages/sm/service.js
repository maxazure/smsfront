import request from '@/utils/request';

export async function querySms(params) {
  let response = ''
  if (params) {
    response = request(`/api/sms/?page=${params.currentPage || 1}&pagesize=${params.pageSize || 10}`);
  } else {
    response = request('/api/sms/?page=1');
  }
  return response
}

export async function querysm(id) {
  return request(`/api/sms/${id}`);
}

export async function removeSm(id) {
  return request(`/api/sms/${id}`, {
    method: 'DELETE',
  });
}

export async function addSm(sm) {
  return request('/api/sms/', {
    method: 'post',
    data: {
      ...sm,
    },
  });
}

export async function addSms(sms) {
  return request('/api/batchsms/', {
    method: 'post',
    data: {
      ...sms,
    },
  });
}

export async function updateSm(sm) {
  return request(`/api/sms/${sm.id}`, {
    method: 'put',
    data: {
      ...sm,
    },
  });
}