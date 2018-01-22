import React from 'react';
import {render} from 'react-dom';
import AppRouter from './app-router';
import '../scss/site.scss';

render(
  <AppRouter></AppRouter>,
  document.getElementById('app')
)
