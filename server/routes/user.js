import express from 'express';
import jwt from 'jsonwebtoken';

import config from '../config';

import User from '../models/user';
import ApiError from '../utils/ErrorHandler';

const router = express.Router();

async function auth(req, res) {
  const { username, password } = await User.find({ username: req.body.username });
  if (req.body.username && req.body.password) {
    if (req.body.username === username && req.body.password === password) {
      const token = jwt.sign({ username }, config.secret, { expiresIn: '24h' });

      res.json({
        success: true,
        message: 'Authentication successful!',
        token,
      });
    } else {
      res.sendStatus(403).json({
        success: false,
        message: 'Incorrect username or password',
      });
    }
  } else {
    res.sendStatus(400).json({
      success: false,
      message: 'Authentication failed! Please check the request',
    });
  }
}

async function signup(req, res) {
  try {
    const data = await User.findOne({ username: req.body.username });
    if (data !== null) {
      throw new ApiError('User is already registered', 409);
    }
  } catch (error) {
    if (error.statusCode === 409) {
      res.json({
        status: 409,
        success: false,
        message: 'User is already registered',
      });
      throw new ApiError(`${error.message}: ${error.statusCode}`);
    }
    throw Error('Something went wrong in register');
  }


  try {
    const data = await new User(req.body).save();
    res.sendStatus(201).json({
      data,
      success: true,
      message: 'User is successfully registered',
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'User is not registered',
    });
    throw Error(`Register error: ${error}`);
  }
}

router.post('/auth', auth);
router.post('/signup', signup);

module.exports = router;
