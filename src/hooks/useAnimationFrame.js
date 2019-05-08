import { useEffect, useRef } from 'react';

export default function useAnimationFrame(callback) {
  const callbackRef = useRef(callback);
  const frameRef = useRef();
  let prev;

  useEffect(() => {
    prev = window.performance.now();
    callbackRef.current = callback;
  }, [callback]);

  function loop(timestamp) {
    frameRef.current = requestAnimationFrame(loop);
    callbackRef.current(timestamp - prev);
    prev = timestamp;
  };

  useEffect(() => {
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);
};
