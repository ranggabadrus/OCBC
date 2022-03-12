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
import FloatButton from '../src/Components/FloatButton';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Dashboard from '../src/Pages/Dashboard';
import Transfer from '../src/Pages/Transfer';

jest.useFakeTimers();
jest.runAllTimers();
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});
describe('Login page', () => {
  test('Validation text appear when fields are empty ', async () => {
    const {getByTestId, getByText, queryByTestId, toJSON, queryAllByTestId} =
      render(<Login />);

    const button = getByTestId('login');
    fireEvent.press(button);

    await waitFor(() => {
      expect(queryByTestId('emptyUsername')).toBeTruthy();
      expect(queryByTestId('emptyPassword')).toBeTruthy();
    });
  });

  test('Go to dashboard page and save token if credential corrects', async () => {
    const navigation = jest.fn();
    useNavigation.mockImplementation(() => ({replace: navigation}));

    const {findByText, getByTestId, debug, queryByText, toJSON, queryByTestId} =
      render(<Login />);

    beforeEach(() => {
      fetch.resetMocks();
    });

    fetch.mockResponseOnce(
      JSON.stringify({
        status: 'success',
        token: '12345',
        username: 'rangga',
      }),
    );

    const username = getByTestId('username');
    fireEvent.changeText(username, 'rangga');

    const password = getByTestId('password');
    fireEvent.changeText(password, 'rangga');

    const button = getByTestId('login');
    fireEvent.press(button);

    fetch('https://green-thumb-64168.uc.r.appspot.com/login').then(res => {
      expect(res.username).toEqual('rangga');
    });

    await waitFor(() => {
      expect(AsyncStorage.setItem).toBeCalledWith('token', '12345');
      expect(AsyncStorage.setItem).toBeCalledWith('username', 'rangga');
      expect(navigation).toHaveBeenCalledWith('Dashboard');
    });
  });
});

describe('Register page', () => {
  test('Validation text appear when fields are empty ', async () => {
    const {getByTestId, getByText, queryByTestId, toJSON} = render(
      <Register />,
    );

    const button = getByTestId('register');
    fireEvent.press(button);

    await waitFor(() => {
      expect(queryByTestId('emptyRegisterUsername')).toBeTruthy();
      expect(queryByTestId('emptyRegisterPassword')).toBeTruthy();
      expect(queryByTestId('emptyRegisterConfirmPassword')).toBeTruthy();
    });
  });

  test('Go to dashboard page and save token if register success', async () => {
    const navigation = jest.fn();
    useNavigation.mockImplementation(() => ({replace: navigation}));

    const {findByText, getByTestId, debug, queryByText, toJSON, queryByTestId} =
      render(<Register />);

    beforeEach(() => {
      fetch.resetMocks();
    });

    fetch.mockResponseOnce(
      JSON.stringify({
        status: 'success',
        token: '12345',
        username: 'rangga',
      }),
    );

    const username = getByTestId('registerUsername');
    fireEvent.changeText(username, 'rangga');

    const password = getByTestId('registerPassword');
    fireEvent.changeText(password, 'rangga');

    const confirmPassword = getByTestId('registerConfirmPassword');
    fireEvent.changeText(confirmPassword, 'rangga');

    const button = getByTestId('register');
    fireEvent.press(button);

    fetch('https://green-thumb-64168.uc.r.appspot.com/register').then(res => {
      expect(res.username).toEqual('rangga');
    });

    await waitFor(() => {
      expect(AsyncStorage.setItem).toBeCalledWith('token', '12345');
      expect(AsyncStorage.setItem).toBeCalledWith('username', 'rangga');
      expect(navigation).toHaveBeenCalledWith('Dashboard');
    });
  });
});
