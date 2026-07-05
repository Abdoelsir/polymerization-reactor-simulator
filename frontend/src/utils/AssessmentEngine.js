// frontend/src/utils/AssessmentEngine.js
export const calculatePerformance = (history, scenarioName, quizScore) => {
  if (!history || history.length === 0) return null;

  const peakTemp = Math.max(...history.map(h => h.temp));
  const psvEvents = history.filter(h => h.temp > 320).length;

  return {
    peakTemp: peakTemp.toFixed(2),
    psvEvents: psvEvents > 0 ? "YES" : "NO",
    quizScore: quizScore,
    status: peakTemp < 320 ? "PASS" : "FAIL",
    timestamp: new Date().toLocaleTimeString()
  };
};