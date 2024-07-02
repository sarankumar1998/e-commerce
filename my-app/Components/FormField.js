import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FormField = ({ label, value, style }) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    flexDirection: 'coloumn',
    alignItems: 'start',
    marginBottom: 10,

  },
  label: {
    marginTop: 5,
    marginRight: 10,
    fontSize: 13,
    // lineHeight:2
  },
  value: {
    fontWeight: '500',
    marginTop: 5,
    marginRight: 10,
    fontSize: 17,
    lineHeight: 18

  },
  style: {

  }

});

export default FormField;
