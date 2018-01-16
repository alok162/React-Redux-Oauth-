import React from 'react';
import { BrowserRouter, Switch, Router, Route } from 'react-router-dom';
import LoginPage from './components/Login/Loginpage';
import  Welcome from './components/Welcome/Welcome';
import { Signup } from './components/Signup/Signup';
import { Logout } from  './components/Logout/Logout';

export const Routes = () => (
<BrowserRouter>
  <Switch>
      <Route path='/login' component={ LoginPage}/>
      <Route exact path='/' component={Welcome}/>
      <Route path='/signup' component={Signup}/>
      <Route path='/logout' component={Logout}/>
  </Switch>
</BrowserRouter>
);