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

describe('the words resource', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) throw err;
      done();
    });
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
      .send({wordBody: 'test word'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.wordBody).to.eql('test word');
        expect(res.body.language).to.eql('English');
        done();
      });
  });

  it('should post a new language to the language collection', function(done) {
    chai.request(url)
      .post('/languages')
      .send({languageBody: 'Spanish', languageRoot: 'latin'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.languageBody).to.eql('Spanish');
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
      var testWord = new Word({wordBody: 'test'});
      testWord.save(function(err, data) {
        if (err) throw err;
        this.testWord = data;
        done();
      }.bind(this));
    });

    it('should be able to update a word', function(done) {
      chai.request(url)
        .put('/words/' + this.testWord._id)
        .send({wordBody: 'new wordBody'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should be able to delete a word', function(done) {
      chai.request(url)
        .delete('/words/' + this.testWord._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });
  });
});
