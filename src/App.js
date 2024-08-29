import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import KeypairCreation from './MachineCreation/KeypairPopup';

function App() {
  const [instances, setInstances] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/keypair" element={<KeypairCreation />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <Dashboard instances={instances} setInstances={setInstances} />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
