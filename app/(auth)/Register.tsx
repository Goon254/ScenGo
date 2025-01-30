// app/(auth)/Register.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import Components from '../container/shared/StyledComponent';
import validationUtils from '../utils/validation';

// Destructure the components and validation functions
const { StyledInput, StyledButton, PasswordStrengthIndicator } = Components;
const { validatePassword, validateEmail, validateName } = validationUtils;

export default function Register() {
  const router = useRouter();
  const { signUp, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert('Registration Error', error, [{ text: 'OK', onPress: clearError }]);
    }
  }, [error, clearError]);

  useEffect(() => {
    validateForm(false);
  }, [formData]);

  const validateForm = (showErrors = true) => {
    const nameValidation = validateName(formData.name);
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    const isPasswordMatch = formData.password === formData.confirmPassword;

    const newErrors = {
      name: showErrors ? nameValidation.errors[0] || '' : '',
      email: showErrors ? emailValidation.errors[0] || '' : '',
      password: showErrors ? passwordValidation.errors[0] || '' : '',
      confirmPassword: showErrors && !isPasswordMatch ? 'Passwords do not match' : '',
    };

    setErrors(newErrors);

    const isValid =
      nameValidation.isValid &&
      emailValidation.isValid &&
      passwordValidation.isValid &&
      isPasswordMatch;

    setIsFormValid(isValid);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm(true)) {
      Alert.alert('Validation Error', 'Please check your input and try again.');
      return;
    }

    try {
      await signUp(
        formData.email.toLowerCase(),
        formData.password,
        formData.name.trim()
      );
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join ScanGo to manage your events</Text>
        </View>

        <View style={styles.form}>
          <StyledInput
            label="Full Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            error={errors.name}
            placeholder="Enter your full name"
            autoCapitalize="words"
            editable={!isLoading}
            accessibilityLabel="Full Name Input"
          />

          <StyledInput
            label="Email Address"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            error={errors.email}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
            accessibilityLabel="Email Address Input"
          />

          <StyledInput
            label="Password"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            error={errors.password}
            placeholder="Create a strong password"
            secureTextEntry
            editable={!isLoading}
            accessibilityLabel="Password Input"
          />

          {formData.password && (
            <PasswordStrengthIndicator password={formData.password} />
          )}

          <StyledInput
            label="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
            error={errors.confirmPassword}
            placeholder="Confirm your password"
            secureTextEntry
            editable={!isLoading}
            accessibilityLabel="Confirm Password Input"
          />

          <StyledButton
            title="Create Account"
            onPress={handleRegister}
            loading={isLoading}
            disabled={!isFormValid}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <StyledButton
              title="Sign In"
              onPress={() => router.push('/(auth)/Login')}
              variant="outline"
              disabled={isLoading}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  form: {
    marginTop: 20,
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
});
