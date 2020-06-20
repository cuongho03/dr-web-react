/* eslint-disable no-mixed-operators */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import './home.scss'


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titleFolder: "Public Files",
      expanStaus: false,
      data: [],
      privacyShow: false,
      isPublic: true,
      visible: false,
      toggle: true,
      isOpenPrivate: false,
      photoIndexPrivate: 0,
      isOpenPublic: false,
      photoIndexPublic: 0,
      itemEdit: {},
      showEdit: false,
      accessLog: false,
      emailLink: false,
      userList: [],
      userShare: null,
      showAdd: false,
      description: '',
    }
    this.title = props.match.params.folder
  }



  render() {

    return (
      <div className="">
        fsfs

      </div>
    );
  }
}

export default Home;
