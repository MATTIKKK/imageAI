import React from 'react';
import './feature-card.css';
import { useNavigate } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  buttonText: string;
  imageSrc: string;
  dark?: boolean;
  route?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  buttonText,
  imageSrc,
  dark,
  route
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (route) {
      navigate(route);
    }
  };


  return (
    <div className={`feature-card ${dark ? 'dark' : ''}`}>
      <div className="feature-left">
        <h3>{title}</h3>
        <button onClick={handleClick}>{buttonText}</button>
      </div>
      <div className="feature-right">
        <img src={imageSrc} alt={title} />
      </div>
    </div>
  );
};

export default FeatureCard;
