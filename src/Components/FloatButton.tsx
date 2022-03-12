import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
const styles = require('../styles');

export default function FloatButton({
  task,
  text,
  loading = false,
  active = false,
}: {
  task: any;
  text: string;
  loading?: boolean;
  active?: boolean;
}) {
  return (
    <View style={styles.float}>
      <TouchableOpacity
        testID="goToTransfer"
        style={active ? styles.floatBtnActive : styles.floatBtn}
        onPress={task}
        disabled={loading}>
        <Text style={[styles.textMedium, styles.textWhite]}>
          {loading ? 'Loading' : text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
