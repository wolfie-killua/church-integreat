import React from 'react';

const Header = ({ onNavigate, currentPage }) => {
  const navItems = [
    { name: 'Home', path: 'home' },
    { name: 'Create Service', path: 'about' },
    { name: 'Services', path: 'notification' },
    { name: 'Our projects', path: 'book' },
    { name: 'Log in', path: 'login' }
  ];

  const getActiveItem = (itemPath) => {
    return itemPath === currentPage;
  };

  return (
    <header style={{
      width: '100%',
      backgroundColor: 'white',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      padding: '15px 0',
      position: 'relative',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Logo and Search Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          {/* Logo */}
          <div 
            onClick={() => onNavigate('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              {/* Eye logo */}
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span style={{
                fontWeight: '800',
                fontSize: '14px',
                lineHeight: '1',
                textAlign: 'left'
              }}>
                TAYLOR<br />
                MI<br />
                SWIFT
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}>
            <input
              type="text"
              placeholder="Search..."
              style={{
                padding: '10px 10px 10px 40px',
                borderRadius: '25px',
                border: 'none',
                backgroundColor: '#f0f0f7',
                width: '250px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <svg 
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6b7280'
              }}
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
        
        {/* Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '30px'
        }}>
          {navItems.map((item, index) => (
            index === navItems.length - 1 ? (
              // "Create an Account" button
              <button
                key={item.name}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  boxShadow: '0 2px 5px rgba(220, 38, 38, 0.3)',
                  marginLeft: '10px'
                }}
                onClick={() => onNavigate('create')}
              >
                Create an Account
              </button>
            ) : (
              <div
                key={item.name}
                style={{
                  position: 'relative',
                  paddingBottom: '3px',
                  borderBottom: getActiveItem(item.path) ? '2px solid #dc2626' : 'none'
                }}
              >
                <button
                  style={{
                    color: getActiveItem(item.path) ? '#dc2626' : '#4a5568',
                    fontSize: '15px',
                    fontWeight: getActiveItem(item.path) ? '600' : '500',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    padding: '0',
                  }}
                  onClick={() => onNavigate(item.path)}
                  onMouseEnter={(e) => {
                    if (!getActiveItem(item.path)) {
                      e.target.style.color = '#dc2626';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!getActiveItem(item.path)) {
                      e.target.style.color = '#4a5568';
                    }
                  }}
                >
                  {item.name}
                </button>
              </div>
            )
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;