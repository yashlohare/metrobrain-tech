import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogoTransition from './components/LogoTransition';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import About from './sections/About';
import AIAgent from './sections/AIAgent';
import Testimonials from './sections/Testimonials';
import Pricing from './sections/Pricing';
import Contact from './sections/Contact';
import Founders from './sections/Founders';
import Partners from './sections/Partners';
import ChatWidget from './chat/ChatWidget';
import AdminPanel from './admin/AdminPanel';
import EcommercePrototype from './prototypes/EcommercePrototype';
import FoodDeliveryPrototype from './prototypes/FoodDeliveryPrototype';
import AIBotPrototype from './prototypes/AIBotPrototype';
import FitnessPrototype from './prototypes/FitnessPrototype';
import RealEstatePrototype from './prototypes/RealEstatePrototype';
import LMSPrototype from './prototypes/LMSPrototype';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <LogoTransition>
              <Navbar />
              <main>
                <Hero />
                <Partners />
                <Services />
                <Portfolio />
                <About />
                <Pricing />
                <AIAgent />
                <Testimonials />
                <Founders />
                <Contact />
              </main>
              <Footer />
              <ChatWidget />
            </LogoTransition>
          } 
        />
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/prototypes/ecommerce" element={<EcommercePrototype />} />
        <Route path="/prototypes/food-delivery" element={<FoodDeliveryPrototype />} />
        <Route path="/prototypes/ai-bot" element={<AIBotPrototype />} />
        <Route path="/prototypes/fitness" element={<FitnessPrototype />} />
        <Route path="/prototypes/real-estate" element={<RealEstatePrototype />} />
        <Route path="/prototypes/lms" element={<LMSPrototype />} />
      </Routes>
    </Router>
  );
}


export default App;
