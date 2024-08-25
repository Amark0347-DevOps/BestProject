// AccessKeysTable.js
import React, { useEffect, useState } from 'react';
import styles from './AccessKeysTable.module.css';

const AccessKeysTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await fetch('http://localhost:4522/v1/get/access/secret', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      setData(result.data);
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    // Implement delete functionality here
    console.log(`Delete item with id: ${id}`);
  };

  const handleUpdate = (id) => {
    // Implement update functionality here
    console.log(`Update item with id: ${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>Access Key</div>
        <div>Secret Key</div>
        <div>AWS Region</div>
        <div>Actions</div>
      </div>
      {data.map((item) => (
        <div key={item._id} className={styles.item}>
          <div className={styles.details}>
            <div>Access Key: {item.access_key}</div>
            <div>Secret Key: {item.secret_access_key}</div>
            <div>AWS Region: {item.aws_region}</div>
          </div>
          <div>
            <button
              className={`${styles.button} ${styles.update}`}
              onClick={() => handleUpdate(item._id)}
            >
              Update
            </button>
            <button
              className={`${styles.button} ${styles.delete}`}
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccessKeysTable;