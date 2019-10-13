import { Form, Input, Select, Card, Button} from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import router from 'umi/router';
import { connect } from 'dva';

const { Option } = Select;
const FormItem = Form.Item;




const CreateForm: React.FC<FormComponentProps> = props => {
    const { form } = props;
    const okHandle = (e: any) => {
        e.preventDefault();
        form.validateFields((err, fieldsValue) => {

            console.log(fieldsValue)
          if (err) return;
          form.resetFields();
          handleAdd(fieldsValue);
          router.push('/management/role');
        });
      };

      const handleAdd = (fieldsValue: any)=>{
        props.dispatch({type:"role/add",payload:fieldsValue})
        return '';
    }

    return(
        <PageHeaderWrapper title="Create a role">
        <Card bordered={false}>

        <Form onSubmit={okHandle}>

        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Name">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: 'Name is required.'}],
        })(<Input placeholder="Role's Name" />)}
      </FormItem>

        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>

        </Form>
        
          
        </Card>
        
      </PageHeaderWrapper>
    )
}


export default connect((state: any) => ({loading: state.loading}))(Form.create<FormComponentProps>()(CreateForm))