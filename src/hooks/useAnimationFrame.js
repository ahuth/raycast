import { useEffect, useRef } from 'react';

export default function useAnimationFrame(callback) {
  const callbackRef = useRef(callback);
  const frameRef = useRef();
  const timestampRef = useRef();

  useEffect(() => {
    timestampRef.current = window.performance.now();
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    function loop(timestamp) {
      frameRef.current = requestAnimationFrame(loop);
      callbackRef.current(timestamp - timestampRef.current);
      timestampRef.current = timestamp;
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);
};
