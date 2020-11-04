import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SoundBoardContext from '../SoundboardContext'

class Soundboard extends Component {
    static contextType = SoundBoardContext;

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
                    <button>Download</button>
                    {forkButton}
                </section>

            </>
        )
    }
}

export default Soundboard;