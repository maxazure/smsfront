import {
  Button,
  Card,
  Divider,
  Form,
  Select,
  message,
} from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SorterResult } from 'antd/es/table';
import { connect } from 'dva';
import moment from 'moment';
import { StateType } from './model';
import CreateForm from './components/CreateForm';
import StandardTable, { StandardTableColumnProps } from './components/StandardTable';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem, TableListPagination, TableListParams } from './data.d';

import styles from './style.less';

const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

type IStatusMapType = 'none' | 'admin' | 'company_admin' | 'User';

const status = ['None', 'Admin', 'Company Admin', 'User'];

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'listTableList/add'
      | 'listTableList/fetch'
      | 'listTableList/remove'
      | 'listTableList/update'
    >
  >;
  loading: boolean;
  listTableList: StateType;
}

interface TableListState {
  modalVisible: boolean;
  updateModalVisible: boolean;
  expandForm: boolean;
  selectedRows: TableListItem[];
  formValues: { [key: string]: string };
  updateFormValues: Partial<TableListItem>;
}

/* eslint react/no-multi-comp:0 */
@connect(
  ({
    listTableList,
    loading,
  }: {
    listTableList: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    listTableList,
    loading: loading.models.listTableList,
  }),
)
class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    updateFormValues: {},
  };

  columns: StandardTableColumnProps[] = [
    {
      title: 'Name',
      dataIndex: 'fullname',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Company',
      dataIndex: 'company',
    },
    {
      title: 'Role',
      dataIndex: 'role_id',
      render(val: IStatusMapType) {
        return status[val];
      },
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      render: (val: string) => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: 'Action',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleEdit(record)}>Edit</a>
          <Divider type="vertical" />
          <a onClick={()=> this.handleRemoveItem(record.id)} href="#">Delete</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'listTableList/fetch',
      payload: {pageSize: 10,currentPage: 1}
    });
  }

  handleStandardTableChange = (
    pagination: Partial<TableListPagination>,
    filtersArg: Record<keyof TableListItem, string[]>,
    sorter: SorterResult<TableListItem>,
  ) => {
    const { dispatch } = this.props;

    const params: Partial<TableListParams> = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    
    console.log(this.props)
    dispatch({
      type: 'listTableList/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch, listTableList } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'listTableList/fetch',
      payload: {pageSize: listTableList.data.pagination.pageSize, currentPage: listTableList.data.pagination.current},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleRemoveItem = (id: number) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'listTableList/remove',
      payload: id ,
    });
  }
  handleMenuClick = (e: { key: string }) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'listTableList/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = (rows: TableListItem[]) => {
    this.setState({
      selectedRows: rows,
    });
  };



  handleModalVisible = (flag?: boolean) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleEdit =(record: TableListItem) =>{
    this.state.updateFormValues = record
    this.handleUpdateModalVisible(true);
  }

  handleUpdateModalVisible = (flag?: boolean) => {
    this.setState({
      updateModalVisible: !!flag,
    });
  };

  handleAdd = (fields: { 
    fullname: string, mobile: string, email: string, 
    password: string, password_confirmation: string,
    role_id: string, company_id: string
   }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'listTableList/add',
      payload: {
        user: {
        fullname: fields.fullname,
        mobile: fields.mobile,
        email: fields.email,
        password: fields.password,
        password_confirmation: fields.password,
        role_id: fields.role_id,
        company_id: fields.company_id,
        }
      },
    });

    message.success('User has been added.');
    this.handleModalVisible();
  };

  handleUpdate = (fields: FormValueType) => {

    console.log(fields)
    const { dispatch } = this.props;
    dispatch({
      type: 'listTableList/update',
      payload: {
        user: {
          id: fields.id,
          fullname: fields.fullname,
          mobile: fields.mobile,
          email: fields.email,
          password: fields.password,
          role_id: fields.role_id,
          company_id: fields.company_id,
          }
      },
    });

    message.success('success');
    this.handleUpdateModalVisible();
  };




  render() {
    const {
      listTableList: { data },
      loading,
    } = this.props;

    const { selectedRows, modalVisible, updateModalVisible, updateFormValues } = this.state;
    

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
          
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                New User
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>Batch</Button>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onChange={this.handleStandardTableChange}
              onSelectRow={this.handleSelectRows}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        {updateFormValues && Object.keys(updateFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={updateFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);
