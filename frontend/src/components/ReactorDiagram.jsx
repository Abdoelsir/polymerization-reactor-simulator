// frontend/src/components/ReactorDiagram.jsx
import React from 'react';

const ReactorDiagram = ({ temperature, psvOpen, onComponentClick }) => {
  const getReactorColor = () => (temperature > 320 ? '#ff4d4f' : '#1890ff');

  return (
    <div style={{ textAlign: 'center', margin: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <svg width="300" height="450" viewBox="0 0 300 450" style={{ cursor: 'pointer' }} onClick={() => onComponentClick("Chemical Reactor")}>
        {/* Support Skirt */}
        <path d="M 90 340 L 60 420 L 240 420 L 210 340 Z" fill="#555" />
        {/* Cooling Jacket */}
        <rect x="80" y="110" width="140" height="230" fill="#e6f7ff" stroke="#91d5ff" />
        {/* Main Vessel Body */}
        <rect x="80" y="110" width="140" height="230" fill={getReactorColor()} stroke="#0050b3" strokeWidth="2" />
        <ellipse cx="150" cy="340" rx="70" ry="30" fill={getReactorColor()} stroke="#0050b3" strokeWidth="2" />
        <ellipse cx="150" cy="110" rx="70" ry="30" fill="#e6f7ff" stroke="#91d5ff" />
        {/* Components */}
        <rect x="130" y="20" width="40" height="30" fill="#333" onClick={(e) => { e.stopPropagation(); onComponentClick("Motor"); }} />
        <line x1="150" y1="70" x2="150" y2="120" stroke="black" strokeWidth="6" />
        <line x1="120" y1="280" x2="180" y2="280" stroke="black" strokeWidth="6" onClick={(e) => { e.stopPropagation(); onComponentClick("Agitator"); }} />
        <circle cx="220" cy="160" r="20" fill="white" stroke="black" onClick={(e) => { e.stopPropagation(); onComponentClick("Pressure Gauge"); }} />
        <text x="215" y="165" fontSize="12" fontWeight="bold">P</text>
        <path d="M 150 80 L 150 30 L 190 30" stroke={psvOpen ? "red" : "black"} strokeWidth="8" fill="none" onClick={(e) => { e.stopPropagation(); onComponentClick("PSV"); }} />
      </svg>
      <div>
        <h3>Reactor Status: {temperature.toFixed(2)} K</h3>
        <p style={{ color: psvOpen ? 'red' : 'green', fontWeight: 'bold' }}>{psvOpen ? "!! RELIEF VALVE OPEN !!" : "System Normal"}</p>
      </div>
    </div>
  );
};
export default ReactorDiagram;