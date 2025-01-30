// app/(tabs)/index.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Welcome Message */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to ScanGo!</Text>
        <Text style={styles.subtitle}>Easily manage and join your favorite events.</Text>
      </View>

      {/* Navigation Options */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/screens/EventsScreen')}
        >
          <FontAwesome name="calendar" size={32} color="#007AFF" />
          <Text style={styles.actionText}>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/screens/CreateEventScreen')}
        >
          <FontAwesome name="plus-circle" size={32} color="#007AFF" />
          <Text style={styles.actionText}>Create Event</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/screens/ProfileScreen')}
        >
          <FontAwesome name="user" size={32} color="#007AFF" />
          <Text style={styles.actionText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    width: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default HomeScreen;
