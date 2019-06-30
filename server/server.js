import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import tokenValidation from './middlewares/tokenValidation';
import user from './routes/user';


require('babel-core/register');
require('babel-polyfill');


function index(req, res) {
  res.json({
    success: true,
    message: 'Index page',
  });
}

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', user);

app.get('/', tokenValidation, index);
app.listen(port, () => console.log(`Server is listening on port: ${port}`));

mongoose.connect('mongodb://localhost:27017/voice-chats', { useNewUrlParser: true, useCreateIndex: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Mongoose connection established');
});
