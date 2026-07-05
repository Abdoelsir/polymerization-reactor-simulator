import React from 'react';

const Nav = ({ title, module }) => {
  return (
    <nav style={{ 
      padding: '15px 25px', 
      background: '#001529', 
      color: '#fff', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      borderBottom: '3px solid #1890ff'
    }}>
      {/* Official Project Identity */}
      <div>
        <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '700' }}>PolySafe Reactor</h1>
        <div style={{ fontSize: '0.8rem', opacity: 0.9, marginTop: '2px', fontWeight: '500' }}>
          UTP | CEB4523: Designs for Process Safety
        </div>
        <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '1px' }}>
          By Dr. Syaza Izyanni Bt Ahmad
        </div>
      </div>

      {/* Module/Interface Status */}
      <div style={{ textAlign: 'right' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#1890ff' }}>
          {module}
        </span>
      </div>
    </nav>
  );
};

export default Nav;