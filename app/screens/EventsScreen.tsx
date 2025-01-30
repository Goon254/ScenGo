// app/screens/EventsScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

type FilterType = 'all' | 'upcoming' | 'ongoing' | 'completed';

export default function EventsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  const events: Event[] = [
    {
      id: '1',
      title: 'Tech Conference 2025',
      date: '2025-03-15',
      location: 'Convention Center',
      attendees: 250,
      status: 'upcoming',
    },
    {
      id: '2',
      title: 'Product Launch',
      date: '2025-04-01',
      location: 'Innovation Hub',
      attendees: 150,
      status: 'upcoming',
    },
  ];

  useEffect(() => {
    let result = [...events];
    if (selectedFilter !== 'all') {
      result = result.filter(event => event.status === selectedFilter);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    }
    setFilteredEvents(result);
  }, [selectedFilter, searchQuery]);

  const renderEventCard = ({ item }: { item: Event }) => (
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
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search events"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FontAwesome name="search" size={20} color="#6B7280" />
      </View>

      <View style={styles.filterContainer}>
        {['all', 'upcoming', 'ongoing', 'completed'].map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(filter as FilterType)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedFilter === filter && styles.filterButtonTextActive,
              ]}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredEvents}
        renderItem={renderEventCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.eventList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No events found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 16 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
    fontSize: 16,
    color: '#374151',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#374151',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  eventList: {
    paddingBottom: 16,
  },
  eventCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1F2937',
  },
  eventDetails: {
    fontSize: 14,
    color: '#6B7280',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
});
