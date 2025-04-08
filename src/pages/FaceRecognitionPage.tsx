import React from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import FaceEmotionRecognition from '../components/face-emotion-recognition/FaceEmotionRecognition'

const FaceRecognitionPage = () => {
  return (
    <div>
        <Header />
        <FaceEmotionRecognition />
        <Footer />
    </div>
  )
}

export default FaceRecognitionPage