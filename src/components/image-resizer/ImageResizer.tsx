import React, { useState, useEffect } from 'react';
import './image-resizer.css';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import FlipIcon from '@mui/icons-material/Flip';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CloseIcon from '@mui/icons-material/Close';

const ImageResizer: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);

  const [rotation, setRotation] = useState<number>(0);
  const [flipHorizontal, setFlipHorizontal] = useState<boolean>(false);
  const [flipVertical, setFlipVertical] = useState<boolean>(false);

  const [resizeOption, setResizeOption] = useState<'pixels' | 'percentage'>('pixels');
  
  const [width, setWidth] = useState<number | string>('');
  const [height, setHeight] = useState<number | string>('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  useEffect(() => {
    if (!imageUrl) return;
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setOriginalWidth(img.width);
      setOriginalHeight(img.height);
      setWidth(img.width); // Устанавливаем исходную ширину
      setHeight(img.height); // Устанавливаем исходную высоту
    };
  }, [imageUrl]);

  const handleRevert = () => {
    setRotation(0);
    setFlipHorizontal(false);
    setFlipVertical(false);
    setWidth(originalWidth);
    setHeight(originalHeight);
  };

  const handleRotateLeft = () => setRotation((prev) => prev - 90);
  const handleRotateRight = () => setRotation((prev) => prev + 90);
  const handleFlipHorizontal = () => setFlipHorizontal((prev) => !prev);
  const handleFlipVertical = () => setFlipVertical((prev) => !prev);

  const handleDeleteImage = () => {
    setImage(null);
    setImageUrl('');
    setOriginalWidth(0);
    setOriginalHeight(0);
    setWidth('');
    setHeight('');
    setRotation(0);
    setFlipHorizontal(false);
    setFlipVertical(false);
  };

  const previewWidth = () => {
    if (!originalWidth || !width) return 'auto';
    if (resizeOption === 'pixels') {
      return `${width}px`;
    } else {
      const percentageWidth = (Number(width) / 100) * originalWidth;
      return `${percentageWidth}px`;
    }
  };

  const previewHeight = () => {
    if (!originalHeight || !height) return 'auto';
    if (resizeOption === 'pixels') {
      return `${height}px`;
    } else {
      const percentageHeight = (Number(height) / 100) * originalHeight;
      return `${percentageHeight}px`;
    }
  };

  const handleSaveImage = () => {
    if (!imageUrl) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const finalWidth =
        resizeOption === 'pixels'
          ? Number(width)
          : (img.width * Number(width)) / 100;

      const finalHeight =
        resizeOption === 'pixels'
          ? Number(height)
          : (img.height * Number(height)) / 100;

      canvas.width = finalWidth;
      canvas.height = finalHeight;

      ctx?.save();

      ctx?.translate(finalWidth / 2, finalHeight / 2);

      ctx?.rotate((rotation * Math.PI) / 180);

      const scaleX = flipHorizontal ? -1 : 1;
      const scaleY = flipVertical ? -1 : 1;
      ctx?.scale(scaleX, scaleY);

      ctx?.drawImage(
        img,
        -finalWidth / 2,
        -finalHeight / 2,
        finalWidth,
        finalHeight
      );

      ctx?.restore();

      canvas.toBlob((blob) => {
        if (blob) {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'resized-image.png';
          link.click();
        }
      });
    };
  };

  return (
    <div className="image-resizer-container">
      <h2 className="resize-title">Resize Your Images Instantly</h2>
      <p className="resize-description">
        Fast, easy, and completely free. Resize your images in seconds without losing quality.
      </p>

      <div className="resize-card">
        {!image ? (
          <div className="image-upload">
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={handleImageUpload}
            />
            <label htmlFor="fileInput">
              Drag & Drop your image here or click to browse files
            </label>
          </div>
        ) : (
          <div className="image-preview">
            <div className="image-preview-container">
              <img
                src={imageUrl}
                alt="Uploaded"
                style={{
                  width: previewWidth(),
                  height: previewHeight(),
                  transform: `
                    rotate(${rotation}deg)
                    scaleX(${flipHorizontal ? -1 : 1})
                    scaleY(${flipVertical ? -1 : 1})
                  `,
                }}
              />
              <CloseIcon className="close-icon" onClick={handleDeleteImage} />
            </div>
          </div>
        )}

        <div className="transformation-container">
          <h3>Transformation</h3>
          <div className="button-group">
            <button onClick={handleRotateLeft} className="btn rotate-btn">
              <RotateLeftIcon /> Rotate Left
            </button>
            <button onClick={handleRotateRight} className="btn rotate-btn">
              <RotateRightIcon /> Rotate Right
            </button>
            <button onClick={handleFlipHorizontal} className="btn flip-btn">
              <FlipIcon /> Flip Horizontal
            </button>
            <button onClick={handleFlipVertical} className="btn flip-btn">
              <FlipIcon style={{ transform: 'rotate(90deg)' }} /> Flip Vertical
            </button>
          </div>
          <button onClick={handleRevert} className="btn revert-btn">
            <QueryBuilderIcon /> Revert to Original
          </button>

          <div className="resize-options">
            <h4>Resize Options</h4>
            <div className="resize-buttons">
              <button
                className={`btn ${resizeOption === 'pixels' ? 'active' : ''}`}
                onClick={() => setResizeOption('pixels')}
              >
                By Pixels
              </button>
              <button
                className={`btn ${resizeOption === 'percentage' ? 'active' : ''}`}
                onClick={() => setResizeOption('percentage')}
              >
                By Percentage
              </button>
            </div>
          </div>

          <div className="resize-inputs">
            <div className="resize-input-wrapper">
              <input
                type="number"
                placeholder="Width"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="resize-input"
              />
              <span className="unit-label">
                {resizeOption === 'pixels' ? 'px' : '%'}
              </span>
            </div>

            <div className="resize-input-wrapper">
              <input
                type="number"
                placeholder="Height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="resize-input"
              />
              <span className="unit-label">
                {resizeOption === 'pixels' ? 'px' : '%'}
              </span>
            </div>
          </div>

          <button className="save-btn" onClick={handleSaveImage}>
            Save Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageResizer;
