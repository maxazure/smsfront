import {Card, Divider, Form, Table, Button } from 'antd';
import React, { Component, Fragment } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { connect } from 'dva';
import Link from 'umi/link'
import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { ColumnProps } from 'antd/es/table';
import moment from 'moment';

import { TemplateItem } from './data.d';
import styles from './style.less';
import { StateType } from './model';
import router from 'umi/router';

interface TemplateListProps extends FormComponentProps {
    dispatch: Dispatch<
      Action<
        | 'template/add'
        | 'template/fetch'
        | 'template/remove'
        | 'template/update'
      >
    >;
    loading: boolean;
    template: StateType;
  }


@connect(
    ({
      template,
      loading,
    }: {
      template: StateType;
      loading: {
        models: {
          [key: string]: boolean;
        };
      };
    }) => ({
      template,
      loading: loading.models.template,
    }),
  )
class TemplateList extends Component<TemplateListProps> {

    handleRemoveItem = (id: number) => {
        const { dispatch } = this.props;
        dispatch({
          type: 'template/remove',
          payload: id ,
        });
      }

    columns: ColumnProps<TemplateItem>[] = [
        {title: 'Id',dataIndex: 'id'},
{title: 'Body',dataIndex: 'body'},
{title: 'Company_id',dataIndex: 'company_id'},
{title: 'Created_at',dataIndex: 'created_at',render: (val: string) => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>},


        {
            title: 'Action',
            render: (text, record) => (
              <Fragment>
                  <Link to={"/management/template/edit/?id="+ record.id }>Edit</Link>
                <Divider type="vertical" />
                <a onClick={()=> this.handleRemoveItem(record.id)} >Delete</a>
              </Fragment>
            ),
          },
    ]

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
          type: 'template/fetch',
        });
      }


    render() {

      const {
        template: { data },
        loading,
      } = this.props;

        return (
            <PageHeaderWrapper>

                <Card bordered={false}>
                  <div className={styles.tableListOperator}>
                    <Button icon="plus" type="primary" onClick={() => router.push('/management/template/create')}>
                    New Template
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

export default Form.create()(TemplateList);
