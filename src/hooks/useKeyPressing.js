import forEach from 'lodash.foreach';
import { useEffect, useState } from 'react';
import useAnimationFrame from './useAnimationFrame';

export default function useKeyPressing(handlers) {
  const [keys, setKeys] = useState({});

  useAnimationFrame((elapsed) => {
    // Execute the handler for all keys that are being pressed.
    forEach(handlers, (value, key) => {
      if (keys[key]) {
        value(elapsed);
      }
    });
  });

  useEffect(() => {
    const keyNames = Object.keys(handlers);

    function handleKeyDown(event) {
      if (keyNames.includes(event.key)) {
        setKeys(state => ({ ...state, [event.key]: true }));
      }
    }

    function handleKeyUp(event) {
      if (keyNames.includes(event.key)) {
        setKeys(state => ({ ...state, [event.key]: false }));
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handlers]);
}
