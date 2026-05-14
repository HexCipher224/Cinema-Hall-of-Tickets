
import NavigationBar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;