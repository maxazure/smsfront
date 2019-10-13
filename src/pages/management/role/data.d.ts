export interface RoleItem {
    key: number;
    id: number;
    name: string;
    config?: string;
    updated_at?: Date;
    created_at?: Date;
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