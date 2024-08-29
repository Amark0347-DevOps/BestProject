// import React from 'react';
// import styles from './MachineForm.module.css'; // Use the same CSS module for styling
// import { FaCopy } from 'react-icons/fa';

// function MachineTable({ instances, setInstances }) {
//   const handleStart = async (instanceId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://127.0.0.1:4522/v1/start/machine/${instanceId}`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setInstances(data.data);
//       } else {
//         console.error('Failed to start instance');
//       }
//     } catch (error) {
//       console.error('An error occurred while starting the instance:', error);
//     }
//   };

//   const handleStop = async (instanceId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://127.0.0.1:4522/v1/stop/machine/${instanceId}`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setInstances(data.data);
//       } else {
//         console.error('Failed to stop instance');
//       }
//     } catch (error) {
//       console.error('An error occurred while stopping the instance:', error);
//     }
//   };

//   const handleTerminate = async (instanceId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://127.0.0.1:4522/v1/terminate/machine/${instanceId}`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setInstances(data.data);
//       } else {
//         console.error('Failed to terminate instance');
//       }
//     } catch (error) {
//       console.error('An error occurred while terminating the instance:', error);
//     }
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text)
//       .then(() => alert('Copied to clipboard!'))
//       .catch(err => console.error('Failed to copy text:', err));
//   };

//   return (
//     <div className={styles.tableContainer}>
//       {instances.length > 0 ? (
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Instance ID</th>
//               <th>Private IP Address</th>
//               <th>Public IP Address</th>
//               <th>Status</th>
//               <th>Name</th>
//               <th>Running Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {instances.map((instances, index) => (
//               <tr key={instances.InstanceId}>
//                 <td>{index + 1}</td>
//                 <td>{instances.InstanceId}</td>
//                 <td>{instances.PrivateIpAddress}</td>
//                 <td>{instances.PublicIpAddress}</td>
//                 <td>{instances.State.Name}</td>
//                 <td>{instances.Name}</td>
//                 <td>{instances.RunningStatus}</td>
//                 <td>
//                   <button onClick={() => handleStart(instances.InstanceId)} className={styles.startButton}>
//                     Start
//                   </button>
//                   <button onClick={() => handleStop(instances.InstanceId)} className={styles.stopButton}>
//                     Stop
//                   </button>
//                   <button onClick={() => handleTerminate(instances.InstanceId)} className={styles.terminateButton}>
//                     Terminate
//                   </button>
//                   <button onClick={() => copyToClipboard(instances.InstanceId)} className={styles.copyButton}>
//                     <FaCopy />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No instances available.</p>
//       )}
//     </div>
//   );
// }

// export default MachineTable;
