import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

/**
 * TrendChart Component
 * Displays live process data for Temperature, Pressure, and Monomer Concentration.
 * * @param {Array} dataHistory - Array of data points from the API.
 */
const TrendChart = ({ dataHistory }) => {
  return (
    <div style={{ 
      width: '100%', 
      height: 320, 
      marginTop: '20px',
      background: '#ffffff',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #eee',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#555' }}>
        Process Trends (Live)
      </h3>
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dataHistory} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="time" hide />
          
          {/* Left Axis: Temperature (K) and Concentration (kg) */}
          <YAxis 
            yAxisId="left" 
            orientation="left" 
            domain={['auto', 'auto']} 
            fontSize={12}
            tick={{ fill: '#666' }}
          />
          
          {/* Right Axis: Pressure (kPa) */}
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            domain={['auto', 'auto']} 
            fontSize={12}
            tick={{ fill: '#666' }}
          />
          
          <Tooltip 
            contentStyle={{ fontSize: '0.85rem', borderRadius: '4px' }} 
          />
          <Legend verticalAlign="top" height={36} />
          
          {/* Data Lines */}
          <Line 
            yAxisId="left" 
            type="monotone" 
            dataKey="temp" 
            name="Temperature (K)" 
            stroke="#ff4d4f" 
            dot={false} 
            strokeWidth={2}
          />
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="pressure" 
            name="Pressure (kPa)" 
            stroke="#1890ff" 
            dot={false} 
            strokeWidth={2}
          />
          <Line 
            yAxisId="left" 
            type="monotone" 
            dataKey="m_A" 
            name="Monomer (kg)" 
            stroke="#52c41a" 
            dot={false} 
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;