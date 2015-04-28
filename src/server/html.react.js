import PureComponent from '../client/components/purecomponent.react';
import React from 'react';

export default class Html extends PureComponent {

  render() {
    // Only for production. For dev, it's handled by webpack with livereload.
    const linkStyles = this.props.isProduction &&
      <link
        href={`${this.props.cdnHost}${this.props.version}/app.css`}
        rel="stylesheet"
      />;

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
          {linkStyles}
        </head>
        <body dangerouslySetInnerHTML={{__html: this.props.bodyHtml}} />
      </html>
    );
  }

}

Html.propTypes = {
  bodyHtml: React.PropTypes.string.isRequired,
  version: React.PropTypes.string.isRequired
};
