# redux-online-store-enhancer
Automatically detect if you are online or online.

### Install

```js
npm i -S redux-online-store-enhancer
```

### Example

```js
import onlineStoreEnhancer from 'redux-online-store-enhancer';

const middleware = [];
const store = createStore(reducer, compose(applyMiddleware(...middleware), onlineStoreEnhancer);

// get from state directly
const { online } = store.getState();

// reselect
const selectOffline = (state) => state.online;
```

Global app state now has a top level, _online_, attribute that will dynamically change as browser goes on and online.
