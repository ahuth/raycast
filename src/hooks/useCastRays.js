import { useCallback, useEffect, useMemo, useState } from 'react';
import useKeyPressing from './useKeyPressing';

export default function useCastRays(player, map, fov, resolution) {
  const [rays, setRays] = useState([]);

  const castRays = useCallback(() => {
    const newRays = player.castRays(map, fov, resolution);
    setRays(newRays);
  }, [player, map, fov, resolution]);

  useEffect(() => {
    castRays();
  }, [player, map, fov, resolution, castRays]);

  useKeyPressing(
    useMemo(
      () => {
        return {
          w: (elapsed) => { player.moveForward(map, elapsed); },
          s: (elapsed) => { player.moveBackward(map, elapsed); },
          a: (elapsed) => { player.moveLeft(map, elapsed); },
          d: (elapsed) => { player.moveRight(map, elapsed); },
          ArrowLeft: (elapsed) => { player.turnLeft(elapsed); },
          ArrowRight: (elapsed) => { player.turnRight(elapsed); },
        };
      },
      [player, map],
    ),
    { andThen: castRays },
  );

  return rays;
}
