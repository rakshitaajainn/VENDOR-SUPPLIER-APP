// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const PORT = 3000;

// --- Database Connection ---
// Replace with your MongoDB connection string
const MONGO_URI = 'mongodb://localhost:27017/vendorApp'; 
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// --- Middleware ---
app.use(bodyParser.urlencoded({ extended: true })); // To parse form data
app.set('view engine', 'ejs'); // Set EJS as the template engine
app.use(express.static('public')); // Serve static files like CSS

// --- Session Management ---
// For user login persistence
app.use(session({
    secret: 'a_very_secret_key_for_sessions', // Change this!
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI })
}));

// --- Routes ---
// Import and use your route files
app.use('/', require('./routes/index'));
app.use('/products', require('./routes/products'));
// Add other routes here later (orders, etc.)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// In server.js
app.use(async (req, res, next) => {
  if (req.session.userId) {
    res.locals.user = await require('./models/user').findById(req.session.userId);
  } else {
    res.locals.user = null;
  }
  next();
});
