import React, { useState } from 'react';

const faqs = [
  {
    question: 'Is breakfast included?',
    answer: 'No, we offer rooms only. However, there are several cafes and restaurants nearby for your convenience.'
  },
  {
    question: 'Do you have WiFi?',
    answer: 'Yes, free high-speed WiFi is available in all rooms and public areas.'
  },
  {
    question: 'Is parking available?',
    answer: 'Yes, we offer free secure parking for all our guests.'
  },
  {
    question: 'Can I book a room by phone or WhatsApp?',
    answer: 'Absolutely! You can call or WhatsApp us using the contact details on our Contact page.'
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'You can cancel up to 24 hours before your arrival date with no charge.'
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = idx => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <main style={{ maxWidth: '700px', margin: '2.5rem auto', padding: '0 1rem' }}>
      <h2 style={{ textAlign: 'center', color: '#3e2723', marginBottom: '2rem' }}>Frequently Asked Questions</h2>
      <section style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', padding: '2.5rem 2rem' }}>
        {faqs.map((faq, idx) => (
          <div key={idx} style={{ marginBottom: '1.2rem', borderBottom: '1px solid #eee' }}>
            <button
              onClick={() => toggle(idx)}
              style={{
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                padding: '1rem 0',
                fontSize: '1.08rem',
                fontWeight: 600,
                color: '#3e2723',
                cursor: 'pointer',
                outline: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              aria-expanded={openIndex === idx}
            >
              {faq.question}
              <span style={{ fontSize: '1.3rem', marginLeft: '1rem', color: '#7b4f24' }}>{openIndex === idx ? '-' : '+'}</span>
            </button>
            {openIndex === idx && (
              <div style={{ padding: '0 0 1rem 0', color: '#4e4e4e', fontSize: '1.02rem' }}>{faq.answer}</div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
};

export default FAQ; 