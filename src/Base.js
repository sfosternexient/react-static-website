import React, {Component, PropTypes} from 'react';

export default class Base extends Component {
  static propTypes = {
    assets: PropTypes.object,
    html: PropTypes.string
  }

  render() {
    let {html, assets} = this.props;

    return (
      <html>
        <head>
          <title>react-static-website</title>
          <meta charSet="UTF-8" />
          {assets.styles.map(style =>
            <link rel="stylesheet" href={style} />
          )}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{__html: html}} />
          {assets.scripts.map(script =>
            <script src={script} />
          )}
        </body>
      </html>
    );
  }
}
