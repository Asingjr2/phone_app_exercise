require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const validateToken = require('./helpers');
const router = express.Router();

const secretPhrase = process.env.SECRET_PHRASE;

/**
 * first page in app allowing user to signup with username and email
 * returns token for use with jwt routes
 */
router.post('', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = {
    Username: username,
    Email: email,
    Password: password
  };

  const token = jwt.sign({newUser}, secretPhrase)
  res.status(200).json({token: token})
});

module.exports = router;
