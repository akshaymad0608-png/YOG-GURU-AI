import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Trainer from './pages/Trainer';
import Library from './pages/Library';
import Dashboard from './pages/Dashboard';
import Meditation from './pages/Meditation';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(window.location.hash.replace('#', '') || '/');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('zenai_dark_mode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.replace('#', '') || '/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('zenai_dark_mode', JSON.stringify(darkMode));
  }, [darkMode]);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <Home onNavigate={navigate} />;
      case '/trainer':
        return <Trainer onNavigate={navigate} />;
      case '/library':
        return <Library onNavigate={navigate} />;
      case '/dashboard':
        return <Dashboard />;
      case '/meditation':
        return <Meditation />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <Layout currentPath={currentPath} onNavigate={navigate} darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      {renderPage()}
    </Layout>
  );
};

export default App;