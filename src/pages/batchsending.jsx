import { Form, Input, Select, Card, Button, DatePicker } from 'antd';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import router from 'umi/router';
import { connect } from 'dva';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Option } = Select;
const FormItem = Form.Item;

const CreateForm = props => {
    const { form } = props;
    const handleAdd = fieldsValue => {
        props.dispatch({
            type: 'sm/batchadd',
            payload: fieldsValue,
        })
    }
    const okHandle = e => {
        e.preventDefault();
        form.validateFields((err, fieldsValue) => {
            // const fieldarr = fieldsValue.mobiles.split('\n').filter(function (n) { return n })
            // const reg = new RegExp(/02[1-9][0-9]{4,}[\r\s\S]/);
            // console.log("test")
            // for (let i = 0; i < fieldarr.length; i += 1) {
            //     console.log(reg.test(fieldarr[i]))
            //     if (fieldarr[i] !== '') {
            //         if (!reg.test(fieldarr[i])) return;
            //     }
            // }
            // console.log("end")
            if (err) return;
            form.resetFields();
            handleAdd(fieldsValue);
            // router.push('/sm');
        });
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    return (<PageHeaderWrapper title="Batch Sending">
        <Card bordered={false}>
            <Form onSubmit={okHandle} >

                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 13 }} label="Mobile Numbers">
                    {form.getFieldDecorator('mobiles', {
                        rules: [
                            (rule, value, callback, source, options) => {
                                const errors = []

                                const fieldarr = value.split('\n').filter((n) => n)
                                for (let i = 0; i < fieldarr.length; i += 1) {
                                    if (!/02[1-9][0-9]{4,12}/.test(fieldarr[i])) {
                                        errors.push(new Error(`${fieldarr[i]} is not a NZ mobile number. `, rule.field))
                                    }
                                }
                                callback(errors)
                            },
                        ],
                    })(<Input.TextArea rows="10" placeholder="Example: &#10;022xxxxxxx&#10;021xxxxxxx" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 13 }} label="Body">
                    {form.getFieldDecorator('body', {
                        rules: [{ required: true, message: 'Body is required.' }],
                    })(<Input.TextArea rows="4" placeholder="Please enter the text message content. Note: Multi-language is not supported." />)}
                </FormItem>

                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} label="Sending time">
                    {form.getFieldDecorator('sending_time', {
                        rules: [{ required: true, message: 'Sending time is required.' }],
                        initialValue: moment(),
                    })(<DatePicker showTime placeholder="Select Time" />)}
                </FormItem>



                <FormItem {...tailFormItemLayout} >
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>

            </Form>
        </Card>
    </PageHeaderWrapper>
    )
}

export default connect(state => ({ sm: state.sm }))(Form.create()(CreateForm))
