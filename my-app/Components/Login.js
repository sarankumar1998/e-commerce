import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserId } from '../UserContext/UserContext';



const apiBaseUrl = 'http://192.168.0.63:8080/api/v1/login';


const Login = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailValidation, setEmailValidation] = useState('');
  const [passwordValidation, setPasswordValidation] = useState('');
  // const { userId, setUserId } = useUserId();

  // useEffect(() => {
  //   if (isFocused) {
  //     setUserId(null);
  //     AsyncStorage.removeItem('userId'); 
  //   }
  // }, [isFocused]);

  const handleFocus = (inputName) => {
    if (inputName === 'email') {
      setIsEmailFocused(true);
      setEmailValidation('');
    } else if (inputName === 'password') {
      setIsPasswordFocused(true);
      setPasswordValidation('');
    }
  };

  const handleBlur = (inputName) => {
    if (inputName === 'email') setIsEmailFocused(false);
    else if (inputName === 'password') setIsPasswordFocused(false);
  };
  const handleLogin = async () => {
    setEmailValidation('');
    setPasswordValidation('');

    if (!email && !password) {
      setEmailValidation('Please enter email');
      setPasswordValidation('Please enter password');
      return;
    } else if (!email) {
      setEmailValidation('Please enter email');
      return;
    } else if (!password) {
      setPasswordValidation('Please enter password');
      return;
    }

    const user = {
      email,
      password,
    };

    setIsLoading(true);
    try {
      const response = await axios.post(apiBaseUrl, user);
      if (response.status === 200) {
        navigation.navigate('HomeChild');
        await AsyncStorage.setItem('userId', JSON.stringify(response.data.user)) }
    } catch (error) {
      if (error.response) {
        console.log(`error.response.status`, error.response.status);
        if (error.response && error.response.status === 401) {
          setEmailValidation('Invalid email or password');
          setPasswordValidation('Invalid email or password');
        } else if (error.response.status === 400) {
          Alert.alert("Invalid Data", "Fill the missing fields");
        } 
        else if (error.response.status === 404) {
          Alert.alert("Invalid Data", "User not found");
        } else {
          console.log("Server Error:", error.response.status);
        }
      } else {
        console.log("Network Erroeeer:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={[
          styles.input,
          { borderColor: isEmailFocused ? '#58c791' : 'gray' }
        ]}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        onFocus={() => handleFocus('email')}
        onBlur={() => handleBlur('email')}
      />
      <Text style={styles.errors} >{emailValidation}</Text>

      <TextInput
        style={[
          styles.input,
          { borderColor: isPasswordFocused ? '#58c791' : 'gray' }
        ]}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        onFocus={() => handleFocus('password')}
        onBlur={() => handleBlur('password')}
      />
      <Text style={styles.errors}>{passwordValidation}</Text>

      <Pressable style={styles.button} onPress={handleLogin}>

        <Text style={styles.buttonText}>LOGIN</Text>
      </Pressable>

      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{ color: 'black' }}
      />

      <Text style={styles.newAcc}>
        Don't have an account? <Text style={{ color: '#58c791' }} onPress={() => navigation.navigate('Signup')}>Sign up here</Text>
      </Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    marginTop: 150,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '95%',
    height: 45,
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 30,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#58c791',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    borderRadius: 20,
    width: '55%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  newAcc: {
    marginTop: 25,
  },
  errors: {
    alignItems: 'flex-start',
    color: 'red',
  }
});

export default Login;
