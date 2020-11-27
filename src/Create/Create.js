import React, { Component } from 'react';
import SoundboardContext from '../SoundboardContext';
import Soundboard from '../Soundboard/Soundboard';

class Create extends Component {
    static contextType = SoundboardContext

    //New soundboard for the designated user
    handleNewSoundboard = e => {
        this.context.newSoundboard(this.context.currentUser.id);
    }

    //This is the component for the user's own soundboards that he can edit
    render() {

        console.log(this.context.currentUser)

        var showSoundboards

        if(this.context.currentUser === null) {
            showSoundboards = <><h2>Log in to create soundboards</h2></>
        }
        else {
            showSoundboards = this.context.soundboards
            .filter(soundboard => soundboard.user_id === this.context.currentUser.id)
            .map(soundboard => (
                <Soundboard soundboard={soundboard} routeInfo={this.props.routeInfo} key={soundboard.id}/>
            ))
        }

        //hardcode user
        return (
            <>
                <section>
                    <h3>My Soundboards</h3>
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
                <button onClick={this.handleNewSoundboard}>+ New Soundboard</button>
                {showSoundboards}
            </>
        )
    }
}

export default Create;