const express = require('express');
const router = express.Router();
const User = require('../models/users.schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users });
  } catch (error) {
    res
      .status(500)
      .json({ error, message: 'Error getting users' });
  }
});

router.post('/create-user', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: 'All fields are required' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const payload = {
      user: {
        id: newUser.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: 360000,
      },
      (error, token) => {
        if (error) throw error;
        // res.json(newUser);
        res.json({ token });
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ error, message: 'Error creating new user' });
  }
});
