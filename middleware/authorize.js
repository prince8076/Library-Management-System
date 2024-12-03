const jwt = require('jsonwebtoken');

const JWT_SECRET = 'prince@1234';

const authorize = roles => (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(403).send('Authorization required');
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid token');
        if (!roles.includes(user.role)) return res.status(403).send('Access denied');
        req.user = user;
        next();
    });
};

module.exports = authorize;
