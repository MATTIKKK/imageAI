import React from 'react';
import './features.css';
import { useTranslation } from 'react-i18next';

import imgAI from '../../static/img/ai.png';
import imgColor from '../../static/img/colorize.png';
import imgResize from '../../static/img/car.png';
import imgEmotion from '../../static/img/emotion.png';
import FeatureCard from '../feature-card/FeatureCard';

const Features: React.FC = () => {
  const { t: rawT } = useTranslation('translation');
  const t = rawT as (key: string, options?: any) => any;

  const cards = t('features.cards', { returnObjects: true }) as {
    title: string;
    button: string;
    route: string;
  }[];

  return (
    <div className="features-grid" id="features">
      <FeatureCard
        title={cards[0].title}
        buttonText={cards[0].button}
        imageSrc={imgAI}
        route="/ai-generator"
      />
      <FeatureCard
        title={cards[1].title}
        buttonText={cards[1].button}
        imageSrc={imgColor}
        dark
        route='/image-colorization'
      />
      <FeatureCard
        title={cards[2].title}
        buttonText={cards[2].button}
        imageSrc={imgResize}
        dark
        route='/resize'
      />
      <FeatureCard
        title={cards[3].title}
        buttonText={cards[3].button}
        imageSrc={imgEmotion}
        route='/emotion'
      />
    </div>
  );
};

export default Features;
