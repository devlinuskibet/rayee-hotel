import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const cardStyle = {
  background: 'rgba(255,255,255,0.98)',
  borderRadius: '18px',
  boxShadow: '0 6px 32px rgba(62,39,35,0.13)',
  padding: '2.7rem 2rem 2.2rem 2rem',
  maxWidth: '480px',
  margin: '0 auto',
  position: 'relative',
  overflow: 'visible',
};
const headingStyle = {
  color: '#3e2723',
  marginBottom: '1.2rem',
  fontWeight: 700,
  fontSize: '2.1rem',
  letterSpacing: '-1px',
};
const labelStyle = {
  display: 'block',
  fontWeight: 500,
  color: '#7b4f24',
  marginBottom: '0.3rem',
  fontSize: '1.04rem',
  textAlign: 'left',
  transition: 'color 0.18s',
};
const inputStyle = {
  width: '100%',
  padding: '0.7rem 1rem',
  borderRadius: '8px',
  border: '1px solid #e0cfc2',
  marginBottom: '1.1rem',
  fontSize: '1.07rem',
  background: '#f7f6f3',
  color: '#3e2723',
  outline: 'none',
  transition: 'border 0.18s',
};
const buttonStyle = {
  width: '100%',
  background: 'linear-gradient(90deg, #3e2723 60%, #ffb300 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  padding: '1rem',
  fontWeight: 700,
  fontSize: '1.13rem',
  cursor: 'pointer',
  marginTop: '0.2rem',
  boxShadow: '0 2px 8px rgba(62,39,35,0.09)',
  transition: 'background 0.18s, transform 0.18s',
};
const confirmStyle = {
  color: '#388e3c',
  fontWeight: 700,
  fontSize: '1.25rem',
  margin: '2.2rem 0 1.5rem 0',
  background: 'rgba(232,245,233,0.7)',
  borderRadius: '12px',
  padding: '1.2rem 1rem',
  boxShadow: '0 2px 12px #388e3c22',
};
const floatingBed = {
  position: 'absolute',
  right: '-60px',
  top: '-40px',
  width: '110px',
  height: '70px',
  zIndex: 3,
  pointerEvents: 'none',
  animation: 'floatBed 3.2s ease-in-out infinite',
  filter: 'drop-shadow(0 8px 16px #3e2723aa)',
};
const mainBg = {
  background: 'linear-gradient(180deg, #f7f6f3 0%, #fff 100%)',
  minHeight: '100vh',
  padding: '2.5rem 0',
};

// Keyframes for floating bed
const styleSheet = document.getElementById('booking-anim-keyframes');
if (!styleSheet) {
  const style = document.createElement('style');
  style.id = 'booking-anim-keyframes';
  style.innerHTML = `@keyframes floatBed {0%{transform:translateY(0) rotate(-2deg) scale(1);}20%{transform:translateY(-10px) rotate(2deg) scale(1.04);}50%{transform:translateY(-18px) rotate(-3deg) scale(1.07);}80%{transform:translateY(-10px) rotate(2deg) scale(1.04);}100%{transform:translateY(0) rotate(-2deg) scale(1);}}`;
  document.head.appendChild(style);
}

const roomTypes = [
  'Standard Room',
  'Executive Room',
  'Double Room',
  'Family Room',
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Booking = () => {
  const query = useQuery();
  const initialRoom = query.get('room') || roomTypes[0];
  const [form, setForm] = useState({
    name: '',
    phone: '',
    arrival: '',
    departure: '',
    guests: 1,
    roomType: initialRoom,
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (query.get('room')) {
      setForm((prev) => ({ ...prev, roomType: query.get('room') }));
    }
    // eslint-disable-next-line
  }, [query.get('room')]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Booking failed! Please try again.');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <main style={mainBg}>
      <section style={cardStyle}>
        {/* Floating dancing bed SVG */}
        <svg style={floatingBed} viewBox="0 0 110 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="40" width="90" height="18" rx="7" fill="#fff" stroke="#7b4f24" strokeWidth="2"/>
          <rect x="18" y="28" width="74" height="16" rx="6" fill="#ffe0b2" stroke="#7b4f24" strokeWidth="1.5"/>
          <rect x="18" y="18" width="36" height="12" rx="5" fill="#fff" stroke="#7b4f24" strokeWidth="1.2"/>
          <rect x="56" y="18" width="36" height="12" rx="5" fill="#fff" stroke="#7b4f24" strokeWidth="1.2"/>
          <ellipse cx="28" cy="60" rx="6" ry="3" fill="#7b4f24" opacity="0.18"/>
          <ellipse cx="82" cy="60" rx="6" ry="3" fill="#7b4f24" opacity="0.18"/>
          <rect x="10" y="58" width="90" height="6" rx="3" fill="#7b4f24" opacity="0.13"/>
        </svg>
        <h2 style={headingStyle}>Booking Request</h2>
        {submitted ? (
          <div style={confirmStyle}>
            <span role="img" aria-label="check" style={{ fontSize: '1.5em', verticalAlign: 'middle', marginRight: '0.5em' }}>✅</span>
            Thank you for your booking request!<br />We will contact you soon to confirm your reservation.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', maxWidth: 380, margin: '0 auto', textAlign: 'left' }}>
            <label style={labelStyle} htmlFor="roomType">Room Type</label>
            <select
              name="roomType"
              id="roomType"
              value={form.roomType}
              onChange={handleChange}
              style={inputStyle}
              required
            >
              {roomTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <label style={labelStyle} htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <label style={labelStyle} htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="+254 722413630"
              value={form.phone}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <div style={{ color: '#7b4f24', fontSize: '0.98rem', marginBottom: '0.7rem' }}>
              For assistance, call or WhatsApp: <strong>+254 722413630</strong>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle} htmlFor="arrival">Arrival</label>
                <input
                  type="date"
                  name="arrival"
                  id="arrival"
                  value={form.arrival}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle} htmlFor="departure">Departure</label>
                <input
                  type="date"
                  name="departure"
                  id="departure"
                  value={form.departure}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>
            </div>
            <label style={labelStyle} htmlFor="guests">Number of Guests</label>
            <input
              type="number"
              name="guests"
              id="guests"
              min="1"
              max="6"
              value={form.guests}
              onChange={handleChange}
              required
              placeholder="Number of Guests"
              style={inputStyle}
            />
            <label style={labelStyle} htmlFor="message">Message (optional)</label>
            <textarea
              name="message"
              id="message"
              placeholder="Message (optional)"
              value={form.message}
              onChange={handleChange}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
            <button type="submit" style={buttonStyle}>
              Submit Booking Request
            </button>
          </form>
        )}
      </section>
    </main>
  );
};

export default Booking; 