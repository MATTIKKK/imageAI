import React, { useState } from 'react';
import './register-form.css';
import google from '../../static/img/google.png';
import facebook from '../../static/img/facebook.png';
import apple from '../../static/img/apple.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const { t: rawT } = useTranslation('translation');
  const t = rawT as (key: string, options?: any) => any;
  const navigate = useNavigate();

  // Добавляем поля firstName и lastName
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8003/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Теперь передаём 4 поля:
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();

        // Можно вывести текст ошибки, возвращаемый бэкендом
        if (Array.isArray(data)) {
          // Если это массив (например, [{"loc": [...], "msg": "..."}])
          const allMessages = data.map((item: any) => item.msg).join('. ');
          throw new Error(allMessages);
        } else {
          // Иначе выводим общее сообщение
          throw new Error(data.message || 'Registration failed');
        }
      }

      const result = await response.json();
      console.log('Registration success:', result);
      navigate('/login');
    } catch (err: any) {
      setError(err.message || ':(((');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-header">
        <h2 className="register-title">{t('register.title')}</h2>
        <p className="register-subtitle">{t('register.subtitle')}</p>
      </div>

      <div className="register-box">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="firstName" className="input-label">
                {t('register.firstName')}
              </label>
              <input
                id="firstName"
                type="text"
                placeholder={t('register.firstName')}
                value={firstName} // Привязываем state
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastName" className="input-label">
                {t('register.lastName')}
              </label>
              <input
                id="lastName"
                type="text"
                placeholder={t('register.lastName')}
                value={lastName} // Привязываем state
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email" className="input-label">
              {t('register.email')}
            </label>
            <div className="input-wrapper">
              <input
                id="email"
                type="email"
                placeholder={t('register.email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">
              {t('register.password')}
            </label>
            <div className="input-wrapper">
              <input
                id="password"
                type="password"
                placeholder={t('register.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="password-hint">{t('register.passwordHint')}</p>
          </div>

          {/* Вывод ошибок */}
          {error && <p className="error-message">{error}</p>}

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="terms">{t('register.terms')}</label>
          </div>

          <button
            type="submit"
            className={`register-button ${
              !agreed || !email.trim() || password.trim().length < 8 || loading
                ? 'disabled'
                : ''
            }`}
            disabled={!agreed || !email.trim() || !password.trim() || loading}
          >
            {loading ? t('register.loading') : t('register.create')}
          </button>
        </form>

        <div className="divider">{t('register.orContinue')}</div>

        <div className="social-auth">
          <div>
            <img src={google} alt="Google" />
          </div>
          <div>
            <img src={facebook} alt="Facebook" />
          </div>
          <div>
            <img src={apple} alt="Apple" />
          </div>
        </div>

        <p className="signup-text">
          {t('register.already')}{' '}
          <a onClick={handleLogin} className="login-link">
            {t('register.login')}
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
