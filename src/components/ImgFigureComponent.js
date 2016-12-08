'use strict';

import React from 'react';

require('styles/ImgFigure.scss');

class ImgFigureComponent extends React.Component {
  render() {
    let styleObj = {};

    // 如果props属性中指定了这张图片的位置，则使用
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }
    return (
      <figure className="img-figure">
        <img src={this.props.data.imageURL} alt={this.props.data.title} />
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
}

ImgFigureComponent.displayName = 'ImgFigureComponent';

// Uncomment properties you need
// ImgFigureComponent.propTypes = {};
// ImgFigureComponent.defaultProps = {};

export default ImgFigureComponent;
