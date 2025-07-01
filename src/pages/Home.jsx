import React from 'react';
import HeroSection from '../components/HeroSection';
import BookingPreview from '../components/BookingPreview';

const sectionStyle = {
  maxWidth: '1100px',
  margin: '0 auto',
  padding: '2.5rem 1.2rem 2.5rem 1.2rem',
  background: 'rgba(255,255,255,0.92)',
  borderRadius: '18px',
  boxShadow: '0 4px 24px rgba(62,39,35,0.08)',
  marginBottom: '2.5rem',
};
const headingStyle = {
  fontSize: '2.1rem',
  fontWeight: 700,
  marginBottom: '0.7rem',
  color: '#3e2723',
  letterSpacing: '-1px',
};
const paraStyle = {
  fontSize: '1.18rem',
  color: '#5d4037',
  marginBottom: '1.7rem',
  lineHeight: 1.6,
};

const Home = () => {
  return (
    <div style={{ background: 'linear-gradient(180deg, #f7f6f3 0%, #fff 100%)', minHeight: '100vh' }}>
      <HeroSection />
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Check Room Availability</h2>
        <p style={paraStyle}>
          Use our quick availability checker to see if your preferred dates are open. We recommend booking early for weekends and holidays!
        </p>
        <BookingPreview />
      </div>
      <div style={{ ...sectionStyle, background: 'rgba(255,255,255,0.98)', marginBottom: '2.5rem' }}>
        <h2 style={headingStyle}>Why Choose Rayee Hotel?</h2>
        <ul style={{ color: '#5d4037', fontSize: '1.08rem', lineHeight: 1.7, paddingLeft: '1.2rem', margin: 0 }}>
          <li>Prime location in Bomet Town, close to major amenities</li>
          <li>Clean, comfortable rooms for solo travelers, couples, and families</li>
          <li>Friendly staff and 24/7 front desk support</li>
          <li>Free Wi-Fi, secure parking, and daily housekeeping</li>
          <li>Affordable rates with flexible booking options</li>
        </ul>
      </div>
    </div>
  );
};

export default Home; 