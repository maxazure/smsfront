import request from '@/utils/request';

export interface ListParams {
  pageSize: number;
  currentPage: number;
}

export async function queryRoles(params: ListParams) {
  return request('/api/roles', {
    params,
  });
}

export async function queryRole(id: string) {
  return request('/api/roles/'+id);
}

export async function removeRole(id: string) {
  return request('/api/roles/'+id, {
    method: 'DELETE'
  });
}

export async function addRole(role: any) {
  return request('/api/roles', {
    method: 'post',
    data: {
      ...role
    },
  });
}

export async function updateRole(role: any) {
  return request('/api/roles/'+role.id, {
    method: 'put',
    data: {
      ...role
    },
  });
}
