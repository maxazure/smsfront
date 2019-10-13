import { Form, Input, Select, Card, Button } from 'antd';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import router from 'umi/router';
import { connect } from 'dva';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import OptionWeb from '@/components/OptionWeb';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Option } = Select;
const FormItem = Form.Item;

const CreateForm = props => {
  const { form } = props;
  const handleAdd = fieldsValue => {
    props.dispatch({
      type: 'sm/add',
      payload: fieldsValue,
    })
  }
  const okHandle = e => {
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
      router.push('/sm');
    });
  };

  return (<PageHeaderWrapper title="New sm">
    <Card bordered={false}>
      <Form onSubmit={okHandle} >
        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Mobile">
          {form.getFieldDecorator('mobile', {
            rules: [{ required: true, message: 'Mobile is required.' }],
          })(<Input placeholder="Mobile" />)}
        </FormItem>
        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Body">
          {form.getFieldDecorator('body', {
            rules: [{ required: true, message: 'Body is required.' }],
          })(<Input placeholder="Body" />)}
        </FormItem>


        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} >
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>

      </Form>
    </Card>
  </PageHeaderWrapper>
  )
}

export default connect(state => ({ sm: state.sm }))(Form.create()(CreateForm))
