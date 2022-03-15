import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const styles = require('../styles');

export default function Failed({route, navigation}: any) {
  const {error, description, amount, payee} = route.params;
  return (
    <View style={[styles.flex1, styles.bgDefault]}>
      <View style={styles.success}>
        <Text style={[styles.textLarge, styles.textCenter]}>
          Alamakk..! {'\n'}😬{' '}
        </Text>
        <Icon name="cash-remove" size={150} color={'red'} />

        <View style={{}}>
          <Text style={[styles.textBlack, styles.textCenter]}>
            You've unsuccessfully transfer{' '}
            <Text style={[styles.bold, styles.textRed]}>SGD${amount}</Text> to{' '}
            {payee.name}
          </Text>
          <View style={styles.successDetails}>
            <View style={[styles.row, styles.between]}>
              <Text>Account Receipient: </Text>
              <Text style={styles.bold}>{payee.accountNo}</Text>
            </View>
            <View style={[styles.row, styles.between]}>
              <Text>Description: </Text>
              <Text style={styles.bold}>{description}</Text>
            </View>

            <View style={[styles.row, styles.between]}>
              <Text>Problem: </Text>
              <Text style={styles.bold}>{error}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.row]}>
        <TouchableOpacity
          style={styles.btnFailedOutline}
          onPress={() => navigation.navigate('Transfer')}
          testID="tryAgain">
          <Text style={[styles.textMedium, styles.textBlack]}>Try again</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnFailed}
          onPress={() => navigation.navigate('Dashboard')}
          testID="goDashboardFailed">
          <Text style={[styles.textMedium, styles.textWhite]}>Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
