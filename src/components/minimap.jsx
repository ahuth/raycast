import {useEffect, useRef} from 'react';
import { twoPi } from '../Radians';

export default function Minimap({map, player, rays, size}) {
  const wallsRef = useRef();
  const playerRef = useRef();
  const raysRef = useRef();

  // Draw the walls. This should only happen once, since the walls don't move or change.
  useEffect(() => {
    const context = wallsRef.current.getContext('2d');
    const cellSize = size / map.size;

    context.fillStyle = 'blue';

    map.grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      });
    });
  }, [map.grid, map.size, size]);

  // Draw the player. This should happen when the player moves, but not when they change the
  // direction they face.
  useEffect(() => {
    const context = playerRef.current.getContext('2d');
    const gridX = player.position.x / map.height;
    const gridY = player.position.y / map.height;
    const cellSize = size / map.size;
    const minimapX = gridX * cellSize;
    const minimapY = gridY * cellSize;

    context.clearRect(0, 0, size, size);
    context.fillStyle = 'green';
    context.beginPath();
    context.arc(minimapX, minimapY, 5, 0, twoPi);
    context.fill();
  }, [map.height, map.size, size, player.position.x, player.position.y]);

  // Draw the rays. This should happen any time the player moves or changes direction.
  useEffect(() => {
    const context = raysRef.current.getContext('2d');
    const cellSize = size / map.size;

    context.clearRect(0, 0, size, size);
    context.beginPath();
    context.strokeStyle = 'green';

    // Drawing every ray is kind of slow and pointless. Instead draw every 20 (which is every 16th).
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
  }, [map.height, map.size, size, rays]);

  return (
    <div className="relative">
      <canvas className="absolute top-0 left-0" ref={wallsRef} height={size} width={size} />
      <canvas className="absolute top-0 left-0" ref={playerRef} height={size} width={size} />
      <canvas className="absolute top-0 left-0" ref={raysRef} height={size} width={size} />
    </div>
  );
}
