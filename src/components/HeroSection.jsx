import React, { useEffect, useRef, useState } from 'react';

const bgImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1500&q=80',
  'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80',
];

const HeroSection = () => {
  // Animation refs
  const titleRef = useRef();
  const taglineRef = useRef();
  const paraRef = useRef();
  const btnsRef = useRef();
  const [bgIndex, setBgIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(null);

  // Animate text in sequence
  useEffect(() => {
    setTimeout(() => titleRef.current.style.opacity = 1, 100);
    setTimeout(() => taglineRef.current.style.opacity = 1, 400);
    setTimeout(() => paraRef.current.style.opacity = 1, 700);
    setTimeout(() => btnsRef.current.style.opacity = 1, 1000);
  }, []);

  // Background slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setBgIndex((i) => (i + 1) % bgImages.length);
        setFade(false);
      }, 900);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Styles
  const containerStyle = {
    position: 'relative',
    backgroundImage: `url(${bgImages[bgIndex]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '65vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    padding: '2.5rem 1rem 3.5rem 1rem',
    overflow: 'hidden',
    transition: 'background-image 1.2s cubic-bezier(.4,0,.2,1)',
    filter: fade ? 'brightness(0.7) blur(2px)' : 'none',
  };
  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(120deg, rgba(62,39,35,0.82) 0%, rgba(123,79,36,0.62) 100%)',
    zIndex: 1,
    pointerEvents: 'none',
    transition: 'background 0.7s',
  };
  const innerStyle = {
    position: 'relative',
    zIndex: 2,
    background: 'rgba(255,255,255,0.13)',
    boxShadow: '0 8px 32px rgba(62,39,35,0.22)',
    borderRadius: '18px',
    textAlign: 'center',
    maxWidth: '700px',
    width: '100%',
    margin: '0 auto',
    padding: '2.5rem 2rem 2.2rem 2rem',
    backdropFilter: 'blur(2.5px)',
  };
  const titleStyle = {
    fontSize: 'clamp(2.3rem, 5vw, 3.8rem)',
    marginBottom: '0.7rem',
    lineHeight: 1.1,
    fontWeight: 700,
    letterSpacing: '-1px',
    opacity: 0,
    transition: 'opacity 0.7s',
    color: '#fffbe7',
    textShadow: '0 4px 24px #3e2723, 0 1px 0 #7b4f24',
  };
  const taglineStyle = {
    fontSize: '1.32rem',
    color: '#ffe0b2',
    marginBottom: '1.1rem',
    fontWeight: 600,
    opacity: 0,
    transition: 'opacity 0.7s',
    textShadow: '0 2px 8px #7b4f24',
  };
  const paraStyle = {
    fontSize: 'clamp(1.09rem, 2vw, 1.32rem)',
    marginBottom: '2.2rem',
    color: '#fffde7',
    opacity: 0,
    transition: 'opacity 0.7s',
    textShadow: '0 1px 8px #3e2723',
  };
  const buttonRow = {
    display: 'flex',
    gap: '1.2rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
    opacity: 0,
    transition: 'opacity 0.7s',
  };
  const buttonStyle = {
    background: hoverBtn === 'rooms' ? 'linear-gradient(90deg, #fff 60%, #ffe0b2 100%)' : 'linear-gradient(90deg, #fff 60%, #ffe0b2 100%)',
    color: hoverBtn === 'rooms' ? '#7b4f24' : '#3e2723',
    border: 'none',
    padding: '0.95rem 2.2rem',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1.13rem',
    marginBottom: '0.5rem',
    boxShadow: hoverBtn === 'rooms' ? '0 4px 16px #ffe0b2' : '0 2px 8px rgba(62,39,35,0.13)',
    transition: 'background 0.18s, color 0.18s, transform 0.18s, box-shadow 0.18s',
    transform: hoverBtn === 'rooms' ? 'scale(1.06)' : 'none',
  };
  const buttonAlt = {
    ...buttonStyle,
    background: hoverBtn === 'book' ? 'linear-gradient(90deg, #7b4f24 60%, #ffb300 100%)' : 'linear-gradient(90deg, #3e2723 60%, #7b4f24 100%)',
    color: '#fff',
    boxShadow: hoverBtn === 'book' ? '0 4px 16px #ffb300' : '0 2px 8px rgba(62,39,35,0.13)',
    transform: hoverBtn === 'book' ? 'scale(1.06)' : 'none',
  };

  // Soft divider
  const dividerStyle = {
    width: '100%',
    height: '32px',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(247,246,243,0.9) 100%)',
    marginTop: '-2.5rem',
    marginBottom: '2.5rem',
    border: 'none',
  };

  // Floating dancing bed SVG
  const bedStyle = {
    position: 'absolute',
    right: '7%',
    bottom: '7%',
    width: '110px',
    height: '70px',
    zIndex: 3,
    pointerEvents: 'none',
    animation: 'floatBed 3.2s ease-in-out infinite',
    filter: 'drop-shadow(0 8px 16px #3e2723aa)',
  };

  // Keyframes for floating bed
  const styleSheet = document.getElementById('hero-anim-keyframes');
  if (!styleSheet) {
    const style = document.createElement('style');
    style.id = 'hero-anim-keyframes';
    style.innerHTML = `@keyframes floatBed {
      0% { transform: translateY(0) rotate(-2deg) scale(1); }
      20% { transform: translateY(-10px) rotate(2deg) scale(1.04); }
      50% { transform: translateY(-18px) rotate(-3deg) scale(1.07); }
      80% { transform: translateY(-10px) rotate(2deg) scale(1.04); }
      100% { transform: translateY(0) rotate(-2deg) scale(1); }
    }`;
    document.head.appendChild(style);
  }

  return (
    <>
      <section style={containerStyle}>
        <div style={overlayStyle}></div>
        <div style={innerStyle}>
          <h1 ref={titleRef} style={titleStyle}>
            Welcome to Rayee Hotel — Your Comfortable Stay in Bomet Town
          </h1>
          <div ref={taglineRef} style={taglineStyle}>
            Peaceful, affordable rooms &mdash; warm hospitality in the heart of Bomet Town
          </div>
          <p ref={paraRef} style={paraStyle}>
            We provide peaceful and affordable rooms with clean amenities and warm hospitality. Whether you're here for a night or a week, we have the perfect space for you.
          </p>
          <div ref={btnsRef} style={buttonRow}>
            <button
              style={buttonStyle}
              onMouseEnter={() => setHoverBtn('rooms')}
              onMouseLeave={() => setHoverBtn(null)}
              onClick={() => window.location.href='/rooms'}
            >
              View Rooms
            </button>
            <button
              style={buttonAlt}
              onMouseEnter={() => setHoverBtn('book')}
              onMouseLeave={() => setHoverBtn(null)}
              onClick={() => window.location.href='/booking'}
            >
              Book Now
            </button>
          </div>
        </div>
        {/* Floating dancing bed SVG */}
        <svg style={bedStyle} viewBox="0 0 110 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="40" width="90" height="18" rx="7" fill="#fff" stroke="#7b4f24" strokeWidth="2"/>
          <rect x="18" y="28" width="74" height="16" rx="6" fill="#ffe0b2" stroke="#7b4f24" strokeWidth="1.5"/>
          <rect x="18" y="18" width="36" height="12" rx="5" fill="#fff" stroke="#7b4f24" strokeWidth="1.2"/>
          <rect x="56" y="18" width="36" height="12" rx="5" fill="#fff" stroke="#7b4f24" strokeWidth="1.2"/>
          <ellipse cx="28" cy="60" rx="6" ry="3" fill="#7b4f24" opacity="0.18"/>
          <ellipse cx="82" cy="60" rx="6" ry="3" fill="#7b4f24" opacity="0.18"/>
          <rect x="10" y="58" width="90" height="6" rx="3" fill="#7b4f24" opacity="0.13"/>
        </svg>
      </section>
      <div style={dividerStyle}></div>
    </>
  );
};

export default HeroSection; 