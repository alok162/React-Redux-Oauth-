import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Spinner } from '@blueprintjs/core'
import { app } from '../../firebase'
import Welcome from '../welcome/welcome'

export class Logout extends Component {
  constructor() {
    localStorage.setItem('user', null);
    super()
    this.state = {
      redirect: false
    }
  }
 
  componentWillMount() {
    app.auth().signOut().then((user) => {
      this.setState({ redirect: true })
      console.log('logout', localStorage.getItem('user'),this.state.redirect)
    })
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/login" />
    }

    return (
        <div></div>
    )
  }
}
