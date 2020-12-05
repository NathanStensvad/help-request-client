import React from 'react';
import ReactDOM from 'react-dom';
import SoundboardEditor from './SoundboardEditor';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
    const div = document.createElement('div');

    const soundboard = {
        id: 2,
        name: "First Soundboard",
        user_id: 2
    }

    const testInfo = {
        match: {
            params: {
                id: 2
            },
            path: '/create'
        }
        
    }

    ReactDOM.render(<BrowserRouter><SoundboardEditor routeInfo={testInfo} soundboard={soundboard}/></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
})