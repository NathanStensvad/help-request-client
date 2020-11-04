import React, { Component } from 'react';
import SoundboardContext from '../SoundboardContext';
import { Link } from 'react-router-dom';
import Soundboard from '../Soundboard/Soundboard';

class Browse extends Component {
    static contextType = SoundboardContext

    render() {
        return (
            <>
                <section>
                    <h3>User Created Soundboards</h3>
                </section>
                {/*
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
                */}
                {this.context.soundboards
                .filter(soundboard => soundboard.public === true)
                .map(soundboard => (
                    <Soundboard soundboard={soundboard} routeInfo={this.props.routeInfo} isBrowse={true} key={soundboard.id}/>
                ))}
            </>
        )
    }
}

export default Browse;