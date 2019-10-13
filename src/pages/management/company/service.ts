import request from '@/utils/request';
import { TableListParams } from './data';

export async function queryCompanies(params: TableListParams) {
  return request('/api/companies', {
    params,
  });
}

export async function querycompany(id: string) {
  return request('/api/companies/'+id);
}

export async function removeCompany(id: string) {
  return request('/api/companies/'+id, {
    method: 'DELETE'
  });
}

export async function addCompany(company: any) {
  return request('/api/companies', {
    method: 'post',
    data: {
      ...company
    },
  });
}

export async function updateCompany(company: any) {
  return request('/api/companies/'+company.user.id, {
    method: 'put',
    data: {
      ...company
    },
  });
}
