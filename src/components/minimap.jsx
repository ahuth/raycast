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
    const { map, player, size } = this.props;
    const { position } = player;
    const gridX = position.x / map.height;
    const gridY = position.y / map.height;
    const cellSize = size / map.size;
    const minimapX = gridX * cellSize;
    const minimapY = gridY * cellSize;
    const rayAngles = player.rayAngles(map, this.props.fov, this.props.resolution);

    context.clearRect(0, 0, size, size);
    context.beginPath();
    context.strokeStyle = 'green';

    for (let i = 0; i < rayAngles.length; i += 16) {
      const gridDistance = this.props.columns[i] / map.height;
      const distance = (size / map.size) * gridDistance;

      // Unadjust for the correction for a fishbowl effect while casting rays. This is the downside
      // of mixing polar and cartesian coordinates.
      const adjustedDistance = distance / Math.cos(rayAngles[i] - player.direction);

      const direction = rayAngles[i];
      context.moveTo(minimapX, minimapY);
      context.lineTo(minimapX + adjustedDistance * Math.cos(direction), minimapY + adjustedDistance * -Math.sin(direction));
      context.stroke();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.columns !== this.props.columns) {
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
