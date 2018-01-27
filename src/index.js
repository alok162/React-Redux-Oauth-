import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import configureStore from './components/store/configureStore';
// import allReducers from './components/Reducer/Index';
import {Provider} from 'react-redux';

const store = configureStore();
ReactDOM.render(<Provider store={store}>
    <App/>
</Provider>, 
document.getElementById('root'));
registerServiceWorker();


 