import React, { useState } from 'react';
import './image-colorization.css';
import { useTranslation } from 'react-i18next';
import imgColor from '../../static/img/colorize.png';
import uploadIcon from '../../static/img/upload-icon.png';

import uploadIcon2 from '../../static/img/upload-icon2.png';
import downloadIcon from '../../static/img/download-icon.png';
import processIcon from '../../static/img/process-icon.png';

const ImageColorization: React.FC = () => {
  const { t: rawT } = useTranslation('translation');
  const t = rawT as (key: string, options?: any) => any;

  // Состояния для файла и для возможного результата/ошибки
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  // Обработчик выбора файла
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setUploadStatus('');
    }
  };

  // Отправка файла на сервер
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first.');
      return;
    }

    // Предположим, токен лежит в localStorage (или берём из контекста/Redux)
    const token = localStorage.getItem('access_token');
    if (!token) {
      setUploadStatus('No access token found – please log in!');
      return;
    }

    try {
      // Формируем FormData с файлом
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Отправляем запрос
      const response = await fetch('http://localhost:8002/emotion_detection/', {
        method: 'POST',
        headers: {
          // При использовании FormData не указываем Content-Type вручную!
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(
          `Request failed with ${response.status}: ${response.statusText}\n${errText}`
        );
      }

      // Предположим, API возвращает JSON с результатами
      const data = await response.json();
      setUploadStatus('Upload success: ' + JSON.stringify(data));
    } catch (error: any) {
      console.error(error);
      setUploadStatus('Error: ' + error.message);
    }
  };

  // Функция, открывающая диалог выбора файла при клике на кнопку
  const openFileDialog = () => {
    document.getElementById('fileInput')?.click();
  };

  return (
    <div className="colorization-wrapper">
      <h2 className="colorization-title">{t('colorization.title')}</h2>
      <p className="colorization-subtitle">{t('colorization.subtitle')}</p>

      <div className="colorization-card">
        <div className="upload">
          <div className="upload-section">
            <h3 className="upload-title">{t('colorization.uploadTitle')}</h3>
            <div className="upload-box">
              <img src={uploadIcon} alt="" />
              <div className="upload-area">
                <p>{t('colorization.dragDrop')}</p>
                <span className="upload-or">{t('colorization.or')}</span>
                <div>
                  {/* Скрытый input */}
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png, .webp"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="fileInput"
                  />

                  {/* Кнопка, которая программно вызывает .click() на input */}
                  <button
                    className="upload-browse"
                    type="button"
                    onClick={openFileDialog}
                  >
                    {t('colorization.browse')}
                  </button>

                  <p className="upload-support">
                    Supported formats: JPG, PNG, WEBP
                  </p>
                </div>
              </div>
            </div>
            <button className="upload-action" onClick={handleUpload}>
              {t('colorization.button')}
            </button>
            {uploadStatus && <p>{uploadStatus}</p>}
          </div>
        </div>

        <div className="preview-section">
          <img src={imgColor} alt="Before and After" />
        </div>
      </div>

      <div className="steps-section">
        <h3 className="steps-title">{t('colorization.howTitle')}</h3>
        <p className="steps-subtitle">{t('colorization.howSubtitle')}</p>
        <div className="steps-grid">
          <div className="step-box">
            <div className="icon">
              <img src={uploadIcon2} alt="" />
            </div>
            <h4>1. {t('colorization.step1')}</h4>
            <p>{t('colorization.step1desc')}</p>
          </div>
          <div className="step-box">
            <div className="icon">
              <img src={processIcon} alt="" />
            </div>
            <h4>2. {t('colorization.step2')}</h4>
            <p>{t('colorization.step2desc')}</p>
          </div>
          <div className="step-box">
            <div className="icon">
              <img src={downloadIcon} alt="" />
            </div>
            <h4>3. {t('colorization.step3')}</h4>
            <p>{t('colorization.step3desc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageColorization;
