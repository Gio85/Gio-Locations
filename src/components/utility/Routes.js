import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import ProtectedRoute from '../utility/ProtectedRoute';

import TripsIndex from '../trips/TripsIndex';
import TripsShow from  '../trips/TripsShow';
import TripsNew from '../trips/TripsNew';
// import TripsEdit from '../trips/TripsEdit';
import Login from '../auth/Login';
import Register from '../auth/Register';
import NotFound from './NotFound';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={TripsIndex} />
      <Route path="/trips/new" component={TripsNew} />
      <Route exact path="/trips/:id" component={TripsShow} />
      {/* <ProtectedRoute exact path="/trips/:id/edit" component={TripsEdit} /> */}
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
