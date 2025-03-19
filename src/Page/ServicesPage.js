import React, { useState, useEffect } from 'react';
import churchDataService from '../services/churchDataService';
import LoadingSpinner from '../component/LoadingSpinner';
// import SortableTable from '../component/SortableTable';
// eslint-disable-next-line no-unused-vars

const ServicePage = () => {
  const [churchData, setChurchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChurchData = async () => {
      try {
        setLoading(true);
        
        // Using our service to fetch data
        const { success, data, error: serviceError } = await churchDataService.getChurchData();
        
        if (!success) {
          throw new Error(serviceError);
        }
        
        setChurchData(data);
      } catch (err) {
        setError('Failed to fetch church data: ' + err.message);
        console.error('Error fetching church data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChurchData();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={{
      width: '100%',
      padding: '20px',
      maxWidth: '100%',
      margin: '0 auto',
      backgroundColor: 'white'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Header */}
        <div style={{
          borderBottom: '2px solid #dc2626',
          paddingBottom: '15px',
          marginBottom: '20px'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#4a5568'
          }}>Services</h2>
        </div>
        
        {/* Table Container */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
          width: '90%',
          margin: '0 auto',
          border: '1px solid #f0f0f7'
        }}>
          {loading ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#4b5563'
            }}>
              <LoadingSpinner />
              <p style={{ marginTop: '16px' }}>Loading church data...</p>
            </div>
          ) : error ? (
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#b91c1c',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          ) : (
            <>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '25px'
              }}>
                <h3 style={{
                  fontSize: '22px',
                  color: '#4b5563',
                  fontWeight: '600'
                }}>Church Events Information</h3>
                
                <button 
                  onClick={() => {
                    setLoading(true);
                    setError(null);
                    // Refresh data
                    churchDataService.getChurchData()
                      .then(({ success, data, error: serviceError }) => {
                        if (success) {
                          setChurchData(data);
                        } else {
                          setError('Failed to refresh data: ' + serviceError);
                        }
                        setLoading(false);
                      });
                  }}
                  style={{
                    backgroundColor: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'background-color 0.2s',
                    boxShadow: '0 2px 5px rgba(220, 38, 38, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#b91c1c';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#dc2626';
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                    <path d="M21 3v5h-5"></path>
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                    <path d="M8 16H3v5"></path>
                  </svg>
                  Refresh
                </button>
              </div>
              
              {churchData.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '20px',
                  color: '#6b7280',
                  fontStyle: 'italic'
                }}>
                  No church events available at the moment.
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '15px'
                  }}>
                    <thead>
                      <tr style={{
                        backgroundColor: '#f3f4f6',
                        borderBottom: '2px solid #e5e7eb'
                      }}>
                        <th style={{
                          padding: '12px 16px',
                          textAlign: 'left',
                          fontWeight: '600',
                          color: '#374151'
                        }}>Package ID</th>
                        <th style={{
                          padding: '12px 16px',
                          textAlign: 'left',
                          fontWeight: '600',
                          color: '#374151'
                        }}>Priest Name</th>
                        <th style={{
                          padding: '12px 16px',
                          textAlign: 'left',
                          fontWeight: '600',
                          color: '#374151'
                        }}>Available Date</th>
                        <th style={{
                          padding: '12px 16px',
                          textAlign: 'left',
                          fontWeight: '600',
                          color: '#374151'
                        }}>Church Venue</th>
                        <th style={{
                          padding: '12px 16px',
                          textAlign: 'left',
                          fontWeight: '600',
                          color: '#374151'
                        }}>Status</th>
                        <th style={{
                          padding: '12px 16px',
                          textAlign: 'left',
                          fontWeight: '600',
                          color: '#374151'
                        }}>Booked By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {churchData.map((item) => (
                        <tr 
                          key={item.package_id}
                          style={{
                            borderBottom: '1px solid #e5e7eb',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f9fafb';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <td style={{ padding: '12px 16px' }}>{item.package_id}</td>
                          <td style={{ padding: '12px 16px' }}>{item.priest_name}</td>
                          <td style={{ padding: '12px 16px' }}>{formatDate(item.available_date)}</td>
                          <td style={{ padding: '12px 16px' }}>{item.church_venue}</td>
                          <td style={{ padding: '12px 16px' }}>
                            <span style={{
                              backgroundColor: item.status === 'Available' ? '#d1fae5' : '#fee2e2',
                              color: item.status === 'Available' ? '#065f46' : '#b91c1c',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '13px',
                              fontWeight: '500'
                            }}>
                              {item.status}
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            {item.book_by || 
                              <span style={{ 
                                color: '#9ca3af', 
                                fontStyle: 'italic' 
                              }}>
                                Not booked
                              </span>
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;