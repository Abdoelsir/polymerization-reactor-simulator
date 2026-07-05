// ======================================================
// Interactive Industrial Polymerization Reactor Learning Simulator
// Assessment Quiz
// File: src/data/quizQuestions.js
// ======================================================

export const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of the cooling jacket in a polymerization reactor?",
    options: [
      "Increase reactor pressure",
      "Remove excess reaction heat and control reactor temperature",
      "Mix reactants inside the vessel",
      "Increase polymer production rate"
    ],
    answer: 1,
    explanation: "Polymerization reactions are highly exothermic. The cooling jacket removes excess heat and maintains the reactor at a safe operating temperature."
  },
  {
    id: 2,
    question: "Why are polymerization reactors considered high-risk process equipment?",
    options: [
      "Because they always operate under vacuum",
      "Because polymerization reactions are highly exothermic and may become runaway reactions",
      "Because they contain only cooling water",
      "Because they operate only at atmospheric pressure"
    ],
    answer: 1,
    explanation: "Polymerization reactions release large amounts of heat. If this heat is not removed, the reaction rate accelerates, potentially leading to a runaway reaction."
  },
  {
    id: 3,
    question: "What is the first process variable that begins to increase after cooling failure?",
    options: [
      "Liquid level",
      "Reactor temperature",
      "Agitator speed",
      "Feed flow rate"
    ],
    answer: 1,
    explanation: "Loss of cooling causes reactor temperature to increase first. The pressure then rises as a consequence of the temperature increase."
  },
  {
    id: 4,
    question: "What is the main purpose of the Pressure Safety Valve (PSV) installed on the reactor?",
    options: [
      "Increase reactor pressure",
      "Control polymer quality",
      "Protect the reactor from excessive pressure",
      "Measure reactor temperature"
    ],
    answer: 2,
    explanation: "The PSV is the final protective device that automatically relieves pressure before the reactor exceeds its safe design pressure."
  },
  {
    id: 5,
    question: "During a runaway polymerization reaction, which sequence best describes the process?",
    options: [
      "Pressure decreases → Temperature decreases",
      "Temperature rises → Pressure rises → PSV opens",
      "Cooling increases → Pressure decreases",
      "Agitator stops → Temperature decreases"
    ],
    answer: 1,
    explanation: "Runaway reactions generate heat rapidly, causing reactor temperature and pressure to rise until the PSV opens to relieve excess pressure."
  },
  {
    id: 6,
    question: "If the PSV opens during operation, what should the operator understand?",
    options: [
      "The reactor is operating normally",
      "The reactor has entered an abnormal or emergency condition",
      "The reactor is empty",
      "The cooling system has become more efficient"
    ],
    answer: 1,
    explanation: "PSV activation indicates that pressure has reached an unsafe level and that emergency protective action is occurring."
  },
  {
    id: 7,
    question: "Which operator action is the most appropriate immediately after a cooling system failure?",
    options: [
      "Increase reactant feed rate",
      "Restore cooling and closely monitor reactor conditions",
      "Close the PSV manually",
      "Increase reactor temperature"
    ],
    answer: 1,
    explanation: "The operator should restore cooling as quickly as possible while monitoring temperature and pressure to prevent a runaway reaction."
  },
  {
    id: 8,
    question: "What is the primary function of the reactor agitator?",
    options: [
      "Increase reactor pressure",
      "Provide uniform mixing and improve heat transfer",
      "Operate the PSV",
      "Measure reactor level"
    ],
    answer: 1,
    explanation: "The agitator provides uniform mixing of reactants and improves heat transfer, helping maintain stable reactor conditions."
  },
  {
    id: 9,
    question: "If the reactor pressure continues increasing even after the PSV opens, what is the most likely reason?",
    options: [
      "The cooling system is operating perfectly",
      "The heat generation exceeds the PSV relieving capacity",
      "The reactor temperature is decreasing",
      "The agitator is rotating faster"
    ],
    answer: 1,
    explanation: "If heat generation remains greater than the relief capacity, reactor pressure may continue increasing despite PSV operation."
  },
  {
    id: 10,
    question: "Which statement best summarizes the objective of this Industrial Polymerization Reactor Learning Simulator?",
    options: [
      "Teach polymer manufacturing economics",
      "Demonstrate reactor operation, cooling control, pressure protection and safe operator response",
      "Design industrial piping systems",
      "Teach laboratory chemical analysis"
    ],
    answer: 1,
    explanation: "The simulator is designed to help students understand reactor dynamics, process safety, cooling systems, pressure relief devices, and operator decision making during normal and abnormal operating conditions."
  }
];