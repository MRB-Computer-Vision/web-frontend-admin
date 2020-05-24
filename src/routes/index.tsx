import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Site from '../pages/Site';
import Auth from '../pages/Auth';
import SubmitExams from '../pages/SubmitExams';
import ConsultExams from '../pages/ConsultExams';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SubmitExams} />
    <Route path="/consult" exact component={ConsultExams} />
    <Route path="/submit" exact component={SubmitExams} />
    <Route path="/site" component={Site} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/auth" component={Auth} />
  </Switch>
);

export default Routes;
