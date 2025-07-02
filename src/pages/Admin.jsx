import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHotel, FaUserCircle, FaSignOutAlt, FaEdit, FaTrash, FaCheck, FaPlus, FaSearch, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const adminNavStyle = {
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(90deg, #ffe0b2 0%, #ffb300 100%)',
  padding: '1.1rem 2rem 1.1rem 1.2rem',
  borderBottom: '2px solid #e0cfc2',
  position: 'relative',
  minHeight: '70px',
  boxShadow: '0 2px 16px #7b4f2422',
};
const hotelBrandStyle = {
  display: 'flex',
  alignItems: 'center',
  fontWeight: 800,
  fontSize: '1.6rem',
  color: '#3e2723',
  letterSpacing: '1.5px',
  marginRight: '2.5rem',
  gap: '0.7rem',
  textShadow: '0 2px 8px #fffbe7',
};
const navItemStyle = {
  fontWeight: 600,
  fontSize: '1.13rem',
  color: '#7b4f24',
  background: '#fff',
  borderRadius: '8px',
  padding: '0.6rem 1.3rem',
  marginRight: '1.2rem',
  boxShadow: '0 1px 6px #ffb30022',
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
  transition: 'background 0.18s',
};
const staffBoxStyle = {
  position: 'absolute',
  left: 0,
  top: '100%',
  marginTop: '-1.2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '110px',
  zIndex: 2,
};
const staffIdStyle = {
  marginTop: '-0.7rem',
  background: '#fff',
  color: '#7b4f24',
  borderRadius: '8px',
  padding: '0.2rem 0.7rem',
  fontWeight: 600,
  fontSize: '1.01rem',
  boxShadow: '0 1px 6px #ffb30022',
};
const logoutBtnStyle = {
  marginLeft: 'auto',
  background: 'none',
  border: 'none',
  color: '#7b4f24',
  fontWeight: 700,
  fontSize: '1.13rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  cursor: 'pointer',
  padding: '0.6rem 1.1rem',
  borderRadius: '8px',
  transition: 'background 0.18s',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '2.5rem',
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 16px #7b4f2422',
  overflow: 'hidden',
};
const thStyle = {
  background: '#ffe0b2',
  color: '#3e2723',
  fontWeight: 700,
  padding: '1rem',
  borderBottom: '2px solid #e0cfc2',
};
const tdStyle = {
  padding: '0.9rem 1rem',
  borderBottom: '1px solid #f7f6f3',
  color: '#5d4037',
  fontSize: '1.01rem',
};

const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.18)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2000,
};
const modalBox = {
  background: '#fff',
  borderRadius: '14px',
  boxShadow: '0 4px 32px #7b4f2422',
  padding: '2.2rem 2rem',
  minWidth: 320,
  maxWidth: 420,
  width: '95vw',
  position: 'relative',
};
const modalTitle = {
  fontWeight: 700,
  fontSize: '1.25rem',
  color: '#3e2723',
  marginBottom: '1.2rem',
  textAlign: 'center',
};
const modalBtnRow = {
  display: 'flex',
  gap: '1.2rem',
  marginTop: '1.5rem',
  justifyContent: 'center',
};
const actionBtn = {
  background: '#ffb300',
  color: '#fff',
  border: 'none',
  borderRadius: 7,
  padding: '0.5rem 1.1rem',
  fontWeight: 700,
  fontSize: '1.01rem',
  cursor: 'pointer',
  marginRight: 8,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
};
const dangerBtn = { ...actionBtn, background: '#c62828' };
const confirmBtn = { ...actionBtn, background: '#388e3c' };
const addBtn = { ...actionBtn, background: '#3e2723', marginBottom: '1.2rem' };
const searchBox = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '1.2rem',
  background: '#fff',
  borderRadius: 8,
  boxShadow: '0 1px 6px #ffb30022',
  padding: '0.5rem 1rem',
  maxWidth: 350,
};
const searchInput = {
  border: 'none',
  outline: 'none',
  fontSize: '1.05rem',
  background: 'transparent',
  color: '#3e2723',
  flex: 1,
};

const initialBooking = {
  name: '', phone: '', roomType: 'Standard Room', arrival: '', departure: '', guests: 1, message: '', confirmed: false
};
const roomTypes = [ 'Standard Room', 'Executive Room', 'Double Room', 'Family Room' ];

const actionsCellStyle = {
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  justifyContent: 'center',
};
const iconBtn = {
  background: 'none',
  border: 'none',
  padding: '0.5rem',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '1.1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.15s',
};
const iconBtnEdit = { ...iconBtn, color: '#3e2723', background: '#ffe0b2' };
const iconBtnDelete = { ...iconBtn, color: '#fff', background: '#c62828' };
const iconBtnConfirm = { ...iconBtn, color: '#fff', background: '#388e3c' };
const iconBtnWhatsapp = { ...iconBtn, color: '#25D366', background: '#e0f7e9' };

const navTabStyle = {
  ...navItemStyle,
  marginRight: '0.7rem',
  background: '#fff',
  color: '#7b4f24',
  border: '1.5px solid #ffe0b2',
  fontWeight: 700,
  fontSize: '1.08rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  position: 'relative',
};
const badgeStyle = {
  background: '#c62828',
  color: '#fff',
  borderRadius: '50%',
  fontSize: '0.85rem',
  fontWeight: 700,
  padding: '0.1em 0.5em',
  position: 'absolute',
  top: '-0.7em',
  right: '-0.7em',
};

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('adminToken'));
  const [form, setForm] = useState({ staffId: '', password: '' });
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [modal, setModal] = useState(null); // { type: 'add'|'edit'|'delete'|'confirm', booking }
  const [modalBooking, setModalBooking] = useState(initialBooking);
  const [search, setSearch] = useState('');
  const [actionsOpen, setActionsOpen] = useState(null); // booking._id or null
  const actionsMenuRef = useRef();
  const staffId = form.staffId || localStorage.getItem('staffId') || '09871234';
  const navigate = useNavigate();
  const [tab, setTab] = useState('bookings');
  const [contactMessages, setContactMessages] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [fetchContactsError, setFetchContactsError] = useState('');
  const [contactModal, setContactModal] = useState(null); // { type: 'view'|'delete', message }

  useEffect(() => { if (loggedIn) fetchBookings(); }, [loggedIn]);
  useEffect(() => {
    if (loggedIn && tab === 'contacts') fetchContactMessages();
    // eslint-disable-next-line
  }, [loggedIn, tab]);

  const fetchBookings = async () => {
    setLoading(true); setFetchError('');
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/bookings', { headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json();
      if (data.success) setBookings(data.bookings);
      else setFetchError(data.message || 'Failed to fetch bookings');
    } catch (err) { setFetchError('Network error'); }
    setLoading(false);
  };

  const fetchContactMessages = async () => {
    setLoadingContacts(true); setFetchContactsError('');
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/contact', { headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json();
      if (data.success) setContactMessages(data.messages);
      else setFetchContactsError(data.message || 'Failed to fetch messages');
    } catch (err) { setFetchContactsError('Network error'); }
    setLoadingContacts(false);
  };

  // CRUD actions
  const handleDelete = async (id) => {
    const token = localStorage.getItem('adminToken');
    await fetch(`http://localhost:5000/api/bookings/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    setBookings(bookings.filter(b => b._id !== id));
    setModal(null);
  };
  const handleConfirm = async (id) => {
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`http://localhost:5000/api/bookings/${id}/confirm`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) {
      setBookings(bookings.map(b => b._id === id ? { ...b, confirmed: true } : b));
    }
    setModal(null);
  };
  const handleEdit = async () => {
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`http://localhost:5000/api/bookings/${modalBooking._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(modalBooking),
    });
    if (res.ok) fetchBookings();
    setModal(null);
  };
  const handleAdd = async () => {
    const token = localStorage.getItem('adminToken');
    const res = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(modalBooking),
    });
    if (res.ok) fetchBookings();
    setModal(null);
  };

  const handleDeleteContact = async (id) => {
    const token = localStorage.getItem('adminToken');
    await fetch(`http://localhost:5000/api/contact/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    setContactMessages(contactMessages.filter(m => m._id !== id));
    setContactModal(null);
  };

  // Modal openers
  const openEdit = (b) => { setModalBooking(b); setModal({ type: 'edit', booking: b }); };
  const openDelete = (b) => { setModal({ type: 'delete', booking: b }); };
  const openConfirm = (b) => { setModal({ type: 'confirm', booking: b }); };
  const openAdd = () => { setModalBooking(initialBooking); setModal({ type: 'add' }); };

  // Search/filter
  const filteredBookings = bookings.filter(b => {
    const q = search.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.phone.toLowerCase().includes(q) ||
      b.roomType.toLowerCase().includes(q) ||
      (b.message && b.message.toLowerCase().includes(q))
    );
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success && data.token) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('staffId', form.staffId);
        setLoggedIn(true);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('staffId');
    setLoggedIn(false);
    setForm({ staffId: '', password: '' });
    setBookings([]);
    navigate('/admin');
  };

  // Modal form handlers
  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalBooking(prev => ({ ...prev, [name]: value }));
  };

  // Close actions menu on click outside
  useEffect(() => {
    function handleClick(e) {
      if (actionsMenuRef.current && !actionsMenuRef.current.contains(e.target)) {
        setActionsOpen(null);
      }
    }
    if (actionsOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [actionsOpen]);

  return (
    <main style={{ minHeight: '80vh', background: '#f7f6f3', padding: 0 }}>
      {loggedIn && (
        <nav style={adminNavStyle}>
          <div style={hotelBrandStyle}>
            <FaHotel size={32} style={{ color: '#ffb300', filter: 'drop-shadow(0 2px 8px #fffbe7)' }} />
            <span>RayeeHotel</span>
          </div>
          <button style={{ ...navTabStyle, ...(tab === 'bookings' ? { background: '#ffe0b2', color: '#3e2723' } : {}) }} onClick={() => setTab('bookings')}>
            Bookings Management
          </button>
          <button style={{ ...navTabStyle, ...(tab === 'contacts' ? { background: '#ffe0b2', color: '#3e2723' } : {}) }} onClick={() => setTab('contacts')}>
            <FaEnvelope /> Contact Messages
            {contactMessages.length > 0 && <span style={badgeStyle}>{contactMessages.length}</span>}
          </button>
          <div style={staffBoxStyle}>
            <FaUserCircle size={54} style={{ color: '#7b4f24', background: '#fff', borderRadius: '50%', boxShadow: '0 1px 6px #ffb30022' }} />
            <div style={staffIdStyle}>{staffId}</div>
          </div>
          <button style={logoutBtnStyle} onClick={handleLogout} title="Log out">
            <FaSignOutAlt size={22} /> Log Out
          </button>
        </nav>
      )}
      <h2 style={{ color: '#3e2723', textAlign: 'center', marginBottom: '2rem', marginTop: loggedIn ? '2.5rem' : '2rem' }}>Admin Panel</h2>
      {!loggedIn ? (
        <form onSubmit={handleSubmit} style={{ maxWidth: 340, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #7b4f2422', padding: '2rem' }}>
          <label htmlFor="staffId" style={{ display: 'block', marginBottom: 8, color: '#7b4f24', fontWeight: 600 }}>Staff ID</label>
          <input
            type="text"
            id="staffId"
            name="staffId"
            value={form.staffId}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.7rem', borderRadius: 7, border: '1px solid #e0cfc2', marginBottom: 18 }}
          />
          <label htmlFor="password" style={{ display: 'block', marginBottom: 8, color: '#7b4f24', fontWeight: 600 }}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.7rem', borderRadius: 7, border: '1px solid #e0cfc2', marginBottom: 22 }}
          />
          {error && <div style={{ color: '#c62828', marginBottom: 12, textAlign: 'center' }}>{error}</div>}
          <button type="submit" style={{ width: '100%', background: 'linear-gradient(90deg, #3e2723 60%, #ffb300 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '0.9rem', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', marginTop: 8 }}>Log In</button>
        </form>
      ) : tab === 'bookings' ? (
        <div style={{ maxWidth: 1200, margin: '0 auto', marginTop: '2.5rem', background: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.2rem' }}>
            <button style={addBtn} onClick={openAdd}><FaPlus /> Add Booking</button>
            <div style={searchBox}>
              <FaSearch />
              <input
                style={searchInput}
                type="text"
                placeholder="Search bookings..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <h3 style={{ color: '#7b4f24', marginBottom: '1.5rem' }}>Bookings Management</h3>
          {loading ? (
            <div style={{ color: '#7b4f24', textAlign: 'center', margin: '2rem' }}>Loading bookings...</div>
          ) : fetchError ? (
            <div style={{ color: '#c62828', textAlign: 'center', margin: '2rem' }}>{fetchError}</div>
          ) : filteredBookings.length === 0 ? (
            <div style={{ color: '#7b4f24', textAlign: 'center', margin: '2rem' }}>No bookings found.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Phone</th>
                    <th style={thStyle}>Room Type</th>
                    <th style={thStyle}>Arrival</th>
                    <th style={thStyle}>Departure</th>
                    <th style={thStyle}>Guests</th>
                    <th style={thStyle}>Message</th>
                    <th style={thStyle}>Confirmed</th>
                    <th style={thStyle}>Created At</th>
                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((b) => (
                    <tr key={b._id} style={{ position: 'relative' }}>
                      <td style={tdStyle}>{b.name}</td>
                      <td style={tdStyle}>{b.phone}</td>
                      <td style={tdStyle}>{b.roomType}</td>
                      <td style={tdStyle}>{b.arrival}</td>
                      <td style={tdStyle}>{b.departure}</td>
                      <td style={tdStyle}>{b.guests}</td>
                      <td style={tdStyle}>{b.message}</td>
                      <td style={tdStyle}>{b.confirmed ? <span style={{ color: '#388e3c', fontWeight: 700 }}>Yes</span> : <span style={{ color: '#c62828', fontWeight: 700 }}>No</span>}</td>
                      <td style={tdStyle}>{new Date(b.createdAt).toLocaleString()}</td>
                      <td style={{ ...tdStyle }}>
                        <div style={actionsCellStyle}>
                          <button style={iconBtnEdit} title="Edit" onClick={() => openEdit(b)}><FaEdit /></button>
                          <button style={iconBtnDelete} title="Delete" onClick={() => openDelete(b)}><FaTrash /></button>
                          {!b.confirmed && <button style={iconBtnConfirm} title="Confirm" onClick={() => openConfirm(b)}><FaCheck /></button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Modals */}
          {modal && (
            <div style={modalOverlay}>
              <div style={modalBox}>
                {modal.type === 'delete' && (
                  <>
                    <div style={modalTitle}>Delete Booking?</div>
                    <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>Are you sure you want to delete the booking for <b>{modal.booking.name}</b>?</div>
                    <div style={modalBtnRow}>
                      <button style={dangerBtn} onClick={() => handleDelete(modal.booking._id)}>Delete</button>
                      <button style={actionBtn} onClick={() => setModal(null)}>Cancel</button>
                    </div>
                  </>
                )}
                {modal.type === 'confirm' && (
                  <>
                    <div style={modalTitle}>Confirm Booking?</div>
                    <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>Mark booking for <b>{modal.booking.name}</b> as confirmed?</div>
                    <div style={modalBtnRow}>
                      <button style={confirmBtn} onClick={() => handleConfirm(modal.booking._id)}>Confirm</button>
                      <button style={actionBtn} onClick={() => setModal(null)}>Cancel</button>
                    </div>
                  </>
                )}
                {(modal.type === 'edit' || modal.type === 'add') && (
                  <form onSubmit={e => { e.preventDefault(); modal.type === 'edit' ? handleEdit() : handleAdd(); }}>
                    <div style={modalTitle}>{modal.type === 'edit' ? 'Edit Booking' : 'Add Booking'}</div>
                    <label style={{ color: '#7b4f24', fontWeight: 600 }}>Name</label>
                    <input name="name" value={modalBooking.name} onChange={handleModalChange} required style={{ width: '100%', marginBottom: 10, padding: '0.6rem', borderRadius: 7, border: '1px solid #e0cfc2' }} />
                    <label style={{ color: '#7b4f24', fontWeight: 600 }}>Phone</label>
                    <input name="phone" value={modalBooking.phone} onChange={handleModalChange} required style={{ width: '100%', marginBottom: 10, padding: '0.6rem', borderRadius: 7, border: '1px solid #e0cfc2' }} />
                    <label style={{ color: '#7b4f24', fontWeight: 600 }}>Room Type</label>
                    <select name="roomType" value={modalBooking.roomType} onChange={handleModalChange} required style={{ width: '100%', marginBottom: 10, padding: '0.6rem', borderRadius: 7, border: '1px solid #e0cfc2' }}>
                      {roomTypes.map(rt => <option key={rt} value={rt}>{rt}</option>)}
                    </select>
                    <label style={{ color: '#7b4f24', fontWeight: 600 }}>Arrival</label>
                    <input name="arrival" type="date" value={modalBooking.arrival} onChange={handleModalChange} required style={{ width: '100%', marginBottom: 10, padding: '0.6rem', borderRadius: 7, border: '1px solid #e0cfc2' }} />
                    <label style={{ color: '#7b4f24', fontWeight: 600 }}>Departure</label>
                    <input name="departure" type="date" value={modalBooking.departure} onChange={handleModalChange} required style={{ width: '100%', marginBottom: 10, padding: '0.6rem', borderRadius: 7, border: '1px solid #e0cfc2' }} />
                    <label style={{ color: '#7b4f24', fontWeight: 600 }}>Guests</label>
                    <input name="guests" type="number" min={1} max={6} value={modalBooking.guests} onChange={handleModalChange} required style={{ width: '100%', marginBottom: 10, padding: '0.6rem', borderRadius: 7, border: '1px solid #e0cfc2' }} />
                    <label style={{ color: '#7b4f24', fontWeight: 600 }}>Message</label>
                    <textarea name="message" value={modalBooking.message} onChange={handleModalChange} rows={2} style={{ width: '100%', marginBottom: 10, padding: '0.6rem', borderRadius: 7, border: '1px solid #e0cfc2', resize: 'vertical' }} />
                    <div style={modalBtnRow}>
                      <button style={actionBtn} type="submit">{modal.type === 'edit' ? 'Save' : 'Add'}</button>
                      <button style={actionBtn} type="button" onClick={() => setModal(null)}>Cancel</button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ maxWidth: 900, margin: '0 auto', marginTop: '2.5rem', background: 'none' }}>
          <h3 style={{ color: '#7b4f24', marginBottom: '1.5rem' }}>Contact Messages</h3>
          {loadingContacts ? (
            <div style={{ color: '#7b4f24', textAlign: 'center', margin: '2rem' }}>Loading messages...</div>
          ) : fetchContactsError ? (
            <div style={{ color: '#c62828', textAlign: 'center', margin: '2rem' }}>{fetchContactsError}</div>
          ) : contactMessages.length === 0 ? (
            <div style={{ color: '#7b4f24', textAlign: 'center', margin: '2rem' }}>No messages found.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Phone</th>
                    <th style={thStyle}>Type</th>
                    <th style={thStyle}>Specify</th>
                    <th style={thStyle}>Message</th>
                    <th style={thStyle}>Created At</th>
                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contactMessages.map((m) => (
                    <tr key={m._id}>
                      <td style={tdStyle}>{m.name}</td>
                      <td style={tdStyle}>{m.phone}</td>
                      <td style={tdStyle}>{m.messageType}</td>
                      <td style={tdStyle}>{m.messageType === 'Other' ? m.specify : ''}</td>
                      <td style={tdStyle}>{m.message}</td>
                      <td style={tdStyle}>{new Date(m.createdAt).toLocaleString()}</td>
                      <td style={tdStyle}>
                        <button style={iconBtnEdit} title="View" onClick={() => setContactModal({ type: 'view', message: m })}><FaEdit /></button>
                        <button style={iconBtnDelete} title="Delete" onClick={() => setContactModal({ type: 'delete', message: m })}><FaTrash /></button>
                        <a
                          href={`https://wa.me/${m.phone.replace(/^\+/, '')}?text=${encodeURIComponent('Hello, regarding your message to Rayee Hotel:')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={iconBtnWhatsapp}
                          title="Reply via WhatsApp"
                        >
                          <FaWhatsapp />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Contact Modals */}
          {contactModal && (
            <div style={modalOverlay}>
              <div style={modalBox}>
                {contactModal.type === 'view' && (
                  <>
                    <div style={modalTitle}>Contact Message</div>
                    <div style={{ marginBottom: '1rem' }}><b>Name:</b> {contactModal.message.name}</div>
                    <div style={{ marginBottom: '1rem' }}><b>Phone:</b> {contactModal.message.phone}</div>
                    <div style={{ marginBottom: '1rem' }}><b>Type:</b> {contactModal.message.messageType}</div>
                    {contactModal.message.messageType === 'Other' && <div style={{ marginBottom: '1rem' }}><b>Specify:</b> {contactModal.message.specify}</div>}
                    <div style={{ marginBottom: '1rem' }}><b>Message:</b> {contactModal.message.message}</div>
                    <div style={{ marginBottom: '1rem' }}><b>Created At:</b> {new Date(contactModal.message.createdAt).toLocaleString()}</div>
                    <div style={modalBtnRow}>
                      <button style={actionBtn} onClick={() => setContactModal(null)}>Close</button>
                    </div>
                  </>
                )}
                {contactModal.type === 'delete' && (
                  <>
                    <div style={modalTitle}>Delete Message?</div>
                    <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>Are you sure you want to delete this message from <b>{contactModal.message.name}</b>?</div>
                    <div style={modalBtnRow}>
                      <button style={iconBtnDelete} onClick={() => handleDeleteContact(contactModal.message._id)}>Delete</button>
                      <button style={actionBtn} onClick={() => setContactModal(null)}>Cancel</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Admin; 