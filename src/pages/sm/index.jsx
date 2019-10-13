import { Card, Divider, Form, Table, Button } from 'antd';
import Link from 'umi/link'
import React, { Component, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import { router } from 'umi';

import styles from './style.less';


/* eslint react/no-multi-comp:0 */
@connect(
  ({
    sm,
    loading,
  }) => ({
    sm,
    loading: loading.models.sm,
  }),
)
class SmList extends Component {
  columns = [
    { title: 'Id', dataIndex: 'id' },
    { title: 'Mobile', dataIndex: 'mobile' },
    { title: 'Body', dataIndex: 'body' },
    { title: 'Sending Time', dataIndex: 'sending_time', render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span> },
    {
      title: 'Status',
      render: (_text, record) => (<span>
        {record.status === 0 ? 'Sending' : 'Sent'}
      </span>

      ),
    },

    { title: 'Updated At', dataIndex: 'updated_at', render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span> },

    {
      title: 'Action',
      render: (_text, record) => (<Fragment>
        <a onClick={() => this.handleRemoveItem(record.id)}>Delete</a></Fragment>
      ),
    },
  ]

  componentDidMount() {
    const { dispatch, sm: { data: { pagination } } } = this.props;
    let params = {};
    if (pagination) {
      params = {
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
      };
    }

    dispatch({ type: 'sm/fetch', payload: params });
  }

  handleTableChange = pagination => {
    const { dispatch } = this.props;
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    dispatch({ type: 'sm/fetch', payload: params });
  };

  handleRemoveItem = id => {
    const { dispatch, sm: { data: { pagination } } } = this.props;
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    dispatch({
      type: 'sm/remove',
      payload: id,
      callback: () => {
        dispatch({ type: 'sm/fetch', payload: params });
      },
    });
  }

  render() {
    const {
      sm: { data: { list, pagination } },
      loading,
    } = this.props;

    const paginationProps = pagination ?
      {
        showSizeChanger: true,
        showQuickJumper: true,
        ...pagination,
      } :
      false;

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableListOperator}>
          </div>
          <div className={styles.tableList}>
            <Table dataSource={list} columns={this.columns} loading={loading}
              pagination={paginationProps}
              onChange={this.handleTableChange} />
          </div>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default Form.create()(SmList);
