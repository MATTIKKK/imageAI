import React from 'react'
import AIPromptGenerator from '../components/ai-prompt-generator/AIPromptGenerator'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'

const AIGeneratorPage = () => {
  return (
    <div className="">
      <Header />
      <AIPromptGenerator />
      <Footer />
    </div>
  )
}

export default AIGeneratorPage