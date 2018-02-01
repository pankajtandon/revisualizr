import React from 'react';
import {render} from 'react-dom';
import AppRouter from './app-router';
import '../scss/site.scss';
import appReducers from './reducers';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';

const logger = createLogger();
const store = createStore(appReducers, applyMiddleware(thunk, promise, logger));

render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('app')
)

