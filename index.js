global.navigator = () => null;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const phoneRoutes = require('./routes/phoneRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/', authRoutes);
app.use('/phones', phoneRoutes);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes)

const PORT = process.env.PORT || 5000;

function runServer(port=PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App started on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Could not start server due to error: ', err);
    })
}

if (require.main === module) {
  runServer();
}

// exported for testing
module.exports = app;
