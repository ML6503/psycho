import { firebase } from '../firebase/config';
import { getToken, setToken } from './token';

const mockSuccess = (value) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(value), 2000);
    });
  };
  
  const mockFailure = (value) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(value), 2000);
    });
  };

//   export const login = (email, password, shouldSucceed = true) => {
//     console.log(email, password);
  
//     if (!shouldSucceed) {
//       return mockFailure({ error: 500, message: 'Something went wrong!' });
//     }
  
//     return mockSuccess({ auth_token: 'successful_fake_token' });
//   };


//   export const createAccount = (email, password, shouldSucceed = true) => {
//     console.log(email, password);
  
//     if (!shouldSucceed) {
//       return mockFailure({ error: 500, message: 'Something went wrong!' });
//     }
  
//     return mockSuccess({ auth_token: 'successful_fake_token' });
//   };

export const createAccount = (email, password,  onAuthentication, confirmPassword, fullName) => {
    console.log("we are in create Account and data are:", email, password, confirmPassword, fullName );
    if (password !== confirmPassword) {
        alert("Passwords don't match.")
        return
    }
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            const data = {
                id: uid,
                email,
                fullName,
            };
            const usersRef = firebase.firestore().collection('users')
            usersRef
                .doc(uid)
                .set(data)        
                .then((response) => {
                  console.log("we created user", response.user);
                    onAuthentication({user: response.user});
                })
                .catch((res) => {
                    alert(res.error)
                });
        })
        .catch((error) => {
            alert(error)
    });
}

export const login = (email, password, onAuthentication) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            const usersRef = firebase.firestore().collection('users')
            usersRef
                .doc(uid)
                .get()
                .then(firestoreDocument => {
                    if (!firestoreDocument.exists) {
                        alert("User does not exist anymore.")
                        return;
                    }
                    const user = firestoreDocument.data()
                    // navigation.navigate('Home', {user})
                    onAuthentication({user: user});
                })
                .catch(error => {
                    alert(error)
                });
        })
        .catch(error => {
            alert(error)
        })
}

const getAuthenticationToken = () => 'successful_fake_token';

export const getUsers = async (shouldSucceed = true) => {
  const token = await getToken();

  if (token !== 'successful_fake_token') {
    return mockFailure({ error: 401, message: 'Invalid Request' });
  }

  return mockSuccess({
    users: [
      {
        email: 'test@test.ca',
      },
      {
        email: 'test2@test.ca',
      },
    ],
  });
};
