import React from 'react';
import { quizQuestions } from '../../data/quizQuestions';

const AssessmentResult = ({ score, onReturnToScenarios, onExit }) => {
  const total = quizQuestions.length;
  const percentage = ((score / total) * 100).toFixed(0);
  
  return (
    <div style={{ padding: '30px', border: '2px solid #1890ff', borderRadius: '12px', background: '#f0f7ff', maxWidth: '500px', margin: '50px auto' }}>
      <h2>Assessment Completed</h2>
      <p>Score: <strong>{score} / {total}</strong></p>
      <p>Percentage: <strong>{percentage}%</strong></p>
      <p>Status: <strong>{percentage >= 70 ? "PASS" : "FAIL"}</strong></p>
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button 
          onClick={onReturnToScenarios} // Ensure this triggers the prop
          style={{ flex: 1, padding: '12px', background: '#1890ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Back to Scenarios
        </button>
        <button 
          onClick={onExit} // Ensure this triggers the prop
          style={{ flex: 1, padding: '12px', background: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Exit Simulator
        </button>
      </div>
    </div>
  );
};
export default AssessmentResult;