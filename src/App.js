// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Homepage from './Homepage/Homepage';
// import Signup from './Signup/Signup';
// import Login from './Login/Login';
// import Dashboard from './Dashboard/Dashboard';
// import KeypairCreation from './MachineCreation/KeypairPopup';
// import Navbar from './Components/Navbar/Navbar'; // Import Navbar
// import Footer from './Components/Footer/Footer'; // Import Footer
// import Contact from './Contact/Contact'

// function App() {
//   const [instances, setInstances] = useState([]);

//   return (
//     <Router>
//       <Navbar /> {/* Navbar is included here to show on all pages */}
//       <Routes>
//         <Route path="/" element={<Homepage />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/keypair" element={<KeypairCreation />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route 
//           path="/dashboard" 
//           element={<Dashboard instances={instances} setInstances={setInstances} />} 
//         />
//       </Routes>
//       <Footer /> {/* Footer is added here to display on all pages */}
//     </Router>
//   );
// }

// export default App;
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage/Homepage';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import KeypairCreation from './MachineCreation/KeypairPopup';
import Navbar from './Components/Navbar/Navbar'; // Import Navbar
import Footer from './Components/Footer/Footer'; // Import Footer
import Contact from './Contact/Contact';
import { AuthProvider } from './AuthContext'; // Import AuthProvider


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Navbar will now listen to AuthContext */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/keypair" element={<KeypairCreation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer /> {/* Footer will be on all pages */}
      </Router>
    </AuthProvider>
  );
}

export default App;
