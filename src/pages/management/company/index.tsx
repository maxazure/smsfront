import {Card, Divider, Form, Table, Button } from 'antd';
import Link from 'umi/link'
import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import React, { Component, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { StateType } from './model';
import moment from 'moment';

import { ColumnProps, TableProps } from 'antd/es/table';
import { TableListItem, TableListPagination, TableListParams } from './data.d';
import styles from './style.less';
import { router } from 'umi';


interface TableListProps extends FormComponentProps {
    dispatch: Dispatch<
      Action<
        | 'company/add'
        | 'company/fetch'
        | 'company/remove'
        | 'company/update'
      >
    >;
    loading: boolean;
    company: StateType;
  }
  
  interface TableListState {
    modalVisible: boolean;
    updateModalVisible: boolean;
    expandForm: boolean;
    formValues: { [key: string]: string };
  }


/* eslint react/no-multi-comp:0 */
@connect(
    ({
      company,
      loading,
    }: {
      company: StateType;
      loading: {
        models: {
          [key: string]: boolean;
        };
      };
    }) => ({
      company,
      loading: loading.models.company,
    }),
  )
class CompanyList extends Component<TableListProps>{
    
    handleRemoveItem = (id: number) => {
        const { dispatch } = this.props;
        dispatch({
          type: 'company/remove',
          payload: id ,
        });
      }

    columns: ColumnProps<TableListItem>[] = [
        {title: 'ID',dataIndex: 'id'},
        {title: 'Name',dataIndex: 'name'},
        {title: 'Updated At',dataIndex: 'updated_at',
        render: (val: string) => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>},
        
        {
          title: 'Action',
          render: (text, record) => (
            <Fragment>
                <Link to={"/management/company/edit/?id="+ record.id }>Edit</Link>
              <Divider type="vertical" />
              <a onClick={()=> this.handleRemoveItem(record.id)} >Delete</a>
            </Fragment>
          ),
        },
    ]
    
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
          type: 'company/fetch',
        });
      }
    render(){

        const {
            company: { data },
            loading,
          } = this.props;
      

        console.log(this.props)
       return(
            <PageHeaderWrapper>
                <Card bordered={false}>
                   <div className={styles.tableListOperator}>
                    <Button icon="plus" type="primary" onClick={() => router.push('/management/company/create')}>
                    New Company
                    </Button>
                  </div>
                    <div className={styles.tableList}>
                   <Table dataSource={data} columns={this.columns} loading={loading} />
                    </div>
                </Card>
            </PageHeaderWrapper>
        ) 
    }
    
}

export default Form.create()(CompanyList);