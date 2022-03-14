import React, {useRef} from 'react';
import Transfer from '../src/Pages/Transfer';
import {renderHook} from '@testing-library/react-hooks';
import {
  render,
  fireEvent,
  waitFor,
  act,
  cleanup,
} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';

jest.mock('react', () => {
  const actualNav = jest.requireActual('react');
  return {
    ...actualNav,
    useRef: jest.fn(),
  };
});

describe('Transaction Page', () => {
  beforeEach(() => {
    fetch.mockResponses(
      JSON.stringify({
        status: 'success',
        data: [
          {
            accountNo: '0000',
            name: 'rangga',
            id: '123',
          },
        ],
      }),
    );
  });

  it('render transfer page and fetch payee', async () => {
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

    const {toJSON, getByTestId} = render(<Transfer />);

    const button = getByTestId('buttonPayee');
    fireEvent.press(button);
    const modal = getByTestId('modalPayee');
    expect(modal.props.visible).toEqual(true);

    await waitFor(() => {
      const listPayee = getByTestId('listPayee', {}, {timeout: 2000});
      expect(listPayee.props.data).toHaveLength(1);
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('make a succes transfer', async () => {
    const navigation = jest.fn();
    useNavigation.mockImplementation(() => ({
      navigate: navigation,
    }));

    const ref = jest.fn();

    useRef.mockImplementation(() => ({
      current: ref,
    }));

    const {toJSON, getByTestId, queryByTestId, findByTestId} = render(
      <Transfer />,
    );

    fetch.mockResponseOnce(
      JSON.stringify({
        status: 'success',
        transactionId: '622f40e82e6bac609dfa0068',
        amount: '123',
        description: 'description',
        recipientAccount: '9226-178-8806',
      }),
    );

    const buttonPayee = getByTestId('buttonPayee');
    fireEvent.press(buttonPayee);
    const modalPayee = getByTestId('modalPayee');
    expect(modalPayee.props.visible).toEqual(true);

    await waitFor(async () => {
      const listPayee = queryByTestId('listPayee', {}, {timeout: 2000});
      expect(listPayee.props.data).toHaveLength(1);
      const selectPayee = queryByTestId('selectPayee');
      fireEvent.press(selectPayee);
      const payeeName = getByTestId('payeeName');
      expect(payeeName.props.children).not.toEqual('Select Receipient');

      const amountForm = getByTestId('amountForm');
      fireEvent.changeText(amountForm, '123');

      const descriptionForm = getByTestId('descriptionForm');
      fireEvent.changeText(descriptionForm, 'description');

      const button = getByTestId('transferNow');
      fireEvent.press(button);
    });

    expect(navigation).toBeCalledWith('Success', {
      amount: '123',
      description: 'description',
      transactionId: '622f40e82e6bac609dfa0068',
      payee: {accountNo: '0000', id: '123', name: 'rangga'},
    });
  });

  it('Validation text appear when fields are empty', async () => {
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

    const {toJSON, getByTestId, queryByTestId} = render(<Transfer />);

    await waitFor(() => {
      const amount = queryByTestId('emptyAmount');
      const payee = queryByTestId('emptyPayee');
      const description = queryByTestId('emptyDescription');
      const button = getByTestId('transferNow');
      fireEvent.press(button);

      expect(amount).not.toBeNull();
      expect(payee).not.toBeNull();
      expect(description).not.toBeNull();
    });
    expect(toJSON()).toMatchSnapshot();
  });
});
