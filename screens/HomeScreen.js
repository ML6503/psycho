import React, { useState, useEffect, useRef  } from 'react';
import { View, Text, Button } from 'react-native';
import {  getUsers } from '../src/api/mock';
import { setToken } from '../src/api/token';

const HomeScreen = ({ navigation, user }) => {
  const [users, setUsers ] = useState([]);
  const [hasLoadedUsers, setHasLoadedUsers] = useState(false);
  const [userLoadingErrorMessage, setUserLoadingErrorMessage] = useState('');
  const mountedRef = useRef(true);
  
  function handleUserLoadingError(res) {
    if (res.error === 401) {
      navigation.navigate('Login');
    } else {
      setHasLoadedUsers(false);
      setUserLoadingErrorMessage(res.message);
    }
  }

  const loadUsers = () => {    
    setHasLoadedUsers(false);
    setUserLoadingErrorMessage('');
    // getUsers()
    setUsers(user)
      .then((res) => {        
        setHasLoadedUsers(true);
        // setUsers(res.users);
        if (!mountedRef.current) return null;
      })
        .catch(handleUserLoadingError);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('didFocus', () => {     
      if(!hasLoadedUsers) {
         loadUsers();
      }
    });
     
    return () => { 
      unsubscribe;
      mountedRef.current = false;      
    }
  }, [mountedRef, navigation ]);

 
  const logOut = async () => {
    setHasLoadedUsers(false);
    setUsers([]);
    await setToken('');
    navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>HomeScreen</Text>
      {users.map((user) => (
          <Text key={user.email}>{user.email}</Text>
        ))}
        {userLoadingErrorMessage ? (
          <Text>{userLoadingErrorMessage}</Text>
        ) : null}
      <View style={{ margin: 20 }}>
        <Button title="Log out" onPress={logOut} />
      </View>
    </View>
  );
};

export default HomeScreen;
