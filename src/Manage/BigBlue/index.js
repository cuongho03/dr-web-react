/* eslint-disable react/react-in-jsx-scope */
import React, { Component } from 'react'
import "./index.scss"
import { Button, Modal, Form, Input, message, Upload } from 'antd';
import { PullRequestOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { FirebaseRef } from '../../lib/firebase'

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


class BigBlue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      data: {},
      data1: {},
      data2: {}
    }
  }

  componentDidMount() {
    this.fetchData('service', 'data')
    this.fetchData('service-1', 'data1')
    this.fetchData('service-2', 'data2')
  }

  fetchData(id, name) {
    const parentId = localStorage.getItem("id")
    const ref = FirebaseRef.child(`Severice/${id}${parentId}`)

    ref.on('value', snapshot => {
      const data = snapshot.val() || null
      if (data) {

        this.setState({
          [name]: data
        })
      }

    })
  }

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

  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {

    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {

    this.setState({
      visible: false,
    });
  };

  onFinish = values => {
    console.log('Success:', values);
    this.handleCancel()
  };

  render() {

    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl, visible, data, data1, data2 } = this.state;
    const typeArray = ['Diagnose at the office', 'Diagnose videos realtime', 'Diagnose audio realtime']
    return (
      <>
        <div className="bigBlue">
          <div className="bigBlue__full">
            <Button onClick={() => { this.showModal() }} type="primary" shape="round" icon={<PullRequestOutlined />} size={'large'}>
              {'Request services'}
            </Button>
          </div>
          <div className="container-id">

            <div className="product-details">

              <h1> {typeArray[0]}</h1>

              <span className="hint-star star">
                {/* <i style={{ marginRight: '5px' }} class="fa fa-trophy" aria-hidden="true"></i> */}
                <p className={`bigBlue__status ${data.status === 'Publish' ? 'bigBlue__status-2' : ''}  `}>
                  {data.status || 'Unpublish'}
                </p>

              </span>

              <p className="information">  {data.description || '"Instead of Googling symptoms to when feeling an ailment and landing on an incorrect diagnosis, AI could soon provide accurate diagnosis without needing to go to a doctor’s office.  "'}</p>

              <div className="control">

                <button onClick={() => { this.props.history.push("/services/service") }} className="btn">

                  <span className="price"> {data.price || '10'} $</span>

                  <span className="shopping-cart"><i className="fa fa-pencil-square-o" aria-hidden="true" /></span>

                  <span className="buy">Edit</span>
                </button>

              </div>
            </div>

            <div className="product-image">
              <img className="bigBlue__img" src={data.imageUrl || "https://www.aiin.healthcare/sites/default/files/styles/media_image_mobile/public/2018-08/istock-968845148_super.jpg?itok=6NwYsETO"} alt="Omar Dsoky" />

              <div className="info">
                <h2>The Description</h2>
                <ul>
                  <li><strong>Name: </strong>{data.name || "Your service' name"}</li>
                  <li><strong>Type: </strong>{data.typeService || 'Diagnose at the office'}</li>
                  <li><strong>Price: </strong>{data.price || '10'} $</li>
                  <li><strong>Status: </strong>{data.status || 'Unpublish'} </li>
                  <li><strong>Description: </strong>{data.description || '"Instead of Googling symptoms to when feeling an ailment and landing on an incorrect diagnosis, AI could soon provide accurate diagnosis without needing to go to a doctor’s office.  "'}</li>

                </ul>
              </div>
            </div>

          </div>

          {/*  -----------------------------------  */}
          <div className="container-id">

            <div className="product-details">

              <h1> {typeArray[1]}</h1>

              <span className="hint-star star">
                {/* <i style={{ marginRight: '5px' }} class="fa fa-trophy" aria-hidden="true"></i> */}
                <p className={`bigBlue__status ${data1.status === 'Publish' ? 'bigBlue__status-2' : ''}  `}>
                  {data1.status || 'Unpublish'}
                </p>

              </span>

              <p className="information">  {data1.description || 'Telemedicine visits can be conducted over video or on the phone. To schedule a visit, call your physician’s office and see what options are available. Small offices and large health systems alike are rapidly moving to telemedicine right now.  '}</p>

              <div className="control">

                <button onClick={() => { this.props.history.push("/services/service-1") }} className="btn">

                  <span className="price"> {data1.price || '20'} $</span>

                  <span className="shopping-cart"><i className="fa fa-pencil-square-o" aria-hidden="true" /></span>

                  <span className="buy">Edit</span>
                </button>

              </div>
            </div>

            <div className="product-image">
              <img className="bigBlue__img" src={data1.imageUrl || "https://i.pcmag.com/imagery/articles/02uZJvJt1e1yAGIr8FMvcb4-1.fit_scale.size_2698x1517.v1585249525.jpg"} alt="Omar Dsoky" />

              <div className="info">
                <h2>The Description</h2>
                <ul>
                  <li><strong>Name: </strong>{data1.name || "Your service name"}</li>
                  <li><strong>Type: </strong>{data1.typeService || 'Diagnose videos realtime '}</li>
                  <li><strong>Price: </strong>{data1.price || '20'} $</li>
                  <li><strong>Status: </strong>{data1.status || 'Unpublish'} </li>
                  <li><strong>Description: </strong> {data1.description || 'Telemedicine visits can be conducted over video or on the phone. To schedule a visit, call your physician’s office and see what options are available. Small offices and large health systems alike are rapidly moving to telemedicine right now.  '}</li>

                </ul>
              </div>
            </div>

          </div>


          {/*  -----------------------------------  */}
          <div className="container-id">

            <div className="product-details">

              <h1>{typeArray[2]}</h1>

              <span className="hint-star star">
                {/* <i style={{ marginRight: '5px' }} class="fa fa-trophy" aria-hidden="true"></i> */}
                <p className={`bigBlue__status ${data2.status === 'Publish' ? 'bigBlue__status-2' : ''}  `}>
                  {data2.status || 'Unpublish'}
                </p>

              </span>

              <p className="information">  {data2.description || 'IXL’s Real-Time Diagnostic is an adaptive assessment tool that provides an accurate, up-to-the-minute portrait of each and every student. By answering questions in the Real-Time Diagnostic, students can pinpoint their current levels of knowledge in math and language arts (overall and in specific strands), plus their reading level.  '}</p>

              <div className="control">

                <button onClick={() => { this.props.history.push("/services/service-2") }} className="btn">

                  <span className="price"> {data2.price || '30'} $</span>

                  <span className="shopping-cart"><i className="fa fa-pencil-square-o" aria-hidden="true" /></span>

                  <span className="buy">Edit</span>
                </button>

              </div>
            </div>

            <div className="product-image">
              <img className="bigBlue__img" src={data2.imageUrl || "https://academy.avast.com/hubfs/New_Avast_Academy/How%20to%20Update%20Your%20Audio%20Drivers%20in%20Windows%2010,%208,%207/new/How_to_update_audio_drivers-Hero.png"} alt="Omar Dsoky" />

              <div className="info">
                <h2>The Description</h2>
                <ul>
                  <li><strong>Name: </strong>{data2.name || "Your service name"}</li>
                  <li><strong>Type: </strong>{data2.typeService || 'Diagnose audio realtime'}</li>
                  <li><strong>Price: </strong>{data2.price || '30'} $</li>
                  <li><strong>Status: </strong>{data2.status || 'Unpublish'} </li>
                  <li><strong>Description: </strong> {data2.description || 'IXL’s Real-Time Diagnostic is an adaptive assessment tool that provides an accurate, up-to-the-minute portrait of each and every student. By answering questions in the Real-Time Diagnostic, students can pinpoint their current levels of knowledge in math and language arts (overall and in specific strands), plus their reading level.  '}</li>

                </ul>
              </div>
            </div>

          </div>


        </div>

        {visible ? (<Modal
          title="Request services"
          visible={visible}
          footer={[]}
          onCancel={this.handleCancel}
        >
          <Form
            layout={"vertical"}
            onFinish={this.onFinish}

          >
            <Form.Item name='image' label="Sevice's Image">
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

            <Form.Item
              label="Service name"
              name="name"
              rules={[{ required: true, message: 'Please input your Service name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name='description' label="Description" rules={[{ required: true, message: 'Please input your Service Description' }]}>
              <Input.TextArea />
            </Form.Item>

            <Form.Item style={{ width: "100%", textAlign: 'right', marginBottom: "unset" }} >
              <Button onClick={this.handleCancel} style={{ marginRight: 10 }}>
                Cancle
              </Button>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>

        </Modal>
        ) : null}
      </>
    );
  }
}

export default BigBlue;
