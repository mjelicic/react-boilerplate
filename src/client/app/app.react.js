import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link, RouteHandler} from 'react-router';
import {state} from '../state';

export default class App extends React.Component {

  componentDidMount() {
    // Must be required here because there is no DOM in Node.js. Remember,
    // mocking DOM in Node.js is an anti-pattern, because it can confuse
    // isomorphic libraries. TODO: Wait for iOS fix, then remove.
    // http://developer.telerik.com/featured/300-ms-click-delay-ios-8/
    require('fastclick').attach(document.body);

    state.on('change', () => {
      /*eslint-disable no-console */
      console.time('whole app rerender');
      this.forceUpdate(() => {
        console.timeEnd('whole app rerender');
      });
      /*eslint-enable */
    });
  }

  render() {
    return (
      <DocumentTitle title='React Boostrap'>
        <div className="page">
          <RouteHandler />
        </div>
      </DocumentTitle>
    );
  }

}
