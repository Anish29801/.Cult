import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar, HeroSection, AboutUs, ContactUs, Footer } from './components';
import Shop from './components/Shop.jsx';
import BMI from './components/BMI.jsx';
import Lab from './components/Lab.jsx';
import Admin from './components/Admin.jsx';
import Mind from './components/Mind.jsx';
import CultComponent from './components/CultComponent.jsx';
import SaleTimerBanner from './components/SaleTimerBanner.jsx';

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
                <SaleTimerBanner/>
                <AboutUs />
                <CultComponent/>
                <Footer />
              </>
            }
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="/bmi" element={<BMI />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/mind" element={<Mind />} />
          <Route path='/contact-us' element={<ContactUs />} />
          {/* Optional: Catch-all for undefined routes */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
