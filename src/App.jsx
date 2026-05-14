import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Events from './pages/Events';
import Bookings from './pages/Bookings';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </Layout>
  );
}

export default App;