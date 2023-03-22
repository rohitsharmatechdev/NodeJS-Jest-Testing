const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.token;
    jwt.verify(token, "secret", (err, user) => {
        if(err){
            return res.status(403).send("Unauthorised");
        }
        req.user = user;
        next();
    })
}