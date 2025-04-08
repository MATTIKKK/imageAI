import React, { useEffect, useRef, useState } from 'react';
import './header.css';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogInIcon } from 'lucide-react';

const Header = () => {
  const { t: rawT, i18n } = useTranslation();
  const t = rawT as (key: string) => string;
  const location = useLocation();
  const navigate = useNavigate();

  const [showLangMenu, setShowLangMenu] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [showFeaturesMenu, setShowFeaturesMenu] = useState(false); // Features dropdown state
  const [showAccountMenu, setShowAccountMenu] = useState(false); // My Account dropdown state
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleLangMenu = () => {
    setShowLangMenu((prev) => !prev);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setShowLangMenu(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/';
  }

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  const toggleFeaturesMenu = () => {
    setShowFeaturesMenu((prev) => !prev); // Toggle features dropdown
  };

  const toggleAccountMenu = () => {
    setShowAccountMenu((prev) => !prev); // Toggle account dropdown
  };

  useEffect(() => {
    const onLangChange = (lang: string) => setCurrentLang(lang);
    i18n.on('languageChanged', onLangChange);
    return () => {
      i18n.off('languageChanged', onLangChange);
    };
  }, [i18n]);

  const isMainPage = location.pathname === '/';

  return (
    <header className="hero-header">
      <div className="header-logo" onClick={() => navigate('/')}>
        RenkAI
      </div>
      <nav className="hero-nav">
        <a href="/#home">{t('nav.home')}</a>
        <div className="features-dropdown" onClick={toggleFeaturesMenu}>
          {t('nav.features')}
          {showFeaturesMenu && (
            <ul className="features-menu">
              <li>{t('nav.ai-generator')}</li>
              <li>{t('nav.image-colorize')}</li>
              <li>{t('nav.resize-image')}</li>
              <li>{t('nav.emotion-detection')}</li>
            </ul>
          )}
        </div>
        <a href="/#pricing">{t('nav.pricing')}</a>
        <a href="/#faq">{t('nav.faq')}</a>
      </nav>
      <div className="hero-actions">
        <div
          ref={menuRef}
          className={`language-dropdown ${showLangMenu ? 'open' : ''}`}
        >
          <button className="language-btn" onClick={toggleLangMenu}>
            {currentLang.toUpperCase()}
          </button>
          <div className="language-menu">
            <div onClick={() => handleLanguageChange('en')}>🇬🇧 EN</div>
            <div onClick={() => handleLanguageChange('ru')}>🇷🇺 RU</div>
            <div onClick={() => handleLanguageChange('kz')}>🇰🇿 KZ</div>
          </div>
        </div>
        <button
          className={theme === 'dark' ? 'theme-toggle dark' : 'theme-toggle'}
          onClick={toggleTheme}
        >
          🌓
        </button>
        {localStorage.getItem('access_token') ? (
          <div className="account-dropdown" onClick={toggleAccountMenu}>
            <button className="account-btn">
              {t('nav.account')} ⌄
            </button>
            {showAccountMenu && (
              <ul className="account-menu">
                <li onClick={() => navigate('/profile')}>{t('nav.manage-account')}</li>
                <li onClick={() => navigate('/profile')}>{t('nav.balance')}</li>
                <li onClick={handleSignOut}>{t('nav.logout')}</li>
              </ul>
            )}
          </div>
        ) : (
          <button className="account-btn" onClick={() => navigate('/login')}>
            <LogInIcon /> {t('nav.login')}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
