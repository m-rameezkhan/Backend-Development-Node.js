const express = require('express');
const checkToken = require('./checkTokenMiddleware');
require('dotenv').config();

const app = express();

console.log('Token from .env file:', process.env.myToken);

// Middleware function to log request details
// const checkToken = (req, res, next) => {
//     if(req.query.token === '12345') {
//         next(); // Token is valid, proceed to the next middleware/route handler
//     } else {
//         return res.send('Unauthorized: Invalid token');
//     }
// }

// app.use(checkToken); // Apply the middleware to all routes

// app.use((req, res, next) => {
//     if (req.query.password === 'secret') {
//         next(); // Password is valid, proceed to the next middleware/route handler
//     } else {
//         return res.send('Forbidden: Invalid password');
//     }
// })

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/about', checkToken, (req, res) => {
    res.send('About Us');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})