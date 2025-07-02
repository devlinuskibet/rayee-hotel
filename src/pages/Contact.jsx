import React, { useState } from 'react';

const phone = '+254 722413630';
const whatsapp = '254722413630'; // WhatsApp number without +
const email = 'linzskybes@gmail.com';
const address = 'Rayee Hotel, Bomet Town, Bomet County, Kenya';
const mapsEmbed = 'https://www.google.com/maps?q=Kenya+Power+Bomet+Office&output=embed';

const messageTypes = [
  'Room Inquiry',
  'Complaints',
  'Sales',
  'Job Inquiry',
  'Other',
];

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    messageType: messageTypes[0],
    specify: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <main style={{ maxWidth: '900px', margin: '2.5rem auto', padding: '0 1rem' }}>
      <h2 style={{ textAlign: 'center', color: '#3e2723', marginBottom: '2rem' }}>Contact Us</h2>
      <section style={{
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        padding: '2.5rem 2rem',
        marginBottom: '2.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2.5rem',
        justifyContent: 'space-between',
      }}>
        {/* Contact Info */}
        <div style={{ flex: '1 1 320px', minWidth: 280 }}>
          <div style={{ marginBottom: '1.2rem', fontSize: '1.08rem' }}>
            <strong>Phone:</strong> <a href={`tel:${phone}`} style={{ color: '#3e2723' }}>{phone}</a>
          </div>
          <div style={{ marginBottom: '1.2rem', fontSize: '1.08rem' }}>
            <strong>WhatsApp:</strong> <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: 600 }}>Chat on WhatsApp</a>
          </div>
          <div style={{ marginBottom: '1.2rem', fontSize: '1.08rem' }}>
            <strong>Email:</strong> <a href={`mailto:${email}`} style={{ color: '#3e2723' }}>{email}</a>
          </div>
          <div style={{ marginBottom: '1.2rem', fontSize: '1.08rem' }}>
            <strong>Address:</strong> <span>{address}</span>
          </div>
          <div style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', marginTop: '1.2rem' }}>
            <iframe
              src={mapsEmbed}
              width="100%"
              height="180"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
          </div>
        </div>
        {/* Contact Form */}
        <div style={{ flex: '1 1 320px', minWidth: 280 }}>
          {submitted ? (
            <div style={{ color: '#388e3c', fontWeight: 600, fontSize: '1.1rem', margin: '2rem 0', textAlign: 'center' }}>
              Thank you for reaching out! We will get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '1rem' }}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '1rem' }}
              />
              <select
                name="messageType"
                value={form.messageType}
                onChange={handleChange}
                required
                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '1rem' }}
              >
                {messageTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {form.messageType === 'Other' && (
                <input
                  type="text"
                  name="specify"
                  placeholder="Please specify down below"
                  value={form.specify}
                  onChange={handleChange}
                  required
                  style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '1rem' }}
                />
              )}
              <textarea
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                rows={3}
                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '1rem', resize: 'vertical' }}
              />
              {error && <div style={{ color: '#c62828', textAlign: 'center', fontWeight: 600 }}>{error}</div>}
              <button
                type="submit"
                style={{
                  background: '#3e2723',
                  color: '#fff',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  marginTop: '0.5rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Contact; 