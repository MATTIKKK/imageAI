import React from 'react';
import './page.css';
import LoginForm from '../components/login-form/LoginForm';
import { useLocation } from 'react-router-dom';
import RegisterForm from '../components/register-form/RegisterForm';
import Header from '../components/header/Header';

const LoginPage = () => {
  const location = useLocation();
  const isRegister = location.pathname.includes('register');

  return (
    <div className="login-page">
      <Header />
      {isRegister ? <RegisterForm /> : <LoginForm />}
    </div>
  );
};

export default LoginPage;
