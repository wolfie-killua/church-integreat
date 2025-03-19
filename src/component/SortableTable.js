import React, { useState, useMemo } from 'react';

const SortableTable = ({ data }) => {
  const [sortField, setSortField] = useState('package_id');
  const [sortDirection, setSortDirection] = useState('asc');

  // Handle column click for sorting
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Sort the data based on current sort field and direction
  const sortedData = useMemo(() => {
    if (!data) return [];
    
    return [...data].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Special handling for dates
      if (sortField === 'available_date') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      
      if (aValue === bValue) return 0;
      
      // Handle null values
      if (aValue === null) return 1;
      if (bValue === null) return -1;
      
      // Sort based on direction
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
  }, [data, sortField, sortDirection]);

  // Render sort indicator
  const renderSortIcon = (field) => {
    if (sortField !== field) return null;
    
    return (
      <span style={{ marginLeft: '4px', color: '#dc2626' }}>
        {sortDirection === 'asc' ? '▲' : '▼'}
      </span>
    );
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '15px'
      }}>
        <thead>
          <tr style={{
            backgroundColor: '#f8f9fe',
            borderBottom: '2px solid #e5e7eb'
          }}>
            <th 
              onClick={() => handleSort('package_id')}
              style={{
                padding: '12px 16px',
                textAlign: 'left',
                fontWeight: '600',
                color: sortField === 'package_id' ? '#dc2626' : '#4a5568',
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => {
                if (sortField !== 'package_id') {
                  e.target.style.color = '#dc2626';
                }
              }}
              onMouseLeave={(e) => {
                if (sortField !== 'package_id') {
                  e.target.style.color = '#4a5568';
                }
              }}
            >
              Package ID {renderSortIcon('package_id')}
            </th>
            <th 
              onClick={() => handleSort('priest_name')}
              style={{
                padding: '12px 16px',
                textAlign: 'left',
                fontWeight: '600',
                color: sortField === 'priest_name' ? '#dc2626' : '#4a5568',
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => {
                if (sortField !== 'priest_name') {
                  e.target.style.color = '#6c5ce7';
                }
              }}
              onMouseLeave={(e) => {
                if (sortField !== 'priest_name') {
                  e.target.style.color = '#4a5568';
                }
              }}
            >
              Priest Name {renderSortIcon('priest_name')}
            </th>
            <th 
              onClick={() => handleSort('available_date')}
              style={{
                padding: '12px 16px',
                textAlign: 'left',
                fontWeight: '600',
                color: sortField === 'available_date' ? '#dc2626' : '#4a5568',
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => {
                if (sortField !== 'available_date') {
                  e.target.style.color = '#6c5ce7';
                }
              }}
              onMouseLeave={(e) => {
                if (sortField !== 'available_date') {
                  e.target.style.color = '#4a5568';
                }
              }}
            >
              Available Date {renderSortIcon('available_date')}
            </th>
            <th 
              onClick={() => handleSort('church_venue')}
              style={{
                padding: '12px 16px',
                textAlign: 'left',
                fontWeight: '600',
                color: sortField === 'church_venue' ? '#dc2626' : '#4a5568',
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => {
                if (sortField !== 'church_venue') {
                  e.target.style.color = '#6c5ce7';
                }
              }}
              onMouseLeave={(e) => {
                if (sortField !== 'church_venue') {
                  e.target.style.color = '#4a5568';
                }
              }}
            >
              Church Venue {renderSortIcon('church_venue')}
            </th>
            <th 
              onClick={() => handleSort('status')}
              style={{
                padding: '12px 16px',
                textAlign: 'left',
                fontWeight: '600',
                color: sortField === 'status' ? '#dc2626' : '#4a5568',
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => {
                if (sortField !== 'status') {
                  e.target.style.color = '#6c5ce7';
                }
              }}
              onMouseLeave={(e) => {
                if (sortField !== 'status') {
                  e.target.style.color = '#4a5568';
                }
              }}
            >
              Status {renderSortIcon('status')}
            </th>
            <th 
              onClick={() => handleSort('book_by')}
              style={{
                padding: '12px 16px',
                textAlign: 'left',
                fontWeight: '600',
                color: sortField === 'book_by' ? '#dc2626' : '#4a5568',
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => {
                if (sortField !== 'book_by') {
                  e.target.style.color = '#6c5ce7';
                }
              }}
              onMouseLeave={(e) => {
                if (sortField !== 'book_by') {
                  e.target.style.color = '#4a5568';
                }
              }}
            >
              Booked By {renderSortIcon('book_by')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr 
              key={item.package_id}
              style={{
                borderBottom: '1px solid #e5e7eb',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fe';
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
                  backgroundColor: item.status === 'Available' ? '#fef2f2' : '#fee2e2',
                  color: item.status === 'Available' ? '#dc2626' : '#b91c1c',
                  padding: '4px 8px',
                  borderRadius: '20px',
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
  );
};

export default SortableTable;