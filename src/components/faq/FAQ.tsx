import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './faq.css';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const { t: rawT } = useTranslation('translation');
  const t = rawT as (key: string, options?: any) => any;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const faqData = t('faq.items', { returnObjects: true }) as FAQItem[];

  useEffect(() => {
    answerRefs.current.forEach((ref, index) => {
      if (ref) {
        if (openIndex === index) {
          const scrollHeight = ref.scrollHeight;
          ref.style.height = `${scrollHeight}px`;
        } else {
          ref.style.height = '0px';
        }
      }
    });
  }, [openIndex]);

  return (
    <div className="faq-section" id='faq'>
      <h2 className="faq-title">{t('faq.title')}</h2>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {faq.question}
              <span className={`arrow ${openIndex === index ? 'open' : ''}`}>
                ›
              </span>
            </button>
            <div
              ref={(el: any) => (answerRefs.current[index] = el)}
              className={`faq-answer-wrapper ${
                openIndex === index ? 'open' : ''
              }`}
            >
              <div className="faq-answer">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
