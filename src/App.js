import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Creator from './pages/Creator';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Connections from './pages/Connections';
import FacebookInstagramSetup from './pages/FacebookInstagramSetup';
import NotFound from './pages/NotFound';
import 'react-toastify/dist/ReactToastify.css';

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

// No longer need ProtectedRoute or authentication

// App Routes component (all public)
const AppRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route 
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route 
        path="/calendar"
        element={
          <Layout>
            <Calendar />
          </Layout>
        }
      />
      <Route 
        path="/creator"
        element={
          <Layout>
            <Creator />
          </Layout>
        }
      />
      <Route 
        path="/analytics"
        element={
          <Layout>
            <Analytics />
          </Layout>
        }
      />
      <Route 
        path="/connections"
        element={
          <Layout>
            <Connections />
          </Layout>
        }
      />
      <Route 
        path="/setup/facebook-instagram"
        element={
          <Layout>
            <FacebookInstagramSetup />
          </Layout>
        }
      />
      <Route 
        path="/facebook-instagram-setup"
        element={
          <Layout>
            <FacebookInstagramSetup />
          </Layout>
        }
      />
      <Route 
        path="/settings"
        element={
          <Layout>
            <Settings />
          </Layout>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <AppRoutes />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
