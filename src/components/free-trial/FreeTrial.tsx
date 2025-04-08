import React from 'react';
import './free-trial.css';
import cuteRobot from '../../static/img/cute-robot.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const FreeTrial: React.FC = () => {
  const { t: rawT } = useTranslation('translation');
  const t = rawT as (key: string, options?: any) => any;
  const navigate = useNavigate();

  return (
    <div className="free-trial-container">
      <div className="free-trial-content">
        <div className="text-section">
          <div className="">
            <h2>{t('freeTrial.title')}</h2>
            <p>{t('freeTrial.description')}</p>
          </div>
          <a href="#features"><button className="trial-button">{t('freeTrial.button')}</button></a>
        </div>
        <div className="image-section">
          <img src={cuteRobot} alt="Robot illustration" />
        </div>
      </div>
    </div>
  );
};

export default FreeTrial;
