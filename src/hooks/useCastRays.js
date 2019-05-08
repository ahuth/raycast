import { useEffect, useMemo, useState } from 'react';
import useKeyPressing from './useKeyPressing';

export default function useCastRays(player, map, fov, resolution) {
  const [rays, setRays] = useState([]);

  function computeRays() {
    const newRays = player.castRays(map, fov, resolution);
    setRays(newRays);
  }

  useEffect(() => {
    computeRays();
  }, [player, map, fov, resolution, computeRays]);

  useKeyPressing(useMemo(() => {
    return {
      w: (elapsed) => { player.moveForward(map, elapsed); computeRays(); },
      s: (elapsed) => { player.moveBackward(map, elapsed); computeRays(); },
      a: (elapsed) => { player.moveLeft(map, elapsed); computeRays(); },
      d: (elapsed) => { player.moveRight(map, elapsed); computeRays(); },
      ArrowLeft: (elapsed) => { player.turnLeft(elapsed); computeRays(); },
      ArrowRight: (elapsed) => { player.turnRight(elapsed); computeRays(); },
    };
  }, [player, map]));

  return rays;
}
