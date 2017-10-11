'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.onlineReducer = onlineReducer;
exports.onlineReducerEnhancer = onlineReducerEnhancer;
exports.updateBrowserOnlineStatus = updateBrowserOnlineStatus;
exports.updateNativeOnlineStatus = updateNativeOnlineStatus;
exports.default = onlineStoreEnhancer;


var initialState = {
  online: false
};
function onlineReducer() {
  var online = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments[1];

  if (action.type === '@@ONLINE') {
    return action.online;
  }
  return online;
}

function onlineReducerEnhancer(rootReducer) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];
    return _extends({}, rootReducer(state, action), {
      online: onlineReducer(state.online, action)
    });
  };
}

function updateBrowserOnlineStatus(dispatch, getState) {
  return function (event) {
    var condition = navigator.onLine;

    var _getState = getState(),
        online = _getState.online;

    if (condition !== online) {
      dispatch({ type: '@@ONLINE', online: condition });
    }
  };
}

function updateNativeOnlineStatus(dispatch, getState) {
  return function (isConnected) {
    var _getState2 = getState(),
        online = _getState2.online;

    if (isConnected !== online) {
      dispatch({ type: '@@ONLINE', online: isConnected });
    }
  };
}

function onlineStoreEnhancer(NetInfo) {
  var isNative = typeof NetInfo !== 'undefined';
  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var dispatch = store.dispatch,
          getState = store.getState;

      if (window && !isNative) {
        var _listener = updateBrowserOnlineStatus(dispatch, getState);
        window.addEventListener('online', _listener);
        window.addEventListener('offline', _listener);
      } else if (isNative && NetInfo) {
        var _listener2 = updateNativeOnlineStatus(dispatch, getState);
        NetInfo.isConnected.fetch().then(_listener2);
        NetInfo.isConnected.addEventListener('connectionChange', _listener2);
      }
      return store;
    };
  };
}