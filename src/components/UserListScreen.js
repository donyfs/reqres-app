import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import MessageBox from '../components/MessageBox';

const UserListScreen = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://reqres.in/api/users');
      setUsers(response.data.data);
    } catch (error) {
      setError('Failed to fetch users.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      setError('Failed to delete user.');
    }
  };

  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {error ? <MessageBox message={error} type="error" /> : null}
      <TextInput
        style={styles.input}
        placeholder="Search by first name"
        onChangeText={setSearch}
        value={search}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text>{item.first_name} {item.last_name}</Text>
            <Button title="Delete" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default UserListScreen;
