// app/screens/HomeScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const mockEvents = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    date: '2025-03-15',
    location: 'Convention Center',
  },
  {
    id: '2',
    title: 'Product Launch',
    date: '2025-04-01',
    location: 'Innovation Hub',
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const renderEventCard = ({ item }: { item: typeof mockEvents[0] }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => router.push(`/event-details/${item.id}`)}
    >
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDetails}>{item.date}</Text>
      <Text style={styles.eventDetails}>{item.location}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back!</Text>
        <Text style={styles.subtitle}>Stay updated and manage your events easily.</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/create-event')}
        >
          <FontAwesome name="plus-circle" size={32} color="#007AFF" />
          <Text style={styles.actionText}>Create Event</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/events')}
        >
          <FontAwesome name="calendar" size={32} color="#007AFF" />
          <Text style={styles.actionText}>View Events</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/notifications')}
        >
          <FontAwesome name="bell" size={32} color="#007AFF" />
          <Text style={styles.actionText}>Notifications</Text>
        </TouchableOpacity>
      </View>

      {/* Upcoming Events */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <FlatList
          data={mockEvents}
          renderItem={renderEventCard}
          keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={styles.eventList}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No upcoming events. Create one now!</Text>
          }
        />
      </View>

      {/* Profile Shortcut */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Profile</Text>
        <TouchableOpacity
          style={styles.profileShortcut}
          onPress={() => router.push('/profile')}
        >
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>johndoe@example.com</Text>
          </View>
          <FontAwesome name="chevron-right" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#D1E3F8',
    marginTop: 4,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'white',
    marginTop: -10,
    borderRadius: 20,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1F2937',
  },
  eventList: {
    gap: 16,
  },
  eventCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginRight: 16,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  eventDetails: {
    fontSize: 14,
    color: '#6B7280',
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  profileShortcut: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  profileEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
});
