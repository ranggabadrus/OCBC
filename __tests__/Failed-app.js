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
import Failed from '../src/Pages/Failed';

describe('Failed Page', () => {
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
      <Failed route={params} navigation={navigation} />,
    );

    const onceAgain = getByTestId('tryAgain');
    fireEvent.press(onceAgain);

    expect(navigation.navigate).toBeCalledWith('Transfer');
  });

  it('navigate to dashboard', async () => {
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
      <Failed route={params} navigation={navigation} />,
    );

    const dashboard = getByTestId('goDashboardFailed');
    fireEvent.press(dashboard);

    expect(navigation.navigate).toBeCalledWith('Dashboard');
  });
});
