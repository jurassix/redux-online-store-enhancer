'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = onlineStoreEnhancer;

function onlineReducerEnhancer(rootReducer) {
  return function (state, action) {
    return _extends({}, rootReducer(state, action), {
      online: reduceOnline(state.online, action)
    });
  };
}

function reduceOnline() {
  var online = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments[1];

  if (action.type === '@@ONLINE') {
    return action.online;
  }
  return online;
}

function updateOnlineStatus(dispatch, getState) {
  return function (event) {
    var condition = navigator.onLine;

    var _getState = getState();

    var online = _getState.online;

    if (condition !== online) {
      dispatch({ type: '@@ONLINE', online: condition });
    }
  };
}

function onlineStoreEnhancer() {
  return function (createStore) {
    return function (reducer, preloadedState) {
      var enhancedReducer = onlineReducerEnhancer(reducer);
      var store = createStore(enhancedReducer, preloadedState);
      var dispatch = store.dispatch;
      var getState = store.getState;

      if (window) {
        window.addEventListener('online', updateOnlineStatus(dispatch, getState));
        window.addEventListener('online', updateOnlineStatus(dispatch, getState));
      } else {
        console.error('No window object, maintainer needs to add support for React Native, PR welcome');
      }
      return store;
    };
  };
}