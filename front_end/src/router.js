import React  from 'react';
import { Route, Switch, withRouter, Router } from 'react-router-dom';
import App from './App';
import StorageImage from './StorageImage';
import history from './history';

const Entey= () => (
     <Router history={history}>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/StorageImage" component={StorageImage} />
          </Switch>
      </Router>    
    
)
  export default withRouter(Entey);