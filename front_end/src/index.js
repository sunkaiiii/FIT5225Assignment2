import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter} from 'react-router-dom';
import Entey from './router' ;
import * as serviceWorker from './serviceWorker';
import awsmobile from './aws-exports';
import Amplify from 'aws-amplify';

Amplify.configure(awsmobile);
ReactDOM.render(
  
  <BrowserRouter>
    <Entey />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();