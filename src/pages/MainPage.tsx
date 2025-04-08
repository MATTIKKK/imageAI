import React from 'react';
import Footer from '../components/footer/Footer';
import Pricing from '../components/pricing/Pricing';
import FAQ from '../components/faq/FAQ';
import FreeTrial from '../components/free-trial/FreeTrial';
import Features from '../components/features/Features';
import Hero from '../components/hero/Hero';

const MainPage = () => {
  return (
    <>
      <Hero />

      <Features />
      <Pricing />
      <FAQ />
      <FreeTrial />
      <Footer />
    </>
  );
};

export default MainPage;
