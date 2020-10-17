import React, { useEffect, useState, createRef } from "react";
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { CommonActions } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import  HomeScreen from './screens/HomeScreen';
import { firebase } from './src/firebase/config';

/* YelloBox warning re Android firebase longTimeout call work around*/
import {Platform, InteractionManager} from 'react-native';

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
    // Work around issue `Setting a timer for long time`
    // see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
            InteractionManager.runAfterInteractions(() => {
                if (!timerFix[id]) {
                    return;
                }
                delete timerFix[id];
                fn(...args);
            });
            return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
            const ttl = Date.now() + time;
            const id = '_lt_' + Object.keys(timerFix).length;
            runTask(id, fn, ttl, args);
            return id;
        }
        return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = id => {
        if (typeof id === 'string' && id.startsWith('_lt_')) {
            _clearTimeout(timerFix[id]);
            delete timerFix[id];
            return;
        }
        _clearTimeout(id);
    };
}
/* END of YelloBox warning re Android firebase longTimeout call work around*/

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    CreateAccount: CreateAccountScreen,
  },
  {
    // initialRouteName: 'Home',
    initialRouteName: 'Login',
  },
);

const AppContainer =  createAppContainer(AppNavigator);

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigationRef = createRef();
  const navigate = (name, params) => navigationRef.current?.navigate(name, params);
  
  
  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
            alert(error);
          });
      } else {
        setLoading(false);        
      }
    });
  }, []);

 

 if (user) {
    // call navigate for AppNavigator here:
    navigate('Home', { user } );
 }
  //   navigator && navigator.dispatch(
  //     NavigationActions.navigate({ Home: HomeScreen })      
  //     );
  // }

  if (loading) {	
    return (	
      <Text>LOADING...</Text>	
    )	
  } return (
    <AppContainer ref={navigationRef}/>
  );
};

export default App;
