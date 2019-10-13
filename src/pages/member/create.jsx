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
      type: 'member/add',
      payload: fieldsValue
    })
  }
  const okHandle = e => {
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
      router.push('/member');
    });
  };

  return (<PageHeaderWrapper title="New member">
    <Card bordered={false}>
      <Form onSubmit={okHandle} >
        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Fullname">
          {form.getFieldDecorator('fullname', {
            rules: [{ required: true, message: 'Fullname is required.' }],
          })(<Input placeholder="Fullname" />)}
        </FormItem>
        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Mobile">
          {form.getFieldDecorator('mobile', {
            rules: [{ required: true, message: 'Mobile is required.' }],
          })(<Input placeholder="Mobile" />)}
        </FormItem>
        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Email">
          {form.getFieldDecorator('email', {
            rules: [{ required: true, message: 'Email is required.' }],
          })(<Input placeholder="Email" />)}
        </FormItem>

        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 10 }} label="Password" hasFeedback>
          {form.getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: 6,
                message: 'Please input more than 6 chars!',
              }
            ],
          })(<Input.Password />)}
        </Form.Item>



        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} >
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>

      </Form>
    </Card>
  </PageHeaderWrapper>
  )
}

export default connect(state => ({ member: state.member }))(Form.create()(CreateForm))
