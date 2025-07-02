const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (Atlas or local)
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error:', err);
});

// Booking schema
const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  arrival: String,
  departure: String,
  guests: Number,
  roomType: String,
  message: String,
  confirmed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
const Booking = mongoose.model('Booking', bookingSchema);

// Staff schema
const staffSchema = new mongoose.Schema({
  staffId: { type: String, unique: true },
  password: String,
});
const Staff = mongoose.model('Staff', staffSchema);

// Contact message schema
const contactMessageSchema = new mongoose.Schema({
  name: String,
  phone: String,
  messageType: String,
  specify: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});
const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

// Create initial admin if not exists
async function createInitialAdmin() {
  const existing = await Staff.findOne({ staffId: '09871234' });
  if (!existing) {
    const hash = await bcrypt.hash('2003@Lg$', 10);
    await Staff.create({ staffId: '09871234', password: hash });
    console.log('Initial admin created: 09871234 / 2003@Lg$');
  }
}
createInitialAdmin();

// Middleware to verify JWT for admin routes
function verifyAdminToken(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ success: false, message: 'No token provided' });
  const token = auth.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Invalid token format' });
  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) return res.status(401).json({ success: false, message: 'Invalid token' });
    req.staffId = decoded.staffId;
    next();
  });
}

// API endpoint to create a booking (admin only)
app.post('/api/bookings', verifyAdminToken, async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Edit booking (admin only)
app.put('/api/bookings/:id', verifyAdminToken, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete booking (admin only)
app.delete('/api/bookings/:id', verifyAdminToken, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Confirm booking (admin only)
app.patch('/api/bookings/:id/confirm', verifyAdminToken, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { confirmed: true }, { new: true });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin login endpoint
app.post('/api/admin/login', async (req, res) => {
  const { staffId, password } = req.body;
  const staff = await Staff.findOne({ staffId });
  if (!staff) return res.status(401).json({ success: false, message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, staff.password);
  if (!valid) return res.status(401).json({ success: false, message: 'Invalid credentials' });
  // Generate JWT
  const token = jwt.sign({ staffId: staff.staffId }, 'your_jwt_secret', { expiresIn: '2h' });
  res.json({ success: true, token });
});

// Get all bookings (admin only)
app.get('/api/bookings', verifyAdminToken, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Contact form endpoint (public)
app.post('/api/contact', async (req, res) => {
  try {
    const contact = new ContactMessage(req.body);
    await contact.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all contact messages (admin only)
app.get('/api/contact', verifyAdminToken, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete a contact message (admin only)
app.delete('/api/contact/:id', verifyAdminToken, async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Listen on the provided port (for Render/Heroku compatibility)
app.listen(process.env.PORT || 5000, () => console.log('Server running...'));
