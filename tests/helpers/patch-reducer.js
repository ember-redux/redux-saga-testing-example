/* global require, define */

import originalService from 'testing-demo/services/redux';

const { unsee } = require;

export function patchReducer(initState) {
  unsee('testing-demo/services/redux');

  define('testing-demo/services/redux', ['exports', 'redux', 'ember-redux/services/redux', 'redux-saga', 'testing-demo/reducers/index', 'testing-demo/enhancers/index', 'testing-demo/sagas/index'], function (exports, _redux, _redux2, _reduxSaga, _index, _index2, _index3) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var createStore = _redux.default.createStore,
        applyMiddleware = _redux.default.applyMiddleware,
        compose = _redux.default.compose;


    var sagaMiddleware = (0, _reduxSaga.default)();

    var makeStoreInstance = function makeStoreInstance(_ref) {
      var reducers = _ref.reducers,
          enhancers = _ref.enhancers;

      var middleware = applyMiddleware(sagaMiddleware);
      var createStoreWithMiddleware = compose(middleware, enhancers)(createStore);
      var store = createStoreWithMiddleware(reducers, initState);
      sagaMiddleware.run(_index3.default);
      return store;
    };

    exports.default = _redux2.default.extend({
      reducers: _index.default,
      enhancers: _index2.default,
      makeStoreInstance: makeStoreInstance
    });
  });
}

export function unpatchReducer() {
  unsee('testing-demo/services/redux');

  define('testing-demo/services/redux', ['exports'], function (exports) {
    exports['default'] = originalService;
  });
}
