import { useEffect, useReducer, useRef } from 'react';

export default function useImmutableStateReducer(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  return [stateRef, dispatch];
}
