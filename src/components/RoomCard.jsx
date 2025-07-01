import React from 'react';
import { FaWifi, FaTv, FaShower, FaParking } from 'react-icons/fa';

const featureIcons = {
  wifi: <FaWifi title="WiFi" />,
  tv: <FaTv title="TV" />,
  shower: <FaShower title="Hot Shower" />,
  parking: <FaParking title="Free Parking" />,
};

const RoomCard = ({ room }) => {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '18px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.09)',
        overflow: 'hidden',
        maxWidth: '370px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.18s, box-shadow 0.18s',
      }}
      className="room-card"
    >
      <img
        src={room.image}
        alt={room.title}
        style={{ width: '100%', height: '220px', objectFit: 'cover' }}
      />
      <div style={{ padding: '1.3rem 1.1rem 1.2rem 1.1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#3e2723', fontWeight: 700, fontSize: '1.3rem' }}>{room.title}</h3>
        <p style={{ margin: '0 0 0.7rem 0', fontSize: '1.05rem', color: '#4e4e4e' }}>{room.description}</p>
        <div style={{ margin: '0.5rem 0', color: '#7b4f24', fontWeight: 'bold', fontSize: '1.1rem' }}>
          Ksh {room.price} / night
        </div>
        <div style={{ display: 'flex', gap: '1.1rem', margin: '0.7rem 0', fontSize: '1.3rem', color: '#3e2723' }}>
          {room.features.map((f) => (
            <span key={f}>{featureIcons[f]}</span>
          ))}
        </div>
        <button
          style={{
            background: '#3e2723',
            color: '#fff',
            border: 'none',
            padding: '0.7rem 1.2rem',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '0.7rem',
            width: '100%',
            fontSize: '1.08rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            transition: 'background 0.18s',
          }}
        >
          Book this room
        </button>
      </div>
    </div>
  );
};

export default RoomCard; 