import React from 'react';
import styles from './Popup.module.css'; // Create a separate CSS module for the popup

const Popup = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h2>Deploy Form</h2>
        <form onSubmit={onSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Field 1"
            onChange={(e) => setPopupData(prev => ({ ...prev, field1: e.target.value }))}
            value={popupData.field1}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Field 2"
            onChange={(e) => setPopupData(prev => ({ ...prev, field2: e.target.value }))}
            value={popupData.field2}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Field 3"
            onChange={(e) => setPopupData(prev => ({ ...prev, field3: e.target.value }))}
            value={popupData.field3}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Field 4"
            onChange={(e) => setPopupData(prev => ({ ...prev, field4: e.target.value }))}
            value={popupData.field4}
            className={styles.input}
          />
          <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
