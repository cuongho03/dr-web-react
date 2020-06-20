/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import {
  Form,
  Input,
  Modal,
  Button,
  message
} from 'antd';
import { login } from '../actions/member'
import { connect } from 'react-redux';
function Login(props) {

  const [form] = Form.useForm();
  const [loading, handleChangeLoading] = useState(false)




  function handleSubmit(values) {

    props.login(values).then((result) => {
      const { isSuccess, err } = result
      if (isSuccess) {
        props.handleLoginSuccess()
      } else {
        message.warn(err)
      }
      form.resetFields();
      handleChangeLoading(false)

    })

  };

  return (
    <Modal
      title="Login to Your GenC Space"
      visible={true}
      maskClosable={true}
      mask={false}
      keyboard={false}
      className="resgister-modal"
      footer={
        []
      }
    >
      <Form

        className="resgister-form login-form" layout="vertical" form={form} onFinish={(values) => { handleSubmit(values) }}>

        <Form.Item
          name="email" rules={
            [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]} label="Email">
          <Input size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password size="large" />
        </Form.Item>


        <Form.Item >
          <Button loading={loading} type="primary" htmlType="submit" className="login-form-button" shape="round" style={{ border: "none", backgroundColor: "#fe8c00", fontWeight: 500 }}>
            Login
          </Button>
          Or <a onClick={() => {
            if (props.onClickLink) {
              props.onClickLink()
            }
          }} style={{ color: '#1ec1ad' }} href="#">Register now!</a>
        </Form.Item>

      </Form>
    </Modal>

  );
}


const mapStateToProps = state => ({
  member: state.member || {},
});

const mapDispatchToProps = dispatch => {
  return {
    login: (data) => login(data)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
