import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import reducer from './store/reducer';

const store = createStore(reducer);

test('Navigation renders', () => {

});
