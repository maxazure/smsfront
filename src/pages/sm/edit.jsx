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
        type: 'sm/show',
        payload: location.query.id,
        callback: () => {
          form.setFieldsValue({
            mobile: this.props.sm.single.mobile,
            body: this.props.sm.single.body,

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
        type: 'sm/update',
        payload: { ...fieldsValue, id: location.query.id },
        callback: () => {
          router.push('/sm');
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

    return (<PageHeaderWrapper title="Edit Sm">
      <Card bordered={false}>
        <Form onSubmit={okHandle}>

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
            <Button type="primary" htmlType="submit" > Submit </Button>
          </FormItem>
        </Form>
      </Card>

    </PageHeaderWrapper>
    )
  }
}

export default connect(state => ({ sm: state.sm }))(Form.create()(EditForm))
