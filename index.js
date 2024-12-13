const express = require('express');
const dotenv = require('dotenv');
const path = require('path');  // For handling file paths
const userRoutes = require('./routes/userRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const favoriteCombinationRoutes = require('./routes/favoriteCombinationRoutes');
const orderRoutes = require('./routes/orderRoutes');
const couponRoutes = require('./routes/couponRoutes');
const partyRoutes = require('./routes/partyRoutes');
const cartRouter = require('./routes/cart');
const session = require('express-session');



const ejs = require('ejs');

dotenv.config();

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory (you can change this to the correct folder where your .ejs files are located)
app.set('views', path.join(__dirname, 'views'));

// Serve static files (if any, like images, styles, etc.)
app.use(express.static(path.join(__dirname, 'public')));  // Ensure 'public' folder exists

app.use(session({
    secret: 'Hu4mBhYHjdat-9dvJrVf72qhtSc0uEGEBFBZj06t_-rVParrDDx2xXLT8fzzcYADX9BSCm3PD1YDOKq_r6QCiw',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set `true` if using HTTPS
}));

// Middleware
app.use(express.json());  // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // For form data


app.use((req, res, next) => {
    res.locals.username = req.session.user ? req.session.user.username : null;
    next();
});
app.use((req, res, next) => {
    res.locals.userId = req.session.userId ? req.session.userId : null;
    next();
});
// Routes
app.use('/api/users', userRoutes);
app.use('/api', menuItemRoutes);
app.use('/api/favorite-combinations', favoriteCombinationRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/coupon', couponRoutes);
app.use('/api/party', partyRoutes);
app.use('/cart', cartRouter);


// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the User API');
});



// 404 Handler (for undefined routes)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ message: 'Internal server error' });
});





// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
