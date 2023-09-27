import forEach from 'lodash.foreach';
import { useEffect, useReducer } from 'react';
import useAnimationFrame from './useAnimationFrame';

function reducer(state, action) {
  switch (action.type) {
    case 'down':
      return { ...state, [action.key]: true };
    case 'up':
      return { ...state, [action.key]: false };
    default:
      return state;
  }
}

export default function useKeyPressing(handlers, { andThen = () => {} }) {
  const [state, dispatch] = useReducer(reducer, {});

  // Track which keys are pressed.
  useEffect(() => {
    const keyNames = Object.keys(handlers);

    function handleKeyDown(event) {
      if (keyNames.includes(event.code)) {
        event.preventDefault();
        dispatch({ type: 'down', key: event.code });
      }
    }

    function handleKeyUp(event) {
      if (keyNames.includes(event.code)) {
        event.preventDefault();
        dispatch({ type: 'up', key: event.code });
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handlers, dispatch]);

  // Every animation frame execute the handlers associated with all keys that are currently being
  // pressed.
  useAnimationFrame((elapsed) => {
    let isPressingAnyKey = false;

    forEach(handlers, (value, key) => {
      if (state[key]) {
        isPressingAnyKey = true;
        value(elapsed);
      }
    });

    if (isPressingAnyKey) { andThen(); }
  });
}
