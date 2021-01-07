import React, { Component } from 'react';
import SoundboardContext from '../SoundboardContext'
import config from '../config';

class Home extends Component {
    static contextType = SoundboardContext

    logoutSubmitted = e => {
        e.preventDefault();
        this.context.logout()
    }

    loginSubmitted = e => {
        e.preventDefault();
        const name = e.currentTarget.name.value
        const password = e.currentTarget.password.value

        fetch(config.API_ENDPOINT + '/api/login', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ name, password })
        })
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json()
            })
            .then(this.context.login)
            .catch(e => {
                alert("Couldn't log in")
                console.log(e)
            })
    }
    render() {
        return (
            <>
                {this.context.isLoggedIn()
                    ?
                    <>
                        <div>Logged in as {this.context.currentUser.name}</div>
                        <button onClick={this.logoutSubmitted}>Logout</button>
                    </>
                    :
                    <form className="how" onSubmit={this.loginSubmitted}>
                        <label>Sign in: </label>
                        <input name="name" type="text" placeholder="User Name"></input>
                        <input name="password" type="password" placeholder="Password"></input>
                        <button>Sign in</button>
                        <p><br />Demo username: username
                        <br />Demo password: password
                        </p>
                    </form>}
                <section className="how center">
                    <h3>About the EXP soundboard</h3>
                    <p>
                        EXP soundboard is a soundboard program that lets you create soundboards for the EXP soundboard program.
                        It's useful with a virtual audio cable to play sounds into a video game, voice chat application or some other medium.
                        This app lets you browse user created soundboards and create soundboards for use in the EXP soundboard program
                    </p>
                    <p>(Insert picture of EXP soundboard app)</p>
                </section>
                <section className="how center">
                    <h3>Browse</h3>
                    <p>
                        Browse our current selection of soundboards or user created soundboards.
                        You can select a soundboard and download it or you can edit it to your own preference.
                        Currently there are no actual sounds implemented.
                    </p>
                    <p>(Insert picture of browsing)</p>
                </section>
                <section className="how center">
                    <h3>Create</h3>
                    <p>
                        This is a step by step process for creating a soundboard. <br />
                        See the video if you want to fully set up EXP Soundboard <br />
                        To test out the program all you need is the EXP Soundboard Download
                    </p>
                    <a href="https://youtu.be/NYGuEY0WdSw" target="_blank">Video</a>
                    <br />
                    <a href="https://sourceforge.net/projects/expsoundboard/" target="_blank">EXP Soundboard Download</a>
                </section>
                <section className="how center">
                    <p>
                        First thing you have to do is set up a folder for your soundboards and sound files<br />
                        This part is not completely user friendly yet so you will need to follow a few steps.<br />
                        I suggest using your documents to save your soundboards<br /><br />
                        1. Navigate to your main drive and go to users and find your user name.<br /><br />
                        <img src="pictures/4.1.png" alt="Title and Sounds 1" /><br />
                        <img src="pictures/4.2.png" alt="Title and Sounds 2" /><br />
                        <img src="pictures/4.3.png" alt="Title and Sounds 3" /><br /><br />
                        2. Create a folder in your documents for your soundboards. (I called mine EXP-Soundboards)<br /><br />
                        <img src="pictures/4.4.png" alt="Create Soundboard Directory" /><br /><br />
                        3. Create a folder inside EXP-Soundboards with your soundboard name.<br /><br />
                        <img src="pictures/4.5.png" alt="Create Soundboard Folder" /><br /><br />
                        4. Download sound files from somewhere(freesound.org for example) and place them inside that folder.<br /><br />
                        <img src="pictures/4.6.png" alt="Add Files" /><br /><br />
                        5. Create a new Soundboard in the app.<br /><br />
                        <img src="/pictures/1.png" alt="New Soundboard Step 1-1" /><br /><br/>
                        6. Type in a title and add sounds.<br/><br/>
                        <img src="pictures/3.png" alt="Title and Sounds" /><br/><br/>
                        7. In the app, write down your file path as shown in the picture.<br />
                        For example, if my user name is "Nathan", soundboard is "The Word", and my sound is "bird.mp3", <br />I would write "C:\Users\Nathan\Documents\EXP-Soundboards\The Word\bird.mp3"
                        To streamline the process from there, every time you add a new sound, just copy the whole string and replace the last sound name (bird.mp3) with another sound.
                    </p>
                </section>
            </>
        )
    }
}

export default Home;