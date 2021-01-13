import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import STORE from './STORE';
import AuthHelper from './AuthHelper';
import config from './config';


class App extends Component {
  state = {
  }

  render() {
    return (
      <>
        <p>Hello world!</p>
      </>
    )
  }
}

export default App;