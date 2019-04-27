const express = require('express');
const validateToken = require('./helpers');
const userApi = require('../api/userApi');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('came to main user page');
});

router.post('/create', validateUserData, async (req, res) => {
  const username = req.body.username
  const fullName = req.body.fullName
  const phone = req.body.phone
  const devices = req.body.devices

  const newUser = {
    'username': username,
    'fullName': fullName,
    'phone': phone,
    'devices': devices
  };

  userApi.post("/", newUser)
});

// returns all users if token information is passed in header
router.get('/all_users', validateToken, async (req, res) => {
  users = await userApi.get('/')
    .then(function(response){
      res.status(200).json({all_users: response.data})
    })
    .catch(function (error) {
      res.status(500).json({'error': error});
    });
});

function checkElement(dataElement) {
  if (typeof dataElement === 'undefined'){
    console.log('missing item')
    return false;
  };
}

/** 
 * checks param types against required phone db elements
 */
function validateUserData(req, res, next) {
  const username = req.body.username;
  const fullName = req.body.fullName;
  const phone = req.body.phone;
  const devices = req.body.devices;
  const elements = [username, fullName, phone, devices];
  let missingElements = 0;

  console.log(elements)
  
  for (i in elements) {
      let validElement = checkElement(elements[i]);
      if (validElement === false) {
        missingElements++;
      };
  }
  console.log(missingElements);
  if (missingElements === 0) {
    next(); 
  } else {
    res.status(403).json({error: 'missing required user data'})
  };
}

module.exports = router;
