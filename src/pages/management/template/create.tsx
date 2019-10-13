import { Form, Input, Select, Card, Button} from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import router from 'umi/router';
import { connect } from 'dva';
import OptionWeb from '@/components/OptionWeb';

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
          router.push('/management/template');
        });
      };

      const handleAdd = (fieldsValue: any)=>{
        props.dispatch({type:"template/add",payload:fieldsValue})
        return '';
    }

    return(
        <PageHeaderWrapper title="Create a template">
        <Card bordered={false}>

        <Form onSubmit={okHandle}>

        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Body">
{form.getFieldDecorator('body', {
  rules: [{ required: true, message: 'Body is required.'}],
})(<Input placeholder="Body" />)}
</FormItem>
<FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Company_id">
{form.getFieldDecorator('company_id', {
  rules: [{ required: true, message: 'Company_id is required.'}],
})(<OptionWeb path="/api/companies" />)}
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
