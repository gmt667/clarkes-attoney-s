import * as React from "./node_modules/react/index.js";

export * from "./node_modules/react/index.js";

export const useEffectEvent =
  React.useEffectEvent ??
  function useEffectEvent(callback) {
    const callbackRef = React.useRef(callback);
    callbackRef.current = callback;

    return React.useCallback((...args) => callbackRef.current(...args), []);
  };

export default React;

