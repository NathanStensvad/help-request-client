import React from 'react';
import ReactDOM from 'react-dom';
import Create from './Create';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Create />, div);
    ReactDOM.unmountComponentAtNode(div);
})