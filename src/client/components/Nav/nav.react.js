import React from 'react';

require('./nav.scss');

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMenuHidden: true }
  }

  onClick() {
    this.setState({ isMenuHidden: !this.state.isMenuHidden })
  }

  render() {
    let navigationMenuClass = 'navigation-menu' + ' ' + (this.state.isMenuHidden ? 'hidden' : 'show');

    return (
      <header className="navigation" role="banner">
        <div className="navigation-wrapper">
          <a href="javascript:void(0)" className="logo">
            <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/placeholder_logo_1.png" alt="Logo Image" />
          </a>
          <a href="javascript:void(0)" className='navigation-menu-button' onClick={() => this.onClick()}>MENU</a>
          <nav role="navigation">
            <ul className={navigationMenuClass}>
              <li className="nav-link"><a href="javascript:void(0)">Products</a></li>
              <li className="nav-link"><a href="javascript:void(0)">About Us</a></li>
              <li className="nav-link"><a href="javascript:void(0)">Contact</a></li>
            </ul>
          </nav>
          <div className="navigation-tools">
            <a href="javascript:void(0)" className="sign-up">Sign Up</a>
          </div>
        </div>
      </header>
    )
  }
}
