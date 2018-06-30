const mongoose = require('mongoose');
const genres = require('./routes/genres');
const custommers = require('./routes/custommers')
const express = require('express');
const app = express();

const options = {
  user: 'root',
  pass: 'example',
  authSource: 'admin',
  // roles: [ "root" ],
  // dbName : "vidly"
};

mongoose.connect('mongodb://localhost:27017/vidly', options)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/custommers', custommers)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));