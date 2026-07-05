import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Nav from './components/Nav';
import ReactorDiagram from './components/ReactorDiagram';
import ControlPanel from './components/ControlPanel';
import TrendChart from './components/TrendChart';
import TeachingPanel from './components/TeachingPanel';
import EventLog from './components/EventLog';
import HistoryLog from './components/HistoryLog';
import SafetyProtocolModal from './components/SafetyProtocolModal';
import ScenarioManager from './components/scenarios/ScenarioManager';
import PerformanceReport from './components/PerformanceReport';
import AssessmentResult from './components/Assessment/AssessmentResult';
import StudentRegistration from './components/Assessment/StudentRegistration';
import Quiz from './components/Assessment/Quiz'; 
import { calculatePerformance } from './utils/AssessmentEngine';
import { quizQuestions } from './data/quizQuestions';

function App() {
  const [currentView, setCurrentView] = useState("REGISTER");
  const [data, setData] = useState({ T_R: 305, P_R: 150, m_A: 100, PSV_Open: false });
  const [history, setHistory] = useState([]);
  const [logs, setLogs] = useState([]);
  const [fullHistory, setFullHistory] = useState([]);
  const [activeComponent, setActiveComponent] = useState(null);
  const [student, setStudent] = useState(null);
  const [scenario, setScenario] = useState(null);
  const [quizScore, setQuizScore] = useState(null);
  
  const activeAlarmIds = useRef(new Set());

  const addHistory = (msg) => {
    setFullHistory(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
  };

  const handleScenarioSelect = (selectedScenario) => {
    setScenario(selectedScenario);
    setCurrentView("TRAINING");
    addHistory(`SCENARIO: ${selectedScenario.name}`);
  };

  const processAlarms = useCallback((d) => {
    let newLogs = [];
    const alarms = [
      { id: 'temp_crit', cond: d.T_R > 318, msg: 'CRITICAL: High Reactor Temp', priority: 'CRITICAL' },
      { id: 'pres_high', cond: d.P_R > 180, msg: 'WARNING: High Pressure', priority: 'WARNING' },
      { id: 'psv_open', cond: d.PSV_Open, msg: 'CRITICAL: PSV Activated', priority: 'CRITICAL' }
    ];
    alarms.forEach(a => {
      if (a.cond) {
        newLogs.push({ msg: a.msg, priority: a.priority });
        if (!activeAlarmIds.current.has(a.id)) {
          addHistory(`[SAFETY] ${a.msg}`);
          activeAlarmIds.current.add(a.id);
        }
      } else {
        activeAlarmIds.current.delete(a.id);
      }
    });
    setLogs(newLogs);
  }, []);

  useEffect(() => {
    if (currentView !== "TRAINING" || !scenario) return;
    const interval = setInterval(() => {
      axios.get(`http://127.0.0.1:8000/step?m_dot_f=${scenario.init.feed}&Q_requested=${scenario.init.cooling}`)
        .then(res => {
          setData(res.data);
          processAlarms(res.data);
          setHistory(prev => [...prev.slice(-49), { 
            time: new Date().toLocaleTimeString(), 
            temp: parseFloat(res.data.T_R) || 0, 
            pressure: parseFloat(res.data.P_R) || 0,
            m_A: parseFloat(res.data.m_A) || 0 
          }]);
        });
    }, 500);
    return () => clearInterval(interval);
  }, [currentView, scenario, processAlarms]);

  const handleExit = () => {
    setStudent(null);
    setScenario(null);
    setHistory([]);
    setFullHistory([]);
    setQuizScore(null);
    setCurrentView("REGISTER");
  };

  return (
    <div>
      {currentView === "REGISTER" && <StudentRegistration onRegister={(s) => { setStudent(s); setCurrentView("SAFETY_CHECK"); }} />}
      {currentView === "SAFETY_CHECK" && <SafetyProtocolModal onStart={() => setCurrentView("SCENARIO_LIST")} />}
      {currentView === "SCENARIO_LIST" && <ScenarioManager onSelectScenario={handleScenarioSelect} />}
      
      {currentView === "TRAINING" && (
        <div style={{ padding: '20px' }}>
          <Nav module={`Operator: ${student?.name || "Guest"}`} />
          <div style={{ margin: '10px' }}>
            <button onClick={() => setCurrentView("SCENARIO_REPORT")} style={{background: 'blue', color: 'white', padding: '10px', marginRight: '10px'}}>End Scenario</button>
            <button onClick={() => setCurrentView("QUIZ")} style={{background: 'green', color: 'white', padding: '10px'}}>Take Quiz</button>
          </div>
          <div style={{ display: 'flex', gap: '20px', padding: '20px', alignItems: 'flex-start' }}>
            <ReactorDiagram temperature={data.T_R} psvOpen={data.PSV_Open} onComponentClick={setActiveComponent} />
            <TeachingPanel activeComponent={activeComponent} setActiveComponent={setActiveComponent} temperature={data.T_R} pressure={data.P_R} psvOpen={data.PSV_Open} />
          </div>
          <div style={{ padding: '20px' }} onClick={() => setActiveComponent("Control Panel")}><ControlPanel onFeedChange={() => {}} onCoolingChange={() => {}} /></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '24px', padding: '20px' }}>
            <div onClick={() => setActiveComponent("Active Safety Alerts")} style={{ width: '48%' }}><EventLog logs={logs} /></div>
            <div onClick={() => setActiveComponent("Event Audit Trail")} style={{ width: '48%' }}><HistoryLog logs={fullHistory} onClearHistory={() => setFullHistory([])} /></div>
          </div>
          <div style={{ padding: '20px' }} onClick={() => setActiveComponent("Process Trends (Live)")}><TrendChart dataHistory={history} /></div>
        </div>
      )}

      {currentView === "SCENARIO_REPORT" && (
        <div style={{padding: '20px'}}>
           <PerformanceReport report={calculatePerformance(history, quizScore)} />
           <button onClick={() => setCurrentView("TRAINING")}>Return to Training</button>
           <button onClick={() => setCurrentView("QUIZ")}>Take Quiz</button>
           <button onClick={handleExit}>Exit</button>
        </div>
      )}

      {currentView === "QUIZ" && <Quiz onComplete={(score) => { setQuizScore(score); setCurrentView("QUIZ_RESULT"); }} />}

      {currentView === "QUIZ_RESULT" && (
        <AssessmentResult 
          score={quizScore} 
          total={quizQuestions.length}
          onReturnToScenarios={() => setCurrentView("SCENARIO_LIST")}
          onRetry={() => setCurrentView("QUIZ")}
          onExit={handleExit}
        />
      )}
    </div>
  );
}
export default App;