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

/**
 * 获取区间内的一个随机值
 */
function getRangeRandom(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}

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
        rightSecY: [0, 0],
        y: [0, 0]
      },
      vPosRange: { // 垂直方向的取值范围
        x: [0, 0],
        topY: [0, 0]
      }
    };
    this.state = {
      imgsArrangeArr: [] // 图片的坐标
    }
  }
    /**
   * 重新布局所有图片
   * @param centerIndex 指定居中排布哪个图片
   */
  rearrange(centerIndex) {
    let imgsArrangeArr = this.state.imgsArrangeArr,
      Constant = this.Constant,
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      vPosRange = Constant.vPosRange,
      hPosRangeLeftSecX = hPosRange.leftSecX,
      hPosRangeRightSecX = hPosRange.rightSecX,
      hPosRangeY = hPosRange.y,
      vPosRangeTopY = vPosRange.topY,
      vPosRangeX = vPosRange.x,

      imgsArrangeTopArr = [],
      topImgNum = Math.ceil(Math.random() * 2), // 取一个或者不取
      topImgSpliceIndex = 0,
      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

      // 居中centerIndex的图片
      imgsArrangeCenterArr[0].pos = centerPos;

      // 取出要布局上侧的图片的状态信息
      topImgSpliceIndex = Math.ceil(Math.random() * imgsArrangeArr.length - topImgNum);
      imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

      // 布局上侧的图片
      imgsArrangeTopArr.forEach(function(value, index) {
        imgsArrangeTopArr[index].pos = {
          top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
          left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
        }
      })

      // 布局左右两侧的图片
      for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
        let hPosRangeLORX = null;

        // 前半部分布局左边，右半部分布局右边
        if (i < k) {
          hPosRangeLORX = hPosRangeLeftSecX;
        } else {
          hPosRangeLORX = hPosRangeRightSecX;
        }

        imgsArrangeArr[i].pos = {
          top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
          left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
        }
      }

      if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
        imgsArrangeArr.splice(topImgSpliceIndex, 0,  imgsArrangeTopArr[0])
      }

      imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
      
      this.setState({
        imageDatasArr: imgsArrangeArr
      })
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
    };

    this.Constant.hPosRange.leftSecX[0] = -halfImgW; // 左起点
    this.Constant.hPosRange.leftSecX[1] = halfStageW - imgW * 3; // 左终点

    this.Constant.hPosRange.rightSecY[0] = halfStageW + halfImgW; // 右起点
    this.Constant.hPosRange.rightSecY[1] = stageW - halfImgW; // 右终点

    this.Constant.hPosRange.y[0] = -halfImgH; // 左右区域的上起点
    this.Constant.hPosRange.y[1] = stageH - halfImgH; // 左右区域的上终点

    // 中上部
    this.Constant.vPosRange.topY[0] = -halfImgH; // 上起点
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3; // 上终点
    this.Constant.vPosRange.x[0] = halfImgW - imgW;
    this.Constant.vPosRange.x[1] = halfImgW;

    this.rearrange(0);
  }
  render() {
    let controllerUnits = [],
      imgFigures = [];

    imageDatas.forEach(function(value, index) {
      if (!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          }
        }
      }
      imgFigures.push(<ImgFigure data={value} ref = {`imgFigure ${index}`} arrange={this.state.imgsArrangeArr[index]} />);
    }.bind(this)); // 直接将react.component对象传递进去
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
