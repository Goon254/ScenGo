// app/screens/CreateEventScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '../context/AuthContext';

interface EventForm {
  title: string;
  description: string;
  date: Date;
  time: Date;
  location: string;
  capacity: string;
  requireFaceRecognition: boolean;
  isPrivate: boolean;
}

interface FormErrors {
  title?: string;
  location?: string;
  date?: string;
  time?: string;
  capacity?: string;
}

export default function CreateEventScreen() {
  const router = useRouter();
  const { isLoading, error, clearError } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<EventForm>({
    title: '',
    description: '',
    date: new Date(),
    time: new Date(),
    location: '',
    capacity: '',
    requireFaceRecognition: false,
    isPrivate: false,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [{ text: 'OK', onPress: clearError }]);
    }
  }, [error, clearError]);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
      isValid = false;
    }

    if (!formData.location.trim()) {
      errors.location = 'Location is required';
      isValid = false;
    }

    if (formData.date < new Date()) {
      errors.date = 'Date cannot be in the past';
      isValid = false;
    }

    if (formData.capacity && isNaN(Number(formData.capacity))) {
      errors.capacity = 'Capacity must be a number';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please check all required fields');
      return;
    }

    try {
      setIsSubmitting(true);

      // TODO: Submit event data to backend
      console.log('Event Data:', formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert('Success', 'Event created successfully', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            disabled={isSubmitting}
            accessibilityLabel="Go back"
          >
            <FontAwesome name="arrow-left" size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Event</Text>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isSubmitting || isLoading}
            accessibilityLabel="Create event"
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#007AFF" />
            ) : (
              <Text style={styles.createButton}>Create</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Event Title*</Text>
            <TextInput
              style={[styles.input, formErrors.title && styles.inputError]}
              value={formData.title}
              onChangeText={(text) => {
                setFormData({ ...formData, title: text });
                if (formErrors.title) {
                  setFormErrors({ ...formErrors, title: undefined });
                }
              }}
              placeholder="Enter event title"
              editable={!isSubmitting}
              accessibilityLabel="Event title input"
            />
            {formErrors.title && (
              <Text style={styles.errorText}>{formErrors.title}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              placeholder="Enter event description"
              multiline
              numberOfLines={4}
              editable={!isSubmitting}
              accessibilityLabel="Event description input"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>Date*</Text>
              <TouchableOpacity
                style={[styles.dateButton, formErrors.date && styles.inputError]}
                onPress={() => setShowDatePicker(true)}
                disabled={isSubmitting}
                accessibilityLabel="Select date"
              >
                <Text>{formData.date.toLocaleDateString()}</Text>
              </TouchableOpacity>
              {formErrors.date && (
                <Text style={styles.errorText}>{formErrors.date}</Text>
              )}
            </View>

            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>Time*</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowTimePicker(true)}
                disabled={isSubmitting}
                accessibilityLabel="Select time"
              >
                <Text>{formData.time.toLocaleTimeString()}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Location*</Text>
            <TextInput
              style={[styles.input, formErrors.location && styles.inputError]}
              value={formData.location}
              onChangeText={(text) => {
                setFormData({ ...formData, location: text });
                if (formErrors.location) {
                  setFormErrors({ ...formErrors, location: undefined });
                }
              }}
              placeholder="Enter event location"
              editable={!isSubmitting}
              accessibilityLabel="Event location input"
            />
            {formErrors.location && (
              <Text style={styles.errorText}>{formErrors.location}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Capacity</Text>
            <TextInput
              style={[styles.input, formErrors.capacity && styles.inputError]}
              value={formData.capacity}
              onChangeText={(text) => {
                setFormData({ ...formData, capacity: text });
                if (formErrors.capacity) {
                  setFormErrors({ ...formErrors, capacity: undefined });
                }
              }}
              placeholder="Enter maximum attendees"
              keyboardType="numeric"
              editable={!isSubmitting}
              accessibilityLabel="Event capacity input"
            />
            {formErrors.capacity && (
              <Text style={styles.errorText}>{formErrors.capacity}</Text>
            )}
          </View>

          <View style={styles.settings}>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Require Face Recognition</Text>
              <Switch
                value={formData.requireFaceRecognition}
                onValueChange={(value) =>
                  setFormData({ ...formData, requireFaceRecognition: value })
                }
                disabled={isSubmitting}
              />
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Private Event</Text>
              <Switch
                value={formData.isPrivate}
                onValueChange={(value) =>
                  setFormData({ ...formData, isPrivate: value })
                }
                disabled={isSubmitting}
              />
            </View>
          </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={formData.date}
            mode="date"
            display="default"
            minimumDate={new Date()}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setFormData({ ...formData, date: selectedDate });
                if (formErrors.date) {
                  setFormErrors({ ...formErrors, date: undefined });
                }
              }
            }}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={formData.time}
            mode="time"
            display="default"
            onChange={(event, selectedDate) => {
              setShowTimePicker(false);
              if (selectedDate) {
                setFormData({ ...formData, time: selectedDate });
              }
            }}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  createButton: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  form: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#DC2626',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    marginTop: 4,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  dateButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  settings: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  settingLabel: {
    fontSize: 16,
    color: '#1F2937',
  },
});
