import { Form, Input, Select, Card, Button} from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React, { Component, Fragment } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import router from 'umi/router';
import { connect } from 'dva';
import component from '@/locales/en-US/component';

const { Option } = Select;
const FormItem = Form.Item;

class EditForm extends Component{

    componentDidMount(){

        if(this.props.location.query.id){
            this.props.dispatch({type:"role/show",payload:this.props.location.query.id,
            callback: ()=> {
              this.props.form.setFieldsValue(
                {name: this.props.single.role.single.name}
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
          router.push('/management/role');
        });
      };

      const handleUpdate = (fieldsValue: any)=>{
        this.props.dispatch({type:"role/update",payload:{...fieldsValue,id:this.props.location.query.id}})
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
}





export default connect((state: any) => ({single: state}))(Form.create<FormComponentProps>()(EditForm))