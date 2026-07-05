import React from "react";

export default function EventLog({ logs, onTestLog }) {
  // Helper to determine background color based on priority
  const getEntryStyle = (priority) => ({
    margin: "4px 0",
    padding: "6px",
    borderRadius: "3px",
    color: "#fff",
    backgroundColor: priority === "CRITICAL" ? "#d32f2f" : "#f57c00",
    fontWeight: "bold",
    fontSize: "0.85rem",
    textAlign: "left"
  });

  const styles = {
    container: { 
      marginTop: "20px", 
      border: "2px solid #333", 
      padding: "10px", 
      width: "100%", // Changed to 100% to fill its parent grid cell
      height: "200px" 
    },
    headerRow: { 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      marginBottom: "10px" 
    },
    logBox: { 
      height: "140px", 
      overflowY: "auto", 
      background: "#eee", 
      padding: "5px" 
    },
    normalText: { 
      color: "#555", 
      fontStyle: "italic", 
      textAlign: "center",
      marginTop: "40px"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h4 style={{ margin: 0 }}>Active Safety Alerts</h4>
        <button 
          onClick={onTestLog} 
          style={{ cursor: "pointer", fontSize: "0.7rem", padding: "2px 5px" }}
        >
          Test Log
        </button>
      </div>
      
      <div style={styles.logBox}>
        {logs.length === 0 ? (
          <p style={styles.normalText}>System Normal</p>
        ) : (
          logs.map((log, index) => (
            <div 
              key={index} 
              style={getEntryStyle(log.priority)}
            >
              {log.msg}
            </div>
          ))
        )}
      </div>
    </div>
  );
}