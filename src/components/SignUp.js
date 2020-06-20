/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import {
  Form,
  Input,
  Modal,
  Button,
  message
} from 'antd';
import { signUp } from '../actions/member'
import { connect } from 'react-redux';
function SignUp(props) {

  const [form] = Form.useForm();
  const [loading, handleChangeLoading] = useState(false)




  function handleSubmit(values) {

    props.signUp(values).then((result) => {
      const { isSuccess, err } = result
      if (isSuccess) {
        message.success("You have been register account success !")
        props.handleResgiterSuccess()
      } else {
        message.warn(err)
      }
      form.resetFields();
      handleChangeLoading(false)

    })

  };

  return (
    <Modal
      title="Create your GenC Space"
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

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <Form.Item >
          <Button loading={loading} type="primary" htmlType="submit" className="login-form-button" shape="round" style={{ border: "none", backgroundColor: "#fe8c00", fontWeight: 500 }}>
            Register
          </Button>
          Or <a onClick={() => {
            if (props.onClickLink) {
              props.onClickLink()
            }
          }} style={{ color: '#1ec1ad' }} href="#">Login now!</a>
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
    signUp: (data) => signUp(data)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
