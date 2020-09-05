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

// const CreateAccountScreen = ({ navigation }) => {
//     const createUser = async () => {
//       createAccount('test@test.ca', 'password')
//         .then(async (res) => {
//           await setToken(res.auth_token);
//           navigation.navigate('Home');
//         })
//         .catch((err) => console.log('error', err.message));
//     };

//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Create Account Screen</Text>
//         <Button title="Create user" onPress={createUser} />
//         <View style={{ margin: 20 }}>
//           <Button title="Log out" onPress={() => navigation.navigate('Login')} />
//         </View>
//       </View>
//     );
// };

export default CreateAccountScreen;
