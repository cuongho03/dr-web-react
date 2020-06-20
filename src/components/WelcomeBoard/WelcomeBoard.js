import React, { Component } from 'react'
import './WelcomeBoard.css'

export default class WelcomeBoard extends Component {
  render() {
    return (
      <div className="viewWelcomeBoard">
        <span className="textTitleWelcome">{`Welcome, ${
          this.props.currentUserNickname
          }`}</span>
        <img
          className="avatarWelcome"

          src={this.props.currentUserAvatar && this.props.currentUserAvatar !== '' ? this.props.currentUserAvatar : '/assets/img/avatar.png'}
          alt="icon avatar"
        />
        <span className="textDesciptionWelcome">
          Let's start talking for Genchealth Support.
        </span>
      </div>
    )
  }
}
