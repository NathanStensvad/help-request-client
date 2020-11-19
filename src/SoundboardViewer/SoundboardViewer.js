import React, { Component } from 'react';
import SoundboardContext from '../SoundboardContext';
import Sound from '../Sound/Sound';

class SoundboardViewer extends Component {
    static contextType = SoundboardContext

    updateField = e => {

    }

    render() {
        return (
            <>
                <header>
                    <h1>Imperial Watch</h1>
                </header>
                <section className="create-items">
                    <form>
                        <div>
                            <button>Fork Soundboard</button>
                        </div>
                    </form>
                </section>
                {this.context.soundboardEntries
                    .filter(e => e.soundboard_id === this.props.routeInfo.match.params.id)
                    .map((entry,index) => (
                <Sound routeInfo={this.props.routeInfo} entry={entry} index={index} key={index} onChange={this.updateField}/>
                ))}
            </>
        )
    }
}

export default SoundboardViewer;