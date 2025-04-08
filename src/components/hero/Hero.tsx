import React from 'react';
import './hero.css';
import robotImg from '../../static/img/robot.png';
import Header from '../header/Header';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { t: rawT } = useTranslation('translation');
  const t = rawT as (key: string, options?: any) => any;

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <>
      <Header />

      <div className="hero-wrapper" id="home">
        <div className="hero-container">
          <div className="hero-text">
            <h1>{t('hero.title')}</h1>
            <p>{t('hero.description')}</p>
            <button className="hero-button" onClick={handleClick}>
              {t('hero.button')}
            </button>
          </div>
          <div className="hero-image">
            <img src={robotImg} alt="AI Robot" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
