import { Alert, Button, Descriptions, Divider, Statistic, Form, Input, Table } from 'antd';
import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const Step2 = props => {
  const { form, data, dispatch, submitting } = props;

  if (!data) {
    return null;
  }

  const { getFieldDecorator, validateFields, getFieldsValue } = form;

  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();

      dispatch({
        type: 'formStepForm/saveStepFormData',
        payload: { ...data, ...values },
      });
      dispatch({
        type: 'formStepForm/saveCurrentStep',
        payload: 'info',
      });
    }
  };

  const onValidateForm = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        if (dispatch) {
          dispatch({
            type: 'formStepForm/submitStepForm',
            payload: { csvjson: data.csvjson },
          });
        }
      }
    });
  };


  const columns = [
    { title: 'Name', dataIndex: 0 },
    { title: 'Mobile', dataIndex: 1 },
    { title: 'Date', dataIndex: 2, width: 120 },
    { title: 'Time', dataIndex: 3, width: 100 },
  ]
  return (
    <Form layout="horizontal" className={styles.stepForm}>
      <Alert
        closable
        showIcon
        message={`Please check the data count (${props.data.csvarr.length}) and content.`}
        style={{
          marginBottom: 24,
        }}
      />
      <Table dataSource={props.data.csvarr} columns={columns} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />

      <Form.Item
        style={{
          marginBottom: 8,
        }}
        wrapperCol={{
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: formItemLayout.wrapperCol.span,
            offset: formItemLayout.labelCol.span,
          },
        }}
        label=""
      >
        <Button type="primary" onClick={onValidateForm} loading={submitting}>
          UPLOAD
        </Button>
        <Button
          onClick={onPrev}
          style={{
            marginLeft: 8,
          }}
        >
          BACK
        </Button>
      </Form.Item>
    </Form >
  );
};

export default connect(({ formStepForm, loading }) => ({
  submitting: loading.effects['formStepForm/submitStepForm'],
  data: formStepForm.step,
}))(Form.create()(Step2));
