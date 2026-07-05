import React from "react";

/**
 * HistoryLog Component
 * Displays a chronological Event Audit Trail.
 * @param {Array} logs - Array of log strings.
 * @param {Function} onClearHistory - Handler to clear the log array.
 */
export default function HistoryLog({ logs, onClearHistory }) {
  const styles = {
    container: { 
      marginTop: "20px", 
      padding: "10px", 
      border: "1px solid #ccc", 
      borderRadius: "5px", 
      width: "100%", // Changed to 100% to fit flex layouts better
      height: "200px" 
    },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px"
    },
    logList: { 
      height: "140px", 
      overflowY: "auto", 
      fontSize: "0.8rem", 
      padding: "5px",
      textAlign: "left",
      background: "#fafafa" 
    },
    entry: { 
      margin: "2px 0", 
      borderBottom: "1px solid #eee",
      paddingBottom: "2px",
      fontFamily: "monospace" 
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h4 style={{ margin: 0 }}>Event Audit Trail</h4>
        {onClearHistory && (
          <button 
            onClick={onClearHistory} 
            style={{ 
              cursor: "pointer", 
              fontSize: "0.7rem", 
              padding: "2px 5px" 
            }}
          >
            Clear
          </button>
        )}
      </div>
      <div style={styles.logList}>
        {logs && logs.length === 0 ? (
          <p style={{ 
            color: "#999", 
            fontStyle: "italic", 
            textAlign: "center",
            marginTop: "40px"
          }}>
            No recorded history.
          </p>
        ) : (
          logs && logs.map((entry, index) => (
            <p key={index} style={styles.entry}>{entry}</p>
          ))
        )}
      </div>
    </div>
  );
}