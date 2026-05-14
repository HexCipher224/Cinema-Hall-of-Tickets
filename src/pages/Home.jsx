
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    { icon: "🎵", title: "Concerts", text: "Live music from top artists" },
    { icon: "🎬", title: "Movies", text: "Latest blockbusters" },
    { icon: "⚽", title: "Sports", text: "Exciting matches" },
    { icon: "🎭", title: "Theater", text: "Broadway shows" },
    { icon: "🎤", title: "Comedy", text: "Stand-up nights" },
    { icon: "🎨", title: "Exhibitions", text: "Art & culture" }
  ];

  return (
    <Container className="py-5">
      {/* Hero Section */}
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4 fw-bold text-primary">
            Welcome to TicketMaster 🎉
          </h1>
          <p className="lead text-muted">
            Book tickets for the best events in town!
          </p>
          <Button as={Link} to="/events" variant="primary" size="lg">
            Browse Events
          </Button>
        </Col>
      </Row>

      {/* Features Section */}
      <Row className="g-4 mt-4">
        {features.map((feature, index) => (
          <Col key={index} md={4} lg={3}>
            <Card className="h-100 text-center shadow-sm card-hover">
              <Card.Body>
                <div className="display-1">{feature.icon}</div>
                <Card.Title className="mt-3">{feature.title}</Card.Title>
                <Card.Text className="text-muted">
                  {feature.text}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* CTA Section */}
      <Row className="mt-5 bg-light rounded p-5 text-center">
        <Col>
          <h2>Ready to experience amazing events?</h2>
          <p className="text-muted">Get your tickets now before they sell out!</p>
          <Button as={Link} to="/events" variant="outline-primary" size="lg">
            Explore Events →
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;