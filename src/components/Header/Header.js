import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import './Header.scss';

export default class Header extends Component {
  static propTypes = {
    articles: PropTypes.array
  }

  render() {
    let {articles} = this.props;
    return (
      <div className="Header">
        <Link to="/">Home</Link>
        <span> - </span>
        <Link to="/about">About</Link>
        <br />
        <br />
        <span>Articles: </span>
        {articles.map(article =>
          <div key={article.slug}>
            <Link to={`/articles/${article.slug}`}>{article.name} </Link>
          </div>
        )}
      </div>
    );
  }
}
