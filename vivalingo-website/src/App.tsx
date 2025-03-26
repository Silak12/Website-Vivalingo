import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Method from './pages/Method';
import About from './pages/About';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import AGB from './pages/AGB';
// Helper component to scroll to top on route change
const ScrollToTop: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/method" element={<Layout><Method /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/agb" element={<AGB />} />
          {/* Add more routes as needed */}
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;