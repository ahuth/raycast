import React from 'react';
import { twoPi } from '../utils/radians';

export default class Minimap extends React.Component {
  wallsRef = React.createRef()
  playerRef = React.createRef()
  raysRef = React.createRef()

  componentDidMount() {
    this.drawWalls();
    this.drawPlayer();
    this.drawRays();
  }

  drawWalls() {
    const context = this.wallsRef.current.getContext('2d');
    const { map, size } = this.props;
    const cellSize = size / map.size;

    context.fillStyle = 'blue';

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
    const minimapX = gridX * cellSize;
    const minimapY = gridY * cellSize;

    context.clearRect(0, 0, size, size);
    context.fillStyle = 'green';
    context.beginPath();
    context.arc(minimapX, minimapY, 5, 0, twoPi);
    context.fill();
  }

  drawRays() {
    const context = this.raysRef.current.getContext('2d');
    const { map, rays, size } = this.props;
    const cellSize = size / map.size;

    context.clearRect(0, 0, size, size);
    context.beginPath();
    context.strokeStyle = 'green';

    for (let i = 0; i < rays.length; i += 16) {
      const { angle, distance, origin } = rays[i];
      const gridX = origin.x / map.height;
      const gridY = origin.y / map.height;
      const gridDistance = distance / map.height;
      const minimapX = gridX * cellSize;
      const minimapY = gridY * cellSize;
      const mapDistance = (size / map.size) * gridDistance;

      context.moveTo(minimapX, minimapY);
      context.lineTo(minimapX + mapDistance * Math.cos(angle), minimapY + mapDistance * -Math.sin(angle));
      context.stroke();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.rays !== this.props.rays) {
      this.drawPlayer();
      this.drawRays();
    }
  }

  render() {
    const { size } = this.props;
    return (
      <div style={styles.container}>
        <canvas ref={this.wallsRef} height={size} width={size} style={styles.layer} />
        <canvas ref={this.playerRef} height={size} width={size} style={styles.layer} />
        <canvas ref={this.raysRef} height={size} width={size} style={styles.layer} />
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
};
