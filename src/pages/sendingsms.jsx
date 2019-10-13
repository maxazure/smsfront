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

    return (<PageHeaderWrapper title="New Text Message">
        <Card bordered={false}>
            <Form onSubmit={okHandle} >
                <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 12 }} label="Mobile">
                    {form.getFieldDecorator('mobile', {
                        rules: [{ required: true, message: 'Mobile is required.' },
                        { min: 6, message: 'Must more than 6 digtal.' },
                        { pattern: /^02[0-9]{4,12}/, message: 'Must be a NZ mobile number' }],
                    })(<Input placeholder="Should be a NZ mobile number" />)}
                </FormItem>
                <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 12 }} label="Body">
                    {form.getFieldDecorator('body', {
                        rules: [{ required: true, message: 'Body is required.' }],
                    })(<Input.TextArea rows="4" placeholder="Please enter the text message content. Note: Multi-language is not supported." />)}
                </FormItem>


                <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 12 }} label="Sending time">
                    {form.getFieldDecorator('sending_time', {
                        rules: [{ required: true, message: 'Sending time is required.' }],
                        initialValue: moment(),
                    })(<DatePicker showTime placeholder="Select Time" />)}
                </FormItem>


                <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 12 }} >
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>

            </Form>
        </Card>
    </PageHeaderWrapper>
    )
}

export default connect(state => ({ sm: state.sm }))(Form.create()(CreateForm))
