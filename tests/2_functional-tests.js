const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = process.env.SERVER;

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  // test # 1
  test('Translation with text and locale fields: POST request to /api/translate', function(done) {
    var text = 'Mangoes are my favorite fruit';
    var expectedResult = {
      text: text,
      translation: 'Mangoes are my <span class=\"highlight\">favourite</span> fruit'
    }
    chai
      .request(server)
      .post('/api/translate')
      .send({
        locale: 'american-to-british',
        text: text
      }).end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.deepEqual(res.body, expectedResult);
        done();
      });
  });
  // test # 2
  test('Translation with text and invalid locale field: POST request to /api/translate', function(done) {
    var text = 'Mangoes are my favorite fruit';
    var expectedResult = {
      error: 'Invalid value for locale field'
    }
    chai
      .request(server)
      .post('/api/translate')
      .send({
        locale: 'this-is-an-invalid-locale',
        text: text
      }).end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.deepEqual(res.body, expectedResult);
        done();
      });
  });
  // test # 3
  test('Translation with missing text field: POST request to /api/translate', function(done) {
    var expectedResult = {
      error: 'Required field(s) missing'
    }
    chai
      .request(server)
      .post('/api/translate')
      .send({
        locale: 'american-to-british'
      }).end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.deepEqual(res.body, expectedResult);
        done();
      });
  });
  // test # 4
  test('Translation with missing locale field: POST request to /api/translate', function(done){
    var text = 'This is my text';
    var expectedResult = {
      error: 'Required field(s) missing'
    }
    chai
      .request(server)
      .post('/api/translate')
      .send({
        text: text
      }).end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.deepEqual(res.body, expectedResult);
        done();
      });
  });
  // test # 5
  test('Translation with empty text: POST request to /api/translate', function(done){
    var text = '';
    var expectedResult = {
      error: 'No text to translate'
    }
    chai
      .request(server)
      .post('/api/translate')
      .send({
        locale: 'american-to-british',
        text: text
      }).end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.deepEqual(res.body, expectedResult);
        done();
      });
  });
  // test # 6
  test('Translation with text that needs no translation: POST request to /api/translate', function(done){
    var text = 'This text requires no translation';
    var expectedResult = {
      text: text,
      translation: 'Everything looks good to me!'
    }
    chai
      .request(server)
      .post('/api/translate')
      .send({
        locale: 'american-to-british',
        text: text
      }).end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.deepEqual(res.body, expectedResult);
        done();
      });
  });
});
