import React, { Component } from 'react';
import SoundboardContext from '../SoundboardContext';
import { Link } from 'react-router-dom';
import Sound from '../Sound/Sound';

class SoundboardViewer extends Component {
    static contextType = SoundboardContext

    render() {
        return (
            <>
                <header>
                    <h1>Imperial Watch</h1>
                </header>
                <section className="group create-items">
                    <form>
                        <div>
                            <button>Fork Soundboard</button>
                        </div>
                    </form>
                </section>
                {this.context.soundboardEntries
                    .filter(e => e.soundboard_id === this.props.routeInfo.match.params.id)
                    .map(entry => (
                <Sound routeInfo={this.props.routeInfo} entry={entry}/>
                ))}
            </>
        )
    }
}

export default SoundboardViewer;