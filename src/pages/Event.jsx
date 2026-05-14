Event.jsx
import { Container, Row, Col, Spinner } from 'react-bootstrap';

const Events = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h1 className="text-center mb-4">All Events</h1>
          <div className="text-center text-muted">
            <p>Events will be displayed here (Person B's work)</p>
            {/* Person B will replace this with actual event cards */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Events;