import React, { useState } from 'react';
import churchPostAPI from '../services/churchPostAPI';

const CreateEvent = () => {
  // Form state
  const [priestName, setPriestName] = useState('');
  const [churchVenue, setChurchVenue] = useState('');
  const [availableDate, setAvailableDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!priestName.trim() || !churchVenue.trim() || !availableDate.trim()) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      console.log('Creating new event using POST API service');
      
      // Using POST API service to create event
      const { success, packageId, error } = await churchPostAPI.createEvent({
        priestName,
        churchVenue,
        availableDate
      });
      
      if (!success) {
        throw new Error(error);
      }
      
      // Success! Reset form
      setPriestName('');
      setChurchVenue('');
      setAvailableDate('');
      setSuccess(true);
      
      console.log('Event created successfully with package ID:', packageId);
      
    } catch (err) {
      console.error('Error creating event:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div style={{
      width: '100%',
      padding: '20px',
      maxWidth: '100%',
      margin: '0 auto',
      backgroundColor: '#f9fafb'
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
          marginBottom: '5px'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#dc2626'
          }}>CREATE SERVICES</h2>
        </div>
        
        {/* Form Container */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          width: '80%', // Increased width
          minWidth: '600px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h3 style={{
            fontSize: '22px',
            marginBottom: '25px',
            color: '#4b5563',
            fontWeight: '600',
            textAlign: 'center'
          }}>Insert Information</h3>
          
          {error && (
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
          )}
          
          {success && (
            <div style={{
              backgroundColor: '#d1fae5',
              color: '#065f46',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              Event created successfully!
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              width: '80%',
              margin: '0 auto'
            }}>
              {/* Priest Name Input */}
              <div>
                <label
                  htmlFor="priestName"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#4b5563'
                  }}
                >
                  Priest Name*
                </label>
                <input
                  id="priestName"
                  type="text"
                  value={priestName}
                  onChange={(e) => setPriestName(e.target.value)}
                  placeholder="Enter priest name"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#ef4444';
                    e.target.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>

              {/* Date Picker - Moved up before Church Venue */}
              <div>
                <label
                  htmlFor="availableDate"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#4b5563'
                  }}
                >
                  Available Date*
                </label>
                <input
                  id="availableDate"
                  type="date"
                  value={availableDate}
                  onChange={(e) => setAvailableDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#ef4444';
                    e.target.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>

              {/* Church Venue Input - Moved down after Date */}
              <div>
                <label
                  htmlFor="churchVenue"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#4b5563'
                  }}
                >
                  Church Venue*
                </label>
                <input
                  id="churchVenue"
                  type="text"
                  value={churchVenue}
                  onChange={(e) => setChurchVenue(e.target.value)}
                  placeholder="Enter church venue"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#ef4444';
                    e.target.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>

              {/* Submit Button */}
              <div style={{ marginTop: '16px' }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor: loading ? '#9ca3af' : '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '16px 20px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    width: '100%',
                    transition: 'background-color 0.2s',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) e.target.style.backgroundColor = '#b91c1c';
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) e.target.style.backgroundColor = '#dc2626';
                  }}
                >
                  {loading ? 'Creating...' : '+ Information'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;