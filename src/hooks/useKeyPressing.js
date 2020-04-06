import forEach from 'lodash.foreach';
import { useCallback, useEffect } from 'react';
import useAnimationFrame from './useAnimationFrame';
import useImmutableStateReducer from './useImmutableStateReducer';

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
  const [stateRef, dispatch] = useImmutableStateReducer(reducer, {});

  useAnimationFrame(
    useCallback(
      (elapsed) => {
        let isPressingKey = false;

        // Execute the handler for all keys that are being pressed.
        forEach(handlers, (value, key) => {
          if (stateRef.current[key]) {
            isPressingKey = true;
            value(elapsed);
          }
        });

        if (isPressingKey) { andThen(); }
      },
      [stateRef, handlers, andThen],
    ),
  );

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
}
