import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';

const navStyle = {
  background: 'rgba(255, 255, 255, 0.82)',
  borderBottom: '1.5px solid #e0cfc2',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  width: '100%',
  borderTopLeftRadius: '1.7em',
  borderTopRightRadius: '1.7em',
  borderBottomLeftRadius: '1.1em',
  borderBottomRightRadius: '1.1em',
  boxShadow: '0 8px 48px 0 rgba(123,79,36,0.16), 0 0 0 12px rgba(255,224,178,0.22)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  margin: '0 auto',
  transition: 'background 0.22s, box-shadow 0.22s',
};

const linkStyle = {
  color: '#3e2723',
  textDecoration: 'none',
  fontWeight: 'bold',
  padding: '0.75rem 1.2rem',
  borderRadius: '6px',
  transition: 'background 0.2s',
  display: 'block',
};

const activeStyle = {
  background: '#e0e0e0',
};

const menuButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '2rem',
  color: '#3e2723',
  cursor: 'pointer',
  display: 'none',
};

const themeBtnStyle = {
  background: 'none',
  border: 'none',
  fontSize: '1.5rem',
  color: '#7b4f24',
  cursor: 'pointer',
  marginLeft: '1.2rem',
  transition: 'color 0.18s, transform 0.18s',
  outline: 'none',
  display: 'flex',
  alignItems: 'center',
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

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [cloud, setCloud] = useState(false);

  // Responsive styles
  const navLinksContainer = {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  };

  // Inline media query for demonstration (move to CSS for production)
  const isMobile = window.innerWidth < 700;

  // Theme logic
  useEffect(() => {
    // On mount, check localStorage or system preference
    const saved = localStorage.getItem('theme');
    if (saved) {
      setTheme(saved);
      applyTheme(saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      applyTheme('dark');
    }
  }, []);

  const applyTheme = (mode) => {
    if (mode === 'dark') {
      document.body.classList.add('dark');
      document.documentElement.style.setProperty('--primary', '#ffe0b2');
      document.documentElement.style.setProperty('--accent', '#ffb300');
      document.documentElement.style.setProperty('--bg', '#18130f');
      document.documentElement.style.setProperty('--card-bg', '#23201c');
      document.documentElement.style.setProperty('--text-main', '#ffe0b2');
      document.documentElement.style.setProperty('--text-light', '#ffe0b2cc');
    } else {
      document.body.classList.remove('dark');
      document.documentElement.style.setProperty('--primary', '#3e2723');
      document.documentElement.style.setProperty('--accent', '#7b4f24');
      document.documentElement.style.setProperty('--bg', '#f7f6f3');
      document.documentElement.style.setProperty('--card-bg', '#fff');
      document.documentElement.style.setProperty('--text-main', '#3e2723');
      document.documentElement.style.setProperty('--text-light', '#5d4037');
    }
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    applyTheme(next);
  };

  return (
    <nav style={navStyle}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.5rem 1rem',
      }}>
        <span
          style={cloud ? { ...cloudBase, ...cloudHover } : cloudBase}
          onMouseEnter={() => setCloud(true)}
          onMouseLeave={() => setCloud(false)}
          tabIndex={0}
        >
          Rayee Hotel
        </span>
        {/* Hamburger for mobile */}
        <button
          style={{ ...menuButtonStyle, display: isMobile ? 'block' : 'none' }}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation menu"
        >
          &#9776;
        </button>
        {/* Nav links */}
        <div
          style={
            isMobile
              ? {
                  display: open ? 'flex' : 'none',
                  flexDirection: 'column',
                  position: 'absolute',
                  top: '60px',
                  right: '10px',
                  background: '#f5f5f5',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                  borderRadius: '8px',
                  zIndex: 200,
                  minWidth: '140px',
                }
              : navLinksContainer
          }
        >
          <Link to="/" style={{ ...linkStyle, ...(location.pathname === '/' ? activeStyle : {}) }} onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/rooms" style={{ ...linkStyle, ...(location.pathname === '/rooms' ? activeStyle : {}) }} onClick={() => setOpen(false)}>
            Rooms
          </Link>
          <Link to="/booking" style={{ ...linkStyle, ...(location.pathname === '/booking' ? activeStyle : {}) }} onClick={() => setOpen(false)}>
            Booking
          </Link>
          <Link to="/gallery" style={{ ...linkStyle, ...(location.pathname === '/gallery' ? activeStyle : {}) }} onClick={() => setOpen(false)}>
            Gallery
          </Link>
          <Link to="/faq" style={{ ...linkStyle, ...(location.pathname === '/faq' ? activeStyle : {}) }} onClick={() => setOpen(false)}>
            FAQ
          </Link>
          <Link to="/about" style={{ ...linkStyle, ...(location.pathname === '/about' ? activeStyle : {}) }} onClick={() => setOpen(false)}>
            About
          </Link>
          <Link to="/contact" style={{ ...linkStyle, ...(location.pathname === '/contact' ? activeStyle : {}) }} onClick={() => setOpen(false)}>
            Contact
          </Link>
          <Link to="/admin" style={{ ...linkStyle, ...(location.pathname === '/admin' ? activeStyle : {}) }} onClick={() => setOpen(false)}>
            Admin
          </Link>
          <button
            style={themeBtnStyle}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 