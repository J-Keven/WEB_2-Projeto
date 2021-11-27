import React from 'react';
import { Switch } from 'react-router-dom';
import Profile from '../pages/Profile';
import Chat from '../pages/Chat';
import Feed from '../pages/Feed';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Route from './Router';

const AuthRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/sign-up" exact component={SignUp} />
      <Route path="/feed" exact isPrivate component={Feed} />
      <Route path="/chat" exact isPrivate component={Chat} />
      <Route path="/chat/:id" exact isPrivate component={Chat} />
      <Route path="/profile/:id" exact isPrivate component={Profile} />
    </Switch>
  );
};

export default AuthRoutes;