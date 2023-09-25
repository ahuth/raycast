import { useMemo } from 'react';
import Column from './column';
import styles from './scene.module.css';

export default function Scene({
  height,
  mapHeight,
  player,
  rays,
  resolution,
  width,
}) {
  const containerSize = useMemo(() => ({ height, width }), [height, width]);

  return (
    <div className={styles.container} style={containerSize}>
      <div className={styles.ceiling} />
      <div className={styles.floor} />
      {rays.map((ray, index) => (
        <Column
          color="#0000FF"
          distance={adjustDistance(ray, player)}
          key={index} // eslint-disable-line react/no-array-index-key
          mapHeight={mapHeight}
          number={index}
          resolution={resolution}
          screenHeight={height}
          screenWidth={width}
        />
      ))}
    </div>
  );
}

// Correct for a fishbowl-effect resulting from mixing polar and cartesian coordinates.
function adjustDistance(ray, player) {
  return ray.distance * Math.cos(ray.angle - player.direction);
}
