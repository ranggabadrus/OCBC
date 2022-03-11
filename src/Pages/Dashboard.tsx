import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  ToastAndroid,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenNavigationProp} from '../../App';
import Card from '../Components/Card';
import FloatButton from '../Components/FloatButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFormat} from '../Utils/useFormat';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CurveBottom from '../Components/CurveBottom';
import Curve from '../Components/Curve';

const styles = require('../styles');

interface ModalProp {
  amount: number;
  description: string;
  person: {accountNo: string; accountHolder: string};
  transactionDate: any;
  transactionId: string;
  transactionType: string;
}

interface BalanceProp {
  accountNo: string;
  balance: number;
  status: string;
}

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState([]);
  const [balance, setBalance] = useState<BalanceProp | null>(null);
  const [modal, setModal] = useState<ModalProp | null>(null);
  const [isLogout, setIsLogout] = useState(false);
  const [visibleLogout, setVisibleLogout] = useState(false);
  const navigation = useNavigation<ScreenNavigationProp>();
  const moveAside = useRef(new Animated.Value(55)).current; // Initial value for opacity: 0

  const fetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const getData = await Promise.all([
        fetch('https://green-thumb-64168.uc.r.appspot.com/balance', {
          headers: {
            Authorization: `${token}`,
          },
        }),
        fetch('https://green-thumb-64168.uc.r.appspot.com/transactions', {
          headers: {
            Authorization: `${token}`,
          },
        }),
      ]);

      if (getData[0].ok && getData[1].ok) {
        const res = await Promise.all(getData.map(async e => await e.json()));

        setBalance(res[0]);
        setTransaction(res[1].data);
      } else {
        ToastAndroid.show('Session expired', 7000);
        await AsyncStorage.removeItem('token');
        navigation.replace('Auth');
      }
      setLoading(false);
    } catch (error) {
      console.log('catch ', error);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('username').then(e => {
      if (e) {
        setUsername(e);
      }
    });

    fetchData();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return () => {
      unsubscribe;
      setBalance(null);
      setTransaction([]);
    };
  }, [navigation]);

  const animationLogout = () => {
    Animated.timing(moveAside, {
      toValue: visibleLogout ? 55 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setVisibleLogout(!visibleLogout);
  };

  if (loading) {
    return <ActivityIndicator color={'navy'} size="large" />;
  }

  return (
    <View style={styles.flex1}>
      <Curve color="navy" />
      <Animated.View
        style={[
          styles.logout,
          {
            transform: [{translateX: moveAside}],
          },
        ]}>
        <TouchableOpacity onPress={animationLogout} style={styles.row}>
          <Icon name="logout-variant" size={24} color="gray" />
          <TouchableOpacity
            style={styles.ml5}
            onPress={async () => setIsLogout(true)}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>
      <View style={[styles.header]}>
        <Text style={styles.textMedium}>You have</Text>
        <Text style={[styles.textLarge]}>
          SGD${useFormat(balance?.balance)}
        </Text>
        <Text>Account No</Text>
        <Text style={styles.textMedium}>{balance?.accountNo}</Text>
        <Text>Account Holder</Text>
        <Text style={styles.textMedium}>{username}</Text>
      </View>
      <View style={styles.body}>
        <Text style={[styles.textMedium, styles.marginBottom10]}>
          Your transaction history
        </Text>
        <FlatList
          data={transaction}
          renderItem={({item}: any) => {
            const person =
              item.transactionType == 'transfer'
                ? item.receipient
                : item.sender;
            return (
              <TouchableOpacity
                onPress={() => {
                  setModal({...item, person});
                }}>
                <Card {...item} person={person} />
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => `${index}`}
          contentContainerStyle={{paddingBottom: 50}}
        />
      </View>
      <FloatButton
        task={() => navigation.navigate('Transfer')}
        text={'Make Transfer'}
      />
      <CurveBottom color="navy" />
      <Modal
        isVisible={modal ? true : false}
        onBackdropPress={() => setModal(null)}
        onBackButtonPress={() => setModal(null)}>
        <View style={styles.modalContainer}>
          <Text style={[styles.textMedium, styles.textCenter]}>
            Details Transaction
          </Text>
          <Text></Text>
          <Text>
            Transaction type:{' '}
            <Text style={[styles.bold, styles.textBlack]}>
              {modal?.transactionType.toUpperCase()}
            </Text>
          </Text>
          <Text>
            {new Date(modal?.transactionDate).toLocaleString()}{' '}
            <Icon name="clock" size={20} />
          </Text>

          <Text></Text>
          <Text style={[styles.bold, styles.textBlack]}>SENDER</Text>
          <View style={styles.row}>
            <Text style={styles.text}>Name:</Text>
            <Text style={styles.bold}>: {username}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Account:</Text>
            <Text style={styles.bold}>: {balance?.accountNo}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Amount: </Text>
            <Text style={styles.bold}>: SGD${useFormat(modal?.amount)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Description: </Text>
            <Text style={styles.bold}>: {modal?.description}</Text>
          </View>

          <Text></Text>
          <Text style={[styles.bold, styles.textBlack]}>RECEIPIENT</Text>
          <View style={styles.row}>
            <Text style={styles.text}>Name</Text>
            <Text style={styles.bold}>: {modal?.person.accountHolder}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Account</Text>
            <Text style={styles.bold}>: {modal?.person.accountNo}</Text>
          </View>

          <Text>{}</Text>
          <View style={styles.row}>
            <Text style={styles.text}>Transaction Id:</Text>
            <Text style={styles.bold}>: {modal?.transactionId}</Text>
          </View>
          <TouchableOpacity
            style={styles.close}
            onPress={() => {
              setModal(null);
            }}>
            <Text style={styles.textWhite}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        isVisible={isLogout}
        onBackdropPress={() => setIsLogout(false)}
        onBackButtonPress={() => setIsLogout(false)}>
        <View style={styles.modalContainer}>
          <Text style={[styles.textCenter, styles.padding20]}>
            Whoops.. Are you sure?
          </Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.optionYes}
              onPress={async () => {
                // setIsLogout(false);
                await AsyncStorage.removeItem('token');
                navigation.replace('Auth');
              }}>
              <Text style={styles.textGray}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionNo}
              onPress={async () => {
                setIsLogout(false);
              }}>
              <Text style={[styles.textWhite, styles.bold]}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
