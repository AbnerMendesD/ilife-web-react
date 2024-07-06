import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import LoginForm from './Components/LoginForm/LoginForm';
import Dashboard from './Components/Dashboard/Dashboard';
import RecuperarSenha from './Components/RecuperarSenha/RecuperarSenha';
import RedefinirSenha from './Components/RedefinirSenha/RedefinirSenha';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/recuperarsenha" element={<RecuperarSenha />} />
          <Route path="/redefinirsenha/:token" element={<RedefinirSenha />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
