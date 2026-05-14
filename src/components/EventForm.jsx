import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';

const EventForm = ({ show, onHide, onSubmit, event = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Movie',
    date: '',
    time: '',
    location: '',
    price: '',
    availableTickets: '',
    description: '',
    image: '',
  });
  
  const [error, setError] = useState('');

  // Populate form when editing an existing event
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        category: event.category || 'Movie',
        date: event.date || '',
        time: event.time || '',
        location: event.location || '',
        price: event.price || '',
        availableTickets: event.availableTickets || '',
        description: event.description || '',
        image:'',
      });
    } else {
      resetForm();
    }
  }, [event]);

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'Movie',
      date: '',
      time: '',
      location: '',
      price: '',
      availableTickets: '',
      description: '',
      image: '',
    });
    setError('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      setError('Please enter an event title');
      return;
    }
    
    if (!formData.price || formData.price <= 0) {
      setError('Please enter a valid price');
      return;
    }

    const eventData = {
      ...formData,
      price: Number(formData.price),
      availableTickets: Number(formData.availableTickets) || 0,
      id: event?.id // Keep existing ID if editing
    };
    
    onSubmit(eventData);
    resetForm();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {event ? '✏️ Edit Event' : '➕ Add New Event'}
        </Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && (
            <Alert variant="danger" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}
          
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Event Title *</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter event title"
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Category *</Form.Label>
                
                <Form.Select name="category" value={formData.category} onChange={handleChange} required>
                  <option value="Movie">🎬 Movie</option>
                  <option value="Concert">🎵 Concert</option>
                  <option value="Sports">⚽ Sports</option>
                  <option value="Comedy">😂 Comedy</option>
                  <option value="Theater">🎭 Theater</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Event venue"
                />
              </Form.Group>
            </Col>
            
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Price (₹) *</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Tickets Available</Form.Label>
                <Form.Control
                  type="number"
                  name="availableTickets"
                  value={formData.availableTickets}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the event..."
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              name="imageUrl"
              value={formData.image}
              onChange={handleChange}
              placeholder="dune.jpeg"
            />
            <Form.Text className="text-muted">
              Enter a URL for the event poster image (optional)
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {event ? 'Update Event' : 'Create Event'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EventForm;