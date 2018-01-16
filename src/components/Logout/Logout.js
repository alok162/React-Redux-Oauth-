import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Spinner } from '@blueprintjs/core'
import { app } from '../firebase'

export class Logout extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
    // this.onLogout();
  }
 
  componentWillMount() {
    app.auth().signOut().then((user) => {
      this.setState({ redirect: true })
      localStorage.setItem('username', null);
    })
  }
  
//   componentWillMount() {
//       app.auth().onAuthStateChanged(function(user) {
//         if(user) {
//             console.log('after logout', user);
//         }
//       });
//   }


  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />
    }

    return (
        <div></div>
    //   <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
    //     <h3>Logging Out</h3>
    //     <Spinner />
    //   </div>
    )
  }
}
