import React, {useRef} from 'react';
import {
  render,
  fireEvent,
  waitFor,
  act,
  cleanup,
} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import Dashboard from '../src/Pages/Dashboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('react', () => {
  const actualNav = jest.requireActual('react');
  return {
    ...actualNav,
    useRef: jest.fn(),
  };
});

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

    const ref = jest.fn();

    useRef.mockImplementation(() => ({
      current: ref,
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

    const ref = jest.fn();

    useRef.mockImplementation(() => ({
      current: ref,
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

    // expect(toJSON()).toMatchSnapshot();
  });
});
