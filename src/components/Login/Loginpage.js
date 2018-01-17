import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Toaster, Intent } from '@blueprintjs/core'
import { app, facebookProvider } from '../firebase'
import { fbLoginChanged } from '../Actions'
import { connect } from 'react-redux'
import firebase from 'firebase';

const loginStyles = {
  width: "90%",
  maxWidth: "315px",
  margin: "20px auto",
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "10px"
}

class LoginPage extends Component {
  
  constructor(props) {
    super(props)
    this.authWithFacebook = this.authWithFacebook.bind(this)
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
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
          // this.props.fbLoginChanged(user.user.providerData[0]);
          this.setState({ redirect: true })
        }
      })
  }

  componentWillMount() {
    app.auth().onAuthStateChanged(function(user) {
      if(user) {
        console.log('main redux store',user.providerData[0])
      }
    });
} 

  authWithEmailPassword(event) {
     event.preventDefault();
     console.log('authed with email');
     console.table([{
       email: this.emailInput.value,
       password: this.passwordInput.value
     }])
  }
  
    render() {
      if(this.state.redirect===true){
        return <Redirect to = '/'/> 
      }
        return (
          <div style={loginStyles}>
        <Toaster ref={(element) => { this.toaster = element }} />
        <button style={{width: "100%"}} className="pt-button pt-intent-primary" onClick={() => { this.authWithFacebook() }}>Log In with Facebook</button>
        <hr style={{marginTop: "10px", marginBottom: "10px"}}/>
        <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
          <div style={{marginBottom: "10px"}} className="pt-callout pt-icon-info-sign">
            <h5>Note</h5>
            If you don't have an account already, this form will create your account.
          </div>
          <label className="pt-label">
            Email
            <input style={{width: "100%"}} className="pt-input" name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="Email"></input>
          </label>
          <label className="pt-label">
            Password
            <input style={{width: "100%"}} className="pt-input" name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password"></input>
          </label>
          <input style={{width: "100%"}} type="submit" className="pt-button pt-intent-primary" value="Log In"></input>
        </form>
      </div>
      );
    }
}
// set the initial state to redux state
const mapToStateProps = ({ uid, displayName,photoURL,email,phoneNumber,providerId }) => {
  console.log('maptostateprops', uid,displayName)
  return { uid, displayName,photoURL,email,phoneNumber,providerId }; 
};
 
export default connect(mapToStateProps, {fbLoginChanged})(LoginPage);
