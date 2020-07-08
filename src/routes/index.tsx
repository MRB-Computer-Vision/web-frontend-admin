import React from 'react';

import { Switch } from 'react-router-dom';

import Route from '../containers/RouteContainer';

import Dashboard from '../pages/Dashboard';
import Site from '../pages/Site';
import SubmitExams from '../pages/SubmitExams';
import ConsultExams from '../pages/ConsultExams';

import ClinicalEvaluation from '../pages/ClinicalEvaluation';
import RaioX from '../pages/RaioX';
import SignIn from '../pages/SignIn';

const Routes: React.FC = () => (
  <Switch>
    <Route isProtected exact path="/" component={Dashboard} />
    <Route path="/site" component={Site} />
    <Route path="/signin" component={SignIn} />
    <Route
      isProtected
      path="/clinical-evaluation"
      component={ClinicalEvaluation}
    />
    <Route isProtected path="/raio-x" component={RaioX} />
    <Route isProtected path="/submit" component={SubmitExams} />
    <Route isProtected path="/dashboard" component={Dashboard} />
    <Route isProtected path="/consult" component={ConsultExams} />
  </Switch>
);

export default Routes;
