import React, { Component, PropTypes } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Toaster, Intent, Colors } from '@blueprintjs/core'
import { app, facebookProvider } from '../../firebase'
import { itemsFetchData} from '../actions/items'
import { connect } from 'react-redux'
import Welcome from '../welcome/welcome'
import firebase from 'firebase'
import './login.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.authWithFacebook = this.authWithFacebook.bind(this)
    this.state = {
      isLoading : false
    }
  }

  // Login or signup with facebook
  authWithFacebook() {
    console.log("fb Login init");
    app.auth().signInWithPopup(facebookProvider)
      .then((user, error) => {
        if (error) {
          this.toaster.show({ intent: Intent.DANGER, message: "Unable to sign in with Facebook" })
        } else {
          console.log('facebook login function',this.state.isLoading,this.props);
          this.props.fetchData(user.user.providerData[0]);
          this.setState({ isLoading: true })
        }
      })
  }

    render() {
      console.log('after logout',this.state.isLoading)
      if(localStorage.getItem('user')!='null' || this.state.isLoading){
        console.log('after logout inside',this.state.isLoading)
        return <Redirect to ="/" />
      }
        return (
          <div>
    
<div class="login-form">
    <form method="post">		
        <div class="text-center social-btn">
            <a href="#" onClick={() => { this.authWithFacebook() }} class="btn btn-primary btn-lg btn-block"><i class="fa fa-facebook"></i> Sign in with <b>Facebook</b></a>
            <a href="#" onClick={() => { this.authWithFacebook() }} class="btn btn-info btn-lg btn-block"><i class="fa fa-twitter"></i> Sign in with <b>Twitter</b></a>
			      <a href="#" onClick={() => { this.authWithFacebook() }} class="btn btn-danger btn-lg btn-block"><i class="fa fa-google"></i> Sign in with <b>Google</b></a>
        </div>
		<div class="or-seperator"><b>or</b></div>
        <div class="form-group">
        	<input type="text" class="form-control input-lg" name="username" placeholder="Username" required="required"/>
        </div>
		<div class="form-group">
            <input type="password" class="form-control input-lg" name="password" placeholder="Password" required="required"/>
        </div>        
        <div class="form-group">
            <button type="submit" class="btn btn-success btn-lg btn-block login-btn">Sign in</button>
        </div>
    </form>
    <div class="text-center"><span class="text-muted">Don't have an account?</span> <a href="#">Sign up here</a></div>
    </div>
      </div>
      );
    }
}

const mapStateToProps = (state) => {
  console.log('alok', state);

  return {
      items: state.items,
      hasErrored: state.itemsHasErrored,
      isLoading: state.itemsIsLoading
  };
};

// Dispatch to Action Creators function that are dispatched to emit a change
const mapDispatchToProps = (dispatch) => {
  console.log('alok1111', dispatch);
  return {
      fetchData: (url) => dispatch(itemsFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

