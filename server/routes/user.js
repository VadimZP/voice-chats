import express from 'express';
import jwt from 'jsonwebtoken';

import config from '../config';

import User from '../models/user';
import ApiError from '../utils/ErrorHandler';
import auth from '../middlewares/auth';

const router = express.Router();

async function login(req, res) {
  try {
    const { username, password } = await User.findOne({ username: req.body.username, password: req.body.password });
    if (username && password) {
      const token = jwt.sign({ username }, config.secret, { expiresIn: '24h' });
      res.json({
        status: 200,
        message: 'Authentication successful!',
        token,
        username,
        password,
      });
    }
  } catch (error) {
    res.sendStatus(403).json({
      message: 'Incorrect username or password',
    });
  }
}


async function signup(req, res) {
  try {
    const { username } = await User.findOne({ username: req.body.username });
    if (username) {
      res.sendStatus(409).json({
        message: 'User is already registered',
      });
    }
  } catch (error) {
    // if (error.statusCode === 409) {
    //   res.json({
    //     status: 409,
    //     success: false,
    //     message: 'User is already registered',
    //   });
    //   throw new ApiError(`${error.message}: ${error.statusCode}`);
    // }
    throw Error('Something went wrong in register');
  }


  try {
    const data = await new User(req.body).save();
    res.json({
      data,
      status: 201,
      message: 'User is successfully registered',
    });
  } catch (error) {
    res.json({
      status: 401,
      message: 'User is not registered',
    });
    throw Error(`Register error: ${error}`);
  }
}

router.post('/login', login);
router.post('/signup', signup);

export default router;
