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
//import config from './config';


class App extends Component {

  state = {
    users: STORE.users,
    soundboards: STORE.soundboards,
    soundboardEntries: STORE.soundboardEntries
  }

  componentDidMount() {
    console.log(this.state);
  }
  
  addSound = (soundboard_id, file="", activationKeysNumbers=[]) => {
    const newSoundboardEntry = {
      soundboard_id,
      file,
      activationKeysNumbers
    }

    this.setState( {
      soundboardEntries: [...this.state.soundboardEntries, newSoundboardEntry]
    })
    console.log(this.state)
  }

  saveSoundboard = (soundboardId, entries) => {
    console.log(entries)
    console.log(soundboardId)
    this.deleteEntries(soundboardId);
    entries.map(e => this.addSound(e.soundboard_id, e.file, e.activationKeysNumbers));
  }

  deleteEntries = (soundboardId) => {
    const newEntries = this.state.soundboardEntries.filter(
      (entry) => entry.soundboard_id !== soundboardId
    );

    this.setState({ soundboardEntries: newEntries });
    console.log(this.state)
  }

  render() {
    const contextValue = {
      users: this.state.users,
      soundboards: this.state.soundboards,
      soundboardEntries: this.state.soundboardEntries,
      addSound: this.addSound,
      saveSoundboard: this.saveSoundboard
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