const jwt = require('jsonwebtoken');

/**
 * grabs access token information from header and for later validation with 
 * jwt.  Returns error if no token is present
 */
function validateToken(req, res, next) {
  const tokenHeader = req.headers.authorization;
  if (typeof tokenHeader !== 'undefined'){
    const bearer = tokenHeader.split('');
    const bearerToken = bearer[1];
    req.token = bearerToken;

    next();
  } else {
    res.status(403).json({
      error: 'no valid token found'
    });
  };
}

module.exports = validateToken;
