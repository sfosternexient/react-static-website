import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import {createHistory, createMemoryHistory} from 'history';
import {Router, RoutingContext, match} from 'react-router';

import routes from './routes';

// Client render (browser context)
if (typeof document !== 'undefined') {
  const history = createHistory();
  const root = document.getElementById('root');

  ReactDOM.render(<Router history={history} routes={routes} />, root);
}

// Exported static site renderer (node.js context)
export default (locals, callback) => {
  const Base = require('./Base');

  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({routes, location}, (error, redirectLocation, renderProps) => {
    let html = ReactDOMServer.renderToString(<RoutingContext {...renderProps} />);
    let hash = locals.webpackStats.compilation.hash;

    let assets = {
      scripts: ['/main-' + hash + '.js'],
      styles: ['/main-' + hash + '.css']
    };

    html = ReactDOMServer.renderToString(<Base html={html} assets={assets} />);

    callback(null, '<!DOCTYPE html>' + html);
  });
};
