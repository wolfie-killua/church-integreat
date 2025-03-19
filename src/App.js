import React, { useState } from 'react';
import Header from './component/header';

import CreateEvent from './Page/CreateEvent';
import NotificationPage from './Page/ServicesPage';

function App() {
  // State to track which page to show
  const [currentPage, setCurrentPage] = useState('home');
  
  // Function to change pages - pass this to the header
  const navigateTo = (page) => {
    setCurrentPage(page);
  };
  
  // Render the appropriate page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'book':
        return <div style={{ padding: '40px 20px' }}>Our Projects Page Content</div>;
      case 'create':
        return <div style={{ padding: '40px 20px' }}>Login Page Content</div>;
      case 'about':
        return <CreateEvent />;
      case 'notification':
        return <NotificationPage />;
      case 'login':
        return <div style={{ padding: '40px 20px' }}>Login Page Content</div>;
      case 'home':
      default:
        return (
          <div style={{ padding: '40px 20px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Home Page</h2>
            <p>Welcome to Mockups For Free. This is the home page content.</p>
          </div>
        );
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: 'white'
    }}>
      <Header onNavigate={navigateTo} currentPage={currentPage} />
      
      <main style={{ 
        flexGrow: 1,
        backgroundColor: 'white',
        padding: 0
      }}>
        {renderPage()}
      </main>
      
      <footer style={{
        backgroundColor: '#f5f5f7',
        color: '#4a5568',
        padding: '1.5rem 0',
        textAlign: 'center',
        borderTop: '1px solid #e2e8f0'
      }}>
        <div style={{
          maxWidth: '1500px',
          margin: '0 auto',
          padding: '0 .5rem'
        }}>
          © {new Date().getFullYear()} OWNED BY TAYLOR SWIFT. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;