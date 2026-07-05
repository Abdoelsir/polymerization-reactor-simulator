// frontend/src/components/TeachingPanel.jsx
import React from 'react';

const TeachingPanel = ({ activeComponent, setActiveComponent, temperature, pressure, psvOpen }) => {
  const getInsight = () => {
    switch (activeComponent) {
      case "Chemical Reactor": return "Chemical Reactor: The heart of the process. An enclosed vessel where raw materials transform under controlled temperature, pressure, and concentration.";
      case "Control Panel": return "Control Panel: The central interface to monitor and adjust feed rates and cooling to maintain stable reaction conditions.";
      case "Process Trends (Live)": return "Process Trends: Displays real-time data. Monitor concentration (m_A) closely; a sudden drop often signals rapid polymerization.";
      case "Active Safety Alerts": return "Active Safety Alerts: Real-time DCS alarms. Displays abnormal conditions requiring immediate attention.";
      case "Event Audit Trail": return "Event Audit Trail: A chronological log of system events, operator actions, and alarms for regulatory compliance.";
      case "Motor": return "Motor: Drives the agitator shaft for consistent mixing.";
      case "PSV": return "Pressure Safety Valve (PSV): Safety relief device that vents vapor if pressure exceeds design limits.";
      default: return "Process is at steady state. Click on any component to inspect its role in Process Safety Management.";
    }
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #1890ff', borderRadius: '8px', background: '#f0f7ff', width: '300px', marginTop: '20px' }}>
      <h3>{activeComponent ? activeComponent + " Details" : "Intelligent Teaching Assistant"}</h3>
      <p>{getInsight()}</p>
      {activeComponent && <button onClick={() => setActiveComponent(null)}>Return to Monitoring</button>}
    </div>
  );
};
export default TeachingPanel;