// app/(tabs)/events.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Events() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Events</Text>
      <Text style={styles.text}>Welcome to the Events Tab!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});
