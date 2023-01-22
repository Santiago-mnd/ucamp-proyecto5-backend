const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/users.schema');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users });
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Error obteniendo usuarios',
    });
  }
};

const getSingleUser = async (req, res) => {
  const { email } = req.params;

  try {
    if (!email) {
      return res.status(400).json({
        message: 'El email no es válido o no existe.',
      });
    }

    const user = await User.findOne({
      email,
    });
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error, message: 'Error obteniendo usuario' });
  }
};

const getSingleUserById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({
        message: 'El id no es válido o no existe.',
      });
    }
    const user = await User.findById({ _id: id });
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error, message: 'Error obteniendo usuario' });
  }
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'Todos los campos son requeridos',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const payload = {
      user: {
        id: newUser._id,
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
        // res.json({
        //   newUser,
        //   token,
        // });
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ error, message: 'Error creando usuario' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({
        message: 'El email o password no son válidos',
      });
    }

    const isPassCorrect = await bcrypt.compare(
      password,
      userExist.password
    );

    if (!isPassCorrect) {
      return res.status(400).json({
        message: 'El email o password no son válidos ',
      });
    }

    const payload = {
      user: {
        id: userExist._id,
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
        .json({ message: 'Error creando Token' });
    }
  } catch (error) {
    res
      .status(401)
      .json({ message: 'Error creando Token' });
  }
};

module.exports = {
  getUsers,
  createUser,
  loginUser,
  getSingleUser,
  getSingleUserById,
};
