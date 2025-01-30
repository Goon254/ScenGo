//app/services/eventServices.ts
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

interface CreateEventData {
  title: string;
  description: string;
  date: Date;
  time: Date;
  location: string;
  capacity: number;
  requireFaceRecognition: boolean;
  isPrivate: boolean;
}

export interface Attendee {
  id: string;
  name: string;
  avatar?: string;
  checkInStatus: 'pending' | 'checked-in' | 'absent';
}

interface Event extends CreateEventData {
  id: string;
}

const handleError = (error: any) => {
  const message = error.response?.data?.message || 'An unknown error occurred';
  throw new Error(message);
};

class EventService {
  async createEvent(eventData: CreateEventData): Promise<Event> {
    try {
      const response = await axios.post<Event>(`${API_URL}/events`, eventData);
      return response.data;
    } catch (error) {
      handleError(error);
      return undefined as any; // Ensure the function always returns a value
    }
  }

  async getEventAttendees(eventId: string): Promise<Attendee[]> {
    try {
      const response = await axios.get<Attendee[]>(`${API_URL}/events/${eventId}/attendees`);
      return response.data;
    } catch (error) {
      handleError(error);
      return []; // Ensure the function always returns a value
    }
  }

  async getEvents(): Promise<Event[]> {
    try {
      const response = await axios.get<Event[]>(`${API_URL}/events`);
      return response.data;
    } catch (error) {
      handleError(error);
      return []; // Ensure the function always returns a value
    }
  }

  async getEventById(eventId: string): Promise<Event | undefined> {
    try {
      const response = await axios.get<Event>(`${API_URL}/events/${eventId}`);
      return response.data;
    } catch (error) {
      handleError(error);
      return undefined; // Ensure the function always returns a value
    }
  }

  async updateEvent(eventId: string, eventData: Partial<CreateEventData>): Promise<Event | undefined> {
    try {
      const response = await axios.put<Event>(`${API_URL}/events/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      handleError(error);
      return undefined; // Ensure the function always returns a value
    }
  }

  async deleteEvent(eventId: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/events/${eventId}`);
    } catch (error) {
      handleError(error);
    }
  }
}

const eventService = new EventService();
export default eventService;
