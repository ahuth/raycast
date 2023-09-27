import { useCallback, useEffect, useMemo, useState } from 'react';
import useKeyPressing from './useKeyPressing';

export default function useCastRays(player, map, fov, resolution) {
  const [rays, setRays] = useState([]);

  const castRays = useCallback(() => {
    const newRays = player.castRays(map, fov, resolution);
    setRays(newRays);
  }, [player, map, fov, resolution]);

  // Cast an initial set of rays on initial render, so we have something to show.
  useEffect(() => {
    castRays();
  }, [castRays]);

  // Move the player around the map when certain keys are pressed, and then re-cast the rays.
  useKeyPressing({
    handlers: useMemo(
      () => {
        return {
          KeyW: (elapsed) => { player.moveForward(map, elapsed); },
          KeyS: (elapsed) => { player.moveBackward(map, elapsed); },
          KeyA: (elapsed) => { player.moveLeft(map, elapsed); },
          KeyD: (elapsed) => { player.moveRight(map, elapsed); },
          ArrowLeft: (elapsed) => { player.turnLeft(elapsed); },
          ArrowRight: (elapsed) => { player.turnRight(elapsed); },
        };
      },
      [player, map],
    ),
    andThen: castRays,
  });

  return rays;
}
