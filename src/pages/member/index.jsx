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
    member,
    loading,
  }) => ({
    member,
    loading: loading.models.member,
  }),
)
class MemberList extends Component {
  columns = [
    { title: 'Id', dataIndex: 'id' },
{ title: 'Fullname', dataIndex: 'fullname' },
{ title: 'Mobile', dataIndex: 'mobile' },
{ title: 'Email', dataIndex: 'email' },
{ title: 'Updated At', dataIndex: 'updated_at', render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>},

    {
      title: 'Action',
      render: (_text, record) => (<Fragment>
        <Link to={`/member/edit/?id=${record.id}`}>Edit</Link>
        <Divider type="vertical" />
        <a onClick={() => this.handleRemoveItem(record.id)}>Delete</a></Fragment>
      ),
    },
  ]

  componentDidMount() {
    const { dispatch, member: { data: { pagination } } } = this.props;
    let params = {};
    if (pagination) {
      params = {
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
      };
    }

    dispatch({ type: 'member/fetch', payload: params });
  }

  handleTableChange = pagination => {
    const { dispatch } = this.props;
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    dispatch({ type: 'member/fetch', payload: params });
  };

  handleRemoveItem = id => {
    const { dispatch, member: { data: { pagination } } } = this.props;
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    dispatch({
      type: 'member/remove',
      payload: id,
      callback: () => {
        dispatch({ type: 'member/fetch', payload: params });
      },
    });
  }

  render() {
    const {
      member: { data: { list, pagination } },
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
            <Button icon="plus" type="primary" onClick={() => router.push('/member/create')}>
              New Member
                    </Button>
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

export default Form.create()(MemberList);
