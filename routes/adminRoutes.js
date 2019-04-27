require('dotenv').config();
const express = require('express');
const router = express.Router();
global.fetch = require('node-fetch');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const USERPOOL = process.env.USERPOOL;
const CLIENT_ID = process.env.CLIENT_ID;

const poolData = {
  UserPoolId: USERPOOL,
  ClientId: CLIENT_ID
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

router.post('/admin_signup', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword

  if (password !== confirmPassword) {
    return res.redirect('/?error=passwords');
  }

  const emailData = {
    Name: 'email',
    Value: email
  };

  const emailAttribute = new AmazonCognitoIdentity.CognitoUserAttribute(emailData);

  userPool.signUp(email, password, [emailAttribute], null, (err, data) => {
    if (err) {
      console.error('there was an error ', err);
      res.send(err)
    }
    // if successful return user information to the screen
    res.send(data.user)
  });
});

/**
 * leveraging aws services to compare submitted user
 * login information with existing users in the db
 */
router.post('/admin_login', (req, res) => {
  const loginInfo = {
    Username: req.body.email, 
    Password: req.body.password
  };

  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(loginInfo);

  const userInfo = {
    Username: req.body.email,
    Pool: userPool
  };
  // creating new user after querying the aws db
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userInfo);

  // confirming the submitted login information matces db or redirecting if not a match
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: data => {
      res.status(200).redirect('/admin/dashboard');
    }, 
    onFailure: err => {
      console.log('Could not login-in user', err)
      res.redirect('/admin/admin_signup')
    }
    });
  });

  // home page for adminstrators that could have higher level priviledges to manipulate data
  router.get('/dashboard', (req, res) => {
    res.status(200).send('You have successfully logged in as an administrator');
  });

  module.exports = router;
