import { useState } from 'react';
import Map from '../Map';
import Minimap from './minimap';
import Player from '../Player';
import Scene from './scene';
import useCastRays from '../hooks/useCastRays';
import { fromDegrees } from '../Radians';

const fov = fromDegrees(60);
const map = new Map(64);
const player = new Player(160, 160, fromDegrees(0));
const resolution = 320;

export default function App() {
  const [showMinimap, setShowMinimap] = useState(true);
  const rays = useCastRays(player, map, fov, resolution);

  return (
    <div style={styles.container}>
      <div>
        <Scene
          height={400}
          mapHeight={map.height}
          player={player}
          rays={rays}
          resolution={resolution}
          width={740}
        />
        <div>
          <span>Move using the w, s, a, d, ←, and → keys</span>
          <div>
            <label htmlFor="show_minimap">
              Show minimap
              <input id="show_minimap" onChange={() => setShowMinimap(!showMinimap)} type="checkbox" checked={showMinimap} />
            </label>
          </div>
          <a href="https://github.com/ahuth/raycast">Source code</a>
        </div>
      </div>
      {showMinimap && (
        <Minimap
          fov={fov}
          map={map}
          player={player}
          rays={rays}
          resolution={resolution}
          size={300}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
  },
};
