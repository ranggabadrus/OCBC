import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';

import Curve from '../Components/Curve';
import Register from '../Components/Register';
import Login from '../Components/Login';
import CurveBottom from '../Components/CurveBottom';
const styles = require('../styles');
const OCBC = require('../Images/ocbc.png');

export default function Auth() {
  const [page, setPage] = useState('Login');
  const [onTyping, setOnTyping] = useState(false);

  return (
    <View style={styles.container}>
      <View style={onTyping ? styles.activeLogo : styles.logo}>
        <Text style={[styles.textBlack, styles.textLarge]}>OCBC</Text>
        <Image source={OCBC} style={styles.image} />
      </View>
      <Curve />
      <View style={styles.sideMenu}>
        <TouchableOpacity
          style={page == 'Login' ? styles.btnActive : styles.btnInactive}
          onPress={() => setPage('Login')}>
          <Text style={page == 'Login' ? styles.textBlack : styles.textWhite}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={page == 'Register' ? styles.btnActive : styles.btnInactive}
          onPress={() => setPage('Register')}>
          <Text
            style={page == 'Register' ? styles.textBlack : styles.textWhite}>
            Register
          </Text>
        </TouchableOpacity>
      </View>

      {page == 'Login' ? (
        <Login button={page} setOnTyping={setOnTyping} />
      ) : (
        <Register button={page} setPage={setPage} setOnTyping={setOnTyping} />
      )}
      <CurveBottom />
    </View>
  );
}
