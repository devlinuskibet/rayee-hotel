import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomCard from './RoomCard';

// Room data (should match Rooms.jsx)
const rooms = [
  {
    title: 'Standard Room',
    description: '1 Queen bed, ensuite bathroom, max 2 guests. Includes desk, wardrobe, and daily cleaning.',
    price: 2500,
    features: ['wifi', 'tv', 'shower', 'parking'],
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Executive Room',
    description: '1 King bed, lounge area, ensuite bathroom, max 2 guests. Premium amenities and extra space.',
    price: 4000,
    features: ['wifi', 'tv', 'shower', 'parking'],
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Double Room',
    description: '2 Single beds, ensuite bathroom, max 2 guests. Ideal for friends or colleagues.',
    price: 3000,
    features: ['wifi', 'tv', 'shower', 'parking'],
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Family Room',
    description: '1 Queen bed + 2 Single beds, ensuite bathroom, max 4 guests. Spacious for families.',
    price: 5000,
    features: ['wifi', 'tv', 'shower', 'parking'],
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
  },
];

const featureIcons = {
  wifi: '📶',
  tv: '📺',
  shower: '🚿',
  parking: '🅿️',
};

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

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.32)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  animation: 'fadeInModal 0.35s ease',
};

const cardModalStyle = {
  background: '#fff',
  borderRadius: '16px',
  maxWidth: '420px',
  width: '95vw',
  padding: '2rem 1.5rem',
  boxShadow: '0 8px 32px rgba(62,39,35,0.18)',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  animation: 'popInModal 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
};

// Add keyframes for fadeIn and popIn
if (typeof window !== 'undefined' && !document.getElementById('modal-anim-keyframes')) {
  const style = document.createElement('style');
  style.id = 'modal-anim-keyframes';
  style.innerHTML = `
    @keyframes fadeInModal {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes popInModal {
      0% { opacity: 0; transform: scale(0.85) translateY(40px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }
  `;
  document.head.appendChild(style);
}

function daysBetween(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
}

const BookingPreview = () => {
  const [arrival, setArrival] = useState('');
  const [nights, setNights] = useState(1);
  const [roomType, setRoomType] = useState(rooms[0].title);
  const [hover, setHover] = useState(false);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const selectedRoom = rooms.find(r => r.title === roomType);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!arrival) {
      setResult({ msg: 'Please select an arrival date.', error: true });
      return;
    }
    // Always available for demo
    setResult(null);
    setShowModal(true);
  };

  const handleBook = () => {
    setShowModal(false);
    navigate(`/booking?room=${encodeURIComponent(roomType)}`);
  };

  return (
    <div
      style={hover ? { ...cardStyle, ...cardHover } : cardStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <form onSubmit={handleCheck}>
        <label style={labelStyle} htmlFor="roomType">Room Type</label>
        <select
          style={inputStyle}
          id="roomType"
          value={roomType}
          onChange={e => setRoomType(e.target.value)}
        >
          {rooms.map(room => (
            <option key={room.title} value={room.title}>{room.title}</option>
          ))}
        </select>
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
      {showModal && selectedRoom && (
        <div style={modalOverlayStyle}>
          <div style={cardModalStyle}>
            <RoomCard room={selectedRoom} />
            <button
              style={{ ...buttonStyle, marginTop: '1.2rem' }}
              onClick={handleBook}
            >
              Book this room
            </button>
            <button
              style={{
                background: 'none',
                color: '#7b4f24',
                border: 'none',
                marginTop: '0.7rem',
                cursor: 'pointer',
                fontSize: '1rem',
                textDecoration: 'underline',
                display: 'block',
                width: '100%',
              }}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <div style={{ marginTop: '0.7rem', textAlign: 'center', color: '#7b4f24' }}>
              Or <a href="/rooms" style={{ color: '#3e2723', textDecoration: 'underline' }}>view all rooms</a> for more info
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPreview; 