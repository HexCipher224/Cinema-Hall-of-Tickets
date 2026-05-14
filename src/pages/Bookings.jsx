
import { Container, Row, Col, Alert } from 'react-bootstrap';

const Bookings = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h1 className="text-center mb-4">My Bookings</h1>
          <Alert variant="info" className="text-center">
            Your bookings will appear here (Person C's work)
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default Bookings;