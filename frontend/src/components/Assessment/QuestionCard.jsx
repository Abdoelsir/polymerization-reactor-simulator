import React from 'react';

const QuestionCard = ({ questionData, onAnswer, showExplanation, explanation, isCorrect, onNext }) => {
  return (
    <div style={{ padding: '20px', border: '1px solid #1890ff', borderRadius: '8px', maxWidth: '600px', margin: 'auto' }}>
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{questionData.question}</p>
      
      {questionData.options.map((opt, i) => (
        <button 
          key={i} 
          onClick={() => onAnswer(i)}
          disabled={showExplanation}
          style={{ display: 'block', width: '100%', margin: '10px 0', padding: '12px', cursor: 'pointer' }}
        >
          {opt}
        </button>
      ))}

      {showExplanation && (
        <div style={{ marginTop: '20px', padding: '15px', background: isCorrect ? '#e6ffed' : '#fff1f0' }}>
          <p><strong>{isCorrect ? "Correct!" : "Incorrect."}</strong></p>
          <p>{explanation}</p>
          <button onClick={onNext} style={{ marginTop: '10px', padding: '8px 16px' }}>
            Next Question
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;