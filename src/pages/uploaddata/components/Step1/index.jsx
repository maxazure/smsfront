import { Button, Divider, Form, Input, Select, Icon } from 'antd';
import React, { Fragment } from 'react';
import { connect } from 'dva';
import { parse } from 'csv';
import styles from './index.less';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const Step1 = props => {
  const { form, dispatch, data } = props;

  if (!data) {
    return null;
  }


  const { getFieldDecorator, validateFields, getFieldValue } = form;

  const onValidateForm = () => {
    const val = getFieldValue('csvstr')

    parse(val, {
      comment: '#',
    }, (_err, _output) => {
      data.csvarr = _output
      data.csvjson = JSON.stringify(_output)

      validateFields((err, values) => {
        if (!err && dispatch) {
          dispatch({
            type: 'formStepForm/saveStepFormData',
            payload: values,
          });
          dispatch({
            type: 'formStepForm/saveCurrentStep',
            payload: 'confirm',
          });
        }
      });
    })
  };
  const handleFile = () => {
    const objFile = document.getElementById('file');

    // if (objFile.files.length === 0) { return }
    if (objFile.files[0].type !== 'text/csv') {
      alert('Please select a CSV file.');
    } else {
      const reader = new FileReader(); // 新建一个FileReader
      reader.readAsText(objFile.files[0], 'UTF-8');// 读取文件
      reader.onload = evt => { // 读取完文件之后会回来这里
        const fileString = evt.target.result;
        form.setFieldsValue(
          { csvstr: fileString },
        )
      }
    }
  }

  return (
    <Fragment>
      <Form layout="horizontal" className={styles.stepForm1} hideRequiredMark>

        <Form.Item>
          {getFieldDecorator('file', {
            rules: [
              {
                required: true,
                message: 'Please select a file.',
              },
            ],
          })(<Input type="file" onChange={handleFile} />)}
        </Form.Item>

        <Form.Item label="The CSV file's content:">
          {getFieldDecorator('csvstr')(< Input.TextArea rows="10"></Input.TextArea>)}
        </Form.Item>


        <Form.Item
          wrapperCol={{
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
          label=""
        >
          <Button type="primary" onClick={onValidateForm}>
            Next
          </Button>
        </Form.Item>
      </Form>
      <Divider
        style={{
          margin: '40px 0 24px',
        }}
      />
      <div className={styles.desc}>
        <h3>Notice</h3>
        <h4>description</h4>
        <p>
          Remark.
        </p>
      </div>
    </Fragment >
  );
};

export default connect(({ formStepForm }) => ({
  data: formStepForm.step,
}))(Form.create()(Step1));
