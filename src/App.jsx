import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Research from './pages/Research';
import ResearchDetail from './pages/ResearchDetail';
import Activities from './pages/Activities';
import ActivityDetail from './pages/ActivityDetail';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/:id" element={<ResearchDetail />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:id" element={<ActivityDetail />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
