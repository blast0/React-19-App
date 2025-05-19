import React, { useState } from "react";

function EventLogger({ inputRef }) {
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs((prevLogs) => [
      { message, timestamp: new Date().toLocaleTimeString() },
      ...prevLogs,
    ]);
  };

  return (
    <div
      style={{
        resize: "both",
        overflow: "auto",
        height: 200,
        minHeight: 100,
        minWidth: 250,
        border: "1px solid #ccc",
        padding: "8px",
        boxSizing: "border-box",
      }}
    >
      <input
        type="text"
        ref={inputRef}
        onChange={(e) => addLog(`onChange: ${e.target.value}`)}
        onFocus={() => addLog("onFocus")}
        onBlur={() => addLog("onBlur")}
        onKeyDown={(e) => addLog(`onKeyDown: "${e.key}"`)}
        placeholder="Type here"
      />
      <div style={{ marginTop: "1em" }}>
        <strong>Event Log:</strong>
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {logs.map((log, idx) => (
            <li key={idx}>
              [{log.timestamp}] {log.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EventLogger;
