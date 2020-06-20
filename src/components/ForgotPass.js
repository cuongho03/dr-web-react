import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
  message
} from 'antd';
import { resetPassword } from '../actions/member'
import { connect } from 'react-redux';


function ForgotPass(props) {

  const [form] = Form.useForm();
  const [loading, handelChangeLoading] = useState(false)
  function handleSubmit(values) {
    handelChangeLoading(true)
    props.resetPassword(values).then((result) => {
      const { isSuccess, err } = result
      if (isSuccess) {
        props.handleForgotPassSuccess()
      } else {
        message.warn(err.message)
      }
      form.resetFields();
      handelChangeLoading(false)
    })
  };

  return (
    <Form form={form} className="forgotPass" layout="inline" onFinish={(values) => { handleSubmit(values) }} >
      <Form.Item style={{ marginBottom: "10px" }} name="email" className="forgotPass__fullwidth" rules={[
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
        {
          required: true,
          message: 'Please input your E-mail!',
        },
      ]} >
        <Input style={{ width: "315px" }} size="large" placeholder="email" />

      </Form.Item>
      <Form.Item >
        <Button size="large" loading={loading} type="primary" htmlType="submit" shape="round" style={{ border: "none", backgroundColor: "#fe8c00", fontWeight: 500 }}>
          Submit
          </Button>
      </Form.Item>
    </Form>

  );
}



function mapDispatchToProps() {
  return {
    resetPassword: (data) => resetPassword(data)
  }
}

export default connect(null, mapDispatchToProps)(ForgotPass);