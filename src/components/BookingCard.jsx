import { Card, Button, Badge } from 'react-bootstrap';

const BookingCard = ({ booking, event, onCancel }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Date TBA';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <Card.Title className="mb-0">
            {event?.title || 'Event Unavailable'}
          </Card.Title>
          <Badge bg="success" pill>
            Confirmed
          </Badge>
        </div>
        
        <div className="mb-3">
          <div className="text-muted small mb-1">
            📅 {formatDate(event?.date)}
          </div>
          <div className="text-muted small mb-1">
            📍 {event?.location || 'Location TBA'}
          </div>
          <div className="text-muted small">
            🎫 {booking.quantity} ticket(s)
          </div>
        </div>
        
        <hr />
        
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <small className="text-muted">Total Amount</small>
            <h5 className="text-primary mb-0">₹{booking.totalPrice}</h5>
          </div>
          <div>
            <small className="text-muted">Booking ID</small>
            <p className="mb-0 small">#{booking.id}</p>
          </div>
        </div>
        
        <div className="mt-3 text-muted small">
          Booked on: {new Date(booking.bookedAt).toLocaleDateString()}
        </div>
      </Card.Body>
      
      <Card.Footer className="bg-white">
        <Button 
          variant="outline-danger" 
          size="sm" 
          onClick={() => onCancel(booking.id)}
          className="w-100"
        >
          ❌ Cancel Booking
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default BookingCard;
