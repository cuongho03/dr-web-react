/* eslint-disable no-mixed-operators */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component, } from 'react';
import './index.scss'
import { FirebaseRef } from '../../lib/firebase'
import { Modal, Form, Input, message, Button } from 'antd';
class Subscribe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
    this.id = props.match.params.id
    this.token = props.match.params.token
  }


  componentDidMount() {
    const ref = FirebaseRef.child(`Severice/${this.id}`)

    ref.on('value', snapshot => {
      const data = snapshot.val() || null
      if (data) {

        this.setState({
          data
        })

      }

    })
  }
  componentWillUnmount() {
    const { data } = this.state
    if (!data.view) {
      data.view = 1
    } else {
      data.view += 1
    }

    const ref = FirebaseRef.child(`Severice/${this.id}`)
    ref.set({
      ...data
    })
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
    const { data } = this.state
    if (!data.subscribe) {
      data.subscribe = 1
    } else {
      data.subscribe += 1
    }

    const ref = FirebaseRef.child(`Severice/${this.id}`)
    ref.set({
      ...data
    })


    const Ref = FirebaseRef.push()
    const key = Ref.getKey()
    const ref2 = FirebaseRef.child(`Data/${this.id}/${key}`)
    ref2.set({
      ...values,
      note: ''
    }).then(() => {
      message.success("subscribe successfully, We will connect with you soon!")
      this.handleCancel()
    }).catch((err) => {
      message.error(err.message)
    })


  };
  render() {
    const { data, visible } = this.state
    const typeArray = ['Diagnose at the office', 'Diagnose videos realtime', 'Diagnose audio realtime']

    return (
      <div className="subscribe">
        <div className="pCard_card ">
          <div className="pCard_up" style={{ backgroundImage: `url(${data.imageUrl || ''} )` }}>
            <div className="pCard_text">
              <h2>{data.name || ''}</h2>
              <p>{typeArray[data.typeService || 0]}</p>
            </div>
            <div onClick={() => { this.showModal() }} className="pCard_add"><div className="buttonName">Subscribe</div></div>
          </div>
          <div className="pCard_down">

            <div className="item">
              <p>Price</p>
              <p>{data.price ? `${data.price} $` : 'Free'} </p>
            </div>
            <div className="item">
              <p>Views</p>
              <p>{data.view || 0}</p>
            </div>
            <div className="item">
              <p>Subscribe</p>
              <p>{data.subscribe || 0}</p>
            </div>

            <div style={{ padding: "20px", }}>

              {data.description || ''}

            </div>

          </div>
          {/* <div className="pCard_back">
            <p>See My Latest Work Here</p>
            <a href="#"><i className="fa fa-facebook fa-2x fa-fw" /></a>
            <a href="#"><i className="fa fa-linkedin fa-2x fa-fw" /></a>
            <a href="#"><i className="fa fa-behance fa-2x fa-fw" /></a> <br />
            <a href="#"><i className="fa fa-codepen fa-2x fa-fw" /></a>
            <a href="#"><i className="fa fa-dribbble fa-2x fa-fw" /></a>
            <a href="#"><i className="fa fa-instagram fa-2x fa-fw" /></a>
            <p>Follow Me!</p>
           
          </div> */}
        </div>
        {visible ? (<Modal
          title="Please cofirm your system email"
          visible={visible}
          footer={[]}
          onCancel={this.handleCancel}
        >
          <Form
            layout={"vertical"}
            onFinish={this.onFinish}
          >
            <Form.Item name='name' label="Name" >
              <Input />
            </Form.Item>
            <Form.Item name='email' label="email" rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              }
            ]}>
              <Input />
            </Form.Item>

            <Form.Item style={{ width: "100%", textAlign: 'right', marginBottom: "unset" }} >

              <Button type="primary" htmlType="submit">
                Subscribe
              </Button>
            </Form.Item>
          </Form>

        </Modal>
        ) : null}
      </div>
    );
  }
}

export default Subscribe;
