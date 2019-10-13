import request from '@/utils/request';

export interface ListParams {
  pageSize: number;
  currentPage: number;
}

export async function queryTemplates(params: ListParams) {
  return request('/api/templates/', {
    params,
  });
}

export async function queryTemplate(id: string) {
  return request('/api/templates/' + id);
}

export async function queryTemplatebycompany() {
  return request('/api/templateshowbycompany/');
}
export async function updateTemplatebycompany(template: any) {
  return request('/api/templateupdatebycompany/', {
    method: 'POST',
    data: {
      ...template
    }
  });
}

export async function removeTemplate(id: string) {
  return request('/api/templates/' + id, {
    method: 'DELETE'
  });
}

export async function addTemplate(template: any) {
  return request('/api/templates/', {
    method: 'post',
    data: {
      ...template
    },
  });
}

export async function updateTemplate(template: any) {
  return request('/api/templates/' + template.id, {
    method: 'put',
    data: {
      ...template
    },
  });
}
