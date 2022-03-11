import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const styles = require('../styles');

export default function Success({route, navigation}: any) {
  const {transactionId, description, amount, payee} = route.params;
  return (
    <View style={[styles.flex1, styles.bgDefault]}>
      <View style={styles.success}>
        <Text style={[styles.textLarge, styles.textCenter]}>
          Hoorray..! {'\n'}🥳{' '}
        </Text>
        <Icon name="cash-check" size={150} color={'#20cb9d'} />

        <View style={{}}>
          <Text style={[styles.textBlack, styles.textCenter]}>
            You've successfully transfer{' '}
            <Text style={[styles.bold, styles.textRed]}>SGD${amount}</Text> to{' '}
            {payee.name}
          </Text>
          <View style={styles.successDetails}>
            <View style={[styles.row, styles.between]}>
              <Text>Account Receipient:</Text>
              <Text style={styles.bold}> {payee.accountNo}</Text>
            </View>
            <View style={[styles.row, styles.between]}>
              <Text>Description:</Text>
              <Text style={styles.bold}> {description}</Text>
            </View>

            <View style={[styles.row, styles.between]}>
              <Text>Transaction ID:</Text>
              <Text style={styles.bold}> {transactionId}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.row]}>
        <TouchableOpacity
          style={styles.btnSuccessOutline}
          onPress={() => navigation.navigate('Transfer')}>
          <Text style={[styles.textMedium, styles.textNavy]}>Once again</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnSuccess}
          onPress={() => navigation.navigate('Dashboard')}>
          <Text style={[styles.textMedium, styles.textWhite]}>Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
