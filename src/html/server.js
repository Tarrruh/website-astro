const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect('mongodb://localhost:27017/astronomyClubDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'member' }
});

const User = mongoose.model('User', UserSchema);




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }  // HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());


// --- Passport Configuration ---

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});




app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Login Form Submission (POST)
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}));

// Home Page (Protected Route)
app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.sendFile(path.join(__dirname, 'index.html'));
    } else {
        res.redirect('/login');
    }
});

// Logout
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});

// --- Admin Page (Protected Route) ---

// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    }
    // Redirect to home or a "not authorized" page
    res.redirect('/'); // Or res.status(403).send('Forbidden');
}


app.get('/admin', isAdmin, (req, res) => {
     res.sendFile(path.join(__dirname, 'admin.html'));

});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



async function createUser(username, password, role = 'member') { // Default role is 'member'
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
            password: hashedPassword,
            role: role,  // Set the role
        });
        await newUser.save();
        console.log('User created successfully');
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === 11000) {
           console.error("Username already exists");
        }
    }
}