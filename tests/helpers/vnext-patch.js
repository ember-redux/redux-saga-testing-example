import redux from 'redux';
import createSaga from 'redux-saga';
import rootSaga from 'testing-demo/sagas/index';
import reducers from 'testing-demo/reducers/index';
import ReduxService from 'ember-redux/services/redux';

const { createStore, applyMiddleware, compose } = redux;

export function patchReducer(context, initState) {
  const sagaMiddleware = createSaga();

  const enhancers = compose(window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f);

  const makeStoreInstance = () => {
    const middleware = applyMiddleware(sagaMiddleware);
    const createStoreWithMiddleware = compose(middleware, enhancers)(createStore);
    const store = createStoreWithMiddleware(reducers, initState);
    sagaMiddleware.run(rootSaga);
    return store;
  };

  context.owner.register('service:redux', ReduxService.extend({ makeStoreInstance }));
}
