import React, { Component } from 'react'
import Main from '../../components/Main/Main'
class LiveChat extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <Main {...this.props} />
    )
  }

}
export default LiveChat