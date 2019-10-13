import { Button, Result, Descriptions, Statistic } from 'antd';
import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

const Step3 = props => {
  const { data, dispatch } = props;

  if (!data) {
    return null;
  }

  const { payAccount, receiverAccount, receiverName, amount } = data;

  const onFinish = () => {
    if (dispatch) {
      dispatch({
        type: 'formStepForm/saveCurrentStep',
        payload: 'info',
      });
    }
  };

  const information = `${props.data.csvarr.length} appointments`;
  const extra = (
    <>
      <Button type="primary" onClick={onFinish}>
        UPLOAD AGAIN
      </Button>

    </>
  );
  return (
    <Result
      status="success"
      title="The data has been uploaded."
      subTitle={information}
      extra={extra}
      className={styles.result}
    >

    </Result>
  );
};

export default connect(({ formStepForm }) => ({
  data: formStepForm.step,
}))(Step3);
