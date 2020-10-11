import React, {useState} from 'react';
import { View, Text, Button } from 'react-native';
// import { login } from '../src/api/mock';
import { login } from '../src/api/account';
// import { setToken } from '../src/api/token';
import EmailForm from '../src/forms/EmailForm';

const LoginScreen = ({ navigation }) => {
  return (
    <EmailForm
      buttonText="Log in"
      onSubmit={login}
      onAuthentication={({user: data}) => navigation.navigate('Home', {user: data})}
    >
      <Button
        title="Create account"
        onPress={() => navigation.navigate('CreateAccount')}
      />
    </EmailForm>
  );
};

// const LoginScreen = ({ navigation }) => {
//   const [errorMessage, setErrorMessage] = useState('');
  
//   const loginUser = async () => {
//     setErrorMessage('');
//     login('test@test.ca', 'password')
//       .then(async (res) => {
//         await setToken(res.auth_token);
//         navigation.navigate('Home');
//       })
//         .catch((err) => setErrorMessage(err.message));
//   };  

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>LoginScreen</Text>
//       <View style={{ margin: 20 }}>
//       <Button
//         title="Log in"
//         onPress={loginUser}
//       />
//       </View>
//       <Button
//         title="Create account"
//         onPress={() => navigation.navigate('CreateAccount')}
//       />
//       {errorMessage ? <Text>{errorMessage}</Text> : null}
//     </View>
//   );
// };

export default LoginScreen;
