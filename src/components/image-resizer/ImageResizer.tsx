import React, { useState } from 'react';
import './image-resizer.css';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import FlipIcon from '@mui/icons-material/Flip';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CloseIcon from '@mui/icons-material/Close';

const ImageResizer: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [flipHorizontal, setFlipHorizontal] = useState<boolean>(false);
  const [flipVertical, setFlipVertical] = useState<boolean>(false);
  const [resizeOption, setResizeOption] = useState<'pixels' | 'percentage'>('pixels');
  const [width, setWidth] = useState<number | string>('');
  const [height, setHeight] = useState<number | string>('');
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file)); // Create image URL for preview
    }
  };

  const handleRevert = () => {
    setRotation(0);
    setFlipHorizontal(false);
    setFlipVertical(false);
  };

  const handleRotateLeft = () => setRotation((prev) => prev - 90);
  const handleRotateRight = () => setRotation((prev) => prev + 90);
  const handleFlipHorizontal = () => setFlipHorizontal((prev) => !prev);
  const handleFlipVertical = () => setFlipVertical((prev) => !prev);

  const handleSaveImage = () => {
    if (image) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        const newWidth =
          resizeOption === 'percentage'
            ? (Number(width) / 100) * img.width
            : Number(width);
        const newHeight =
          resizeOption === 'percentage'
            ? (Number(height) / 100) * img.height
            : Number(height);
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx?.drawImage(img, 0, 0, newWidth, newHeight);
        canvas.toBlob((blob) => {
          if (blob) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'resized-image.png';
            link.click();
          }
        });
      };
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    setImageUrl('');
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
                  transform: `rotate(${rotation}deg) scaleX(${flipHorizontal ? -1 : 1}) scaleY(${flipVertical ? -1 : 1})`,
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
            <input
              type="number"
              placeholder="Width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="resize-input"
            />
            <input
              type="number"
              placeholder="Height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="resize-input"
            />
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
