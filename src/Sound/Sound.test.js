import React from 'react';
import ReactDOM from 'react-dom';
import Sound from './Sound';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const entry = {
        activationKeysNumbers: [45, 23],
        file: "Test Sound",
        soundboard_id: 2
    }
    ReactDOM.render(<Sound entry={entry}/>, div);
    ReactDOM.unmountComponentAtNode(div);
})