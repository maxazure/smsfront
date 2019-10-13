import { Form, Input, Select, Card, Button, DatePicker } from 'antd';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import router from 'umi/router';
import { connect } from 'dva';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import OptionWeb from '@/components/OptionWeb';
import moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Option } = Select;
const FormItem = Form.Item;

const CreateForm = props => {
  const { form } = props;
  const handleAdd = fieldsValue => {
    props.dispatch({
      type: 'appointment/add',
      payload: fieldsValue,
    })
  }
  const okHandle = e => {
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
      router.push('/appointment');
    });
  };

  return (<PageHeaderWrapper title="New appointment">
    <Card bordered={false}>
      <Form onSubmit={okHandle} >
        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Fullname">
          {form.getFieldDecorator('fullname', {
            rules: [{ required: true, message: 'Fullname is required.' }],
          })(<Input placeholder="Fullname" />)}
        </FormItem>
        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Phone">
          {form.getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Phone is required.' }],
          })(<Input placeholder="Phone" />)}
        </FormItem>
        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Appointment_date">
          {form.getFieldDecorator('appointment_date', {

          })(<Input placeholder="Appointment Date" />)}
        </FormItem>
        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Appointment_when">
          {form.getFieldDecorator('appointment_when', {

          })(<Input placeholder="Appointment When" />)}
        </FormItem>

        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 12 }} label="Sending time">
          {form.getFieldDecorator('sending_time', {
            rules: [{ required: true, message: 'Sending time is required.' }],
            initialValue: moment(),
          })(<DatePicker showTime placeholder="Select Time" />)}
        </FormItem>


        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} >
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>

      </Form>
    </Card>
  </PageHeaderWrapper>
  )
}

export default connect(state => ({ appointment: state.appointment }))(Form.create()(CreateForm))
