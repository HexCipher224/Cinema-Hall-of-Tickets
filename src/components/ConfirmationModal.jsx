 'EOF'
import { Modal, Button, Card, Row, Col } from 'react-bootstrap';

const ConfirmationModal = ({ show, onHide, booking, event }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDownloadTicket = () => {
    const ticketContent = `
========================================
        CINEMA HUB - TICKET
========================================

Booking ID: ${booking.id}
Event: ${event?.title}
Date: ${formatDate(event?.date)}
Location: ${event?.location}

----------------------------------------
Ticket Details:
----------------------------------------
Customer: ${booking.customerName}
Email: ${booking.email}
Quantity: ${booking.quantity} ticket(s)
Total Price: ₹${booking.totalPrice}

Booking Date: ${formatDate(booking.bookedAt)}

Thank you for booking with Cinema Hub!
========================================
    `;
    
    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket_${booking.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="bg-success text-white">
        <Modal.Title>✅ Booking Confirmed!</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <div className="text-center mb-4">
          <div className="display-1">🎉</div>
          <h4>Thank you for your booking!</h4>
          <p className="text-muted">Your booking has been confirmed.</p>
        </div>
        
        <Card className="mb-3">
          <Card.Header className="bg-light"><strong>Booking Details</strong></Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <small className="text-muted">Booking ID</small>
                <p><strong>#{booking.id}</strong></p>
              </Col>
              <Col md={6}>
                <small className="text-muted">Status</small>
                <p><strong className="text-success">Confirmed</strong></p>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={6}>
                <small className="text-muted">Event</small>
                <p><strong>{event?.title}</strong></p>
              </Col>
              <Col md={6}>
                <small className="text-muted">Tickets</small>
                <p><strong>{booking.quantity} ticket(s)</strong></p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <small className="text-muted">Customer</small>
                <p><strong>{booking.customerName}</strong></p>
              </Col>
              <Col md={6}>
                <small className="text-muted">Total Paid</small>
                <p><strong className="text-primary">₹{booking.totalPrice}</strong></p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        
        <div className="text-center">
          <Button variant="outline-primary" onClick={handleDownloadTicket}>
            📥 Download Ticket
          </Button>
        </div>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={onHide}>View My Bookings</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
