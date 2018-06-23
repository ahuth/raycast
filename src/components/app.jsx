import React from 'react';
import Loop from '../utils/loop';
import Map from '../utils/map';
import Minimap from './minimap';
import Player from '../utils/player';
import Scene from './scene';
import { fromDegrees } from '../utils/radians';

const fov = fromDegrees(60);
const loop = new Loop();
const map = new Map(64);
const player = new Player(160, 160, fromDegrees(0));

export default function App() {
  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <Scene
          fov={fov}
          loop={loop}
          map={map}
          player={player}
          resolution={320}
          height={400}
          width={740}
        />
        <span>Move using the w, s, a, d, ←, and → keys</span>
      </div>
      <div style={styles.right}>
        <Minimap
          loop={loop}
          map={map}
          player={player}
          size={300}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
  },
};
