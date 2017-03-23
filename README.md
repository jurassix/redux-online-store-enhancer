# redux-online-store-enhancer
Automatically detect if you are online or online, in a browser or on a native device.

### Install

```js
yarn add redux-online-store-enhancer
```

### Browser Example

```js
import onlineStoreEnhancer, { onlineReducer } from 'redux-online-store-enhancer';

const reducer = {
  online: onlineReducer,
};

const middleware = [];
const store = createStore(
  reducer,
  compose(
    applyMiddleware(...middleware),
    onlineStoreEnhancer()
  )
);

// get from state directly
const { online } = store.getState();

// reselect
const selectOffline = (state) => state.online;
```

### React Native Example

```js
import { NetInfo } from 'react-native';
import onlineStoreEnhancer, { onlineReducer } from 'redux-online-store-enhancer';

const reducer = {
  online: onlineReducer,
};

const middleware = [];
const store = createStore(
  reducer,
  compose(
    applyMiddleware(...middleware),
    onlineStoreEnhancer(NetInfo)
  )
);

// get from state directly
const { online } = store.getState();

// reselect
const selectOffline = (state) => state.online;
```

Global app state now has a top level, _online_, attribute that will dynamically change as browser goes on and online.
