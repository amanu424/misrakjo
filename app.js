const express = require('express');
const dotenv = require('dotenv');
const flash = require('connect-flash');
const path = require('path');
const connectDB = require('./config/database');
const clientRoutes = require('./routes/clientRoute');
const authRoutes = require('./routes/authRoute');
const session = require('express-session');
const isAuthenticated = require('./middleware/authMiddlware.js'); // Import session middleware

dotenv.config();
connectDB();

const app = express();

app.use(session({
    secret: process.env.S_SECRET, // Replace with a strong secret
    resave: false,
    saveUninitialized: true
}));
// Set up session middleware
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true
}));

// Set up flash middleware
app.use(flash());

// Middleware to expose flash messages to all views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', clientRoutes);
app.use('/auth', authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});