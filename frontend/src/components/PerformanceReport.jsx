// frontend/src/components/PerformanceReport.jsx
import React from 'react';

/**
 * PerformanceReport: Dedicated to physical simulator metrics.
 * This component remains isolated from the Quiz/Assessment logic.
 */
const PerformanceReport = ({ report }) => {
  // Guard clause: Only render if simulator metrics exist
  if (!report || !report.peakTemp) return null;

  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #52c41a', 
      borderRadius: '8px', 
      background: '#f6ffed', 
      marginTop: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
    }}>
      <h3 style={{ color: '#237804', marginTop: '0' }}>Simulation Operational Metrics</h3>
      <p>Operational Status: <strong>{report.status}</strong></p>
      <ul style={{ paddingLeft: '20px' }}>
        <li>Peak Reactor Temperature: {report.peakTemp} K</li>
        <li>PSV Actuation Event: {report.psvEvents}</li>
      </ul>
      <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0' }}>
        <em>Report generated at: {report.timestamp}</em>
      </p>
    </div>
  );
};

export default PerformanceReport;