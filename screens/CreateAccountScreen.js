import React from 'react';
import { View, Text, Button } from 'react-native';
// import { createAccount } from '../src/api/mock';
import { createAccount } from '../src/api/account';
import { setToken } from '../src/api/token';
import EmailForm from '../src/forms/EmailForm';

const CreateAccountScreen = ({ navigation }) => {


  return (
    <EmailForm
      buttonText="Sign up"
      onSubmit={createAccount}
      onAuthentication={({user: data}) => {
        console.log('USER from onAuthent!!', {user: data});
        navigation.navigate('Home', {user: data});
      }}
      newAccount={true}
      navigation={navigation}
    >
      <Button
        title="Already got an account?"
        onPress={() => navigation.navigate('Login')}
      />
    </EmailForm>
  );
};

export default CreateAccountScreen;
