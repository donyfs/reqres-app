import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageBox = ({ message, type }) => {
  return (
    <View style={[styles.container, styles[type]]}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  error: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
  },
  message: {
    color: '#721c24',
  },
});

export default MessageBox;
