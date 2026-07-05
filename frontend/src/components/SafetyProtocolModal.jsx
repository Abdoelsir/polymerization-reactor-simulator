import React, { useState } from 'react';

const SafetyProtocolModal = ({ onStart }) => {
  const [confirmed, setConfirmed] = useState([false, false, false]);

  const toggleCheck = (index) => {
    const newChecked = [...confirmed];
    newChecked[index] = !newChecked[index];
    setConfirmed(newChecked);
  };

  const allChecked = confirmed.every(Boolean);

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Industrial Reactor Permit to Operate</h2>
        <p>Confirm the following safety checks before proceeding:</p>
        <div style={styles.checkboxList}>
          <label><input type="checkbox" onChange={() => toggleCheck(0)} /> Cooling System Operational</label>
          <label><input type="checkbox" onChange={() => toggleCheck(1)} /> PSV Inspection Verified</label>
          <label><input type="checkbox" onChange={() => toggleCheck(2)} /> Emergency Shutdown Procedure Reviewed</label>
        </div>
        <button 
          disabled={!allChecked} 
          onClick={onStart} 
          style={allChecked ? styles.activeButton : styles.disabledButton}
        >
          {allChecked ? "START SIMULATION" : "ACKNOWLEDGE SAFETY PROTOCOLS"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 },
  modal: { background: '#fff', padding: '40px', borderRadius: '12px', width: '400px', textAlign: 'center' },
  checkboxList: { textAlign: 'left', margin: '20px 0' },
  activeButton: { padding: '15px 30px', background: '#1890ff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  disabledButton: { padding: '15px 30px', background: '#ccc', color: '#666', border: 'none', borderRadius: '5px' }
};

export default SafetyProtocolModal;