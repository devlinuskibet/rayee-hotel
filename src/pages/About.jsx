import React from 'react';

const About = () => {
  return (
    <main style={{ maxWidth: '700px', margin: '2.5rem auto', padding: '0 1rem' }}>
      <section style={{
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        padding: '2.5rem 2rem',
        textAlign: 'center',
      }}>
        <h2 style={{ color: '#3e2723', marginBottom: '1.2rem' }}>About Us</h2>
        <p style={{ fontSize: '1.15rem', color: '#4e4e4e', marginBottom: '0.5rem' }}>
          Rayee Hotel was founded to offer travelers a clean, affordable place to stay in the heart of Bomet Town. We are committed to comfort, safety, and local hospitality.
        </p>
        <p style={{ fontSize: '1.05rem', color: '#7b4f24', marginTop: '1.2rem' }}>
          Whether you're here for business, leisure, or a family visit, our team is dedicated to making your stay peaceful and memorable.
        </p>
      </section>
    </main>
  );
};

export default About; 