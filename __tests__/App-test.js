/**
 * @format
 */

import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Auth from '../src/Pages/Auth';

it('renders correctly', () => {
  console.log('run this');
  renderer.create(<Auth />);
});
