import React from 'react';
import { twoPi } from '../utils/radians';

export default class Minimap extends React.Component {
  wallsRef = React.createRef()
  playerRef = React.createRef()

  componentDidMount() {
    this.drawWalls();
    this.drawPlayer();
    this.props.loop.subscribe(this.update);
  }

  drawWalls() {
    const context = this.wallsRef.current.getContext('2d');
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

  drawPlayer() {
    const context = this.playerRef.current.getContext('2d');
    const { map, player, size } = this.props;
    const { position } = player;
    const gridX = position.x / map.height;
    const gridY = position.y / map.height;
    const cellSize = size / map.size;

    context.clearRect(0, 0, size, size);
    context.fillStyle = 'green';
    context.beginPath();
    context.arc(gridX * cellSize, gridY * cellSize, 5, 0, twoPi);
    context.fill();
  }

  update = () => {
    this.drawPlayer();
  }

  render() {
    const { size } = this.props;
    return (
      <div style={styles.container}>
        <canvas ref={this.wallsRef} height={size} width={size} style={styles.layer} />
        <canvas ref={this.playerRef} height={size} width={size} style={styles.layer} />
      </div>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
  },
  layer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
}
