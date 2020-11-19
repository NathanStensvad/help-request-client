import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
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
  
  
  //after hitting the save soundboard button in SoundboardEditor.js
  saveSoundboard = (soundboardId, entries, nameData, isPublic) => {
    const sounds = entries.map(e => ({
      soundboard_id: e.soundboard_id,
      file: e.file,
      activationKeysNumbers: e.activationKeysNumbers
    }));

    // delete all the old entries, then add all the (new) ones you got from the form
    this.deleteEntries(soundboardId,
      () => this.addSounds(...sounds));

    this.setState(prevState => ({
      soundboards: prevState.soundboards.map(
        e => e.id === soundboardId ? { ...e, name: nameData, public: isPublic}: e
      )
    }));
  }

  //delete the soundboard entries to make room for new entries for saveSoundboard function
  deleteEntries = (soundboardId, callback=null) => {
    //filter out the entries from the soundboard
    const newEntries = this.state.soundboardEntries.filter(
      (entry) => entry.soundboard_id !== soundboardId
    );

    //set the new state of the soundboard entries without the current soundboard entries
    this.setState({ soundboardEntries: newEntries }, callback);
  }

  addSounds = (...sounds) => {

    this.setState( {
      soundboardEntries: [...this.state.soundboardEntries, ...sounds]
    })
  }

  //this will add a new sound for the saveSoundboard function
  addSound = (soundboard_id, file="", activationKeysNumbers=[]) => {
    this.addSounds({soundboard_id, file, activationKeysNumbers})
  }

  deleteSoundboard = (soundboardId) => {
    const newSoundboards = this.state.soundboards.filter(
      soundboard => soundboard.id !== soundboardId
    );

    this.deleteEntries(
      soundboardId,
      () => this.setState({ soundboards: newSoundboards})
    );
  }

  newSoundboard = () => {
    const newSoundboard = {
      id: (parseInt(this.state.soundboards[this.state.soundboards.length-1].id) + 1).toString(),
      name: '',
      public: false,
      user_id: "1"
    }

    this.setState({
      soundboards: [...this.state.soundboards, newSoundboard],
    })
  }

  render() {
    const contextValue = {
      users: this.state.users,
      soundboards: this.state.soundboards,
      soundboardEntries: this.state.soundboardEntries,
      newSoundboard: this.newSoundboard,
      saveSoundboard: this.saveSoundboard,
      deleteSoundboard: this.deleteSoundboard,
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