// @flow
import type { Dispatch, Store, StoreEnhancer } from 'redux';

type State = {
  online: boolean,
};

type Action = {
  type: string,
  online: boolean,
};

type IsConnectedType = {
  fetch: () => Promise<boolean>,
  addEventListener: (type: string, listener: Function) => void,
};

type NetInfo = {
  isConnected: IsConnectedType,
};

const initialState = {
  online: false,
};

export function onlineReducer(online: boolean = false, action: Action) {
  if (action.type === '@@ONLINE') {
    return action.online;
  }
  return online;
}

export function onlineReducerEnhancer(
  rootReducer: (state: State, action: Action) => State
) {
  return (state: State = initialState, action: Action) => ({
    ...rootReducer(state, action),
    online: onlineReducer(state.online, action),
  });
}

export function updateBrowserOnlineStatus(
  dispatch: Dispatch<Action>,
  getState: () => State
) {
  return (event: Event) => {
    const condition: boolean = navigator.onLine;
    const { online }: State = getState();
    if (condition !== online) {
      dispatch({ type: '@@ONLINE', online: condition });
    }
  };
}

export function updateNativeOnlineStatus(
  dispatch: Dispatch<Action>,
  getState: () => State
) {
  return (isConnected: boolean) => {
    const { online }: State = getState();
    if (isConnected !== online) {
      dispatch({ type: '@@ONLINE', online: isConnected });
    }
  };
}

export default function onlineStoreEnhancer(
  NetInfo?: NetInfo
): StoreEnhancer<State, Action> {
  const isNative = typeof NetInfo !== 'undefined';
  return createStore => (reducer, preloadedState, enhancer) => {
    const store = createStore(reducer, preloadedState, enhancer);
    const { dispatch, getState } = store;
    if (window && !isNative) {
      const listener = updateBrowserOnlineStatus(dispatch, getState);
      window.addEventListener('online', listener);
      window.addEventListener('offline', listener);
    } else if (isNative && NetInfo) {
      const listener = updateNativeOnlineStatus(dispatch, getState);
      NetInfo.isConnected.fetch().then(listener);
      NetInfo.isConnected.addEventListener('connectionChange', listener);
    }
    return store;
  };
}
