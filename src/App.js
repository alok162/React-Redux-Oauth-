import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/foundation.min.css';
// import Header from './components/header/header';
import { Footer } from './components/footer/footer';
import { Welcome } from './components/welcome/welcome';
import './styles/custom.css';
import { Routes } from './routes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appName : 'React Project',
      authenticated : false
    }
  }
  render() {
    return (
      <div className="off-canvas-wrapper">
      <div className="off-canvas-wrapper-inner" data-off-canvas-wrapper>
        <div className="off-canvas-content" data-off-canvas-content>
          <div className="title-bar hide-for-large">
            <div className="title-bar-left">
              <button className="menu-icon" type="button" data-open="my-info"></button>
              <span className="title-bar-title">Home</span>
            </div>
          </div>
          {/* <Header authenticated={this.state.authenticated} name={this.state.appName}/> */}
         <Routes/>
          <hr/>
            <Footer/>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
