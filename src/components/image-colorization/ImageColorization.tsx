import React, { useState } from 'react';
import './image-colorization.css';
import { useTranslation } from 'react-i18next';
import imgColor from '../../static/img/colorize.png';
import uploadIcon from '../../static/img/upload-icon.png';
import uploadIcon2 from '../../static/img/upload-icon2.png';
import downloadIcon from '../../static/img/download-icon.png';
import processIcon from '../../static/img/process-icon.png';
import panda from '../../static/img/panda.jpg';  // Импорт фото панды

const ImageColorization: React.FC = () => {
  const { t: rawT } = useTranslation('translation');
  const t = rawT as (key: string, options?: any) => any;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [coloredImage, setColoredImage] = useState<string | null>(null);  // State for the colored image

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setUploadStatus('');
    }
  };

  const handleUpload = () => {
    // Когда пользователь нажимает кнопку, меняем изображение на фото панды
    setColoredImage(panda);
    setUploadStatus('Image colorization completed.');
  };

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
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="uploaded-image"
                />
              ) : (
                <>
                  <img src={uploadIcon} alt="" className='upload-icon'/>
                  <div className="upload-area">
                    <p>{t('colorization.dragDrop')}</p>
                    <span className="upload-or">{t('colorization.or')}</span>
                    <div>
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .png, .webp"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="fileInput"
                      />
                      <button
                        className="upload-browse"
                        type="button"
                        onClick={openFileDialog}
                      >
                        {t('colorization.browse')}
                      </button>
                    </div>
                    <p className="upload-support">
                      Supported formats: JPG, PNG, WEBP
                    </p>
                  </div>
                </>
              )}
            </div>
            <button className="upload-action" onClick={handleUpload}>
              {t('colorization.button')}
            </button>
            {uploadStatus && <p>{uploadStatus}</p>}
          </div>
        </div>

        <div className="preview-section">
          {/* Display the colored image or panda image after upload */}
          <img src={coloredImage || imgColor} alt="Before and After" />
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
