import {View, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Svg, {Circle} from 'react-native-svg';

export default function Curve({color = '#fff'}: {color?: string}) {
  const screenWidth = Dimensions.get('screen').width;
  return (
    <>
      <View style={styles.curve}>
        <Svg height={500} width={screenWidth}>
          <Circle
            cx={-50}
            cy={-300}
            r={500}
            fill={color}
            stroke="navy"
            strokeWidth="2"
          />
        </Svg>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {color: '#000'},
  curve: {
    top: 0,
    position: 'absolute',
  },
});
