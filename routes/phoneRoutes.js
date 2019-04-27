const express = require('express');
const validateToken = require('./helpers');
const phoneApi = require('../api/phoneApi');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('came to main phone page');
});

router.post('/create', validatePhoneData, async (req, res) => {
  const deviceType = req.body.deviceType
  const deviceModel = req.body.deviceModel
  const name = req.body.name

  const newPhone = {
    'deviceType': deviceType,
    'deviceModel': deviceModel,
    'name': name
  };

  phoneApi.post("/", newPhone);
});

// returns all phone date if token information is passed in header
router.get('/all_phones', validateToken, async (req, res) => {
  await phoneApi.get('/')
    .then(function(response){
      res.status(200).json({all_phones: response.data})
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
function validatePhoneData(req, res, next) {
  const deviceType = req.body.deviceType;
  const deviceModel = req.body.deviceModel;
  const name = req.body.name;
  const elements = [deviceType, deviceModel, name];
  let missingElements = 0;

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
    res.status(403).json({error: 'missing required phone data'})
  };
}

module.exports = router;
