import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState, FC} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {ScreenNavigationProp} from '../../App';
const styles = require('../styles');

export default function Login({
  button,
  setOnTyping,
  testID,
}: {
  testID: string;
  button: String;
  setOnTyping: Function;
}) {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [emptyUsername, setEmptyUsername] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('token').then(e => {
      if (e) {
        navigation.replace('Dashboard');
      }
    });
  }, []);

  const login = async () => {
    if (!username || !password) {
      if (!username) {
        setEmptyUsername(true);
      }
      if (!password) {
        setEmptyPassword(true);
      }
      return;
    }
    setEmptyPassword(false);
    setEmptyUsername(false);
    setLoading(true);
    try {
      const postLogin = await fetch(
        'https://green-thumb-64168.uc.r.appspot.com/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        },
      );

      if (postLogin.ok) {
        const res = await postLogin.json();
        await AsyncStorage.setItem('token', res.token);
        await AsyncStorage.setItem('username', username);
        ToastAndroid.show('Welcome ' + username, ToastAndroid.LONG);
        setUsername('');
        setPassword('');
        setLoading(false);
        navigation.replace('Dashboard');
      } else {
        setLoading(false);
        const res = await postLogin.json();

        ToastAndroid.show('Login failed: ' + res.error, ToastAndroid.LONG);
      }
    } catch (error) {
      console.log('errror ', error);
      setLoading(false);
      ToastAndroid.show('Login failed: ', ToastAndroid.LONG);
    }
  };

  return (
    <LinearGradient
      testID={testID}
      style={styles.login}
      colors={['navy', '#17285e', '#17285e', '#17285e', 'navy']}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.form}>
        <View style={[styles.row, styles.between]}>
          <Text style={styles.textWhite}>Email</Text>
          <Icon name="email" size={24} color="#fff" />
        </View>
        <TextInput
          onFocus={() => setOnTyping(true)}
          onBlur={() => setOnTyping(false)}
          value={username}
          onChangeText={e => setUsername(e)}
          placeholderTextColor={'gray'}
          placeholder="rangga"
          style={styles.formEmail}
          testID="username"
        />
        {emptyUsername && (
          <Text testID="emptyUsername" style={styles.textRed}>
            Username is required
          </Text>
        )}
      </View>
      <View style={styles.form}>
        <View style={[styles.row, styles.between]}>
          <Text style={styles.textWhite}>Password</Text>
          <View style={styles.row}>
            <Icon name="key" size={24} color="#fff" />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? 'eye' : 'eye-off'}
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>
        <TextInput
          onFocus={() => setOnTyping(true)}
          onBlur={() => setOnTyping(false)}
          value={password}
          onChangeText={e => setPassword(e)}
          secureTextEntry={!showPassword}
          placeholderTextColor={'gray'}
          placeholder="123456"
          style={styles.formEmail}
        />
        {emptyPassword && (
          <Text testID="emptyPassword" style={styles.textRed}>
            Password is required
          </Text>
        )}
      </View>
      {/* <Text style={styles.textWhite}>Forget password?</Text> */}
      <View style={styles.containerButton}>
        <TouchableOpacity
          testID="login"
          style={styles.buttonLogin}
          onPress={login}
          disabled={loading}>
          <Text style={styles.textBlack}>{loading ? 'Loading' : button}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
