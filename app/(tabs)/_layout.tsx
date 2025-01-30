// app/(tabs)/layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#007AFF' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarStyle: { backgroundColor: '#FFFFFF', borderTopColor: '#E5E7EB' },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#6B7280',
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Events Tab */}
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calendar" size={size} color={color} />
          ),
        }}
      />

      {/* Create Event Tab */}
      <Tabs.Screen
        name="create-event"
        options={{
          title: 'Create Event',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus-circle" size={size} color={color} />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
