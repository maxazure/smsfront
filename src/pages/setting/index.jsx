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
        const { dispatch, form } = this.props;


        dispatch({
            type: 'setting/fetch',
            payload: '',
            callback: () => {
                console.log('setting/fetch')
                console.log(this.props)

                form.setFieldsValue({
                    fullname: this.props.setting.fullname,
                    mobile: this.props.setting.mobile,
                    email: this.props.setting.email,
                })
            },
        })
    }

    render() {
        const { form, location } = this.props;

        const handleUpdate = fieldsValue => {
            const { dispatch } = this.props;

            dispatch({
                type: 'setting/update',
                payload: { ...fieldsValue },
                callback: () => {
                    this.componentDidMount()
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
                        {form.getFieldDecorator('fullname', {
                            rules: [{ required: true, message: 'Fullname is required.' }],
                        })(<Input placeholder="Fullname" />)}
                    </FormItem>
                    <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Mobile">
                        {form.getFieldDecorator('mobile', {
                            rules: [{ required: true, message: 'Phone is required.' }],
                        })(<Input placeholder="mobile" />)}
                    </FormItem>
                    <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Email">
                        {form.getFieldDecorator('email', {
                        })(<Input placeholder="Your email" />)}
                    </FormItem>

                    <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 10 }} label="Password" hasFeedback>
                        {form.getFieldDecorator('password', {
                            rules: [
                                {
                                    required: false,
                                },
                                {
                                    min: 6,
                                    message: 'Please input more than 6 chars!',
                                },
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

export default connect(state => ({ setting: state.setting.single }))(Form.create()(EditForm))
