import React, { useState } from 'react';
import './login-form.css';
import facebook from '../../static/img/facebook.png';
import google from '../../static/img/google.png';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const { t: rawT } = useTranslation('translation');
  const t = rawT as (key: string, options?: any) => any;
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 

    const formBody = new URLSearchParams();
    formBody.append('username', email);
    formBody.append('password', password);

    try {
      const response = await fetch('http://localhost:8003/login', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      if (!response.ok) {
        setError(t('login.error')); 
        return;
      }

      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      setError(t('login.error'));
    }
  };

  return (
    <div className="login-wrapper">
      <div>
        <h2 className="login-title">{t('login.title')}</h2>
        <p className="login-subtitle">{t('login.subtitle')}</p>
      </div>

      <div className="login-box">
        <div className="auth-buttons">
          <button className="auth-button">
            <img src={google} width="18" />
            {t('login.google')}
          </button>
          <button className="auth-button">
            <img src={facebook} alt="Facebook" width="18" />
            {t('login.facebook')}
          </button>
        </div>

        <div className="divider">{t('login.orEmail')}</div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">{t('login.emailLabel')}</label>
            <div className="input-wrapper">
              <input
                type="email"
                placeholder={t('login.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <div className="login-footer">
              <label className="input-label">{t('login.passwordLabel')}</label>
              <a href="#" className="forgot-link">
                {t('login.forgot')}
              </a>
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                placeholder={t('login.passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="login-button">
            {t('login.loginButton')}
          </button>

          {error && <p className="error-text">{error}</p>}
        </form>

        <p className="signup-text">
          {t('login.noAccount')} <a href="/register">{t('login.signup')}</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
