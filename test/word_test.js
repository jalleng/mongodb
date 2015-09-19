'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/words_test';
require(__dirname + '/../server.js');
var mongoose = require('mongoose');
var url = 'localhost:3000/api';
var Word = require(__dirname + '/../models/word');
var User = require(__dirname + '/../models/user');
var eatauth = require(__dirname + '/../lib/eat_auth');
var EE = require('events').EventEmitter;
var routeEvents = new EE();


describe('the words resource', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) throw err;
      done();
    });
  });

  before(function(done) {
    var user = new User();
    user.username = 'test';
    user.basic.username = 'test';
    user.generateHash('foobarbaz', function(err, res) {
      if (err) throw err;
      user.save(function(err, res) {
        if (err) throw err;
        user.generateToken(function(err, token) {
          if (err) throw err;
          this.token = token;
          done();
        }.bind(this));
      }.bind(this));
    }.bind(this));
  });

  it('should be able to get words', function(done) {
    chai.request(url)
      .get('/words')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should be able to create a word', function(done) {
    chai.request(url)
      .post('/words')
      .send({wordBody: 'test word', token: this.token})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.wordBody).to.eql('test word');
        expect(res.body.author).to.eql('test');
        done();
      });
  });

  it('should post a new language to the language collection', function(done) {
    chai.request(url)
      .post('/languages')
      .send({languageBody: 'Spanish', token: this.token})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.languageBody).to.eql('Spanish');
        expect(res.body.author).to.eql('test');
        done();
      });
  });

  it('should check for language validation', function(done) {
    var myWord = new Word({ language: 'jibberjabber'});
    myWord.save(function (err) {
      expect(err.errors.language.value).to.eql('jibberjabber');
      done();
    });
  });

  describe('routes that need a word in the database', function() {
    beforeEach(function(done) {
      var testWord = new Word({wordBody: 'test', token: this.token});
      testWord.save(function(err, data) {
        if (err) throw err;
        this.testWord = data;
        done();
      }.bind(this));
    });

    it('should be able to update a word', function(done) {
      chai.request(url)
        .put('/words/' + this.testWord._id)
        .send({wordBody: 'new wordBody', token: this.token})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should be able to delete a word', function(done) {
      chai.request(url)
        .delete('/words/' + this.testWord._id)
        .set('token', this.token)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });
  });
});
