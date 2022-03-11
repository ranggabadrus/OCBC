/**
 * @format
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
// import App from '../App';

// Note: test renderer must be required after react-native.
import renderer, {act, create} from 'react-test-renderer';
import Login from '../src/Components/Login';
import Auth from '../src/Pages/Auth';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {TouchableOpacity, View, Text, TextInput} from 'react-native';
import Register from '../src/Components/Register';
import App from '../App';
import FloatButton from '../src/Components/FloatButton';

jest.useFakeTimers();
jest.runAllTimers();

describe('Auth Section', () => {
  test('Register page appear when user press register button ', async () => {
    const {getByTestId, getByText, queryByTestId, toJSON, queryAllByTestId} =
      render(<Auth />);

    const button = getByTestId('registerButton');
    fireEvent.press(button);

    await waitFor(() => {
      expect(queryByTestId('registerPage')).toBeTruthy();
    });
  });

  test('Login page appear when user press login button ', async () => {
    const {getByTestId, getByText, queryByTestId, toJSON, queryAllByTestId} =
      render(<Auth />);

    const button = getByTestId('loginButton');
    fireEvent.press(button);

    await waitFor(() => {
      expect(queryByTestId('loginPage')).toBeTruthy();
    });
  });
});

describe('Login page', () => {
  // test('Go to dashboard page if credential corrects', async () => {
  //   const {findByText, getByTestId} = render(<FloatButton />);

  // await waitFor(async () => {
  //   await expect(AsyncStorage.getItem).toBeCalledWith('token');
  // });
  // const dashboard = await findByText('You have');
  // console.log('dashboard ', dashboard);
  // expect(dashboard).toBeTruthy();

  // const username = getByTestId('username');
  // fireEvent.changeText(username, 'rangga1');

  // const password = getByTestId('password');
  // fireEvent.changeText(password, 'rangga1');

  // const button = getByTestId('login');
  // fireEvent.press(button);
  // const push = jest.fn();
  // const button = await getByTestId('goToTransfer');
  // fireEvent.press(button);
  // expect(push).toBeCalledWith('Transfer');
  // console.log('button ', button.props.onClick);
  // fireEvent(button, 'press');
  // const text = await getByTestId('transferID');
  // expect(text).toBeTruthy();
  // });
  test('Validation text appear when username is empty ', async () => {
    const {getByTestId, getByText, queryByTestId, toJSON, queryAllByTestId} =
      render(<Login />);

    const button = getByTestId('login');
    fireEvent.press(button);

    await waitFor(() => {
      expect(queryByTestId('emptyUsername')).toBeTruthy();
      expect(queryByTestId('emptyPassword')).toBeTruthy();
    });
  });
});

describe('Register page', () => {
  test('Validation text appear when username is empty ', async () => {
    const {getByTestId, getByText, queryByTestId, toJSON, queryAllByTestId} =
      render(<Register />);

    const button = getByTestId('register');
    fireEvent.press(button);

    await waitFor(() => {
      expect(queryByTestId('emptyRegisterUsername')).toBeTruthy();
      expect(queryByTestId('emptyRegisterPassword')).toBeTruthy();
      expect(queryByTestId('emptyRegisterConfirmPassword')).toBeTruthy();
    });
  });
});
