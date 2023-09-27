import { useEffect, useRef } from 'react';
import useAnimationFrame from './useAnimationFrame';

export default function useKeyPressing({ handlers, andThen = () => {} }) {
  const pressedKeys = useRef(new Set());

  // Track which keys are pressed.
  useEffect(() => {
    const keyNames = Object.keys(handlers);

    function handleKeyDown(event) {
      if (keyNames.includes(event.code)) {
        event.preventDefault();
        pressedKeys.current.add(event.code);
      }
    }

    function handleKeyUp(event) {
      if (keyNames.includes(event.code)) {
        event.preventDefault();
        pressedKeys.current.delete(event.code);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handlers]);

  // Every animation frame, execute the handlers associated with all keys that are currently being
  // pressed.
  useAnimationFrame((elapsed) => {
    // Execute the handlers for any keys that are pressed.
    for (let key in handlers) {
      const callback = handlers[key];

      if (pressedKeys.current.has(key)) {
        callback(elapsed);
      }
    }

    // If any keys are pressed, also execute the final callback once.
    if (pressedKeys.current.size > 0) {
      andThen();
    }
  });
}
