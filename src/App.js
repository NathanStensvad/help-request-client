import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import Browse from './Browse/Browse';
import Create from './Create/Create';
import SoundboardEditor from './SoundboardEditor/SoundboardEditor';
import SoundboardViewer from './SoundboardViewer/SoundboardViewer';
import STORE from './STORE';
import SoundboardContext from './SoundboardContext';
import AuthHelper from './AuthHelper';
import config from './config';


class App extends Component {

  state = {
    users: STORE.users,
    soundboards: [],
    soundboardEntries: [],
    user_id: 1,
    loginInfo: { user: null, token: null }
  }

  isLoggedIn = () => {  // true/false
    return !!this.state.loginInfo.token;
  }
  
  componentDidMount() {
    this.fetchSoundboards()

    const loginInfo = AuthHelper.getLoginInfo();

    if(loginInfo) {
      this.setState({ loginInfo });
    }
  }
  
  login = (loginInfo) => {
    this.setState({ loginInfo })
    AuthHelper.setLoginInfo(loginInfo)
  }

  fetchSoundboards = () => {
    fetch(config.API_ENDPOINT + `/api/users/${this.state.user_id}/soundboards`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(r => r.json())
      .then(data => {
        const soundboards = data.map((sb) => {
          const copy = { ...sb };
          delete copy.soundboardEntries;
          return copy;
        });
        const soundboardEntries = [];

        for (const sb of data) {
          for (const sbe of sb.soundboardEntries) {
            soundboardEntries.push({
              ...sbe,
              soundboard_id: sb.id
            })
          }
        }
        this.setState({ soundboards, soundboardEntries });
      })
  }

  //after hitting the save soundboard button in SoundboardEditor.js
  saveSoundboard = (soundboardId, entries, nameData, isPublic) => {
    console.log(this.state.soundboardEntries)
    const sounds = entries.map(e => ({
      soundboard_id: e.soundboard_id,
      file: e.file,
      activationKeysNumbers: e.activationKeysNumbers
    }));

    // delete all the old entries, then add all the (new) ones you got from the form
    
    this.deleteEntries(soundboardId, () => this.addSounds(...sounds));

    console.log(this.state.soundboardEntries)
 
    this.setState(prevState => ({
      soundboards: prevState.soundboards.map(
        e => parseInt(e.id) === parseInt(soundboardId) ? { ...e, name: nameData, public: isPublic } : e
      )
    }));

    console.log(this.state.soundboardEntries)
  }

  //delete the soundboard entries to make room for new entries for saveSoundboard function
  deleteEntries = (soundboardId, callback = null) => {
    //filter out the entries from the soundboard
    const newEntries = this.state.soundboardEntries.filter(
      entry => entry.soundboard_id !== soundboardId
    );

    console.log(typeof this.state.soundboardEntries[0].soundboard_id)
    console.log(typeof soundboardId)
    console.log(newEntries)

    //set the new state of the soundboard entries without the current soundboard entries
    this.setState({ soundboardEntries: newEntries }, callback);
  }

  //Takes the array of sounds and adds them to the soundboardEntries context
  addSounds = (...sounds) => {

    console.log(this.state.soundboardEntries)
    this.setState({
      soundboardEntries: [...this.state.soundboardEntries, ...sounds]
    })
    console.log(this.state.soundboardEntries)
  }

  //this will add a new sound for the saveSoundboard function
  /*addSound = (soundboard_id, file = "", activationKeysNumbers = []) => {
    this.addSounds({ soundboard_id, file, activationKeysNumbers })
  }*/

  deleteSoundboard = (soundboardId) => {
    const newSoundboards = this.state.soundboards.filter(
      soundboard => soundboard.id !== soundboardId
    );

    this.deleteEntries(
      soundboardId,
      () => this.setState({ soundboards: newSoundboards })
    );
  }

  //hardcode user
  //My solution for adding a new soundboard was to do another fetch. This seems inefficient and I need help here.
  newSoundboard = () => {
    const newSoundboard = {
      name: '',
      public: false,
      user_id: 1
    }

    fetch(config.API_ENDPOINT + '/api/soundboards', {
      method: 'POST',
      body: JSON.stringify(newSoundboard),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${AuthHelper.getToken()}`
      }
    })
      .then(r => {
        if(!r.ok) {
          return r.json().then(error => Promise.reject(error))
        }
        return r.json()
      })
      .then(
        this.fetchSoundboards() //This is basically another componentDidMount
      )
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })


    /*this.setState({
      soundboards: [...this.state.soundboards, newSoundboard],
    })*/
  }

  render() {
    const contextValue = {
      users: this.state.users,
      soundboards: this.state.soundboards,
      soundboardEntries: this.state.soundboardEntries,
      newSoundboard: this.newSoundboard,
      saveSoundboard: this.saveSoundboard,
      deleteSoundboard: this.deleteSoundboard,
      login: this.login,
      isLoggedIn: this.isLoggedIn,
      currentUser: this.state.loginInfo.user
    }

    console.log(this.state)

    return (
      <>
        <SoundboardContext.Provider value={contextValue}>
          <Router>
            <header>
              <h1>EXP Soundboard Manager</h1>
            </header>
            <section className="group nav">
              <Link to="/"><h2>How it works</h2></Link>
              <Link to="/browse"><h2>Browse</h2></Link>
              <Link to="/create"><h2>Create</h2></Link>
            </section>
            <div>
              <Route
                exact path="/"
                component={(match) => <Home
                  routeInfo={match}
                />}
              />
              <Route
                exact path="/browse"
                component={(match) => <Browse
                  routeInfo={match}
                />}
              />
              <Route
                exact path="/create"
                component={(match) => <Create
                  {...this.state}
                  routeInfo={match}
                />}
              />
              <Route
                path="/browse/:id"
                component={(match) => <SoundboardViewer
                  routeInfo={match}
                />}
              />
              <Route
                path="/create/:id"
                component={(match) => <SoundboardEditor
                  routeInfo={match}
                />}
              />
            </div>
          </Router>
        </SoundboardContext.Provider>
      </>
    )
  }
}

export default App;