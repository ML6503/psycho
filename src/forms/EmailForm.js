import React, { useState } from 'react';
import {  ScrollView, StyleSheet, TextInput, Button, Text, View } from 'react-native';
import { setToken } from '../api/token';

const EmailForm = ({ buttonText, onSubmit, newAccount, children, onAuthentication }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submit = () => {
        
        onSubmit(email, password, onAuthentication, confirmPassword, fullName)
            // .then(async (res) => {
            //     await setToken(res.auth_token);
            //     onAuthentication({user: data});
            // })
                // .catch((res) => setErrorMessage(res.error));
    };

  
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {newAccount && (
                <TextInput
                style={styles.input}
                placeholder='Full Name'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setFullName(text)}
                value={fullName}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            )} 
                
            <TextInput
                style={styles.input}
                placeholder='E-mail'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                secureTextEntry
                placeholder='Password'
                onChangeText={(text) => setPassword(text)}
                value={password}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            {newAccount && (
                <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                secureTextEntry
                placeholder='Confirm Password'
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            )}
            <View style={{ margin: 20 }}>
                <Button title={buttonText} onPress={submit} />
            </View>
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            {children}
        </ScrollView>
    );

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: 40,
      width: 300,
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 20,
    },
  });
  
  export default EmailForm;
  