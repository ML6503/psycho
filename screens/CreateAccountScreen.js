import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAccount } from '../src/api/mock';
import { setToken } from '../src/api/token';
import EmailForm from '../src/forms/EmailForm';

const CreateAccountScreen = ({ navigation }) => {
  return (
    <EmailForm
      buttonText="Sign up"
      onSubmit={createAccount}
      onAuthentication={() => navigation.navigate('Home')}
    >
      <Button
        title="Back to log in"
        onPress={() => navigation.navigate('Login')}
      />
    </EmailForm>
  );
};

export default CreateAccountScreen;
