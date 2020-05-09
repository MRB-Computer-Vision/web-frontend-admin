import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Site from '../pages/Site';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Site} />
    <Route path="/site" component={Site} />
    <Route path="/dashboard" component={Dashboard} />
  </Switch>
);

export default Routes;
