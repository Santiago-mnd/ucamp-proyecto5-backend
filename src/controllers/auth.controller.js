const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/users.schema');

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
    { userId: newUser._id },
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
    { userId: user._id },
    process.env.SECRET_KEY,
    {
      expiresIn: '1h',
    }
  );

  res.json({
    accessToken,
  });
};

module.exports = {
  signup,
  login,
};
