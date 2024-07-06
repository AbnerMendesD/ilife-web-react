import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecuperarSenha.css'; // Estilos específicos para o componente

const RecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Hook para navegação programática

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch('http://localhost:8080/api/recuperarsenha', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });

        if (response.ok) {
          setMessage('An email has been sent to your address with further instructions.');
          setTimeout(() => navigate('/'), 3000); // Redireciona para a tela de login após 3 segundos
        } else {
          const errorData = await response.json();
          setErrors({ server: errorData.message });
        }
      } catch (error) {
        console.error('Erro:', error);
        setErrors({ server: 'Erro ao tentar recuperar a senha' });
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className='recuperar-senha-container'>
      <div className='recuperar-senha-form'>
        <form className='form-recuperar-senha' onSubmit={handleSubmit}>
          <h1 className='recuperar-senha-h1'>Recuperar Senha</h1>
          <div className="recuperar-senha-input-box">
            <input
              type="email"
              name="email"
              placeholder='Digite seu email'
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>
          {errors.email && <p className="recuperar-senha-error-message">{errors.email}</p>}
          <button className='recuperar-senha-button' type="submit">Enviar</button>
          {message && <p className="recuperar-senha-success-message">{message}</p>}
          {errors.server && <p className="recuperar-senha-error-message">{errors.server}</p>}
        </form>
      </div>
    </div>
  );
}

export default RecuperarSenha;
