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
        type: 'member/show',
        payload: location.query.id,
        callback: () => {
          form.setFieldsValue({
            fullname: this.props.member.single.fullname,
            mobile: this.props.member.single.mobile,
            email: this.props.member.single.email,

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
        type: 'member/update',
        payload: { ...fieldsValue, id: location.query.id },
        callback: () => {
          router.push('/member');
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

    return (<PageHeaderWrapper title="Edit Member">
      <Card bordered={false}>
        <Form onSubmit={okHandle}>

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
            <Button type="primary" htmlType="submit" > Submit </Button>
          </FormItem>
        </Form>
      </Card>

    </PageHeaderWrapper>
    )
  }
}

export default connect(state => ({ member: state.member }))(Form.create()(EditForm))
