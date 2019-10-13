import { Form, Input, Card, Button } from 'antd';
import React, { Component } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import router from 'umi/router';
import { connect } from 'dva';

const FormItem = Form.Item;

class EditForm extends Component {
  componentDidMount() {
    const { dispatch, form } = this.props;

    dispatch({
      type: 'template/showbycompany',
      payload: {},
      callback: () => {
        form.setFieldsValue({
          body: this.props.single.body,

        })
      },
    })
  }

  render() {
    const { form } = this.props;

    const handleUpdate = fieldsValue => {
      const { dispatch } = this.props;
      dispatch({
        type: 'template/updatebycompany',
        payload: { ...fieldsValue },
      })
    }

    const okHandle = e => {
      e.preventDefault();
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleUpdate(fieldsValue);
        this.componentDidMount()
      });
    };

    return (<PageHeaderWrapper title="Edit SMS Template">
      <Card bordered={false}>
        <Form onSubmit={okHandle}>

          <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 12 }} label="Template body">
            {form.getFieldDecorator('body', {
              rules: [{ required: true, message: 'Body is required.' }],
            })(<Input.TextArea rows="4" placeholder="Please enter the text message template. Note: Multi-language is not supported." />)}
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

export default connect(state => ({ single: state.template.single }))(Form.create()(EditForm))
