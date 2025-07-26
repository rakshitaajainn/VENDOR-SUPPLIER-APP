require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const PORT = 3000;

// --- Database Connection ---
const MONGO_URI = process.env.MONGO_URI;
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
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI })
}));

// --- Routes ---
// Import and use your route files
app.use('/', require('./routes/index'));
app.use('/products', require('./routes/products'));
app.use('/order', require('./routes/order'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
