import React from 'react';
import {Link} from 'react-router';

require('./home.scss');

export default class Home extends React.Component {

  render() {
    return (
      <div className="homepage">
        <p>
          Yo check out <Link to="item">item</Link>
        </p>
      </div>
    );
  }

}
