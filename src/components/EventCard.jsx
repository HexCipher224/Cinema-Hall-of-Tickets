import { Card, Button, Badge } from 'react-bootstrap';
import { imageMap } from "../assets/imageMap";
const EventCard = ({ event, onEdit, onDelete }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
  variant="top"
  src={imageMap[event.image] || Object.values(imageMap)[0]}
  style={{ height: '200px', objectFit: 'cover' }}
/>

      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0">{event.title}</Card.Title>
          <Badge bg="primary">{event.category}</Badge>
        </div>
        
        <Card.Text className="text-muted small">
          📅 {event.date || 'Date TBA'} at {event.time || 'Time TBA'}
        </Card.Text>
        
        <Card.Text className="text-muted small">
          📍 {event.location || 'Location TBA'}
        </Card.Text>
        
        <Card.Text className="mt-2">
          {event.description ? event.description.substring(0, 80) : 'No description available'}
          {event.description?.length > 80 ? '...' : ''}
        </Card.Text>
        
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h5 className="text-primary mb-0">₹{event.price}</h5>
          <Badge bg={event.availableTickets > 0 ? 'success' : 'danger'}>
            {event.availableTickets > 0 ? `${event.availableTickets} left` : 'Sold Out'}
          </Badge>
        </div>
      </Card.Body>
      
      <Card.Footer className="bg-white d-flex gap-2">
        <Button variant="outline-primary" size="sm" onClick={() => onEdit(event)}>
          ✏️ Edit
        </Button>
        <Button variant="outline-danger" size="sm" onClick={() => onDelete(event.id)}>
          🗑️ Delete
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default EventCard;