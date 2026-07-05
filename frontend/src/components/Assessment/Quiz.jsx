import React, { useState } from 'react';
import { quizQuestions } from '../../data/quizQuestions';
import QuestionCard from './QuestionCard';

const Quiz = ({ onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = (selectedIndex) => {
    const correct = selectedIndex === quizQuestions[currentIdx].answer;
    setIsCorrect(correct);
    
    // Update score immediately
    const newScore = correct ? score + 1 : score;
    setScore(newScore);
    setShowExplanation(true);
  };

  const handleNext = () => {
    // Check if this was the last question
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setShowExplanation(false);
    } else {
      // Immediately finalize the quiz, visible the score and return the updated score
      onComplete(score);
    }
  };

  return (
    <QuestionCard 
      questionData={quizQuestions[currentIdx]}
      onAnswer={handleAnswer}
      showExplanation={showExplanation}
      explanation={quizQuestions[currentIdx].explanation}
      isCorrect={isCorrect}
      onNext={handleNext}
    />
  );
};

export default Quiz;