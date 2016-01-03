import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {App, About, Article, Home} from 'containers';

// NOTE: If you change the routes, please also update
// the list of routes in `webpack.config.js` (look for `BASE_PATHS`).

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="about" component={About} />
    <Route path="articles/:slug" component={Article} />
    <Route path="*" component={Home} />
  </Route>
);
