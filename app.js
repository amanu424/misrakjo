const express = require('express');
const dotenv = require('dotenv');
const flash = require('connect-flash');
const path = require('path');
const connectDB = require('./config/database');
const clientRoutes = require('./routes/clientRoute');
const authRoutes = require('./routes/authRoute');
const session = require('express-session');
const isAuthenticated = require('./middleware/authMiddlware.js'); // Import session middleware
const MemoryStore = require("memorystore")(session);
const MongoStore = require('connect-mongo');

dotenv.config();
connectDB();

const app = express();

// Set up session middleware
app.use(
  session({
    secret: process.env.S_SECRET,
    resave: true,
    cookie: { maxAge: 1000 * 60 * 60 * 48 },
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
   // store: new MemoryStore({ checkPeriod: 86400000 }),
  })
);
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