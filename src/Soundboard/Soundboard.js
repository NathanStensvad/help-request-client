import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SoundBoardContext from '../SoundboardContext'

function generateJSONFile(json) {
    const contents = JSON.stringify(json);
    const fileBlob = new Blob([contents], {type: 'application/json'});
    return window.URL.createObjectURL(fileBlob);
}

class Soundboard extends Component {
    static contextType = SoundBoardContext;

    handleDownload = e => {
        e.preventDefault()
        const download = this.context.soundboardEntries
        .filter(soundboard => soundboard.soundboard_id === this.props.soundboard.id)
        .map(
            ({file, activationKeysNumbers}) => ({file, activationKeysNumbers})
        )
        console.log(this.props.soundboard.name)
        console.log(download)

        const example = {text: "hello"}

        const file = generateJSONFile(download)
        window.open(file);
    }

    render() {
        let routePath = this.props.routeInfo.match.path

        let forkButton;
        if(this.props.isBrowse) {
            forkButton = <button>Fork</button>
        }
        else {
            forkButton = <></>
        }

        return (
            <>
                <section className="how" key={this.props.soundboard.id}>
                    <Link to={`${routePath}/${this.props.soundboard.id}`}><h3>{this.props.soundboard.name}</h3></Link>
                    <p>{this.context.soundboardEntries.filter(e => this.props.soundboard.id === e.soundboard_id).length} sounds</p>
                    <p>Created by: {this.context.users.find(e => this.props.soundboard.user_id === e.id).name}</p>
                    <button onClick={this.handleDownload}>Download</button>
                    {forkButton}
                </section>
            </>
        )
    }
}

export default Soundboard;