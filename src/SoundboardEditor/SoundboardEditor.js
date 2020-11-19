import React, { Component } from 'react';
import SoundboardContext from '../SoundboardContext';
import Sound from '../Sound/Sound';
import config from '../config';

class SoundboardEditor extends Component {
    static contextType = SoundboardContext

    //The soundboard won't save until you hit the save soundboard button so I created a state here for the sounds from context
    constructor(props) {
        super(props);
        this.state = {
            soundArray: [],
            title: "",
            public: false
        }
    }

    //When the component is mounted, it finds the entries for the current soundboard and sets the state with those entries
    componentDidMount() {
        const soundboardId = this.props.routeInfo.match.params.id;
        const soundArray = this.context.soundboardEntries.filter(
            e => e.soundboard_id === soundboardId).map(
                (s) => ({ ...s, activationKeysNumbers: s.activationKeysNumbers.map(String) })
            )
        const title = this.context.soundboards.find(soundboard => soundboard.id === soundboardId).name
        const isPublic = this.context.soundboards.find(soundboard => soundboard.id === soundboardId).public
        this.setState({
            soundArray: soundArray,
            title: title,
            public: isPublic
        })
    }

    //The soundArray state will update when you change the input values
    updateField = (index, fieldName, newValue) => {

        const { soundArray } = this.state;
        soundArray[index][fieldName] = newValue;

        this.setState({ soundArray });
    }

    updateTitle = (e) => {
        const newTitle = e.currentTarget.value

        this.setState({ title: newTitle })

    }

    updatePublic = (e) => {
        const isPublic = e.currentTarget.checked

        this.setState({ public: isPublic })
    }

    //function when you add a new sound. Generates an empty input and adds it to the state
    handleAddSound = e => {
        e.preventDefault();
        const soundboardId = this.props.routeInfo.match.params.id;
        const newSoundboardEntry = {

            soundboard_id: soundboardId,
            file: "",
            activationKeysNumbers: []
        }

        this.setState({
            soundArray: [...this.state.soundArray, newSoundboardEntry]
        })
    }

    //This function uses context to save all the sounds to the soundboardEntries context
    handleSaveSoundboard = e => {
        e.preventDefault();
        const soundboardId = this.props.routeInfo.match.params.id;
        const isFilled = (sound) => (!!sound.file && !!sound.activationKeysNumbers && !!sound.activationKeysNumbers.length);

        //The activation numbers need to be split for an array
        const soundData = this.state.soundArray.map(s => (
            {
                ...s,
                activationKeysNumbers: s.activationKeysNumbers.map(
                    k => Number(k.trim())
                ).filter(
                    k => !Number.isNaN(k)
                )
            }
        )).filter(isFilled);
        const titleData = this.state.title
        const isPublic = this.state.public

        const soundboard = {
            title: titleData,
            public: isPublic,
            soundboardentries: soundData
        }

        //this.context.saveSoundboard(soundboardId, soundData, titleData, isPublic)

        fetch(config.API_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(soundboard),
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => Promise.reject(error))
            }
            return res.json()
        })
        .then(
            data => console.log(data)
            //data => this.context.saveSoundBoard(data)
        )

    }

    handleDeleteSoundboard = e => {
        e.preventDefault();

        const soundboardId = this.props.routeInfo.match.params.id;

        var deleteConfirmation = window.confirm("Are you sure you want to delete this soundboard?");

        if (deleteConfirmation) {
            this.context.deleteSoundboard(soundboardId)
            this.props.routeInfo.history.push('/create');
        }
    }

    //this renders a form with Sound components
    render() {
        console.log(this.state)

        return (
            <>
                <header>
                    <input type="text" id={`soundboardTitle`} className="file-text center" value={this.state.title} onChange={this.updateTitle}></input>
                </header>
                <section className="create-items">
                    <form>
                        <div>
                            <label htmlFor="public">Public:</label>
                            <input form="soundform" type="checkbox" onChange={this.updatePublic} checked={this.state.public} id="public"></input>
                        </div>
                        <div>
                            <button form="soundform" onClick={e => this.handleSaveSoundboard(e)}>Save Soundboard</button>
                            <br />
                            <button onClick={e => this.handleDeleteSoundboard(e)}>Delete Soundboard</button>
                        </div>
                    </form>

                </section>
                <form id="soundform">
                    {this.state.soundArray
                        .map((entry, index) => (
                            <Sound routeInfo={this.props.routeInfo} entry={entry} index={index} key={index} onChange={this.updateField} />
                        ))}
                </form>
                <section>
                    <button onClick={e => this.handleAddSound(e)}>Add Sound</button>
                </section>
            </>
        )
    }
}

export default SoundboardEditor;