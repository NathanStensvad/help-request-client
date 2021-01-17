import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import STORE from './STORE';
import AuthHelper from './AuthHelper';
import config from './config';


class App extends Component {
  state = {
  }

  clickMe = e => {
    e.preventDefault();
    console.log("hello")
  }

  render() {
    return (
      <>
        <header className="flex">
          <h1 className="title">
            FORUM
          </h1>
          <button>
            My Requests
          </button>
          <div>
            <h2 className="login">
              Alfred Rodriguez
            </h2>
            <button>
              Logout
            </button>
          </div>
        </header>
        <section className="content">
          <section className="backdrop">
            <button>+Create Request</button>
          </section>
          <section className="backdrop">
            <button>New</button>
            <button>Old</button>
            <button>Recently Solved</button>
          </section>
          <section className="backdrop center">
            <h2>New Requests</h2>
            <div className="request-container">
              <button className="request-box">
                <img src="https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280x1280/products/434/8105/apilrbkt6__39717.1605628293.jpg?c=1"></img>
                <img src="https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280x1280/products/434/8105/apilrbkt6__39717.1605628293.jpg?c=1"></img>
                <img src="https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280x1280/products/434/8105/apilrbkt6__39717.1605628293.jpg?c=1"></img>
                <img src="https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280x1280/products/434/8105/apilrbkt6__39717.1605628293.jpg?c=1"></img>
                <img src="https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280x1280/products/434/8105/apilrbkt6__39717.1605628293.jpg?c=1"></img>
                <textarea className="request-text" readOnly>RPG Game: Has Charles Barkley as a playable character. Takes place in a post apocalyptic setting</textarea>
                <p className="post-date">
                  Posted: 12/16/2018
                </p>
              </button>
              <button className="request-box">
                <img src="https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280x1280/products/434/8105/apilrbkt6__39717.1605628293.jpg?c=1"></img>
                <img src="https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280x1280/products/434/8105/apilrbkt6__39717.1605628293.jpg?c=1"></img>
                <img src="https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280x1280/products/434/8105/apilrbkt6__39717.1605628293.jpg?c=1"></img>
                <img src="https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280x1280/products/434/8105/apilrbkt6__39717.1605628293.jpg?c=1"></img>
                <img src="https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280x1280/products/434/8105/apilrbkt6__39717.1605628293.jpg?c=1"></img>
                <textarea className="request-text" readOnly>RPG Game: Has Charles Barkley as a playable character. Takes place in a post apocalyptic setting</textarea>
                <p className="post-date">
                  Posted: 12/16/2018
                </p>
              </button>
              <button className="request-box">
                <img src="https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280x1280/products/434/8105/apilrbkt6__39717.1605628293.jpg?c=1"></img>
                <img src="https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280x1280/products/434/8105/apilrbkt6__39717.1605628293.jpg?c=1"></img>
                <img src="https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280x1280/products/434/8105/apilrbkt6__39717.1605628293.jpg?c=1"></img>
                <img src="https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280x1280/products/434/8105/apilrbkt6__39717.1605628293.jpg?c=1"></img>
                <img src="https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280x1280/products/434/8105/apilrbkt6__39717.1605628293.jpg?c=1"></img>
                <textarea className="request-text" readOnly>RPG Game: Has Charles Barkley as a playable character. Takes place in a post apocalyptic setting</textarea>
                <p className="post-date">
                  Posted: 12/16/2018
                </p>
              </button>
              <button className="request-box">
                <img src="https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280x1280/products/434/8105/apilrbkt6__39717.1605628293.jpg?c=1"></img>
                <img src="https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280x1280/products/434/8105/apilrbkt6__39717.1605628293.jpg?c=1"></img>
                <img src="https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280x1280/products/434/8105/apilrbkt6__39717.1605628293.jpg?c=1"></img>
                <img src="https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280x1280/products/434/8105/apilrbkt6__39717.1605628293.jpg?c=1"></img>
                <img src="https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280x1280/products/434/8105/apilrbkt6__39717.1605628293.jpg?c=1"></img>
                <textarea className="request-text" readOnly>RPG Game: Has Charles Barkley as a playable character. Takes place in a post apocalyptic setting</textarea>
                <p className="post-date">
                  Posted: 12/16/2018
                </p>
              </button>
            </div>
          </section>
        </section>
      </>
    )
  }
}

export default App;