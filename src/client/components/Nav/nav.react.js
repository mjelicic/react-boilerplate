import React from 'react';

require('./nav.scss');

export default class Navbar extends React.Component {

  //$(document).ready(function() {
  //  var menuToggle = $('#js-mobile-menu').unbind();
  //  $('#js-navigation-menu').removeClass("show");

  onClick (event) {
    event.preventDefault();
    alert(event)
  }

    //menuToggle.on('click', function(e) {
    //  e.preventDefault();
    //  $('#js-navigation-menu').slideToggle(function(){
    //    if($('#js-navigation-menu').is(':hidden')) {
    //      $('#js-navigation-menu').removeAttr('style');
    //    }
    //  });
    //});
  //});


  render() {
    return (
      <header className="navigation" role="banner">
        <div className="navigation-wrapper">
          <a href="javascript:void(0)" className="logo">
            <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/placeholder_logo_1.png" alt="Logo Image" />
          </a>
          <a href="javascript:void(0)" className="navigation-menu-button" onclick="{(event) => onClick(event)}">MENU</a>
          <nav role="navigation">
            <ul className="navigation-menu show">
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
