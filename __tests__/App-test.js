import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from '../src/Components/Login';
import {
  render,
  fireEvent,
  waitFor,
  act,
  cleanup,
} from '@testing-library/react-native';
import Register from '../src/Components/Register';
import {useNavigation} from '@react-navigation/native';
import Dashboard from '../src/Pages/Dashboard';

jest.useFakeTimers();
// jest.runAllTimers();
jest.setTimeout(30000);

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});
afterEach(() => cleanup());

describe('Transaction Page', () => {});

describe('Dashboard Page ', () => {
  beforeEach(() => {
    fetch.mockResponses(
      [
        JSON.stringify({
          accountNo: '12345',
          balance: 111111,
          status: 'success',
        }),
      ],
      [
        JSON.stringify({
          status: 'success',
          data: [
            {
              transactionId: '622ba782f3aa395d71354900',
              amount: 100000,
              transactionDate: '2022-03-11T19:48:18.249Z',
              description: 'Default money-in transaction',
              transactionType: 'received',
              sender: {
                accountNo: '1111-111-1111',
                accountHolder: 'Jane',
              },
            },
          ],
        }),
      ],
    );
  });
  it('render dashboard with fetched data', async () => {
    const navigation = jest.fn();
    useNavigation.mockImplementation(() => ({
      navigate: navigation,
      addListener: navigation,
      replace: navigation,
    }));

    const {toJSON, getByTestId, findByTestId, findAllByTestId} = render(
      <Dashboard />,
    );

    await waitFor(async () => {
      const balance = getByTestId('balance', {}, {timeout: 2000});
      expect(balance.props.children).not.toEqual('NaN');
      const accountNo = getByTestId('accountNo', {}, {timeout: 2000});
      expect(accountNo.props.children).toEqual('12345');
      const transaction = getByTestId('transaction', {}, {timeout: 2000});
      expect(transaction.props.data).toHaveLength(1);
    });

    // expect(toJSON()).toMatchSnapshot();
  });

  it('from dashboard go to transfer page', async () => {
    const navigation = jest.fn();
    useNavigation.mockImplementation(() => ({
      navigate: navigation,
      addListener: navigation,
      replace: navigation,
    }));

    const {toJSON, getByTestId, findByTestId, findAllByTestId} = render(
      <Dashboard />,
    );

    await waitFor(async () => {
      const transfer = getByTestId('goToTransfer');
      fireEvent.press(transfer);
      expect(navigation).toHaveBeenCalledWith('Transfer');
    });

    expect(toJSON()).toMatchSnapshot();
  });

  it('open modal for detail transaction', async () => {
    const navigation = jest.fn();
    useNavigation.mockImplementation(() => ({
      navigate: navigation,
      addListener: navigation,
      replace: navigation,
    }));

    const {toJSON, getByTestId, findByTestId, findAllByTestId} = render(
      <Dashboard />,
    );

    await waitFor(async () => {
      const button = getByTestId('detail');
      fireEvent.press(button);
      const detailModal = getByTestId('detailModal');
      expect(detailModal.props.visible).toEqual(true);
    });

    expect(toJSON()).toMatchSnapshot();
  });
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
