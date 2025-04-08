import React from 'react';
import './pricing.css';
import { PricingCard } from '../pricing-card/PricingCard';
import { useTranslation } from 'react-i18next';

const Pricing: React.FC = () => {
  const { t: rawT } = useTranslation('translation');
  const t = rawT as (key: string, options?: any) => any;

  const plans = t('pricing.plans', { returnObjects: true }) as {
    title: string;
    price: string;
    billing: string;
    features: string[];
    buttonText: string;
    buttonColor: string;
  }[];

  return (
    <div className="pricing-section" id='pricing'>
      <h2 className="section-title">{t('pricing.title')}</h2>
      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default Pricing;