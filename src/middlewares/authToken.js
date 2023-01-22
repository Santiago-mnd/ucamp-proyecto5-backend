const jwt = require('jsonwebtoken');
require('dotenv').config();

const authToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({
      errors: [
        {
          message: 'Access denied',
        },
      ],
    });
  }

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user.email;
    next();
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          message: 'Invalid token',
        },
      ],
    });
  }
};

module.exports = { authToken };
