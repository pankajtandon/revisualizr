import React from 'react';
import {render} from 'react-dom';
import AppRouter from './app-router';
import {createStore} from 'redux';
import '../scss/site.scss';
import appReducers from './reducers';
import {Provider} from 'react-redux';

const store = createStore(appReducers);

render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('app')
)
