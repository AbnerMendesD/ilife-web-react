import React, { useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import './RegisterForm.css';

const RegisterForm = () => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            email: "",
            birthDate: "",
            password: "",
            confirmPassword: ""
        }
    });

    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const togglePasswordVisibility = (field) => {
        if (field === "password") {
            setShowPassword(!showPassword);
        } else if (field === "confirmPassword") {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    const onSubmit = async (data) => {
        setSubmitting(true);
        try {
            data.birthDate = new Date(data.birthDate).toISOString().split('T')[0];
            const response = await fetch('http://localhost:8080/api/uregister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                console.log('Registration successful');
                navigate('/login'); // Redireciona para a tela de login
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error occurred during registration.');
        }
        setSubmitting(false);
    };

    const validateBirthDate = (value) => {
        const currentDate = new Date();
        const selectedDate = new Date(value);
        const minDate = new Date(currentDate.getFullYear() - 16, currentDate.getMonth(), currentDate.getDate());
        if (selectedDate >= minDate) {
            return "You must be at least 16 years old.";
        }
        return true;
    };

    const validatePassword = (value) => {
        if (value.length < 8) return false;
        if (!/[A-Z]/.test(value)) return false;
        if (!/\d/.test(value)) return false;
        return true;
    };

    const validateConfirmPassword = (value) => {
        const { password } = getValues();
        if (value !== password) return "Senhas divergentes";
        return true;
    };

    return (
        <div className='register-container'>
            <form className='register-login' onSubmit={handleSubmit(onSubmit)}>
                <h1 className='register-h1'>Criar uma nova conta</h1>
                <div className="register-name-box">
                    <input type="text" placeholder="Name" name="name" {...register("name", { required: "Name is required" })} required />
                    <FaUser className='icon' />
                </div>
                <div className="register-email-box">
                    <input type="text" name="email" {...register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email address" } })} placeholder='Email' />
                    <MdEmail className='icon' />
                </div>
                {errors.email && <span>{errors.email.message}</span>}
                <div className="register-aniversario-box">
                    <input type="date" name="birthDate" {...register("birthDate", { required: "Birth date is required", validate: validateBirthDate })} min="1924-01-01" placeholder='Birth' />
                </div>
                {errors.birthDate && <span>{errors.birthDate.message}</span>}
                <div className="register-senha-box">
                    <input type={showPassword ? "text" : "password"} name="password" {...register("password", { required: "Password is required", validate: validatePassword })} placeholder='Password' />
                    <FaLock className='icon' onClick={() => togglePasswordVisibility("password")} />
                </div>
                {errors.password && <span>{errors.password.message}</span>}
                <div className="register-senha-box">
                    <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" {...register("confirmPassword", { required: "Confirmation password is required", validate: validateConfirmPassword })} placeholder='Confirm Password' />
                    <FaLock className='icon' onClick={() => togglePasswordVisibility("confirmPassword")} />
                </div>
                {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                {errors.confirmPassword && errors.confirmPassword.type === "validate" && (
                    <span>As senhas não coincidem</span>
                )}

                <h5 className='register-h5'>A senha deve ter no mínimo 8 caracteres</h5>
                <h6 className='register-h6'>Letra maiúscula, símbolo e número</h6>
                <button className='register-button' type="submit" disabled={submitting}>Cadastro</button>
                {errorMessage && <p>{errorMessage}</p>}
                <div className="register-link">
                    <p>Já tem uma conta? <Link to='/login'>Login</Link></p>
                </div>
            </form>
            <div className='register-background' />
        </div>
    )
}
export default RegisterForm;
