# redux-online-store-enhancer
Automatically detect if you are online or online.

### Install

```js
npm i -S redux-online-store-enhancer
```

### Example

```js
import onlineStoreEnhancer from 'redux-online-store-enhancer';

// also can be added to applyMiddleware() in more advanced configurations
const store = createStore(reducer, onlineStoreEnhancer);

// get from state directly
const { online } = store.getState();

// reselect
const selectOffline = (state) => state.online;
```

Global app state now has a top level, _online_, attribute that will dynamically change as browser goes on and online.
