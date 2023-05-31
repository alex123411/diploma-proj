import ReactDOM from 'react-dom/client'
import './index.scss'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Router from './router';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Router />
);
