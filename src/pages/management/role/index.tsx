import {Card, Divider, Form, Table, Button } from 'antd';
import React, { Component, Fragment } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { connect } from 'dva';
import Link from 'umi/link'
import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { ColumnProps } from 'antd/es/table';
import moment from 'moment';

import { RoleItem } from './data.d';
import styles from './style.less';
import { StateType } from './model';
import router from 'umi/router';

interface RoleListProps extends FormComponentProps {
    dispatch: Dispatch<
      Action<
        | 'role/add'
        | 'role/fetch'
        | 'role/remove'
        | 'role/update'
      >
    >;
    loading: boolean;
    role: StateType;
  }
  

@connect(
    ({
      role,
      loading,
    }: {
      role: StateType;
      loading: {
        models: {
          [key: string]: boolean;
        };
      };
    }) => ({
      role,
      loading: loading.models.role,
    }),
  )
class RoleList extends Component<RoleListProps> {

    handleRemoveItem = (id: number) => {
        const { dispatch } = this.props;
        dispatch({
          type: 'role/remove',
          payload: id ,
        });
      }

    columns: ColumnProps<RoleItem>[] = [
        {title: 'ID',dataIndex: 'id'},
        {title: 'Name',dataIndex: 'name'},
        {title: 'Updated At',dataIndex: 'updated_at',
        render: (val: string) => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>},
        
        {
            title: 'Action',
            render: (text, record) => (
              <Fragment>
                  <Link to={"/management/role/edit/?id="+ record.id }>Edit</Link>
                <Divider type="vertical" />
                <a onClick={()=> this.handleRemoveItem(record.id)} >Delete</a>
              </Fragment>
            ),
          },
    ]
    
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
          type: 'role/fetch',
        });
      }


    render() {

      const {
        role: { data },
        loading,
      } = this.props;
  
        return (
            <PageHeaderWrapper>
               
                <Card bordered={false}>
                  <div className={styles.tableListOperator}>
                    <Button icon="plus" type="primary" onClick={() => router.push('/management/role/create')}>
                    New Role
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

export default Form.create()(RoleList);