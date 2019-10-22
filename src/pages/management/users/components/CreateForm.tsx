import { Form, Input, Modal, Radio, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import OptionWeb from '@/pages/management/users/components/OptionWeb';

const { Option } = Select;
const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAdd: (fieldsValue: {
    fullname: string, mobile: string, email: string,
    password: string, password_confirmation: string,
    role_id: string, company_id: string
  }) => void;
  handleModalVisible: () => void;
}
const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  // const onChange=(e) =>{
  //   console.log(`radio checked:${e.target.value}`);
  // }


  return (
    <Modal
      destroyOnClose
      title="New User"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Fullname">
        {form.getFieldDecorator('fullname', {
          rules: [{ required: true, message: 'Fullname is required.' }],
        })(<Input placeholder="Name" />)}
      </FormItem>

      <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Mobile">
        {form.getFieldDecorator('mobile', {
          rules: [{ required: true, message: 'mobile is required.' }],
        })(<Input placeholder="mobile" />)}
      </FormItem>

      <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Email">
        {form.getFieldDecorator('email', {
          rules: [
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },]
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


      <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Role">
        {form.getFieldDecorator('role_id', {
          rules: [{ required: true, message: 'Please select your role' }],
          initialValue: "3"
        })(
          <Radio.Group>
            <Radio.Button value="1">Admin</Radio.Button>
            <Radio.Button value="2">Company Admin</Radio.Button>
            <Radio.Button value="3">User</Radio.Button>
          </Radio.Group>
        )}
      </Form.Item>

      <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Company">
        {form.getFieldDecorator('company_id', {
          rules: [{ required: true, message: 'Please select your company' }],
        })(
          <OptionWeb path="/api/companies" />
        )}
      </Form.Item>




    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
