import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { fetchUserData } from '../utils/UserApi';
import FormField from './FormField';
import Spinner from 'react-native-loading-spinner-overlay';
import { useUserId } from '../UserContext/UserContext';

export default function More() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useUserId();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchUserData(userId);
        setTimeout(() => {
          setUserData(data);
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        // textContent={'Loading...'}
        textStyle={{ color: 'black' }}
      />

      <ScrollView style={styles.scrollView}>
        <Text style={styles.profile}>Profile</Text>
        <Text style={styles.loginHeader}>Login Information</Text>
        {!isLoading && (
          <>
            {userData.map((user, index) => (
              <View key={index} style={styles.formContainer}>
                <FormField label="Mobile Number" value="9876545011" />
                <FormField label="Email Address" value={user.email} />
                <View style={styles.secContainer}></View>
                <Text style={styles.personalHeader}>Personal Information</Text>
                <FormField label="Name" value={user.username} />
                <FormField label="Birthday" value={user.dob ? user.dob.slice(0, 10) : 'None'} />
                <FormField label="Marital status" value={user.marital_status ? user.marital_status : 'None'} />
              </View>
            ))}
          </>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'left',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  formContainer: {
    marginTop: 25,
  },
  profile: {
    fontSize: 23,
    fontWeight: '700',
  },
  personalDetails: {
    marginTop: 13,
  },
  personalHeader: {
    fontSize: 19,
    fontWeight: '700',
    marginTop: 25,
    marginBottom: 25,
  },
  loginHeader: {
    fontSize: 19,
    fontWeight: '700',
    marginTop: 25,
  },
  secContainer: {
    flexDirection: 'row',
  },
});
