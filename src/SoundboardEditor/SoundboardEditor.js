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
            name: "",
            public: false
        }
    }

    //When the component is mounted, it finds the entries for the current soundboard and sets the state with those entries
    componentDidMount() {
        const soundboardId = Number(this.props.routeInfo.match.params.id);
        const soundArray = this.context.soundboardEntries.filter(
            e => e.soundboard_id === soundboardId).map(
                (s) => ({ ...s, activationKeysNumbers: s.activationKeysNumbers.map(String) })
            )
        const soundboard = this.context.soundboards.find(soundboard => soundboard.id === soundboardId)
        if(!soundboard) return;
        const name = soundboard.name
        const isPublic = soundboard.public
        this.setState({
            soundArray: soundArray,
            name: name,
            public: isPublic
        })
    }

    //The soundArray state will update when you change the input values
    updateField = (index, fieldName, newValue) => {

        const { soundArray } = this.state;
        soundArray[index][fieldName] = newValue;

        this.setState({ soundArray });
    }

    updateName = (e) => {
        const newName = e.currentTarget.value

        this.setState({ name: newName })

    }

    updatePublic = (e) => {
        const isPublic = e.currentTarget.checked

        this.setState({ public: isPublic })
    }

    //function when you add a new sound. Generates an empty input and adds it to the state
    handleAddSound = e => {
        e.preventDefault();
        const soundboardId = parseInt(this.props.routeInfo.match.params.id);
        const newSoundboardEntry = {

            soundboard_id: soundboardId,
            file: "",
            activationKeysNumbers: []
        }

        this.setState({
            soundArray: [...this.state.soundArray, newSoundboardEntry]
        })
    }

    handleDeleteSound = index => {
        const newSounds = this.state.soundArray.filter(
            (sound, i) => i !== index
        )

        this.setState({ soundArray: newSounds })
    }

    //This function uses context to save all the sounds to the soundboardEntries context
    handleSaveSoundboard = e => {
        e.preventDefault();
        const soundboardId = parseInt(this.props.routeInfo.match.params.id);
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

        const nameData = this.state.name
        const isPublic = this.state.public

        const soundboard = {
            name: nameData,
            public: isPublic,
            soundboardEntries: soundData
        }

        fetch(config.API_ENDPOINT + `/api/soundboards/${soundboardId}`, {
            method: 'PATCH',
            body: JSON.stringify(soundboard),
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                this.context.saveSoundboard(soundboardId, soundData, nameData, isPublic)
                this.props.routeInfo.history.push('/create')
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })

    }

    handleDeleteSoundboard = e => {
        e.preventDefault();

        const soundboardId = parseInt(this.props.routeInfo.match.params.id);

        var deleteConfirmation = window.confirm("Are you sure you want to delete this soundboard?");

        if (deleteConfirmation) {
            fetch(config.API_ENDPOINT + `/api/soundboards/${soundboardId}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(res => {
                    if (!res.ok) {
                        return res.json().then(error => Promise.reject(error))
                    }
                    this.context.deleteSoundboard(soundboardId)
                    this.props.routeInfo.history.push('/create');
                })
        }
    }

    //this renders a form with Sound components
    render() {

        console.log(this.state.soundArray)
        return (
            <>
                <header>
                    <input type="text" id={`soundboardName`} className="file-text center" value={this.state.name} onChange={this.updateName}></input>
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
                            <Sound routeInfo={this.props.routeInfo} entry={entry} index={index} key={index} isSoundboardEditor={true} onChange={this.updateField} onDelete={this.handleDeleteSound} />
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