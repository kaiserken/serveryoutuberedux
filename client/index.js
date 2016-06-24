import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';

const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);
const rootElement = document.getElementById('app');

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  rootElement
);

// import React from 'react';
// import ReactDom from 'react-dom';
// import { Provider } from "react-redux";
// import { createStore, applyMiddleware } from 'redux';
// import App from "./components/app";
// import reducers from "./reducers";
// import ReduxPromise from 'redux-promise';
// import Thunk from 'redux-thunk';
//
//
// const createStoreWithMiddleware = applyMiddleware(ReduxPromise, Thunk)(createStore);
//
// ReactDom.render(
//   <Provider store={createStoreWithMiddleware(reducers)}>
//     <App />
//   </Provider>,
//   document.getElementById('container')
// );
