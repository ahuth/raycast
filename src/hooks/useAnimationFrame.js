import { useEffect, useRef } from 'react';

export default function useAnimationFrame(callback) {
  const callbackRef = useRef(callback);

  // Get a stable reference to the callback, so that users don't need to memoize it themselves.
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Setup a loop of animation frames and pass the elapsed time for each to the callback.
  useEffect(() => {
    let prevTimestamp = window.performance.now();

    function loop(timestamp) {
      callbackRef.current(timestamp - prevTimestamp);
      prevTimestamp = timestamp;
      frameId = requestAnimationFrame(loop);
    };

    let frameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frameId);
  }, []);
};
