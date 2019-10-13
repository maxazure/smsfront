import request from '@/utils/request';

export async function queryMembers(params) {
  let response = ''
  if (params) {
    response = request(`/api/members/?page=${params.currentPage || 1}&pagesize=${params.pageSize || 10}`);
  } else {
    response = request('/api/members/?page=1');
  }
  return response
}

export async function querymember(id) {
  return request(`/api/members/${id}`);
}

export async function removeMember(id) {
  return request(`/api/members/${id}`, {
    method: 'DELETE',
  });
}

export async function addMember(member) {
  return request('/api/members/', {
    method: 'post',
    data: {
      ...member,
    },
  });
}

export async function updateMember(member) {
  return request(`/api/members/${member.id}`, {
    method: 'put',
    data: {
      ...member,
    },
  });
}
