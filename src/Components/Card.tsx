import {View, Text} from 'react-native';
import React from 'react';
import {useFormat} from '../Utils/useFormat';
const styles = require('../styles');

interface Item {
  amount: number;
  description: string;
  person: {accountNo: string; accountHolder: 'string'};
  transactionDate: string;
  transactionId: string;
  transactionType: string;
}

export default function Card({
  amount,
  description,
  person,
  transactionDate,
  transactionType,
}: Item) {
  const time = new Date(transactionDate).toLocaleString();
  return (
    <View style={styles.card}>
      <Text>{time}</Text>
      <View style={[styles.row, styles.between]}>
        <View>
          <Text>{person.accountHolder}</Text>
          <Text>{person.accountNo}</Text>
        </View>
        <View>
          {transactionType == 'received' ? (
            <Text style={[styles.textGreen, styles.bold]}>
              +SGD${useFormat(amount)}
            </Text>
          ) : (
            <Text style={[styles.textRed, styles.bold]}>
              -SGD${useFormat(amount)}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
