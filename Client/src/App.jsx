import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar, HeroSection, AboutUs, ContactUs, Footer } from './components';
import Admin from './components/Admin.jsx';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section id="home">
                  <HeroSection />
                </section>
                <AboutUs />
                <ContactUs />
                <Footer />
              </>
            }
          />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
