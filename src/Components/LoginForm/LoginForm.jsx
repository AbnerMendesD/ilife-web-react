import React, { useState } from 'react';
import { FaUserAstronaut, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar se a senha deve ser exibida ou ocultada
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Hook para navegar programaticamente

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword); // Alternar entre exibir e ocultar a senha
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
    if (!username.trim()) {
      errors.username = 'Username is required';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    }
    if (Object.keys(errors).length === 0) {
      // Se não houver erros, envie os dados de login
      try {
        const response = await fetch('http://localhost:8080/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: username, password: password })
        });

        if (response.ok) {
          console.log('Login bem-sucedido');
          navigate('/dashboard'); // Redireciona para a tela de dashboard
        } else {
          const errorData = await response.json();
          setErrors({ server: errorData.message });
        }
      } catch (error) {
        console.error('Erro:', error);
        setErrors({ server: 'Erro ao autenticar o usuário' });
      }
    } else {
      // Se houver erros, atualize o estado com os erros
      setErrors(errors);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-form'>
        <form className='form-login' onSubmit={handleSubmit}>
          <h1 className='login-h1'>Login</h1>

          <div className="login-input-box">
            <input
              type="text"
              name="username"
              placeholder='username'
              value={username}
              onChange={handleInputChange}
              required
            />
            <FaUserAstronaut className='login-icon' />
          </div>
          {errors.username && <p className="login-error-message">{errors.username}</p>}

          <div className="senha-input-box">
            <input
              type={showPassword ? "text" : "password"} // Use o estado showPassword para alternar entre "text" e "password"
              name="password"
              placeholder='Password'
              value={password}
              onChange={handleInputChange}
              required
            />
            <FaLock className='senha-icon' onClick={handleTogglePassword} style={{ cursor: 'pointer' }} /> {/* Adicione um evento de clique para alternar a exibição da senha */}
          </div>
          {errors.password && <p className="senha-error-message">{errors.password}</p>}

          <button className='login-button' type="submit">Login</button>
          {errors.server && <p className="login-error-message">{errors.server}</p>}

          <div className="login-register-link">
            <p className='login-paragrafo'>Don't have an account? <a href='/register'>Register</a></p>
          </div>
          <div className='login-recuperar-senha'>
            <p className='login-recuperar-senha-p'><a href='/recuperarsenha'>Esqueceu a senha?</a></p> 
          </div>
        </form>
      </div>
      <div className='login-background' />
    </div>
  );
}

export default LoginForm;
