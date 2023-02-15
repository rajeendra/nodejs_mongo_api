require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');

const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const credentials = require('./middleware/credentials');
const verifyJWT = require('./middleware/verifyJWT');

const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// Middleware stack

// 1. custom middleware logger
app.use(logger);

// 2. Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// 3. Cross Origin Resource Sharing
app.use(cors(corsOptions));

// 4. built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// 5. built-in middleware for json 
app.use(express.json());

// 6. middleware for cookies
app.use(cookieParser());

// 7. serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// 8. routes
app.use('/', require('./routes/root'));
//  below code is similler as above
// app.get('^/$|/index(.html)?', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

// This route just to test and it's not bound to .. 
// ..any authentication, authorization or any database connection
// Ex: testapi/, /testapi/todos, testapi/todos/:id,
app.use('/testapi', require('./routes/test'));

// Ex: register/, /register/subreg, register/*,
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));
app.use('/users', require('./routes/api/users'));
app.use('/contacts', require('./routes/api/contacts'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

// 9.
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB ');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})