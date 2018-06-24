import React from 'react';
import Column from './column';

export default function Scene({
  height,
  mapHeight,
  player,
  rays,
  resolution,
  width,
}) {
  return (
    <div style={{ ...styles.container, height, width }}>
      <div style={styles.ceiling} />
      <div style={styles.floor} />
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

const styles = {
  container: {
    border: '1px solid black',
    position: 'relative',
  },
  ceiling: {
    backgroundColor: 'SlateGrey',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '50%',
    top: 0,
  },
  floor: {
    backgroundColor: 'Gainsboro',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: '50%',
  },
};
