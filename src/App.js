import React from 'react';
import './App.css';
import RegisterForm from './Components/RegisterForm/RegisterForm'
import LoginForm from './Components/LoginForm/LoginForm';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Navigate to="/register" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
