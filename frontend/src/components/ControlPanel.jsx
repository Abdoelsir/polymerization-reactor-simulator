import React from 'react';

const ControlPanel = ({ onFeedChange, onCoolingChange }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
      <h3>Control Panel</h3>
      <label>Feed Rate: </label>
      <input type="range" min="0" max="20" step="0.1" defaultValue="1.0" 
             onChange={(e) => onFeedChange(e.target.value)} />
      <br/>
      <label>Cooling Rate: </label>
      <input type="range" min="0" max="500" step="10" defaultValue="50.0" 
             onChange={(e) => onCoolingChange(e.target.value)} />
    </div>
  );
};
export default ControlPanel;