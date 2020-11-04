import React, { Component } from 'react';
import SoundboardContext from '../SoundboardContext'

class Home extends Component {
    static contextType = SoundboardContext

    render() {
        return (
            <>
                <section className="how center">
                    <h3>About the EXP soundboard</h3>
                    <p>
                        EXP soundboard is a soundboard program that lets you assign different sounds to a soundboard and play them using keyboard keys. It's useful with a virtual audio cable to play sounds into a video game or some other medium. This app lets you browse user created soundboards and create soundboards for use in the EXP soundboard program
                    </p>
                    <p>(Insert picture of EXP soundboard app)</p>
                </section>
                <section className="how center">
                    <h3>Browse</h3>
                    <p>
                        Browse our current selection of soundboards or user created soundboards that use sounds from freesound.org. You can select a soundboard and download it or you can edit it to your own preference.
                    </p>
                    <p>(Insert picture of browsing)</p>
                </section>
                <section className="how center">
                    <h3>Create</h3>
                    <p>
                        Create your own soundboard with sounds from freesound.org. Search a song on freesound.org and paste the id from the sound to add it. Then assign a key press to your sounds. Our personal recommendation is to use the numpad to assign your keys. When you're done you can save your soundboard and download it for use in the EXP soundboard program.
                    </p>
                    <p>(Show some creation instruction pictures)</p>
                </section>
                <form className="how">
                    <label>Sign in: </label>
                    <input name="username" type="text" placeholder="User Name"></input>
                    <input name="password" type="text" placeholder="Password"></input>
                    <button>Sign in</button>
                </form>
            </>
        )
    }
}

export default Home;