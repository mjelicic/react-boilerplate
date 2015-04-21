import React from 'react';
import App from './app/app.react';
import Home from './pages/HomePage/home.react';
import Item from './pages/Item/item.react';
import {DefaultRoute, NotFoundRoute, Route} from 'react-router';

export default (
  <Route handler={App} path="/">
    <DefaultRoute handler={Home} name="home" />
    <Route handler={Item} name="item" />
  </Route>
);
