import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import logo from '../assets/logo-ui.jpg';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

const apiBaseUrl = 'http://192.168.1.111:8080/api/v1/signup';

const Signup = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [maritalStatus, setMaritalStatus] = useState('');
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleFocus = (inputName) => {
    if (inputName === 'username') setIsUsernameFocused(true);
    else if (inputName === 'email') setIsEmailFocused(true);
    else if (inputName === 'password') setIsPasswordFocused(true);
  };

  const handleBlur = (inputName) => {
    if (inputName === 'username') setIsUsernameFocused(false);
    else if (inputName === 'email') setIsEmailFocused(false);
    else if (inputName === 'password') setIsPasswordFocused(false);
  };

  const handleMaritalStatusChange = (status) => {
    setMaritalStatus(status);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(false);
    setDob(currentDate);
  };

  const onFinish = async () => {
    if (!username || !email || !password || !dob || !maritalStatus) {
      Alert.alert('Invalid Data', 'Please fill in all the fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Data', 'Please enter a valid email address');
      return;
    }
    const user = {
      username,
      email,
      password,
      dob,
      maritalStatus
    };
    try {
      const response = await axios.post(apiBaseUrl, user)
      if (response.status === 200) {
        Alert.alert("Successfully signed up");
        navigation.navigate('Login');
      }
    } catch (error) {
      if (error.response) {
        console.log(`error.response.status`, error.response.status);
        if (error.response && error.response.status === 409) {
          Alert.alert("Email already exists", "The provided email is already registered.");
        }
        else if (error.response.status === 404) {
          Alert.alert(" Invalid Email Formats");
        } else {
          console.log("Server Error:", error.response.status);
        }
      } else {
        console.log("Network Error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={[
          styles.input,
          { borderColor: isUsernameFocused ? '#58c791' : 'gray' }
        ]}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        onFocus={() => handleFocus('username')}
        onBlur={() => handleBlur('username')}
      />

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

      <TextInput
        style={[
          styles.input,
          { borderColor: isPasswordFocused ? '#58c791' : 'gray' }
        ]}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        onFocus={() => handleFocus('password')}
        onBlur={() => handleBlur('password')}
      />
      <Pressable
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{dob.toDateString()}</Text>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
        />
      )}
      <View style={styles.maritalStatusContainer}>
        <Text style={styles.maritalStatusLabel}>Marital Status:</Text>
        <View style={styles.radioContainer}>
          <Pressable
            style={[styles.radioButton, maritalStatus === 'single' && styles.radioButtonSelected]}
            onPress={() => handleMaritalStatusChange('single')}
          >
            <Text style={styles.radioText}>Single</Text>
          </Pressable>
          <Pressable
            style={[styles.radioButton, maritalStatus === 'married' && styles.radioButtonSelected]}
            onPress={() => handleMaritalStatusChange('married')}
          >
            <Text style={styles.radioText}>Married</Text>
          </Pressable>
        </View>
      </View>


      <Pressable style={styles.button} onPress={onFinish} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.buttonText}>SIGN UP</Text>
        )}
      </Pressable>

      <Text style={styles.alreadyTxt}>
        Have an account already?{' '}
        <Text
          style={{ color: '#58c791' }}
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </Text>
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
  logo: {
    width: 200,
    height: 150,
    marginBottom: 10,
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
    paddingLeft: 15,
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
  alreadyTxt: {
    marginTop: 25,
  },
  maritalStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  maritalStatusLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: 'row',
  },
  radioButton: {
    marginRight: 1,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  radioButtonSelected: {
    backgroundColor: '#58c791',
    borderColor: '#58c791',
  },
  radioText: {
    color: '#000',
  },
});

export default Signup;
