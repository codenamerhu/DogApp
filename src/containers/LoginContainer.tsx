import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Alert, ActivityIndicator} from 'react-native';

import { RootStackParamList } from '../types/navigation';

import LoginPresenter from '../presenters/LoginPresenter';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { API_BASE_URL, LOGIN_API_URL, DEFAULT_USER_EMAIL, DEFAULT_USER_PASSWORD } from '../ultils/constants';



type Props = {
  navigation?: NavigationProp<RootStackParamList, 'Login'>;
};

// interface Props {
//   navigation: LoginScreenNavigationProp;
// }

const LoginScreen: React.FC<Props> = () => {
  const navigation = useNavigation<Props['navigation']>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false); // State for loading indicator

  const handleLogin = async () => {
    // authentication logic
    if (!email || !password) {
        Alert.alert('Error', 'Please fill in both email and password');
        return;
      }
  
      setLoading(true); // Show loading indicator
  
      try {
        const response = await fetch(LOGIN_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: email, // Username should be passed as email (dummy JSON API expects username)
            password: password,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Login success, navigate to the DogListScreen
          Alert.alert('Login Successful', `Welcome, ${data.firstName}!`);
          navigation?.navigate('DogList'); // Navigate to Dog List Screen
        } else {
          // Handle login error
          Alert.alert('Login Failed', data.message || 'Invalid credentials');
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      } finally {
        setLoading(false); // Hide loading indicator
      }
  };

  return (
    <LoginPresenter
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      handleLogin={handleLogin}
      loading={loading}
    />
  );
};

export default LoginScreen;
