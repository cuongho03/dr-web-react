import React, { PureComponent } from 'react';
import {
  Spin,
} from 'antd';
import './loader.scss'

class Loader extends PureComponent {
  render() {
    const { show } = this.props;

    if (show) {
      return (
        <div className="loader">
          <div className="loader__container">
            <Spin />
          </div>
        </div>
      )
    };
    return '';
  }
}

export default Loader;
