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
import Success from '../src/Pages/Success';

describe('Success Page', () => {
  it('render all data', async () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const params = {
      params: {
        transactionId: '123',
        description: 'description',
        amount: 123,
        payee: {name: 'rangga', accountNo: 123},
      },
    };
    const {toJSON, getByTestId, queryByTestId, findByTestId} = render(
      <Success route={params} navigation={navigation} />,
    );

    const payeeAccountNo = getByTestId('payeeAccountNoSuccess');
    const payeeName = getByTestId('payeeNameSuccess');
    const descriptionSuccess = getByTestId('descriptionSuccess');
    const transactionID = getByTestId('transactionIdSuccess');
    expect(payeeAccountNo.props.children).toEqual(123);
    expect(payeeName.props.children).toEqual('rangga');
    expect(descriptionSuccess.props.children).toEqual('description');
    expect(transactionID.props.children).toEqual('123');
  });

  it('navigate to transfer page again', async () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const params = {
      params: {
        transactionId: '123',
        description: 'description',
        amount: 123,
        payee: {name: 'rangga', accountNo: 123},
      },
    };
    const {toJSON, getByTestId, queryByTestId, findByTestId} = render(
      <Success route={params} navigation={navigation} />,
    );

    const payeeAccountNo = getByTestId('payeeAccountNoSuccess');
    const payeeName = getByTestId('payeeNameSuccess');
    expect(payeeAccountNo.props.children).toEqual(123);
    expect(payeeName.props.children).toEqual('rangga');
    const onceAgain = getByTestId('onceAgain');
    fireEvent.press(onceAgain);

    expect(navigation.navigate).toBeCalledWith('Transfer');
  });

  it('navigate to dashboard page', async () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const params = {
      params: {
        transactionId: '123',
        description: 'description',
        amount: 123,
        payee: {name: 'rangga', accountNo: 123},
      },
    };
    const {toJSON, getByTestId, queryByTestId, findByTestId} = render(
      <Success route={params} navigation={navigation} />,
    );

    const payeeAccountNo = getByTestId('payeeAccountNoSuccess');
    const payeeName = getByTestId('payeeNameSuccess');
    expect(payeeAccountNo.props.children).toEqual(123);
    expect(payeeName.props.children).toEqual('rangga');
    const dashboard = getByTestId('goDashboardSuccess');
    fireEvent.press(dashboard);

    expect(navigation.navigate).toBeCalledWith('Dashboard');
  });
});
