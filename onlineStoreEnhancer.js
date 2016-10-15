
function onlineReducerEnhancer(rootReducer) {
  return (state, action) => ({
    ...rootReducer(state, action),
    online: reduceOnline(state.online, action),
  });
}

function reduceOnline(online = false, action) {
  if (action.type === '@@ONLINE') {
    return action.online;
  }
  return online;
}

function updateOnlineStatus(dispatch, getState) {
  return (event) => {
    const condition = navigator.onLine;
    const { online } = getState();
    if (condition !== online) {
      dispatch({ type: '@@ONLINE', online: condition });
    }
  };
}

export default function onlineStoreEnhancer() {
  return (createStore) => (reducer, preloadedState) => {
    const enhancedReducer = onlineReducerEnhancer(reducer);
    const store = createStore(enhancedReducer, preloadedState);
    const {dispatch, getState} = store;
    if (window) {
      window.addEventListener('online',  updateOnlineStatus(dispatch, getState));
      window.addEventListener('online', updateOnlineStatus(dispatch, getState));
    } else {
      console.error('No window object, maintainer needs to add support for React Native, PR welcome');
    }
    return store;
  }
}
