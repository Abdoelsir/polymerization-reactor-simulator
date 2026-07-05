import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({ T_R: 0, PSV_Open: false });

  useEffect(() => {
    // This connects your React app to your Python API
    const interval = setInterval(() => {
      axios.get('http://127.0.0.1:8000/step')
        .then(response => setData(response.data))
        .catch(error => console.error("Error fetching data:", error));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Reactor Monitor</h1>
      <h2>Temperature: {data.T_R ? data.T_R.toFixed(2) : 0} K</h2>
      <h2 style={{ color: data.PSV_Open ? 'red' : 'green' }}>
        Relief Valve: {data.PSV_Open ? 'OPEN' : 'CLOSED'}
      </h2>
    </div>
  );
}

export default App;