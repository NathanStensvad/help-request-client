import React from 'react';
import ReactDOM from 'react-dom';
import Soundboard from './Soundboard';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
    const div = document.createElement('div');

    const soundboard = {
        id: 2,
        name: "First Soundboard",
        user_id: 2
    }

    const testInfo = {
        match: {
            path: '/create'
        }
        
    }

    ReactDOM.render(<Soundboard routeInfo={testInfo} soundboard={soundboard}/>, div);
    ReactDOM.unmountComponentAtNode(div);
})