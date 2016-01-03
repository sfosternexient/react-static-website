import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {App, About, Article, Home} from 'containers';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="about" component={About} />
    <Route path="articles/:slug" component={Article} />
    <Route path="*" component={Home}/>
  </Route>
);
