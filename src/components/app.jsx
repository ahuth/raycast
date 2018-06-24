import React from 'react';
import Loop from '../utils/loop';
import Map from '../utils/map';
import Minimap from './minimap';
import Player from '../utils/player';
import Scene from './scene';
import Updater from './updater';
import { fromDegrees } from '../utils/radians';

const fov = fromDegrees(60);
const loop = new Loop();
const map = new Map(64);
const player = new Player(160, 160, fromDegrees(0));
const resolution = 320;

export default function App() {
  return (
    <Updater fov={fov} loop={loop} map={map} player={player} resolution={resolution}>
      {({ columns }) => (
        <div style={styles.container}>
          <div>
            <Scene
              columns={columns}
              height={400}
              mapHeight={map.height}
              resolution={resolution}
              width={740}
            />
            <span>Move using the w, s, a, d, ←, and → keys</span>
          </div>
          <Minimap
            loop={loop}
            map={map}
            player={player}
            size={300}
          />
        </div>
      )}
    </Updater>
  );
}

const styles = {
  container: {
    display: 'flex',
  },
};
