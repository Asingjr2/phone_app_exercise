const axios = require('axios');

const userApi = axios.create({
  baseURL: 'http://localhost:3000/users'
});

module.exports = userApi;
