import React from 'react';
import PropTypes from 'prop-types';
import styles from './Drawer.module.scss';
import { COLORS, MOD } from '../constants';
import Tools from './Tools';

class Drawer extends React.Component {
  position = { x: 0, y: 0 };

  constructor(props) {
    super(props);

    this.state = {
      color: COLORS[0],
      mode: MOD.FREE
    };
  }

  componentDidMount() {
    this.canvas = this.refs.canvas;
    this.ctx = this.canvas.getContext("2d")
    this.canvas.addEventListener('mousedown', this.onMouseDown);
  }

  componentWillUnmount() {
    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  getPosition = (e) => {
    return {
      x: e.clientX - this.canvas.offsetLeft,
      y: e.clientY - this.canvas.offsetTop
    };
  }

  onMouseDown = (e) => {
    this.canvas.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
    this.position = this.getPosition(e);
  }

  onMouseMove = (e) => {
    const nextPosition = this.getPosition(e);
    switch(this.state.mode) {
      case MOD.RECT:
        this.drawRect(this.position, nextPosition);
        break;
      default:
        this.draw(this.position, nextPosition);
        this.position = this.getPosition(e);
    }
  }

  onMouseUp = (e) => {
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  calcCoords = (prev, next) => {
    return {
      x0: Math.min(prev.x, next.x),
      x1: Math.abs(prev.x - next.x),
      y0: Math.min(prev.y, next.y),
      y1: Math.abs(prev.y - next.y)
    };
  }

  drawRect = (prev, next) => {
    const coords = this.calcCoords(prev, next);
    const { x0, x1, y0, y1 } = coords;
    this.erase();
    this.ctx.beginPath();
    this.ctx.rect(x0, y0, x1, y1);
    this.ctx.strokeStyle = this.state.color;
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  draw = (prev, next) => {
    this.ctx.beginPath();
    this.ctx.moveTo(prev.x, prev.y);
    this.ctx.lineTo(next.x, next.y);
    this.ctx.strokeStyle = this.state.color;
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  erase = () => {
    const { width, height } = this.props;
    this.ctx.clearRect(0, 0, width, height);
  }

  selectColor = (colorIndex) => {
    this.setState({ color: COLORS[colorIndex] });
  }

  selectMode = (mode) => {
    this.setState({ mode });
  }

  render() {
    const { width, height } = this.props;
    return (
      <div className={styles.root}>
        <Tools 
          onSelectColor={this.selectColor} 
          onSelectMode={this.selectMode}
          onClear={this.erase} 
        />	
        <canvas className={styles.canvas} ref="canvas" width={width} height={height}></canvas>
      </div>
    );
  }
}

Drawer.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

Drawer.defaultProps = {
  width: 1280,
  height: 768
};

export default Drawer;