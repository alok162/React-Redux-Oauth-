import React from 'react';
import { BrowserRouter, Switch, Router, Route } from 'react-router-dom';
import Login from './components/login/login';
import  Welcome from './components/welcome/welcome';
import { Signup } from './components/signup/signup';
import { Logout } from  './components/logout/logout';

export const Routes = () => (
<BrowserRouter>
  <Switch>
      <Route path='/login' component={ Login}/>
      <Route exact path='/' component={Welcome}/>
      <Route path='/signup' component={Signup}/>
      <Route path='/logout' component={Logout}/>
  </Switch>
</BrowserRouter>
);