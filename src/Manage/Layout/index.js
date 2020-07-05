
import React, { Component } from 'react'
import { Layout, Menu, Tooltip, Avatar, Badge } from 'antd';
import { HomeOutlined, MenuOutlined, MenuFoldOutlined, WechatOutlined, UserOutlined, CloudServerOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import logo_Final from '../../images/logo_Final_cut.png';
import { FirebaseRef } from '../../lib/firebase'
import './layout.scss'

const { Header, Sider, Content } = Layout;

class LayoutManage extends Component {
  constructor(props) {
    super(props)
    const hostName = window.location.hostname
    const arrayHost = hostName.split(".")
    this.state = {
      collapsed: window.innerWidth < 768 || false,
      docterList: [],
      name: arrayHost[0]
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount() {
    const { member } = this.props
    let ref = FirebaseRef.child(`/notifyDocter`)
    ref.on('value', snapshot => {
      const data = snapshot.val()

      if (data && typeof (data) === 'object') {
        let newData = []
        Object.keys(data).forEach(key => {
          if (data[key] && data[key].status === 'pending' && data[key].userShare === member.id) {
            newData.push({
              ...data[key],
              id: key,
            })
          }
        })
        const newArray = newData.reverse()

        this.setState({
          docterList: newArray
        })
      }
    })
  }


  render() {
    const { Component, history, member, active } = this.props
    const { docterList, name } = this.state
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo logoImg-admin" >
            <Link to={"/"}><img src={logo_Final} alt="Angelo Network" width="70" height="70" style={{ marginBottom: "20px", marginLeft: "10px" }} /></Link>
            {/* <span className="layout-text">Manage</span> */}
          </div>
          <Menu theme="dark" mode="inline" selectedKeys={[active]}>

            <Menu.Item onClick={() => { history.push('/live-chat') }} key="2">
              <WechatOutlined type="wechat" />

              <span>Live Chat</span>
            </Menu.Item>
            <Menu.Item onClick={() => { history.push('/') }} key="1">
              <HomeOutlined />
              <span>Notify</span>
            </Menu.Item>
            <Menu.Item onClick={() => { window.open('http://live.genchealth.com', '_blank'); }} key="4">
              <AppstoreAddOutlined />
              <span>Application</span>
            </Menu.Item>
            <Menu.Item onClick={() => { history.push('/services') }} key="5">
              <CloudServerOutlined />
              <span>Services</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, display: 'flex', alignItems: 'center' }}>
            {
              this.state.collapsed ? (<MenuOutlined className="trigger" onClick={this.toggle}></MenuOutlined>) : (<MenuFoldOutlined onClick={this.toggle} className="trigger"></MenuFoldOutlined>)
            }

            <div style={{ width: '100%', textAlign: 'right', marginRight: '20px', cursor: 'pointer' }}>
              <span onClick={() => { history.push('/') }} style={{ marginRight: '10px' }}>
                <Badge count={docterList.length}>
                  <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </Badge>
              </span>
              <span onClick={() => {
                //  window.localStorage.removeItem('isUserLoggedIn'); 
                history.push('/profile');
              }}>
                <Tooltip title="Profile">Hi, {name || ''}  </Tooltip>
              </span>

            </div>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: '100vh',
            }}
          >
            <Component {...this.props} member={member} />
          </Content>

        </Layout>
      </Layout >
    );
  }
}

export default LayoutManage;