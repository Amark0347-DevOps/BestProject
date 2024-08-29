// import React, { useEffect } from 'react';
// import axios from 'axios';

// function FormActions({ setInstances }) {
//   useEffect(() => {
//     // Fetch data when the component mounts
//     const fetchMachines = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:4522/v1/get/machine'); // Replace with your actual API endpoint
//         setInstances(response.data);  // Update the state with fetched data
//       } catch (error) {
//         console.error('Error fetching machine data:', error);
//       }
//     };

//     fetchMachines();
//   }, [setInstances]);  // The dependency array ensures this runs only on mount

//   return null;
// }

// export default FormActions;
