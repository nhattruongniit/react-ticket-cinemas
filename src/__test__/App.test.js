import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

it('snapshot renders correcty', () => {
  const render = renderer.create(<App/>).toJSON();
  expect(render).toMatchSnapshot();
})

