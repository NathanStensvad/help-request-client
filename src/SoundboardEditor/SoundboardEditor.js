import React, { Component } from 'react';
import SoundboardContext from '../SoundboardContext';
import { Link } from 'react-router-dom';
import Sound from '../Sound/Sound';

class SoundboardEditor extends Component {
    static contextType = SoundboardContext

    constructor(props) {
        super(props);
        this.state = {soundArray: []}
    }

    componentDidMount() {
        const soundboardId = this.props.routeInfo.match.params.id;
        const soundArray = this.context.soundboardEntries.filter(
            e => e.soundboard_id === soundboardId).map(
                (s) => ({...s, activationKeysNumbers: s.activationKeysNumbers.map(String) })
            )

        this.setState( {
            soundArray: soundArray
        })
    }

    updateField = (index, fieldName, newValue) => {

        const {soundArray} = this.state;
        soundArray[index][fieldName] = newValue;

        this.setState({ soundArray });
    }

    handleAddSound = e => {
        e.preventDefault();
        const soundboardId = this.props.routeInfo.match.params.id;
        const newSoundboardEntry = {
            
            soundboard_id: soundboardId,
            file: "",
            activationKeysNumbers: []
          }

        this.setState( {
            soundArray: [...this.state.soundArray, newSoundboardEntry]
        })
    }

    handleSaveSoundboard = e => {
        e.preventDefault();
        const soundboardId = this.props.routeInfo.match.params.id;
        const data = this.state.soundArray.map(s => (
            {
                ...s, 
                activationKeysNumbers: s.activationKeysNumbers.map(
                    k => Number(k.trim())
                ).filter(
                    k => !Number.isNaN(k)
                )
            }
        ));
        console.log(data)
        this.context.saveSoundboard(soundboardId,data)
    }

    handleDeleteSoundboard = e => {
        e.preventDefault();
        console.log('hi')
    }

    render() {
        const soundboardId = this.props.routeInfo.match.params.id;

        return (
            <>
                <header>
                    <h1>{this.context.soundboards.find(e=> e.id === soundboardId).name}</h1>
                </header>
                <section className="create-items">
                    <form>
                        <div>
                            <label htmlFor="public">Public:</label>
                            <input type="checkbox" id="public"></input>
                        </div>
                        <div>
                            <button form="soundform" onClick={e => this.handleSaveSoundboard(e)}>Save Soundboard</button>
                            <br/>
                            <button onClick={e => this.handleDeleteSoundboard(e)}>Delete Soundboard</button>
                        </div>
                    </form>
                    
                </section>
                <form id="soundform">
                {this.state.soundArray
                    .map((entry, index) => (
                        <Sound routeInfo={this.props.routeInfo} entry={entry} index={index} key={index} onChange={this.updateField}/>
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