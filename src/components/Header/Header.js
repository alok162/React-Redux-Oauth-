import React, { Component } from 'react';
import './Header.css';
import { Redirect } from 'react-router-dom';
import { app } from '../firebase'
import UserList from '../Container/user-details';


class Header extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
  }

  render() {
    return (
      <div> 
        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand pull-left" href="#">Grow-Fit</a>
            </div>
        {/* Checking the user signin or not the showing the login or logout */}
        { localStorage.getItem('username')!='null' ? (
         <ul class="nav navbar-nav navbar-right">
            <li><a href=""><span class="glyphicon glyphicon-user"></span>{ localStorage.getItem('username')}</a></li>
            <li><a href="/logout"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
          </ul>
         ) : (
          <ul class="nav navbar-nav navbar-right">
             <li><a href="/login"><span class="glyphicon glyphicon-log-in"></span> Login/Register</a></li>
          </ul>
        )}
        </div>
      </nav>
   </div>
    );
  }
}

export default Header;
