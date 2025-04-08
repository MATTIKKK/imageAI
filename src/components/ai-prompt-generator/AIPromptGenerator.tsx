import React, { useRef, useState } from 'react';
import './ai-prompt-generator.css';
import sparkleIcon from '../../static/img/sparkle-icon.png';
import penIcon from '../../static/img/pen-icon.png';
import {
  ArrowDownToLine,
  HistoryIcon,
  SparklesIcon,
  Trash2Icon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import img2 from '../../static/img/2.png';
import img3 from '../../static/img/3.png';
import img4 from '../../static/img/4.png';
import img5 from '../../static/img/5.png';
import img6 from '../../static/img/6.png';
import img7 from '../../static/img/7.png';
import img8 from '../../static/img/8.png';
import img9 from '../../static/img/9.png';
import img10 from '../../static/img/10.png';
import img11 from '../../static/img/11.png';
import img12 from '../../static/img/12.png';
import img13 from '../../static/img/13.png';
import img14 from '../../static/img/14.png';
import img15 from '../../static/img/15.png';
import img16 from '../../static/img/16.png';

const images = [
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
];

const AIPromptGenerator = () => {
  const { t: rawT } = useTranslation('translation');
  const t = rawT as (key: string, options?: any) => any;
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const downloadRef = useRef<HTMLAnchorElement | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setResult('');
    setGeneratedImage(null);

    const token = localStorage.getItem('access_token');
    if (!token) {
      setResult('⚠️ No access token found.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8002/images/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Image generation failed');
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setGeneratedImage(imageUrl);
      setResult(`✅ ${t('aiGenerator.optimizedResult')}`);
    } catch (error) {
      console.error('Error:', error);

      setResult(`❌ :(((  ${error}`);
    } finally {
      setLoading(false);
    }
  };


  const handleClear = () => {
    setPrompt('');
    setResult('');
    setGeneratedImage(null);
  };

  const handleDownload = () => {
    if (generatedImage && downloadRef.current) {
      downloadRef.current.href = generatedImage;
      downloadRef.current.download = 'generated-image.png';
      downloadRef.current.click();
    }
  };

  return (
    <div className="ai-generator-wrapper">
      <h2 className="generator-title">{t('aiGenerator.title')}</h2>
      <p className="generator-description">{t('aiGenerator.description')}</p>

      <div className="generator-card">
        <div className="generator-box">
          <h4>
            <img src={penIcon} alt="" /> {t('aiGenerator.yourPrompt')}
          </h4>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t('aiGenerator.placeholderInput')}
          />
          <div className="generator-actions">
            <button
              className="primary"
              onClick={handleGenerate}
              disabled={loading}
            >
              <SparklesIcon />{' '}
              {loading ? 'Loading...' : t('aiGenerator.generate')}
            </button>
            <button className="secondary" onClick={handleClear}>
              <Trash2Icon /> {t('aiGenerator.clear')}
            </button>
          </div>
        </div>

        <div className="generator-box">
          <h4>
            <img src={sparkleIcon} alt="" /> {t('aiGenerator.optimizedResult')}
          </h4>
          <div className="image-block">
            {generatedImage ? (
              <img src={generatedImage} alt="Generated" />
            ) : (
              <p className="placeholder-text">
                {result.startsWith('❌')
                  ? result 
                  : t('aiGenerator.placeholderOutput')} 
              </p>
            )}
          </div>
          <div className="generator-actions">
            <button
              className="primary"
              onClick={handleDownload}
              disabled={!generatedImage}
            >
              <ArrowDownToLine /> {t('aiGenerator.download')}
            </button>
            <a ref={downloadRef} style={{ display: 'none' }} />
            <button className="secondary">
              <HistoryIcon /> {t('aiGenerator.history')}
            </button>
          </div>
        </div>
      </div>

      <div className="popular-images">
        <h3 className="popular-title">{t('aiGenerator.popular')}</h3>
        <div className="gallery-grid">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`sample-${i + 1}`}
              className="gallery-image"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIPromptGenerator;
