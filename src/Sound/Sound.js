import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SoundBoardContext from '../SoundboardContext'

class Sound extends Component {
    static contextType = SoundBoardContext;

    updateFile = (e) => {
        const newFile = e.currentTarget.value;
        this.props.onChange(this.props.index, 'file', newFile);
    }

    updateActivationKeys = (e) => {
        const keyStr = e.currentTarget.value;
        const keys = keyStr.split(',')

        this.props.onChange(this.props.index, 'activationKeysNumbers', keys);
    }

    render() {
        return (
            <>
                <section className="how">
                    <label htmlFor={`file${this.props.index}`}>File name: </label>
                    <input type="text" id={`file${this.props.index}`} className="file-text" value={this.props.entry.file} onChange={this.updateFile}></input>
                    <br />
                    <label htmlFor={`activationKeysNumbers${this.props.index}`}> Activation Keys: </label>
                    <input type="text" id={`activationKeysNumbers${this.props.index}`} value={this.props.entry.activationKeysNumbers.join()} onChange={this.updateActivationKeys}></input>
                </section>
            </>
        )
    }
}

export default Sound;