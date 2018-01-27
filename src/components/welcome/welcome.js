import React, { Component, PropTypes } from 'react';
import { app } from '../../firebase'
import firebase from 'firebase';
import './welcome.css';
import Header from '../header/header'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'


class Welcome extends Component {
    data=[]
    constructor(props) {
        super(props)
        this.state = {
             uid: '',
             username: '',
             profile_picture: '',
             email: '',
             phone_number: '',
             showMOdal: false,
             changeKey : '',
             changeValue : ''
        }
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.readUserData = this.readUserData.bind(this)
      }
    
    //Updating the data on state   
    handleChange(event) {
        var temp = event.target.value
        this.setState({[this.state.changeKey]: temp});
        console.log('event', this.state.changeValue ,this.state.changeKey)
      }
    //Submit the editable popup form
    handleSubmit(event) {
        event.preventDefault(this.state);
        var temp = this.state.changeKey
        // this.data.this.temp = this.state.changeValue
        // this.data.username = 
        // this.setState({[temp]: this.state.changeValue});
        console.log('onsubmit',temp,this.state.username)
        this.updateUserData(this.state)
        
      }
    // Close user data editable popup
    close() {
        this.setState({ showModal: false });
        }
    // Open user data editable popup
    open(data) {
        console.log('onclick', data);
        this.setState({ showModal: true, changeKey: data });
        }
    // Update user data into firebase database server from state
    updateUserData(param) { 
        console.log('parameter', this.data)
        // this.data.username = param.username
        // this.data.email = param.email
        // this.data.phone_number = param.phone_number
        // this.data.uid = param.uid
        localStorage.setItem('user', JSON.stringify(this.data));
        // this.data = JSON.parse(localStorage.getItem('user'))
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + this.data.uid).set({
          uid : this.data.uid,
          username: this.data.username,
          email: this.data.email,
          profile_picture : this.data.profile_picture,
          phone_number: this.data.phone_number,
  
        });
      }

    // Firebase life cycle for cheking the current users details
    componentWillMount() {
        console.log('welcome', localStorage.getItem('user'))
        app.auth().onAuthStateChanged(function(user) {
         if(user) {
             this.readUserData(user.providerData[0].uid)
        }
      }.bind(this));
  }

//   Fetch user data from firebase server
  readUserData(uid) {
    let currentComponent = this
    var userId = firebase.auth().currentUser.uid;
    console.log('userid', userId)
    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
     var userData = (snapshot.val());
     currentComponent.setState({username: userData.username,email: userData.email,uid:userData.uid,phone_number:userData.phone_number,profile_picture:userData.profile_picture})
     localStorage.setItem('user', JSON.stringify(userData));
     currentComponent.data = JSON.parse(localStorage.getItem('user'))
     console.log('firebase', localStorage.getItem('user'))
});
}

    render() {
        this.data = this.state
        console.log('welcome123', localStorage.getItem('user'))
        if(localStorage.getItem('user')!='null'){
            console.log('heyyyyyyy')
        localStorage.setItem('user', JSON.stringify(this.state));
        }
        return (
            <div>
                <Header />
            <div class="well well-border">
             { localStorage.getItem('user')!='null' ? (
    <div>
        <h3><b>User Information</b></h3>
           <div class="row">
              <div class="col-xs-4">  <img src={this.state.profile_picture} class="img-circle" alt="Cinque Terre" width="230" height="180"/> 
            </div>
      <div class="col-xs-8"><form class="form-horizontal" action="/examples/actions/confirmation.php" method="post">
        <div class="form-group">
            <div class="col-xs-6 col-sm-3"><b>Name</b></div>
            <div class="col-xs-1 col-sm-1">:</div>
            <div class="col-xs-6 col-sm-3">{this.state.username}</div>
            <div class="col-xs-6 col-sm-3"><a data-tooltip="Edit"><span onClick={this.open.bind(this,'username')} class="glyphicon glyphicon-pencil"></span></a>
        </div>
        </div>
        <div class="form-group">
            <div class="col-xs-6 col-sm-3"><b>Email</b></div>
            <div class="col-xs-1 col-sm-1">:</div>
            <div class="col-xs-6 col-sm-3">{this.state.email}</div>
            <div class="col-xs-6 col-sm-3"><a data-tooltip="Edit" ><span onClick={this.open.bind(this,'email')} class="glyphicon glyphicon-pencil"></span></a>
        </div>
        </div>
         <div class="form-group">
            <div class="col-xs-6 col-sm-3"><b>Description</b></div>
            <div class="col-xs-1 col-sm-1">:</div>
            <div class="col-xs-6 col-sm-3">Facebook Profile</div>
            <div class="col-xs-6 col-sm-3"><a data-tooltip="Edit"><span onClick={this.open.bind(this,'Email')} class="glyphicon glyphicon-pencil"></span></a>
        </div>
        </div>
        <div class="form-group">
             <div class="col-xs-6 col-sm-3"><b>Phone Number</b></div>
            <div class="col-xs-1 col-sm-1">:</div>
            <div class="col-xs-6 col-sm-3">{this.state.phone_number}</div>
            <div class="col-xs-6 col-sm-3"><a data-tooltip="Edit" ><span onClick={this.open.bind(this,'phoneNumber')} class="glyphicon glyphicon-pencil"></span></a>
        </div>
        </div>
       {/* Data modal or popup to change the user data  */}
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Please Change {this.state.changeKey}</Modal.Title>
          </Modal.Header>
          <form onSubmit={this.handleSubmit}>
          <Modal.Body>
          <div class="form-group data-modal">
            <div class="col-xs-6 col-sm-3"><b>{this.state.changeKey}</b></div>
            <div class="col-xs-2 col-sm-1">:</div>
            <div class="col-xs-7"><input type="text" class="form-control-static" placeholder="Edit here" onChange={this.handleChange}></input>
</div>
           
        </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" class="btn btn-primary" onClick={this.close.bind(this)}>Submit</Button>
          </Modal.Footer>
          </form>
        </Modal>
    </form></div>
    </div>
    
    </div>
    ) : (
      <div>
           <Redirect to="/login" />
</div>
      )}
      </div>
      </div>
        );
    }
}
// Set the current state into redux
const mapStateToProps = (state) => {  
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
  };
export default connect(mapStateToProps)(Welcome);




