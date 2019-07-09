import express from 'express';
import jwt from 'jsonwebtoken';


import config from '../config';

import User from '../models/user';

const { body, check, validationResult } = require('express-validator');


const router = express.Router();

async function login(req, res) {
  try {
    const { username, password } = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (username && password) {
      const token = jwt.sign({ username }, config.secret, { expiresIn: '24h' });
      res.json({
        status: 200,
        message: 'Authentication successful!',
        token,
        username,
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
    const {
      username, email, password,
    } = req.body;

    const data = await User.findOne({
      username,
    });

    console.log('DATA:', data);

    if (data) {
      res.sendStatus(409).json({
        message: 'This email is already registered',
      });
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.sendStatus(422).json({ errors: errors.array() });
      return;
    }

    const user = await User.save({
      username,
      email,
      password,
    });

    res.json(user);
  } catch (err) {
    res.sendStatus(500).json({
      message: 'Something went wrong in signup',
    });
  }
}

router.post('/login', login);
router.post('/signup', [
  check('username')
    .exists()
    .trim(),
  check('email')
    .isEmail()
    .normalizeEmail(),
  check('password')
    .isLength({ min: 6 }),
], signup);

export default router;
