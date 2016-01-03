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
        <span> - Articles: </span>
        {articles.map(article =>
          <Link key={article.slug} to={`/articles/${article.slug}`}>{article.name} </Link>
        )}
      </div>
    );
  }
}
