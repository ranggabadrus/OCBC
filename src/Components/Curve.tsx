import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Svg, {Circle, Ellipse, Path} from 'react-native-svg';

export default function Title() {
  // console.log("Dimensions.get('screen').width", Dimensions.get('screen').width);
  const screenWidth = Dimensions.get('screen').width;
  return (
    <>
      <View style={styles.curve}>
        {/* <Svg height={200} width={screenWidth}>
        <Ellipse cx={-50} cy={0} ry={200} rx={screenWidth} fill="pink" />
      </Svg> */}
        <Svg height={500} width={screenWidth}>
          <Circle cx={-50} cy={-300} r={500} fill="#fff" />
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
