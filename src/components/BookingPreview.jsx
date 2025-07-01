import React, { useState } from 'react';

const cardStyle = {
  background: 'rgba(255,255,255,0.98)',
  borderRadius: '14px',
  boxShadow: '0 2px 16px rgba(62,39,35,0.10)',
  padding: '2rem 1.5rem 1.5rem 1.5rem',
  maxWidth: '420px',
  margin: '0 auto',
  transition: 'box-shadow 0.18s, transform 0.18s',
  position: 'relative',
  top: 0,
};
const cardHover = {
  boxShadow: '0 6px 32px rgba(62,39,35,0.16)',
  transform: 'translateY(-2px) scale(1.012)',
};
const labelStyle = {
  display: 'block',
  fontWeight: 500,
  color: '#7b4f24',
  marginBottom: '0.3rem',
  fontSize: '1.04rem',
};
const inputStyle = {
  width: '100%',
  padding: '0.6rem 0.9rem',
  borderRadius: '7px',
  border: '1px solid #e0cfc2',
  marginBottom: '1.1rem',
  fontSize: '1.05rem',
  background: '#f7f6f3',
  color: '#3e2723',
  outline: 'none',
  transition: 'border 0.18s',
};
const buttonStyle = {
  width: '100%',
  background: 'linear-gradient(90deg, #3e2723 60%, #7b4f24 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: '7px',
  padding: '0.85rem',
  fontWeight: 600,
  fontSize: '1.08rem',
  cursor: 'pointer',
  marginTop: '0.2rem',
  boxShadow: '0 2px 8px rgba(62,39,35,0.09)',
  transition: 'background 0.18s, transform 0.18s',
};
const resultStyle = {
  marginTop: '1.2rem',
  fontWeight: 600,
  fontSize: '1.08rem',
  color: '#388e3c',
  textAlign: 'center',
};
const resultError = {
  ...resultStyle,
  color: '#c62828',
};

function daysBetween(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
}

const BookingPreview = () => {
  const [arrival, setArrival] = useState('');
  const [nights, setNights] = useState(1);
  const [hover, setHover] = useState(false);
  const [result, setResult] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!arrival) {
      setResult({ msg: 'Please select an arrival date.', error: true });
      return;
    }
    const today = new Date();
    const arrDate = new Date(arrival);
    const diff = daysBetween(today, arrDate);
    if (diff < 0) {
      setResult({ msg: 'Arrival date cannot be in the past.', error: true });
    } else if (diff < 3) {
      setResult({ msg: 'No rooms available for the selected date. Please try a later date.', error: true });
    } else {
      setResult({ msg: 'Rooms available! Please proceed to booking.', error: false });
    }
  };

  return (
    <div
      style={hover ? { ...cardStyle, ...cardHover } : cardStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <form onSubmit={handleCheck}>
        <label style={labelStyle} htmlFor="arrival">Arrival Date</label>
        <input
          style={inputStyle}
          type="date"
          id="arrival"
          value={arrival}
          onChange={e => setArrival(e.target.value)}
        />
        <label style={labelStyle} htmlFor="nights">Nights</label>
        <input
          style={inputStyle}
          type="number"
          id="nights"
          min="1"
          max="30"
          value={nights}
          onChange={e => setNights(e.target.value)}
        />
        <button style={buttonStyle} type="submit">Check Availability</button>
      </form>
      {result && (
        <div style={result.error ? resultError : resultStyle}>{result.msg}</div>
      )}
    </div>
  );
};

export default BookingPreview; 