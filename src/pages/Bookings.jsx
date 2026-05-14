import { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import BookingCard from '../components/BookingCard';
import { fetchBookings, cancelBooking } from '../services/bookingApi';
import { fetchEvents } from '../services/api';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [bookingsData, eventsData] = await Promise.all([
        fetchBookings(),
        fetchEvents()
      ]);
      setBookings(bookingsData);
      setEvents(eventsData);
      setError('');
    } catch (err) {
      setError('Failed to load bookings. Make sure json-server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getEventForBooking = (booking) => {
    return events.find(event => event.id === booking.eventId);
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await cancelBooking(bookingId);
        setBookings(bookings.filter(booking => booking.id !== bookingId));
        alert('Booking cancelled successfully!');
      } catch (err) {
        setError('Failed to cancel booking.');
      }
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading your bookings...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">My Bookings 🎫</h1>
      
      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible>
          {error}
        </Alert>
      )}
      
      {bookings.length === 0 ? (
        <Alert variant="info" className="text-center">
          <h5>No bookings yet!</h5>
          <p>Go to the Events page to book your first ticket.</p>
          <Alert.Link href="/events">Browse Events →</Alert.Link>
        </Alert>
      ) : (
        <>
          <p className="text-muted mb-4">
            You have {bookings.length} booking(s) confirmed.
          </p>
          <Row className="g-4">
            {bookings.map(booking => {
              const event = getEventForBooking(booking);
              return (
                <Col key={booking.id} md={6} lg={4}>
                  <BookingCard
                    booking={booking}
                    event={event}
                    onCancel={handleCancelBooking}
                  />
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </Container>
  );
};

export default Bookings;