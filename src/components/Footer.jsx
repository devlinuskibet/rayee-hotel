import React, { useState } from 'react';
import { FaFacebook, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const footerStyle = {
  background: 'linear-gradient(90deg, #3e2723 60%, #7b4f24 100%)',
  color: '#fff',
  padding: '2.2rem 1.2rem 1.1rem 1.2rem',
  marginTop: '2.5rem',
  borderTopLeftRadius: '18px',
  borderTopRightRadius: '18px',
  boxShadow: '0 -2px 16px rgba(62,39,35,0.10)',
};
const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  maxWidth: '1100px',
  margin: '0 auto',
  gap: '2rem',
};
const colStyle = {
  flex: '1 1 180px',
  minWidth: '160px',
  marginBottom: '1.2rem',
};
const linkStyle = {
  color: '#ffe0b2',
  textDecoration: 'none',
  display: 'block',
  marginBottom: '0.5rem',
  fontSize: '1.04rem',
  transition: 'color 0.18s',
};
const iconRow = {
  display: 'flex',
  gap: '1.1rem',
  marginTop: '0.7rem',
};
const bottomStyle = {
  textAlign: 'center',
  marginTop: '1.5rem',
  fontSize: '1.01rem',
  color: '#ffe0b2',
  opacity: 0.92,
  letterSpacing: '0.02em',
};

const cloudBase = {
  display: 'inline-block',
  padding: '0.18em 1.1em',
  borderRadius: '2em',
  background: 'rgba(255,255,255,0.18)',
  boxShadow: '0 4px 32px 8px rgba(255,255,255,0.13)',
  border: '2px solid #fffbe7',
  color: '#3e2723',
  fontWeight: 700,
  fontSize: '1.13em',
  letterSpacing: '0.03em',
  backdropFilter: 'blur(7px)',
  transition: 'transform 0.22s cubic-bezier(.4,2,.2,1), box-shadow 0.22s, background 0.22s',
  cursor: 'pointer',
  margin: '0 0.4em',
  outline: 'none',
};
const cloudHover = {
  background: 'rgba(255,255,255,0.38)',
  color: '#7b4f24',
  boxShadow: '0 8px 48px 12px rgba(255,255,255,0.22), 0 2px 16px #ffe0b2',
  transform: 'scale(1.09) rotate(-2deg)',
  border: '2.5px solid #ffb300',
};

const Footer = () => {
  const [cloud, setCloud] = useState(false);
  const year = new Date().getFullYear();

  return (
    <footer style={footerStyle}>
      <div style={rowStyle}>
        <div style={colStyle}>
          <h4 style={{ margin: '0 0 0.7rem 0', color: '#fff', fontWeight: 600 }}>Quick Links</h4>
          <a href="/" style={linkStyle}>Home</a>
          <a href="/rooms" style={linkStyle}>Rooms</a>
          <a href="/booking" style={linkStyle}>Booking</a>
          <a href="/gallery" style={linkStyle}>Gallery</a>
          <a href="/contact" style={linkStyle}>Contact</a>
          <a href="/faq" style={linkStyle}>FAQ</a>
          <a href="/about" style={linkStyle}>About</a>
        </div>
        <div style={colStyle}>
          <h4 style={{ margin: '0 0 0.7rem 0', color: '#fff', fontWeight: 600 }}>Contact</h4>
          <div style={{ color: '#ffe0b2', fontSize: '1.04rem', marginBottom: '0.5rem' }}>Bomet Town, Kenya</div>
          <div style={{ color: '#ffe0b2', fontSize: '1.04rem', marginBottom: '0.5rem' }}>+254 722413630</div>
          <div style={{ color: '#ffe0b2', fontSize: '1.04rem', marginBottom: '0.5rem' }}>linzskybes@gmail.com</div>
          <div style={iconRow}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ffe0b2', fontSize: '1.3rem' }}><FaFacebook /></a>
            <a href="https://wa.me/254722413630" target="_blank" rel="noopener noreferrer" style={{ color: '#ffe0b2', fontSize: '1.3rem' }}><FaWhatsapp /></a>
            <a href="mailto:linzskybes@gmail.com" style={{ color: '#ffe0b2', fontSize: '1.3rem' }}><FaEnvelope /></a>
          </div>
        </div>
      </div>
      <div style={bottomStyle}>
        <div style={{ marginBottom: '0.2rem', fontSize: '1.01rem', color: '#ffe0b2', opacity: 0.85 }}>
          &copy; {year}
        </div>
        <span
          style={cloud ? { ...cloudBase, ...cloudHover } : cloudBase}
          onMouseEnter={() => setCloud(true)}
          onMouseLeave={() => setCloud(false)}
          tabIndex={0}
        >
          Rayee Hotel
        </span>
        <span style={{ marginLeft: '0.7em' }}>Website by <span style={{ fontWeight: 600, color: '#fff' }}>Dev Linus Kibet</span></span>
      </div>
    </footer>
  );
};

export default Footer; 