import React from 'react';
import RoomCard from '../components/RoomCard';

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

const Rooms = () => {
  return (
    <main style={{ background: '#f7f6f3', minHeight: '100vh', padding: '0 1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '2.5rem auto' }}>
        <h2 style={{ textAlign: 'center', color: '#3e2723', marginBottom: '0.5rem' }}>Rooms & Rates</h2>
        <p style={{ textAlign: 'center', color: '#7b4f24', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
          Choose from our comfortable, affordable room options below.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {rooms.map((room, idx) => (
            <RoomCard key={idx} room={room} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Rooms; 