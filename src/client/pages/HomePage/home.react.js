import React from 'react';
import {Link} from 'react-router';
import Navbar from '../../components/Nav/nav.react.js'

require('./home.scss');

export default class Home extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <div className="device-background">
          <div clasçsName="device-text">
            <h4>This is my product</h4>
            <p>Product description</p>
            <button>Learn More</button>
          </div>
          <div className="device">
            <div className="screen"></div>
          </div>
        </div>
      </div>
    );
  }

}
