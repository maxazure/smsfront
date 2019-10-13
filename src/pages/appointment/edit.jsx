import { Form, Input, Select, Card, Button } from 'antd';
import React, { Component } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import router from 'umi/router';
import { connect } from 'dva';
import OptionWeb from '@/components/OptionWeb';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Option } = Select;
const FormItem = Form.Item;

class EditForm extends Component {
  componentDidMount() {
    const { location, dispatch, form } = this.props;

    if (location.query.id) {
      dispatch({
        type: 'appointment/show',
        payload: location.query.id,
        callback: () => {
          form.setFieldsValue({
            fullname: this.props.appointment.single.fullname, 
phone: this.props.appointment.single.phone, 
appointment_date: this.props.appointment.single.appointment_date, 
appointment_when: this.props.appointment.single.appointment_when, 

          })
        },
      })
    }
  }

  render() {
    const { form, location } = this.props;

    const handleUpdate = fieldsValue => {
      const { dispatch } = this.props;

      dispatch({
        type: 'appointment/update',
        payload: { ...fieldsValue, id: location.query.id },
        callback: () => {
          router.push('/appointment');
        },
      })
    }

    const okHandle = e => {
      e.preventDefault();
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleUpdate(fieldsValue);
      });
    };

    return (<PageHeaderWrapper title="Edit Appointment">
      <Card bordered={false}>
        <Form onSubmit={okHandle}>

          <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Fullname">
{ form.getFieldDecorator('fullname', {
  rules: [{ required: true, message: 'Fullname is required.' }],
})(<Input placeholder="Fullname" />)}
</FormItem>
<FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Phone">
{ form.getFieldDecorator('phone', {
  rules: [{ required: true, message: 'Phone is required.' }],
})(<Input placeholder="Phone" />)}
</FormItem>
<FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Appointment_date">
{ form.getFieldDecorator('appointment_date', {
  
})(<Input placeholder="Appointment Date" />)}
</FormItem>
<FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Appointment_when">
{ form.getFieldDecorator('appointment_when', {
  
})(<Input placeholder="Appointment When" />)}
</FormItem>


          <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} >
            <Button type="primary" htmlType="submit" > Submit </Button>
          </FormItem>
        </Form>
      </Card>

    </PageHeaderWrapper>
    )
  }
}

export default connect(state => ({ appointment: state.appointment }))(Form.create()(EditForm))
