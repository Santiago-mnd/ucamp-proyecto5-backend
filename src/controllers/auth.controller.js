const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/users.schema');
const Token = require('../models/tokens.schema');

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  // validate user
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Validate if user already exists

  const user = await User.findOne({
    email,
  });

  if (user) {
    return res.status(400).json({
      message: 'User already exists',
    });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const newUser = User.create({
    username,
    email,
    password: hashedPassword,
  });

  // Create and assign a token
  const accessToken = await JWT.sign(
    { userId: newUser.email },
    process.env.SECRET_KEY,
    {
      expiresIn: '1h',
    }
  );

  res.json({
    accessToken,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate user
  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      errors: [
        {
          message: 'Invalid credentials',
        },
      ],
    });
  }

  // Validate password
  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    return res.status(400).json({
      errors: [
        {
          message: 'Email or password is invalid.',
        },
      ],
    });
  }

  // send token
  const accessToken = await JWT.sign(
    { userId: user.email },
    process.env.SECRET_KEY,
    {
      expiresIn: '1h',
    }
  );

  const refreshToken = await JWT.sign(
    { userId: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d',
    }
  );

  const { token } = await Token.create({
    token: refreshToken,
  });

  if (!token) {
    return res.status(400).json({
      message: 'Something went wrong',
    });
  }

  res.json({
    accessToken,
    refreshToken: token,
  });
};

const logWithToken = async (req, res) => {
  const refreshToken = req.header('x-auth-token');

  if (!refreshToken) {
    return res.status(401).json({
      errors: [
        {
          message: 'Token not found',
        },
      ],
    });
  }

  const foundToken = await Token.findOne({
    token: refreshToken,
  });

  if (!foundToken) {
    return res.status(403).json({
      errors: [
        {
          message: 'Invalid refresh token',
        },
      ],
    });
  }

  try {
    const user = await JWT.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // example = {email: 'example@mail.com', iat: 123456, exp: 1234567}
    const { email } = user;
    const accessToken = await JWT.sign(
      { email },
      process.env.SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );

    res.json({
      accessToken,
    });
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          message: 'Invalid refresh token',
        },
      ],
    });
  }
};

const logout = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      errors: [
        {
          message: 'Token not found',
        },
      ],
    });
  }

  const foundToken = await Token.findOne({
    token: refreshToken,
  });

  if (!foundToken) {
    return res.status(403).json({
      errors: [
        {
          message: 'Invalid refresh token',
        },
      ],
    });
  }

  try {
    const user = await JWT.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const { email } = user;

    const deleted = await Token.deleteOne({
      token: refreshToken,
    });

    if (!deleted) {
      return res.status(400).json({
        message: 'Something went wrong',
      });
    }

    res.json({
      message: 'User logged out',
    });
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          message: 'Invalid refresh token',
        },
      ],
    });
  }
};

module.exports = {
  signup,
  login,
  logWithToken,
  logout,
};
