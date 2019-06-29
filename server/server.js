import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import config from './config';
import checkToken from './middleware';
import User from './models/user';

class HandlerGenerator {
  auth(req, res) {
    const { username, password } = req.body;
    // For the given username fetch user from DB
    const mockedUsername = 'admin';
    const mockedPassword = 'password';
    console.log(username, password);
    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
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

  index(req, res) {
    res.json({
      success: true,
      message: 'Index page',
    });
  }
}

function main() {
  const app = express();
  const handlers = new HandlerGenerator();
  const port = process.env.PORT || 8000;
  app.use(cors());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());

  app.post('/auth', handlers.auth);
  app.get('/', checkToken, handlers.index);
  app.listen(port, () => console.log(`Server is listening on port: ${port}`));

  mongoose.connect('mongodb://localhost:27017/voice-chats', { useNewUrlParser: true });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Mongoose connection established');
  });
}

main();
