import React, { useEffect, useRef, useState } from 'react';
import styles from './TerminalPage.module.css'; // Import CSS Module styles

const TerminalPage = () => {
  const [output, setOutput] = useState('');
  const inputRef = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    // Establish WebSocket connection
    ws.current = new WebSocket('ws://localhost:4522/ws/terminal');

    ws.current.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.current.onmessage = (event) => {
      console.log('Message received:', event.data); // Debug log
      setOutput((prevOutput) => prevOutput + event.data); // Append new data
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error); // Debug log
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const sendCommand = () => {
    if (ws.current && inputRef.current) {
      const command = inputRef.current.value;
      if (command.trim() !== '') {
        console.log('Sending command:', command); // Debug log
        ws.current.send(command + '\n'); // Send command with newline
        inputRef.current.value = '';
      }
    }
  };

  return (
    <div className={styles.terminalPage}>
      <h2 className={styles.terminalTitle}>Terminal</h2>
      <textarea
        className={styles.terminalOutput}
        value={output}
        readOnly
        rows="20"
        cols="80"
      />
      <div className={styles.inputContainer}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Type your command"
          className={styles.terminalInput}
        />
        <button onClick={sendCommand} className={styles.terminalButton}>Send</button>
      </div>
    </div>
  );
};

export default TerminalPage;
