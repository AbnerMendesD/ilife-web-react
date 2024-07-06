import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RedefinirSenha.css'; // Estilos específicos para o componente

const RedefinirSenha = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { token } = useParams(); // Pega o token da URL

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
    if (!password.trim()) {
      errors.password = 'Password is required';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(`http://localhost:8080/api/redefinirsenha/${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ password })
        });

        if (response.ok) {
          setMessage('Your password has been successfully reset.');
          setTimeout(() => navigate('/'), 3000); // Redireciona para a tela de login após 3 segundos
        } else {
          const errorData = await response.json();
          setErrors({ server: errorData.message });
        }
      } catch (error) {
        console.error('Erro:', error);
        setErrors({ server: 'Erro ao tentar redefinir a senha' });
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className='redefinir-senha-container'>
      <div className='redefinir-senha-form'>
        <form className='form-redefinir-senha' onSubmit={handleSubmit}>
          <h1 className='redefinir-senha-h1'>Redefinir Senha</h1>
          <div className="redefinir-senha-input-box">
            <input
              type="password"
              name="password"
              placeholder='Digite sua nova senha'
              value={password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="redefinir-senha-input-box">
            <input
              type="password"
              name="confirmPassword"
              placeholder='Confirme sua nova senha'
              value={confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          {errors.password && <p className="redefinir-senha-error-message">{errors.password}</p>}
          {errors.confirmPassword && <p className="redefinir-senha-error-message">{errors.confirmPassword}</p>}
          <button className='redefinir-senha-button' type="submit">Redefinir Senha</button>
          {message && <p className="redefinir-senha-success-message">{message}</p>}
          {errors.server && <p className="redefinir-senha-error-message">{errors.server}</p>}
        </form>
      </div>
    </div>
  );
}

export default RedefinirSenha;