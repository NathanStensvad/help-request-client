import React, { Component } from 'react';
import SoundBoardContext from '../SoundboardContext'

class Sound extends Component {
    static contextType = SoundBoardContext;
    //This uses the onChange prop from soundboard editor to update the current value of the file
    updateFile = (e) => {
        const newFile = e.currentTarget.value;
        this.props.onChange(this.props.index, 'file', newFile);
    }

    //Same as updateFile but for the activation keys
    updateActivationKeys = (e) => {
        const keyStr = e.currentTarget.value;
        const keys = keyStr.split(',')

        this.props.onChange(this.props.index, 'activationKeysNumbers', keys);
    }

    handleDelete = e => {
        e.preventDefault()
        this.props.onDelete(this.props.index)
    }

    render() {

        console.log(this.props.entry)

        let deleteButton;

        if(this.props.isSoundboardEditor) {
            deleteButton = <button onClick={this.handleDelete}>Delete</button>
        }
        else {
            deleteButton = <></>
        }

        return (
            <>
                <section className="how">
                    <label htmlFor={`file${this.props.index}`}>File name: </label>
                    <input type="text" id={`file${this.props.index}`} className="file-text" value={this.props.entry.file} onChange={this.updateFile}></input>
                    <br />
                    <label htmlFor={`activationKeysNumbers${this.props.index}`}> Activation Keys: </label>
                    <input type="text" id={`activationKeysNumbers${this.props.index}`} value={this.props.entry.activationKeysNumbers.join()} onChange={this.updateActivationKeys}></input>
                    <br />
                    {deleteButton}
                </section>
            </>
        )
    }
}

export default Sound;