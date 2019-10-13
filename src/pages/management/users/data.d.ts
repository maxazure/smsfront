export interface TableListItem {
  key: number;
  id: number;
  fullname: string,
  mobile: string, 
  email: string, 
  password?: string, 
  password_confirmation?: string,
  role_id: string, 
  company_id: string
  updated_at?: Date;
  created_at?: Date;
  disabled?: boolean;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  pageSize: number;
  currentPage: number;
}
