require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import ImgFigure from './ImgFigureComponent';
// 获取图片相关信息, 当使用babel的语法加载json，有时会出问题
import imageDatasJson from '../data/imageDatas.json';
// let imageDatas = require('../data/imageDatas.json');

// 利用IIFE，通过图片名信息生成出图片URL路径信息
let imageDatas = (function genImageURL(imageDatasArr) {
  for (var i = 0; i < imageDatasArr.length; i++) {
    var singleImageData = imageDatasArr[i];

    singleImageData.imageURL = require('../images/' + singleImageData.fileName);

    imageDatasArr[i] = singleImageData;
  }

  return imageDatasArr;
})(imageDatasJson);

class AppComponent extends React.Component {
  constructor() {
    super();
    this.Constant = {
      centerPos: {
        left: 0,
        right: 0
      },
      hPosRange: { // 水平方向的取值范围
        leftSecX: [0, 0],
        rightSecY: [0,0],
        y: [0, 0]
      },
      vPosRange: { // 垂直方向的取值范围
        x: [0, 0],
        topY: [0, 0]
      }
    };
  }
  componentDidMount() {
    // 首先拿到舞台的大小
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);

    // 拿到一个imageFigure的大小
    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
      imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);

    // 计算中心图片的位置点
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }

  }
  render() {
    let controllerUnits = [],
      imgFigures = [];

    imageDatas.forEach(function(value, index) {
      imgFigures.push(<ImgFigure data={value} ref = {`imgFigure{index}`} />);
    });
    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent
