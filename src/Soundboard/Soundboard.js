import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SoundBoardContext from '../SoundboardContext'

function generateJSONFile(json) {
    const contents = JSON.stringify({ soundboardEntries: json });
    const fileBlob = new Blob([contents], { type: 'data:application/json' });
    return window.URL.createObjectURL(fileBlob);
}

class Soundboard extends Component {
    static contextType = SoundBoardContext;

    handleDownload = e => {
        e.preventDefault()
        const download = this.context.soundboardEntries
            .filter(soundboard => soundboard.soundboard_id === this.props.soundboard.id)
            .map(
                ({ file, activationKeysNumbers }) => ({ file, activationKeysNumbers })
            )
        console.log(this.props.soundboard.name)
        console.log(download)

        const file = generateJSONFile(download)
        const name = this.props.soundboard.name;
        const a = document.createElement('a');
        a.href = file;
        a.download = `${name}.json`;
        a.click();
        a.remove();
    }

    handleFork = e => {
        e.preventDefault()
        console.log("Feature not implemented")
        /*console.log(this.props.soundboard.id)
        console.log(this.context.soundboardEntries
                    .filter(soundboard => soundboard.soundboard_id === this.props.soundboard.id))*/
    }

    render() {
        let routePath = this.props.routeInfo.match.path
        return (
            <>
                <section className="how" key={this.props.soundboard.id}>
                    <Link to={`${routePath}/${this.props.soundboard.id}`}><h3>{this.props.soundboard.name}</h3></Link>
                    <p>{this.context.soundboardEntries.filter(e => this.props.soundboard.id === e.soundboard_id).length} sounds</p>
                    {/*<p>Created by: {this.context.users.find(e => this.props.soundboard.user_id === e.id).name}</p>*/}
                    <button onClick={this.handleDownload}>Download</button>
                </section>
            </>
        )
    }
}

export default Soundboard;