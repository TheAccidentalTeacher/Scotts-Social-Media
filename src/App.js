import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SimpleLayout from './components/SimpleLayout';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  console.log('App component rendering...');
  
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            <Route 
              path="/" 
              element={
                <SimpleLayout>
                  <Dashboard />
                </SimpleLayout>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <SimpleLayout>
                  <Dashboard />
                </SimpleLayout>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
