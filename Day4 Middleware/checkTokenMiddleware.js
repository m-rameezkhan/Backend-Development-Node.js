// Middleware function to log request details
const checkToken = (req, res, next) => {
    if(req.query.token === '12345') {
        next(); // Token is valid, proceed to the next middleware/route handler
    } else {
        return res.send('Unauthorized: Invalid token');
    }
}

module.exports = checkToken;