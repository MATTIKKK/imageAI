import React from 'react';
import './pricing-card.css';
import { CircleCheckIcon } from 'lucide-react';

type Feature = string;

interface PricingCardProps {
  title: string;
  price: string;
  billing: string;
  features: Feature[];
  buttonText: string;
  buttonColor: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  billing,
  features,
  buttonText,
  buttonColor,
}) => {
  return (
    <div className="pricing-card">
      <div className="">
        <h3 className="plan-title">{title}</h3>
        <p className="plan-price">
          <span className="price">{price}</span>
          <span className="billing">/{billing}</span>
        </p>
      </div>
      <ul className="features-list">
        {features.map((feature, index) => (
          <li key={index}>
            <span className="checkmark">
              <CircleCheckIcon />
            </span>{' '}
            {feature}
          </li>
        ))}
      </ul>
      <button
        className="pricing-button"
        style={{ backgroundColor: buttonColor }}
      >
        {buttonText}
      </button>
    </div>
  );
};
