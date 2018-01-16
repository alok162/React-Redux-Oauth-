import React, { Component } from 'react';
import { app } from '../firebase'
import UserList from '../Container/user-details';
import firebase from 'firebase';
import './Welcome.css';
import {EditableTextField} from 'react-bootstrap-xeditable';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { success } from '../Actions'


class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {
             uid: '',
             displayName: '',
             photoURL: '',
             email: '',
             phoneNumber: '',
             providerId: '',
             showMOdal: false,
             changeData : ''
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
    handleChange(event) {
        var temp = this.state.changeData
        this.setState({displayName: event.target.value});
        console.log('event', temp,this.state.displayName)
      }
    handleSubmit(event) {
        console.log('onsubmit',this.state)
        this.updateUserData(this.state)
        event.preventDefault(this.state);
      }
    
    close() {
        this.setState({ showModal: false });
        // this.updateUserData()
        }
    
    open(data) {
        console.log('onclick', data);
        this.setState({ showModal: true, changeData: data });
        }

    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });


      }

    updateUserData(param) {
        var userId = firebase.auth().currentUser.providerData[0].uid;
        console.log('writedata',userId,param,param.uid);
        firebase.database().ref('users/' + 'alok'+param.uid).set({
          displayName: param.displayName,
          email: param.email,
          profile_picture : param.photoURL,
          phone_number: param.phoneNumber
        });
      }

    componentWillMount() {
      app.auth().onAuthStateChanged(function(user) {
       if(user) {
        // this.updateUserData(user.providerData[0])
          localStorage.setItem('username', user.displayName);
          this.setState({displayName: user.displayName,email: user.email,uid:user.providerData[0].uid})
           console.log('welcome', user.providerData[0] );
      }
    }.bind(this));
} 

    render() {
        return (
            <div class="well well-border">
             { this.state.displayName!='' ? (
            
    <form class="form-horizontal" action="/examples/actions/confirmation.php" method="post">
        <div class="form-group">
            <label for="inputEmail" class="control-label col-xs-2">Name</label>
            <div class="col-xs-10">
                <p class="form-control-static">{this.props.displayName}</p>
                <a href="#"><span onClick={this.open.bind(this,'displayName')} class="glyphicon glyphicon-pencil"></span></a>
            </div>
        </div>
        <div class="form-group">
            <label for="inputEmail" class="control-label col-xs-2">Email</label>
            <div class="col-xs-10">
                <p class="form-control-static">{this.props.email}</p>
                <a href="#"><span onClick={this.open.bind(this,'email')} class="glyphicon glyphicon-pencil"></span></a>
            </div>
        </div>
        <div class="form-group">
            <label for="inputEmail" class="control-label col-xs-2">Description</label>
            <div class="col-xs-10">
                <p class="form-control-static">{this.props.photoURL}</p>
                <a href="#"><span onClick={this.open.bind(this,'Email')} class="glyphicon glyphicon-pencil"></span></a>
            </div>
        </div>
        <div class="form-group">
            <label for="inputEmail" class="control-label col-xs-2">Phone Number</label>
            <div class="col-xs-10">
                <p class="form-control-static">{this.props.phoneNumber}</p>
                <a href="#"><span onClick={this.open.bind(this,'phoneNumber')} class="glyphicon glyphicon-pencil"></span></a>
            </div>
        </div>
        {/* <div class="form-group">
            <label for="inputEmail" class="control-label col-xs-2">Date of Birth</label>
            <div class="col-xs-10">
                <p class="form-control-static">harrypotter@mail.com</p>
                <a href="#"><span onClick={this.open.bind(this,this.state.email)} class="glyphicon glyphicon-pencil"></span></a>
            </div>
        </div> */}
       
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Please Change {this.state.changeData}</Modal.Title>
          </Modal.Header>
          <form onSubmit={this.handleSubmit}>
          <Modal.Body>
          <div class="form-group">
            <label for="inputEmail" class="control-label col-xs-2">{this.state.changeData}</label>
            <div class="col-xs-10">
                <input type="text" class="form-control-static" placeholder="Edit here" onChange={this.handleChange}></input>
            </div>
        </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" onClick={this.close.bind(this)}>Submit</Button>
          </Modal.Footer>
          </form>
        </Modal>
    </form>
    
    ) : (
      <ul>
      </ul>
      )}
      </div>
        );
    }
}

const mapToStateProps = ({ uid, displayName,photoURL,email,phoneNumber,providerId,isLoggedIn }) => {
    return { uid, displayName,photoURL,email,phoneNumber,providerId,isLoggedIn }; 
  };
   
export default connect(mapToStateProps, {success})(Welcome);


