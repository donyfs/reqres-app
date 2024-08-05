import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import MessageBox from '../components/MessageBox';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://reqres.in/api/register', {
        email,
        password,
      });
      if (response.data.token) {
        navigation.navigate('UserList');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Invalid email or password.');
      } else {
        setError('Something went wrong.');
      }
    }
  };

  return (
    <View style={styles.container}>
      {error ? <MessageBox message={error} type="error" /> : null}
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default RegisterScreen;
