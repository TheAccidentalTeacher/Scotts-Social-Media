import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiHome, 
  FiCalendar, 
  FiEdit3, 
  FiBarChart2, 
  FiSettings,
  FiMenu,
  FiX,
  FiBell,
  FiUser
} from 'react-icons/fi';
import './Layout.css';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const navigationItems = [
    { icon: FiHome, label: 'Dashboard', path: '/dashboard', active: true },
    { icon: FiCalendar, label: 'Content Calendar', path: '/calendar' },
    { icon: FiEdit3, label: 'Content Creator', path: '/creator' },
    { icon: FiBarChart2, label: 'Analytics', path: '/analytics' },
    { icon: FiSettings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand">
            <div className="brand-icon">
              <img src="/logo.png" alt="The Accidental Teacher" className="brand-logo" />
            </div>
            <div className="brand-text">
              <h3>The Accidental</h3>
              <span>Teacher</span>
            </div>
          </div>
          <button className="sidebar-close" onClick={closeSidebar}>
            <FiX />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navigationItems.map((item, index) => (
              <li key={index} className="nav-item">
                <Link 
                  to={item.path} 
                  className={`nav-link ${item.active ? 'active' : ''}`}
                  onClick={closeSidebar}
                >
                  <item.icon className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <FiUser />
            </div>
            <div className="user-details">
              <span className="user-name">Scott</span>
              <span className="user-role">Content Creator</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <button className="menu-toggle" onClick={toggleSidebar}>
              <FiMenu />
            </button>
            <h1 className="page-title">Dashboard</h1>
          </div>
          
          <div className="header-right">
            <button className="notification-btn">
              <FiBell />
              <span className="notification-badge">3</span>
            </button>
            
            <div className="user-menu">
              <div className="user-avatar">
                <FiUser />
              </div>
              <span className="user-name">Scott</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
