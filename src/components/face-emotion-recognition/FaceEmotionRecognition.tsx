import { useTranslation } from 'react-i18next';
import './face-emotion-recognition.css';
import photo from '../../static/img/emotion-photo.png';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';

const FaceEmotionRecognition = () => {
  const { t: rawT } = useTranslation('translation');
  const t = rawT as (key: string, options?: any) => any;

  const [image, setImage] = useState<string | null>(null);
  const [dominantEmotion, setDominantEmotion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [age, setAge] = useState<number | string>('');
  const [gender, setGender] = useState<string>('');
  const [emotionScores, setEmotionScores] = useState({
    angry: 0,
    disgust: 0,
    fear: 0,
    happy: 0,
    sad: 0,
    surprise: 0,
    neutral: 0,
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setLoading(true);
      setError('');

      setTimeout(() => {
        const randomAge = Math.floor(Math.random() * (70 - 20 + 1)) + 20;
        setAge(randomAge.toString());

        const randomGender = Math.random() > 0.5 ? 'Male' : 'Female';
        setGender(randomGender);

        setDominantEmotion('happy'); // Можно выбрать любой доминантный эмоцию
        setEmotionScores({
          angry: Math.random() * 100,
          disgust: Math.random() * 100,
          fear: Math.random() * 100,
          happy: Math.random() * 100,
          sad: Math.random() * 100,
          surprise: Math.random() * 100,
          neutral: Math.random() * 100,
        });

        setLoading(false);
      }, 1000); // Эмулируем задержку загрузки
    }
  };

  const scrollToEmotionBlock = () => {
    const element = document.getElementById('emotion-block');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="emotion-wrapper">
      <h2 className="emotion-title">{t('aiGenerator.title')}</h2>
      <p className="emotion-description">{t('aiGenerator.description')}</p>

      <div className="emotion-card first">
        <div className="ai-face-analysis-container column">
          <h2 className="section-title">AI Face Analysis</h2>
          <div className="feature-list">
            <div className="feature-item">
              <SentimentSatisfiedAltIcon className="feature-icon" />
              <div className="feature-details">
                <h3>Detect Emotions</h3>
                <p>Instantly identify a person's emotional state</p>
              </div>
            </div>
            <div className="feature-item">
              <CalendarMonthIcon className="feature-icon" />
              <div className="feature-details">
                <h3>Estimate Age</h3>
                <p>
                  Get an approximate age prediction based on facial features
                </p>
              </div>
            </div>
            <div className="feature-item">
              <PersonIcon className="feature-icon" />
              <div className="feature-details">
                <h3>Detect Gender</h3>
                <p>Accurately predict the person's gender</p>
              </div>
            </div>
            <div className="feature-item">
              <VerifiedUserIcon className="feature-icon" />
              <div className="feature-details">
                <h3>Fast & Private</h3>
                <p>
                  All processing is done securely with high-performance AI
                  models
                </p>
              </div>
            </div>
          </div>
          <button className="emotion-button" onClick={scrollToEmotionBlock}>
            Get started
          </button>
        </div>
        <div className="">
          <img src={photo} alt="" />
        </div>
      </div>

      <div className="emotion-card" id="emotion-block">
        <div className="">
          <h2>AI Face Analysis</h2>
          <div className="left center">
            {image ? (
              <img src={image} alt="Uploaded" />
            ) : (
              <div className="upload-area">
                <p>Drag & Drop your image here or click to browse files</p>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                  id="fileInput"
                />
                <label htmlFor="fileInput" className="upload-btn">
                  Upload an Image
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="right">
          <div className="emotion-results-wrapper">
            <h2 className="results-title">Results</h2>

            <div className="results-card">
              <div className="personal-info">
                <div className="result-item">
                  <span className="result-label">Age</span>
                  <span className="result-value">{age}</span>
                </div>

                <div className="result-item">
                  <span className="result-label">Gender</span>
                  <span className="result-value">{gender}</span>
                </div>
              </div>

              <div className="emotion-section">
                <h3 className="emotion-small-title">Emotion</h3>
                <p className="emotion-label">Emotions:</p>
                <div className="emotion-item">
                  <span className="emotion-label">Angry</span>
                  <div
                    className="emotion-bar"
                    style={{ width: `${emotionScores.angry}%` }}
                  />
                </div>
                <div className="emotion-item">
                  <span className="emotion-label">Disgust</span>
                  <div
                    className="emotion-bar"
                    style={{ width: `${emotionScores.disgust}%` }}
                  />
                </div>
                <div className="emotion-item">
                  <span className="emotion-label">Fear</span>
                  <div
                    className="emotion-bar"
                    style={{ width: `${emotionScores.fear}%` }}
                  />
                </div>
                <div className="emotion-item">
                  <span className="emotion-label">Happy</span>
                  <div
                    className="emotion-bar"
                    style={{ width: `${emotionScores.happy}%` }}
                  />
                </div>
                <div className="emotion-item">
                  <span className="emotion-label">Sad</span>
                  <div
                    className="emotion-bar"
                    style={{ width: `${emotionScores.sad}%` }}
                  />
                </div>
                <div className="emotion-item">
                  <span className="emotion-label">Surprise</span>
                  <div
                    className="emotion-bar"
                    style={{ width: `${emotionScores.surprise}%` }}
                  />
                </div>
                <div className="emotion-item">
                  <span className="emotion-label">Neutral</span>
                  <div
                    className="emotion-bar"
                    style={{ width: `${emotionScores.neutral}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceEmotionRecognition;
