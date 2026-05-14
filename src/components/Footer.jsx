footer.jsx
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <Container>
        <Row>
          <Col md={6}>
            <h5>🎫 TicketMaster</h5>
            <p className="text-muted">Your one-stop shop for event tickets</p>
          </Col>
          <Col md={3}>
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-muted text-decoration-none">Home</a></li>
              <li><a href="/events" className="text-muted text-decoration-none">Events</a></li>
              <li><a href="/bookings" className="text-muted text-decoration-none">Bookings</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Contact</h6>
            <p className="text-muted">Email: support@ticketmaster.com</p>
          </Col>
        </Row>
        <hr className="bg-secondary" />
        <div className="text-center text-muted">
          <small>&copy; 2026 TicketMaster. All rights reserved.</small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;