export interface TemplateItem {
    key: number;
    id: number; 
    body: string; 
    company_id: number; 
    company?: string; 
    created_at?: Date; 
    updated_at?: Date; 

  }

  export interface ListPagination {
    total: number;
    pageSize: number;
    current: number;
  }

  export interface ListParams {
    sorter: string;
    status: string;
    name: string;
    pageSize: number;
    currentPage: number;
  }
