import React from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import ImageResizer from '../components/image-resizer/ImageResizer'

const ImageResizerPage = () => {
  return (
    <div>
        <Header />
        <ImageResizer />
        <Footer />
    </div>
  )
}

export default ImageResizerPage