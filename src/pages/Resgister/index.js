/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react"
import SignUp from "../../components/SignUp"
import Login from "../../components/Login"
import { connect } from "react-redux"
import "./index.scss"

class Resgister extends Component {
  constructor(props) {
    super(props)
    const { member = {} } = props
    console.log(props)
    const { isExistUser } = member
    this.state = {
      isLogin: isExistUser,
    }
  }
  componentDidMount() {
    var myWindow = document.getElementById('window');

    myWindow.style.width = window.innerWidth + "px";
    myWindow.style.height = window.innerHeight + "px";
    window.onresize = function () {

      myWindow.style.width = window.innerWidth + "px";
      myWindow.style.height = window.innerHeight + "px";
    }
  }
  render() {
    const { isLogin } = this.state
    return (

      <div className="App Upload">
        <div id="window" className="window">


          <div className="clearfix" />
          <div className="container resgister">
            {
              isLogin ? (
                <Login onClickLink={() => {
                  this.setState({
                    isLogin: false
                  })
                }}
                  handleLoginSuccess={() => { this.props.history.push("/") }} />
              ) :
                (
                  <SignUp
                    onClickLink={() => {
                      this.setState({
                        isLogin: true
                      })
                    }}
                    handleResgiterSuccess={() => { this.props.history.push("/") }} />
                )
            }


          </div>
        </div>
      </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Resgister)

