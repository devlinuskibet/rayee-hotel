import React, { useState } from 'react';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    alt: 'Cozy Room',
  },
  {
    src: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    alt: 'Double Room',
  },
  {
    src: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80',
    alt: 'Executive Room',
  },
  {
    src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
    alt: 'Family Room',
  },
  {
    src: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
    alt: 'Reception',
  },
  {
    src: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80',
    alt: 'Hotel Building',
  },
  {
    src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    alt: 'Hallway',
  },
  {
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    alt: 'View from Window',
  },
];

const Gallery = () => {
  const [modalImg, setModalImg] = useState(null);

  return (
    <main style={{ maxWidth: '1100px', margin: '2.5rem auto', padding: '0 1rem' }}>
      <h2 style={{ textAlign: 'center', color: '#3e2723', marginBottom: '2rem' }}>Gallery</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem',
      }}>
        {images.map((img, idx) => (
          <div key={idx} style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', cursor: 'pointer', background: '#fff' }}>
            <img
              src={img.src}
              alt={img.alt}
              style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block', transition: 'transform 0.18s', cursor: 'pointer' }}
              onClick={() => setModalImg(img)}
            />
          </div>
        ))}
      </div>
      {/* Lightbox Modal */}
      {modalImg && (
        <div
          onClick={() => setModalImg(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            cursor: 'pointer',
          }}
        >
          <img
            src={modalImg.src}
            alt={modalImg.alt}
            style={{
              maxWidth: '90vw',
              maxHeight: '80vh',
              borderRadius: '14px',
              boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
              background: '#fff',
            }}
          />
        </div>
      )}
    </main>
  );
};

export default Gallery; 