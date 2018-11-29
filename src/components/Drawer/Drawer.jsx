import React from 'react';
import PropTypes from 'prop-types';
import styles from './Drawer.module.scss';
import { Button } from 'antd';

class Drawer extends React.Component {
  position = { x: 0, y: 0 };
  componentDidMount() {
    this.canvas = this.refs.canvas;
    this.ctx = this.canvas.getContext("2d")
    this.ctx.fillRect(0,0, 100, 100);

    this.canvas.addEventListener('mousedown', this.onMouseDown);
  }

  componentWillUnmount() {
    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
    this.canvas.removeEventListener('mouseup', this.onMouseUp);
  }

  getPosition = (e) => {
    return {
      x: e.clientX - this.canvas.offsetLeft,
      y: e.clientY - this.canvas.offsetTop
    };
  }

  onMouseDown = (e) => {
    this.canvas.addEventListener('mousemove', this.onMouseMove);
    this.canvas.addEventListener('mouseup', this.onMouseUp);
    this.position = this.getPosition(e);
  }

  onMouseMove = (e) => {
    this.draw(this.position, this.getPosition(e))
    // prevX = currX;
    // prevY = currY;
    // currX = e.clientX - canvas.offsetLeft;
    // currY = e.clientY - canvas.offsetTop;
  }

  onMouseUp = () => {
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
    this.canvas.removeEventListener('mouseup', this.onMouseUp);
  }

  draw = (prev, next) => {
    this.ctx.beginPath();
    this.ctx.moveTo(prev.x, prev.y);
    this.ctx.lineTo(next.x, next.y);
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  erase = () => {
    const { width, height } = this.props;
    this.ctx.clearRect(0, 0, width, height);
  }

  render() {
    const { width, height } = this.props;
    return (
      <div className={styles.root}>
        <Button type="danger" onClick={this.erase}>Очистить</Button>
        <canvas ref="canvas" width={width} height={height}></canvas>
      </div>
    );
  }
}

Drawer.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

Drawer.defaultProps = {
  width: 800,
  height: 600
};

export default Drawer;