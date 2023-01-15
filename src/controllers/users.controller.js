const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/users.schema');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users });
  } catch (error) {
    res
      .status(500)
      .json({ error, message: 'Error getting users' });
  }
};

const createUser = async (req, res) => {
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
        res.json({ token });
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ error, message: 'Error creating new user' });
  }
};

const loginUser = async () => {
  const { email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res
        .status(400)
        .json({ message: 'Invalid credentials' });
    }

    const isPassCorrect = await bcrypt.compare(
      password,
      userExist.password
    );

    if (!isPassCorrect) {
      return res
        .status(400)
        .json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: userExist.id,
      },
    };

    if (email && isPassCorrect) {
      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        {
          expiresIn: 3600000,
        },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } else {
      res
        .status(401)
        .json({ message: 'Error creating token' });
    }
  } catch (error) {
    res
      .status(401)
      .json({ message: 'Error creating token' });
  }
};

module.exports = {
  getUsers,
  createUser,
  loginUser,
};
