import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import EventCard from '../components/EventCard';
import EventForm from '../components/EventForm';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Load events when component mounts
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
  try {
    setLoading(true);

    const data = await fetchEvents();

    console.log("EVENTS API RESPONSE:", data); // 👈 ADD THIS

    setEvents(data);

    setError('');
  } catch (err) {
    console.error(err);
    setError('Failed to load events. Make sure json-server is running on port 5000');
  } finally {
    setLoading(false);
  }
};

  const handleCreate = async (eventData) => {
    try {
      const newEvent = await createEvent(eventData);
      setEvents([...events, newEvent]);
    } catch (err) {
      setError('Failed to create event');
    }
  };

  const handleUpdate = async (eventData) => {
    try {
      const updatedEvent = await updateEvent(eventData.id, eventData);
      setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
      setEditingEvent(null);
    } catch (err) {
      setError('Failed to update event');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        setEvents(events.filter(event => event.id !== id));
      } catch (err) {
        setError('Failed to delete event');
      }
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleFormSubmit = (eventData) => {
    if (editingEvent) {
      handleUpdate(eventData);
    } else {
      handleCreate(eventData);
    }
    setEditingEvent(null);
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading events...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>All Events</h1>
        <Button 
          variant="primary" 
          onClick={() => {
            setEditingEvent(null);
            setShowForm(true);
          }}
        >
          + Add New Event
        </Button>
      </div>

      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible>
          {error}
        </Alert>
      )}

      {events.length === 0 ? (
        <Alert variant="info">
          No events found. Click "Add New Event" to create your first event!
        </Alert>
      ) : (
        <Row className="g-4">
          {events.map(event => (
            <Col key={event.id} md={6} lg={4}>
              <EventCard
                event={event}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Col>
          ))}
        </Row>
      )}

      <EventForm
        show={showForm}
        onHide={() => {
          setShowForm(false);
          setEditingEvent(null);
        }}
        onSubmit={handleFormSubmit}
        event={editingEvent}
      />
    </Container>
  );
};

export default Events;