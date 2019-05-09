import { useEffect, useRef } from 'react';

export default function useAnimationFrame(callback) {
  const frameRef = useRef();
  const timestampRef = useRef();

  useEffect(() => {
    timestampRef.current = window.performance.now();
  }, []);

  useEffect(() => {
    function loop(timestamp) {
      frameRef.current = requestAnimationFrame(loop);
      callback(timestamp - timestampRef.current);
      timestampRef.current = timestamp;
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [callback]);
};
