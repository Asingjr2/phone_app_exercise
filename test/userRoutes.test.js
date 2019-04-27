const app = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);

describe('testing all endpoints', () => {
  it('returns 200 for phone home page', () => {
    chai.request(app)
      .get('/users')
      .end(function(err, res) {
        expect(res).to.be.status(200);
      });
  });
})
