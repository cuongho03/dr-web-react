import React, { useEffect, useState } from 'react'

import './chatbox.scss'
import AOS from 'aos';
import { connect } from 'react-redux';
import { FirebaseSotre } from '../../lib/firebase'
import {
  Form,
  Input,
  Tooltip,
  Select,
  Button,
  Avatar
} from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import ChatMessage from '../ChatBoard'
import { AppString, supportInfo } from './Const'
import serviceMail from '../../services/sendmail'
import moment from 'moment'
import './ChatBoard.css'
import {
  QuestionOutlined, CloseOutlined, UserAddOutlined
} from "@ant-design/icons";
import logo_Final from '../../images/logo_Final_cut.png';
import images from '../Themes/Images'
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 16 },
    sm: { span: 16 },
  },
};

function ChatBox(props) {
  const { member = {} } = props
  useEffect(() => {
    AOS.init();
    const checkExist = localStorage.getItem(AppString.ID)
    if (checkExist && checkExist !== "") {
      handleChangeChat(true)
    }
  }, []);
  const [visibleChatInfo, handleShowModal] = useState(false)
  const [loading, handleChangeLoading] = useState(false)
  const [isChat, handleChangeChat] = useState(false)
  const [form] = Form.useForm();

  function randDarkColor() {
    var lum = -0.25;
    var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var rgb = "#",
      c, i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ("00" + c).substr(c.length);
    }
    return rgb;
  }

  function handleSendMail(Subject, Message, from, to) {
    const data = {
      from,
      to,
      subject: Subject,
      html: Message
    }
    serviceMail.sendMail(data).then(() => {
    })
  }


  function handleGetInfo(data) {
    // Write user info to local
    localStorage.setItem(AppString.ID, data.id)
    localStorage.setItem(
      AppString.NICKNAME,
      data.nickname
    )
    localStorage.setItem(
      AppString.PHOTO_URL,
      data.photoUrl
    )
    localStorage.setItem(
      AppString.ABOUT_ME,
      data.aboutMe
    )
    localStorage.setItem(
      AppString.ROLE,
      data.role || ''
    )
    localStorage.setItem(
      AppString.EMAIL,
      data.email || ''
    )
  }

  async function handleCreateInfo(values) {
    const result = await FirebaseSotre.collection('users').where('email', '==', values.email).get()

    handleChangeLoading(false)
    if (result.docs.length === 0) {
      const newData = {
        id: values.id,
        nickname: values.nickName || '',
        aboutMe: values.aboutMe || '',
        phone: values.phone || '',
        photoUrl: values.photoURL || '',
        email: values.email || '',
        role: '',
        color: randDarkColor()
      }
      FirebaseSotre
        .collection('users')
        .doc(values.id)
        .set(newData)
        .then(() => {
          form.resetFields();

          handleGetInfo(newData)
          setTimeout(() => { handleChangeChat(true) }, 200)
          // handleShowModal(false)

          // const a = document.createElement('a');
          // a.target = "_blank";
          // a.href = `http://localhost:3001/user/${values.id}`;
          // a.click()

        })
    } else {
      form.resetFields();
      const data = result.docs[0].data()
      handleGetInfo(data)
      setTimeout(() => { handleChangeChat(true) }, 200)
    }
  }

  async function handleSubmit(values) {

    console.log(values)
    values.photoURL = ''
    values.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 7)
    const subject = `${values.nickName} try to chat live with you at Genc Health.`
    const content = `<h3>${values.nickName}</h3><div>Email: ${values.email}</div><div> Try to message you at ${moment().format('ll')}</div>`

    handleSendMail(subject, content, values.email, ['philiptranp@gmail.com', 'support@angelo.network', 'cuongseven789@gmail.com'])
    handleCreateInfo(values)



  };

  function handleRenderForm() {
    return (
      <main className="chatbox-panel__main chatbox-panel__main-form" >
        {/* <p className="hidden__mobile">
          Hi, I'm {supportInfo.nickName} ! and you are — ?
      </p> */}
        <Form {...formItemLayout} className="form__info" form={form} onFinish={(values) => { handleSubmit(values) }} >
          <Form.Item name="email"
            rules={
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
            <Input

              value={member.email || ''}
            />
          </Form.Item>

          <Form.Item
            name="nickName"
            rules={
              [{ required: true, message: 'Please input your nickName!', whitespace: true }]
            }
            label={
              <span>
                Nickname

              </span>
            }
          >
            <Input

              value={member.nickName || ''}

            />
          </Form.Item>
          {/* <Form.Item label="Phone Number">

            <Input name="phone" addonBefore={
              <Select defaultValue="1" style={{ width: 70 }}>
                <Option value="1">+1</Option>
                <Option value="84">+84</Option>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
              </Select>
            } style={{ width: '100%' }} />

          </Form.Item>
          <Form.Item label="Company">
            <Input name="aboutMe" style={{ width: '100%' }} />

          </Form.Item> */}
          <Form.Item wrapperCol={{
            xs: { span: 16, offset: 8 },
            sm: { span: 16, offset: 8 },
          }}  >
            <Button loading={loading} type="primary" htmlType="submit" shape="round" style={{ border: "none", backgroundColor: "#fe8c00", fontWeight: 500 }}>
              Start Chat
            </Button>
          </Form.Item>
        </Form>
      </main>
    )
  }

  return (
    <div style={{ position: 'relative', zIndex: 100000 }}>

      <div onClick={() => {
        handleShowModal(!visibleChatInfo)
        const checkExist = localStorage.getItem(AppString.ID)
        if (checkExist && checkExist !== "") {
          const nickName = localStorage.getItem(AppString.NICKNAME)
          const email = localStorage.getItem(AppString.EMAIL)
          const subject = `${nickName} try to chat live with you at Genc Health.`
          const content = `<h3>${nickName}</h3><div>Email: ${email}</div><div> Try to message you at ${moment().format('ll')}</div>`

          handleSendMail(subject, content, email, ['philiptranp@gmail.com', 'support@angelo.network', 'cuongseven789@gmail.com'])
          handleChangeChat(true)
        } else {
          handleChangeChat(isChat)
        }

      }} className={`live-chat ${visibleChatInfo ? 'live-chat__open' : ''}`}
      >

      </div>

      <div className="chat-box">

        <section
          data-aos="fade-up"
          data-aos-offset="200"
          className={`chatbox-panel ${visibleChatInfo ? 'chatbox-panel__open' : ''}`}>
          <header className="chatbox-panel__header">
            <aside style={{ flex: 3 }}>

              <Avatar style={{ color: 'rgb(30, 193, 173)', backgroundColor: '#ffff' }} className="chatbox-popup__avatar" size={48} src={logo_Final} />
            </aside>
            <aside style={{ flex: 6 }}>
              {!isChat ? (<>
                <h1 style={{ textAlign: 'left', color: "#fff" }}>Hi <img height="30px" width="30px" src={images.ic_wave_hand} alt="hand wave" /></h1>
                <h2>
                  {/* We help your business grow by connecting you to your customers. */}
                </h2>
              </>) : (
                  <>
                    <h1 className="second" style={{ textAlign: 'left', color: "#fff" }}>{supportInfo.nickName}</h1> Agent
                     (Online)

                </>)}
            </aside>
            <aside style={{ flex: 3, textAlign: 'right' }}>
              {/* <button className="chat-box__button chatbox-minimize"><i className="fa fa-window-restore" aria-hidden="true" /></button> */}
              <button onClick={() => { handleShowModal(false); handleChangeChat(false) }} className="chat-box__button chatbox-panel-close"><CloseOutlined /></button>
            </aside>
          </header>

          {
            !isChat ? handleRenderForm() : (
              <>
                <div onClick={() => { localStorage.removeItem(AppString.ID); handleChangeChat(false) }} className="chat-box__add__another">
                  <UserAddOutlined />
                  Add another user
                  </div>
                <ChatMessage {...props} currentPeerUser={supportInfo} />
              </>
            )
          }

        </section>
      </div>
    </div>
  )
}
// const WrappedFooter = Form.create({ name: 'Chat_Live' })(ChatBox);


const mapStateToProps = state => ({
  member: state.member || {},
});

export default connect(mapStateToProps, null)(ChatBox);

