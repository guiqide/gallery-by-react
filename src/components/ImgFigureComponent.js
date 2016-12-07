'use strict';

import React from 'react';

require('styles/ImgFigure.scss');

class ImgFigureComponent extends React.Component {
  render() {
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
