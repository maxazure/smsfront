import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryUser(params: TableListParams) {
  if(params){
    return request(`/api/users/?page=${params.currentPage || 1}&pagesize=${params.pageSize || 10}`);
  }else{
    return request(`/api/users/?page=1`);
  }
  
}

export async function removeUser(id: string) {
  return request('/api/users/'+id, {
    method: 'DELETE'
  });
}

export async function addUser(params: any) {
  return request('/api/users', {
    method: 'post',
    data: {
      ...params
    },
  });
}

export async function updateUser(params: any) {
  return request('/api/users/'+params.user.id, {
    method: 'put',
    data: {
      ...params
    },
  });
}
