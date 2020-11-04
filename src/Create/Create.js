import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SoundboardContext from '../SoundboardContext';
import Soundboard from '../Soundboard/Soundboard';

class Create extends Component {
    static contextType = SoundboardContext

    //This is the component for the user's own soundboards that he can edit
    render() {
        return (
            <>
                <section>
                    <h3>My Soundboards</h3>
                </section>
                <form>
                    <label htmlFor="search">Search:  </label>
                    <input type="text" id="search"></input>
                </form>
                <section>
                    <label htmlFor="sort">Sort By: </label>
                    <select name="sort" id="sort">
                        <option value="alphabetical">alphabetical</option>
                        <option value="size">size</option>
                        <option value="username">user name</option>
                    </select>

                </section>
                <Link to="/create">+ New Soundboard</Link>
                {this.context.soundboards
                .filter(soundboard => soundboard.user_id === this.context.users[0].id)
                .map(soundboard => (
                    <Soundboard soundboard={soundboard} routeInfo={this.props.routeInfo}/>
                ))}
            </>
        )
    }
}

export default Create;