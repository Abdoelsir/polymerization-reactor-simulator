// frontend/src/components/scenarios/ScenarioManager.jsx
import React from 'react';

const ScenarioManager = ({ onSelectScenario }) => {
  const scenarios = [
    { 
      name: "Normal Startup", difficulty: "★", 
      init: { T_R: 305, P_R: 150, cooling: 50, feed: 1.0 }, 
      desc: "Bring reactor safely to production." 
    },
    { 
      name: "Cooling Failure", difficulty: "★★★", 
      init: { T_R: 310, P_R: 160, cooling: 0, feed: 1.0 }, 
      desc: "Restore temp before PSV opens." 
    },
    { 
      name: "Runaway Reaction", difficulty: "★★★★★", 
      init: { T_R: 325, P_R: 190, cooling: 20, feed: 5.0 }, 
      desc: "Prevent catastrophic overpressure." 
    }
  ];

  return (
    <div style={{ padding: '20px', border: '2px solid #1890ff', borderRadius: '8px', background: '#f9f9f9', width: '300px', marginTop: '20px' }}>
      <h4 style={{ margin: '0 0 15px 0', color: '#1890ff' }}>Training Scenarios</h4>
      {scenarios.map(s => (
        <div key={s.name} style={{ marginBottom: '15px', borderBottom: '1px solid #ddd' }}>
          <button onClick={() => onSelectScenario(s)} style={{ width: '100%', padding: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            {s.name} ({s.difficulty})
          </button>
          <p style={{ fontSize: '0.75rem', margin: '5px 0' }}>{s.desc}</p>
        </div>
      ))}
    </div>
  );
};
export default ScenarioManager;