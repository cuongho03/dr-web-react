/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { connect } from "react-redux"
import './App.css';
import 'antd/dist/antd.css';
import Resgister from "./pages/Resgister"
import Home from "./../src/Manage/Home"
import LiveChat from './../src/Manage/LiveChat'
import Profile from './../src/Manage/Profile'
import BigBlue from './../src/Manage/BigBlue'
import Service from './../src/Manage/Service'
import Layout from './../src/Manage/Layout'
import Subscribe from './../src/pages/Subscribe'
import { toast, ToastContainer } from 'react-toastify'


class App extends Component {

  showToast(type, message) {
    // 0 = warning, 1 = success
    switch (type) {
      case 0:
        toast.warning(message)
        break
      case 1:
        toast.success(message)
        break
      default:
        break
    }
  }


  render() {
    const { member = {} } = this.props
    const { isUserLoggedIn } = member
    return (
      <Router>
        <Switch>
          {isUserLoggedIn ? (<Route exact path="/live-chat" component={(props) => <Layout {...props} logout={() => { }} member={member} Component={LiveChat} active="2" />} />) : null}
          {isUserLoggedIn ? (<Route exact path="/profile" component={(props) => <Layout {...props} logout={() => { }} member={member} Component={Profile} active="3" />} />) : null}
          {isUserLoggedIn ? (<Route exact path="/recordings" component={(props) => <Layout {...props} logout={() => { }} member={member} Component={BigBlue} active="4" />} />) : null}
          {isUserLoggedIn ? (<Route exact path="/services" component={(props) => <Layout {...props} logout={() => { }} member={member} Component={BigBlue} active="5" />} />) : null}
          {isUserLoggedIn ? (<Route exact path="/services/:id" component={(props) => <Layout {...props} logout={() => { }} member={member} Component={Service} active="5" />} />) : null}
          <Route exact path="/subscribe/:id/:token" component={Subscribe} />
          {isUserLoggedIn ? (<Route exact path="/" component={(props) => <Layout {...props} showToast={(type, message) => this.showToast(type, message)} logout={() => { }} member={member} Component={Home} active="1" />} />) : (<Route exact path="/" component={Resgister} />)}

          <Route component={Resgister} />
        </Switch>
      </Router>

    );
  }
}
const mapStateToProps = state => ({
  member: state.member || {},
});

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
