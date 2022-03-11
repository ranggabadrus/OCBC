import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenNavigationProp} from '../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dropdown from '../Components/Dropdown';
import FloatButton from '../Components/FloatButton';
import SvgComponent from '../Images/Transfer';
const styles = require('../styles');

interface Payee {
  accountNo: string;
  name: string;
  id: string;
}

export default function Transfer() {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [listPayee, setListPayee] = useState([]);
  const [payee, setPayee] = useState<Payee | undefined>(undefined);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [emptyPayee, setEmptyPayee] = useState(false);
  const [emptyAmount, setEmptyAmount] = useState(false);
  const [emptyDesc, setEmptyDesc] = useState(false);

  const fetchData = async () => {
    const token = await AsyncStorage.getItem('token');

    const getPayee = await fetch(
      'https://green-thumb-64168.uc.r.appspot.com/payees',
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );

    if (getPayee.ok) {
      const res = await getPayee.json();
      setListPayee(res.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const postTransfer = async () => {
    if (!payee || !amount || !description) {
      if (!payee) {
        setEmptyPayee(true);
      }
      if (!amount) {
        setEmptyAmount(true);
      }
      if (!description) {
        setEmptyDesc(true);
      }
      return;
    }
    setEmptyPayee(false);
    setEmptyAmount(false);
    setEmptyDesc(false);
    setLoading(true);

    const token = await AsyncStorage.getItem('token');
    console.log('token ', token);
    const post = await fetch(
      'https://green-thumb-64168.uc.r.appspot.com/transfer/',
      {
        method: 'post',
        body: JSON.stringify({
          receipientAccountNo: payee?.accountNo,
          amount: Number(amount),
          description,
        }),
        headers: {
          Authorization: `${token}`,
          'Content-type': 'application/json',
        },
      },
    );
    setLoading(false);
    if (post.ok) {
      const res = await post.json();
      ToastAndroid.show('Transfer success', 5000);
      navigation.navigate('Success', {
        payee,
        amount,
        description,
        transactionId: res.transactionId,
      });
    } else {
      const res = await post.json();
      navigation.navigate('Failed', {
        payee,
        amount,
        description,
        error: res.error,
      });
      //   ToastAndroid.show('Transfer failed', 5000);
    }
  };

  return (
    <View style={styles.transferContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        style={[styles.flex1]}
        keyboardVerticalOffset={50}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Dashboard')}
          style={styles.marginBottom}>
          <Icon name="keyboard-backspace" color="#000" size={24} />
        </TouchableOpacity>
        <SvgComponent />
        <Text
          style={[styles.textLarge, styles.marginBottom]}
          testID="transferID">
          Transfer
        </Text>
        <View style={styles.marginBottom}>
          <Dropdown
            name="Select Receipient"
            data={listPayee}
            onSelect={setPayee}
          />
          {emptyPayee && (
            <Text style={styles.textRed}>Receipient is required</Text>
          )}
        </View>

        <View style={styles.marginBottom}>
          <TextInput
            value={amount}
            keyboardType="numeric"
            onChangeText={e => setAmount(e)}
            placeholder={'Amount'}
            style={styles.formDefault}
          />
          {emptyAmount && (
            <Text style={styles.textRed}>Amount is required</Text>
          )}
        </View>
        <View style={styles.marginBottom}>
          <TextInput
            value={description}
            multiline={true}
            onChangeText={e => setDescription(e)}
            placeholder={'Description'}
            style={[styles.formDefault]}
            numberOfLines={3}
            textAlignVertical="top"
          />
          {emptyDesc && (
            <Text style={styles.textRed}>Description is required</Text>
          )}
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={
          payee && amount && description
            ? styles.floatBtnActive
            : styles.floatBtn
        }
        // style={{position: 'absolute', bottom: 0}}
        onPress={postTransfer}
        disabled={loading}>
        <Text style={[styles.textMedium, styles.textWhite]}>
          {loading ? 'Loading' : 'Transfer Now'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
