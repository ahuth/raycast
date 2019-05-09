import forEach from 'lodash.foreach';
import { useCallback, useEffect, useReducer, useRef } from 'react';
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
  const stateRef = useRef(state);

  useEffect(() => {
    // Capture an immutable reference to the mutable state, so that the callback we pass to `useAnimationFrame`
    // has a stable reference and doesn't result in it being setup and torn down repeatedly.
    stateRef.current = state;
  }, [state])

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

        if (isPressingKey) { andThen() }
      },
      [stateRef, handlers, andThen],
    ),
  );

  useEffect(() => {
    const keyNames = Object.keys(handlers);

    function handleKeyDown(event) {
      if (keyNames.includes(event.key)) {
        dispatch({ type: 'down', key: event.key });
      }
    }

    function handleKeyUp(event) {
      if (keyNames.includes(event.key)) {
        dispatch({ type: 'up', key: event.key });
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
