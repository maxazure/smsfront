import { Form, Input, Select, Card, Button} from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React, { Component, Fragment } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import router from 'umi/router';
import { connect } from 'dva';
import component from '@/locales/en-US/component';
import OptionWeb from '@/components/OptionWeb';

const { Option } = Select;
const FormItem = Form.Item;

class EditForm extends Component{

    componentDidMount(){

        if(this.props.location.query.id){
            this.props.dispatch({type:"template/show",payload:this.props.location.query.id,
            callback: ()=> {
              this.props.form.setFieldsValue(
                {
                  body: this.props.single.template.single.body, 
company_id: this.props.single.template.single.company_id, 

                }
              )
              console.log(this.props)

             }})
        }
    }

    render(){
        const { form } = this.props;
        const okHandle = (e: any) => {
        e.preventDefault();
        form.validateFields((err, fieldsValue) => {

            console.log(fieldsValue)
          if (err) return;
          form.resetFields();
          handleUpdate(fieldsValue);
          router.push('/management/template');
        });
      };

      const handleUpdate = (fieldsValue: any)=>{
        this.props.dispatch({type:"template/update",payload:{...fieldsValue,id:this.props.location.query.id}})
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
}





export default connect((state: any) => ({single: state}))(Form.create<FormComponentProps>()(EditForm))
