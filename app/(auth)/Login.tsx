// app/auth/Login.tsx
import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import LoginForm from './LoginForms';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

export const Login = () => {
  const router = useRouter();
  const { signIn, isLoading, error, clearError, isAuthenticated } = useAuth();

  // Handle authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/'); // Redirect to the home screen or main app after login
    }
  }, [isAuthenticated]);

  // Handle error states
  useEffect(() => {
    if (error) {
      Alert.alert('Login Error', error, [{ text: 'OK', onPress: clearError }]);
    }
  }, [error, clearError]);

  const handleLogin = async (email: string, password: string) => {
    try {
      await signIn(email, password);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Image
              source={require('../../assets/images/adaptive-icon.png')}
              style={styles.logo}
              resizeMode="contain"
              accessibilityLabel="ScanNGo Logo"
            />
            <Text style={styles.welcomeText}>Welcome to ScanGo</Text>
            <Text style={styles.subtitleText}>
              Sign in to manage your events and access check-ins
            </Text>
          </View>

          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => router.push('/(auth)/Register')} 
              accessibilityLabel="Sign Up"
              accessibilityHint="Navigate to sign up screen"
            >
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
  },
  signUpText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default Login;
