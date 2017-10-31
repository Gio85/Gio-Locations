import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../utility/ProtectedRoute';

import TripsIndex from '../trips/TripsIndex';
import TripsShow from  '../trips/TripsShow';
import TripsNew from '../trips/TripsNew';
import PostsNew from '../posts/PostsNew';
import PostsEdit from '../posts/PostsEdit';
import UsersShow from '../users/UsersShow';
import Login from '../auth/Login';
import Register from '../auth/Register';
import NotFound from './NotFound';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={TripsIndex} />
      <Route path="/trips/new" component={TripsNew} />
      <Route exact path="/trips/:id" component={TripsShow} />
      <ProtectedRoute exact path="/trips/:id/posts" component={PostsNew} />
      <ProtectedRoute exact path="/trips/:id/posts/:postId/edit" component={PostsEdit} />
      <Route exact path="/users/:userId" component={UsersShow} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
