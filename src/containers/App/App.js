import React, {Component, PropTypes} from 'react';
import {Header} from 'components';
import articles from 'articles';

const model = {articles};

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <div>
        <Header articles={model.articles} />
        {React.cloneElement(this.props.children, {model})}
      </div>
    );
  }
}
