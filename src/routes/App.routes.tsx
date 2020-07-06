import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Site from '../pages/Site';
import SubmitExams from '../pages/SubmitExams';
import ConsultExams from '../pages/ConsultExams';

import ClinicalEvaluation from '../pages/ClinicalEvaluation';
import RaioX from '../pages/RaioX';

const AppRoutes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/clinical-evaluation" exact component={ClinicalEvaluation} />
    <Route path="/raio-x" exact component={RaioX} />
    <Route path="/submit" exact component={SubmitExams} />
    <Route path="/site" component={Site} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/consult" component={ConsultExams} />
  </Switch>
);

export default AppRoutes;
