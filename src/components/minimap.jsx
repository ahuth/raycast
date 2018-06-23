import React from 'react';

export default class Minimap extends React.Component {
  canvasRef = React.createRef()

  componentDidMount() {
    this.drawWalls();
  }

  drawWalls() {
    const context = this.canvasRef.current.getContext('2d');
    const { map, size } = this.props;
    const cellSize = size / map.size;

    map.grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      });
    });
  }

  render() {
    const { size } = this.props;
    return <canvas ref={this.canvasRef} height={size} width={size} />;
  }
}
