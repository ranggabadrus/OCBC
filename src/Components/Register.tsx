import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {ScreenNavigationProp} from '../../App';
const styles = require('../styles');

export default function Register({
  button,
  setOnTyping,
  setPage,
}: {
  button: String;
  setOnTyping: Function;
  setPage: Function;
}) {
  const navigation = useNavigation<ScreenNavigationProp>();

  const [username, setUsername] = useState('rangga2');
  const [password, setPassword] = useState('rangga2');
  const [confirmPassword, setConfirmPassword] = useState('rangga2');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emptyUsername, setEmptyUsername] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [emptyConfirmPassword, setEmptyConfirmPassword] = useState(false);
  const [missmatchPassword, setMissmatchPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (
      !username ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword
    ) {
      if (!username) {
        setEmptyUsername(true);
      } else {
        setEmptyUsername(false);
      }
      if (!password) {
        setEmptyPassword(true);
      } else {
        setEmptyPassword(false);
      }
      if (!confirmPassword) {
        setEmptyConfirmPassword(true);
      } else {
        setEmptyConfirmPassword(false);
      }
      if (password !== confirmPassword) {
        setMissmatchPassword(true);
      } else {
        setMissmatchPassword(false);
      }

      return;
    }

    setEmptyPassword(false);
    setEmptyUsername(false);
    setEmptyConfirmPassword(false);
    setMissmatchPassword(false);
    setLoading(true);

    try {
      const postRegister = await fetch(
        'https://green-thumb-64168.uc.r.appspot.com/register',
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

      if (postRegister.ok) {
        const res = await postRegister.json();
        await AsyncStorage.setItem('token', res.token);
        await AsyncStorage.setItem('username', username);
        ToastAndroid.show('Welcome ' + username, ToastAndroid.LONG);
        setUsername('');
        setPassword('');
        setLoading(false);
        navigation.replace('Dashboard');
      } else {
        const res = await postRegister.json();
        setLoading(false);
        ToastAndroid.show('Register failed: ' + res.error, ToastAndroid.LONG);
      }
    } catch (error) {
      console.log('errror ', error);
    }
  };

  return (
    <LinearGradient
      style={styles.login}
      colors={['navy', '#17285e', '#17285e', '#17285e', 'navy']}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.form}>
        <View style={[styles.row, styles.between]}>
          <Text style={styles.textWhite}>Email</Text>
          <Icon name="email" size={24} color="#fff" />
        </View>
        <TextInput
          value={username}
          onChangeText={e => setUsername(e)}
          onFocus={() => setOnTyping(true)}
          onBlur={() => setOnTyping(false)}
          placeholderTextColor={'gray'}
          placeholder="rangga@ocbc.com"
          style={styles.formEmail}
        />
        {emptyUsername && (
          <Text style={styles.textRed}>Username is required</Text>
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
          <Text style={styles.textRed}>Password is required</Text>
        )}
      </View>
      <View style={styles.form}>
        <View style={[styles.row, styles.between]}>
          <Text style={styles.textWhite}>Confirm Password</Text>
          <View style={styles.row}>
            <Icon name="key" size={24} color="#fff" />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Icon
                name={showConfirmPassword ? 'eye' : 'eye-off'}
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>
        <TextInput
          onFocus={() => setOnTyping(true)}
          onBlur={() => setOnTyping(false)}
          onChangeText={e => setConfirmPassword(e)}
          value={confirmPassword}
          secureTextEntry={!showConfirmPassword}
          placeholderTextColor={'gray'}
          placeholder="123456"
          style={styles.formEmail}
        />
        {emptyConfirmPassword && (
          <Text style={styles.textRed}>Password is required</Text>
        )}
        {missmatchPassword && (
          <Text style={styles.textRed}>Confirm password is missmatch</Text>
        )}
      </View>

      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={register}
          disabled={loading}>
          <Text style={styles.textBlack}>
            {loading ? 'Loading...' : button}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
