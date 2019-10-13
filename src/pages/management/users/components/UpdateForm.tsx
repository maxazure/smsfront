import { Form, Input, Modal, Radio, Select} from 'antd';
import { TableListItem } from '../data.d';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import OptionWeb from './OptionWeb';

const { Option } = Select;
const FormItem = Form.Item;


export interface FormValueType extends Partial<TableListItem> {
  fullname?: string,
  mobile?: string, 
  email?: string, 
  password?: string, 
  password_confirmation?: string,
  role_id?: string, 
  company_id?: string
}

interface UpdateFormProps extends FormComponentProps {
  updateModalVisible: boolean;
  handleUpdate: (fieldsValue: { id: string,
    fullname: string, mobile: string, email: string, 
    password: string, password_confirmation: string,
    role_id: string, company_id: string
   }) => void;
   handleUpdateModalVisible: () => void;
   values: FormValueType;
}

const UpdateForm: React.FC<UpdateFormProps> = props => {

  const { updateModalVisible, form, handleUpdate, handleUpdateModalVisible, values } = props;
 
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      
      handleUpdate({...fieldsValue,id: values.id});
      if (err) return;
      form.resetFields();
    });
  };


return(

  <Modal
  destroyOnClose
  title="Edit User"
  visible={updateModalVisible}
  onOk={okHandle}
  onCancel={() => handleUpdateModalVisible()}
>

<FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Fullname">
        {form.getFieldDecorator('fullname', {
          rules: [{ required: true, message: 'Fullname is required.'}],
          initialValue: values.fullname
        })(<Input placeholder="Name" />)}
      </FormItem>

      <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Mobile">
        {form.getFieldDecorator('mobile', {
          rules: [{ required: true, message: 'mobile is required.'}],
          initialValue: values.mobile
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
            },],
            initialValue: values.email
        })(<Input placeholder="Email" />)}
      </FormItem>

      <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 10 }} label="Password" hasFeedback>
          {form.getFieldDecorator('password', {
            rules: [
              {
                required: false
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
            initialValue: String(values.role_id)
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
            initialValue: String(values.company_id)
          })(
            
              <OptionWeb path="/api/companies" style={{ width: 220 }} />
            
          )}
        </Form.Item>
</Modal>

);
};

export default Form.create<UpdateFormProps>()(UpdateForm);