import React from 'react';
import {Link} from 'react-router';
import Navbar from '../../components/Nav/nav.react.js'

require('./home.scss');

export default class Home extends React.Component {

  learnMoreClick(event, el) {
    console.log(event)
    console.log(el)
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="device-background">
          <div className="device-text">
            <h4>This is my product</h4>
            <p>Product description</p>
            <button onClick={(e, l) => this.learnMoreClick(e, l)}>Learn More</button>
          </div>
          <div className="device">
            <div className="screen"></div>
          </div>
        </div>
      </div>
    );
  }

}
