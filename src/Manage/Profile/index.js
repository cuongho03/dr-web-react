/* eslint-disable no-template-curly-in-string */
/* eslint-disable react/react-in-jsx-scope */
import React, { Component } from 'react'
import { Upload, message, Form, Input, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}




class Avatar extends Component {
  state = {
    loading: false,
  };

  onFinish = values => {
    console.log(values);
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <>
        <div classNam="row">
          <div className="col col-md-6">
            <h2>Change your password</h2>
            <Form style={{ maxWidth: "500px", marginTop: "20px", marginBottom: "20px" }} layout="vertical" onFinish={(values) => { this.onFinish(values) }} validateMessages={validateMessages}>
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
                <Input.Password />
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
                <Input.Password />
              </Form.Item>
              <Form.Item >
                <Button shape="round" style={{ border: "none", backgroundColor: "#fe8c00", fontWeight: 500 }} type="primary" htmlType="submit">
                  Submit
            </Button>
              </Form.Item>
            </Form>
          </div>

          <div className="col col-md-6">
            <h2>Update your profile</h2>
            <Form style={{ maxWidth: "500px", marginTop: "20px", marginBottom: "20px" }} layout="vertical" onFinish={(values) => { this.onFinish(values) }} validateMessages={validateMessages}>
              <Form.Item >
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                >
                  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
              </Form.Item>
              <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name={['user', 'introduction']} label="Introduction">
                <Input.TextArea />
              </Form.Item>
              <Form.Item >
                <Button shape="round" style={{ border: "none", backgroundColor: "#fe8c00", fontWeight: 500 }} type="primary" htmlType="submit">
                  Submit
            </Button>
              </Form.Item>
            </Form>
          </div>

        </div>



      </>
    );
  }
}

export default Avatar;
