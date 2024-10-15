import React from 'react';
import { View, Text, StyleSheet, SafeAreaView} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import LoadingIndicator from '../components/LoadingIndicator';

interface LoginPresenterProps {
  email: string;
  password: string;
  setEmail: (text: string) => void;
  setPassword: (text: string) => void;
  handleLogin: () => void;
  loading: boolean;
}

const LoginPresenter: React.FC<LoginPresenterProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  handleLogin,
  loading,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Login</Text>

        {/* Email Input */}
        <CustomInput placeholder="Email" 
        value={email} onChangeText={setEmail} 
        keyboardType="email-address" 
        />

        {/* Password Input */}
        <CustomInput placeholder="Password" 
        value={password} 
        onChangeText={setPassword} secureTextEntry 
        />

        {/* Error Message */}
        {/* {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null} */}

        {/* Login Button */}
        {loading ? <LoadingIndicator /> : <CustomButton title="Login" onPress={handleLogin} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    loginContainer: {
      padding: 20,
      borderRadius: 10,
      backgroundColor: '#fff',
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    errorMessage: {
      color: 'red',
      textAlign: 'center',
      marginBottom: 15,
    },
  });

export default LoginPresenter;
