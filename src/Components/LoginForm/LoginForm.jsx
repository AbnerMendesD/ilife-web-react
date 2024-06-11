  import React, { useState } from 'react';
  import './LoginForm.css';
  import { FaUserAstronaut, FaLock } from "react-icons/fa";

  const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar se a senha deve ser exibida ou ocultada
    const [errors, setErrors] = useState({});

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

    const handleSubmit = (event) => {
      event.preventDefault();
      // Realize suas validações aqui
      const errors = {};
      if (!username.trim()) {
        errors.username = 'Username is required';
      }
      if (!password.trim()) {
        errors.password = 'Password is required';
      }
      if (Object.keys(errors).length === 0) {
        // Se não houver erros, envie os dados de login
        console.log('Username:', username);
        console.log('Password:', password);
        // Aqui você pode enviar os dados para o backend para autenticação
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
                placeholder='Username'
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

            <div className="login-register-link">
              <p className='login-paragrafo'>Don't have an account? <a href='/register'>Register</a></p>
            </div>
          </form>

        </div>
        <div className='login-background' />
      </div>
    );
  }

  export default LoginForm;
