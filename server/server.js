//server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./Routers/authRouters');

const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));

const port = process.env.PORT || 5006;


const allowedOrigins = ['http://localhost:3004', 'https://globaltechno-app.onrender.com','https://app.globaltechno.io'];

app.use(cors({
  origin(origin, callback) {
    console.log('origin:', origin);
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not '
                                    + 'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

/* app.use(cors({
    origin: 'https://emailcall.onrender.com',
    credentials: true,
})); */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', authRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
  });
