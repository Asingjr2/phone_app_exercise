const axios = require('axios');

const phoneApi = axios.create({
  baseURL: 'http://localhost:3000/phones'
});

module.exports = phoneApi;
