import React, {Component, PropTypes} from 'react';

export default class About extends Component {
  static propTypes = {
    params: PropTypes.object,
    model: PropTypes.object
  }

  render() {
    let {params, model} = this.props;
    let article = model.articles.filter(cur => cur.slug === params.slug)[0];

    return (
      <div>
        {article.content}
      </div>
    );
  }
}
