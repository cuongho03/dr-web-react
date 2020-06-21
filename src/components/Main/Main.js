import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { myFirebase, myFirestore, FirebaseRef } from '../../lib/firebase'
import Loader from '../Loader'
import WelcomeBoard from '../WelcomeBoard/WelcomeBoard'
import './Main.css'
import ChatBoard from './../ChatBoard/ChatBoard'
import { AppString, supportInfo } from './../ChatBox/Const'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isOpenDialogConfirmLogout: false,
      currentPeerUser: null
    }

    this.currentUserId = props.member.id
    this.currentUserAvatar = supportInfo.photoUrl
    this.currentUserNickname = supportInfo.nickName
    this.currentUserRole = supportInfo.role
    this.listUser = []
  }

  componentDidMount() {
    this.checkLogin()
  }

  checkLogin = () => {
    this.getListUser()
  }

  getListUser = async () => {
    const { member } = this.props
    let ref = FirebaseRef.child(`/notifyDocter`)
    ref.on('value', snapshot => {
      const data = snapshot.val()

      if (data && typeof (data) === 'object') {
        let newData = []
        Object.keys(data).forEach(key => {
          if (data[key] && data[key].userShare === member.id) {
            const index = newData.findIndex(item => item.id === data[key].userId)
            if (index === -1) {
              newData.push({
                ...data[key],
                id: data[key].userId,
                nickname: data[key].nickname || 'unknow',
                photoUrl: '',
                aboutMe: '',
                color: data[key].color || 'black'
              })
            }

          }
        })
        const newArray = newData.reverse()

        if (newArray.length > 0) {
          this.listUser = [...newArray]
        }
        this.setState({ isLoading: false })
      } else {
        this.setState({ isLoading: false })
      }
    })

  }

  onLogoutClick = () => {
    this.setState({
      isOpenDialogConfirmLogout: true
    })
  }

  doLogout = () => {
    this.setState({ isLoading: true })
    myFirebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ isLoading: false }, () => {
          localStorage.clear()
          this.props.showToast(1, 'Logout success')
          this.props.history.push('/')
        })
      })
      .catch(function (err) {
        this.setState({ isLoading: false })
        this.props.showToast(0, err.message)
      })
  }

  hideDialogConfirmLogout = () => {
    this.setState({
      isOpenDialogConfirmLogout: false
    })
  }

  onProfileClick = () => {
    this.props.history.push('/profile')
  }

  renderListUser = () => {
    if (this.listUser.length > 0) {
      let viewListUser = []
      this.listUser.forEach((item, index) => {
        if (item.id !== this.currentUserId) {

          if (this.currentUserRole && this.currentUserRole !== '') {

            viewListUser.push(
              <button
                key={index}
                className={
                  this.state.currentPeerUser &&
                    this.state.currentPeerUser.id === item.id
                    ? 'viewWrapItemFocused'
                    : 'viewWrapItem'
                }
                onClick={() => {
                  this.setState({ currentPeerUser: item })
                }}
              >
                <div
                  className="viewAvatarItem viewAvatarItem-Second"
                  style={{ backgroundColor: item.color || 'black' }}
                >
                  {item.nickname.toUpperCase().substring(0, 1)}
                </div>
                <div className="viewWrapContentItem">
                  <span className="textItem">{`Nickname: ${
                    item.nickname
                    }`}</span>
                  <span className="textItem">{`About me: ${
                    item.aboutMe ? item.aboutMe : 'Not available'
                    }`}</span>
                </div>
              </button>
            )
          } else if (item.role) {
            viewListUser.push(
              <button
                key={index}
                className={
                  this.state.currentPeerUser &&
                    this.state.currentPeerUser.id === item.id
                    ? 'viewWrapItemFocused'
                    : 'viewWrapItem'
                }
                onClick={() => {
                  this.setState({ currentPeerUser: item })
                }}
              >
                <div
                  className="viewAvatarItem viewAvatarItem-Second"
                  style={{ backgroundColor: item.color || 'black' }}
                // src={item.photoUrl && item.photoUrl !== '' ? item.photoUrl : '/assets/img/avatar.png'}
                // alt="icon avatar"
                >
                  {item.nickname.toUpperCase().substring(0, 1)}
                </div>
                <div className="viewWrapContentItem">
                  <span className="textItem">{`Nickname: ${
                    item.nickname
                    }`}</span>
                  <span className="textItem">{`About me: ${
                    item.aboutMe ? item.aboutMe : 'Not available'
                    }`}</span>
                </div>
              </button>
            )
          }

        }
      })
      return viewListUser
    } else {
      return null
    }
  }

  render() {
    return (
      <div>

        {/* Body */}
        <div className="body">
          <div className="viewListUser"> {this.renderListUser()}</div>
          <div className="viewBoard">
            {this.state.currentPeerUser ? (
              <ChatBoard
                currentPeerUser={this.state.currentPeerUser}
                showToast={this.props.showToast}
              />
            ) : (
                <WelcomeBoard
                  currentUserNickname={this.currentUserNickname}
                  currentUserAvatar={this.currentUserAvatar}
                />
              )}
          </div>
        </div>

        {/* Dialog confirm */}
        {this.state.isOpenDialogConfirmLogout ? (
          <div className="viewCoverScreen">
            {this.renderDialogConfirmLogout()}
          </div>
        ) : null}

        {/* Loading */}
        {this.state.isLoading ? (
          <Loader show={true} />
        ) : null}
      </div>
    )
  }

  renderDialogConfirmLogout = () => {
    return (
      <div>
        <div className="viewWrapTextDialogConfirmLogout">
          <span className="titleDialogConfirmLogout">Are you sure to logout?</span>
        </div>
        <div className="viewWrapButtonDialogConfirmLogout">
          <button className="btnYes" onClick={this.doLogout}>
            YES
                    </button>
          <button className="btnNo" onClick={this.hideDialogConfirmLogout}>
            CANCEL
                    </button>
        </div>
      </div>
    )
  }
}

export default withRouter(Main)
