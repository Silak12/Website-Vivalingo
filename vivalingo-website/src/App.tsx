import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Method from './pages/Method';

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
          {/* Add more routes as needed */}
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;