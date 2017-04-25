'use strict';

var expect = require('chai').expect;
var fonz = require('../index');

describe('fonz.js', function() {
  it('should not validate phone numbers of the wrong length (1)', function() {
    var result = fonz.validate('1');
    expect(result).to.equal(false);
  });
  it('should not validate phone numbers of the wrong length (7)', function() {
    var result = fonz.validate('1123213');
    expect(result).to.equal(false);
  });
  it('should not validate phone numbers of the wrong length (8)', function() {
    var result = fonz.validate('13332-+==-/-/123');
    expect(result).to.equal(false);
  });
  it('should validate phone numbers of the right length (9)', function() {
    var result = fonz.validate('7701234432');
    expect(result).to.equal(true);
  });
  it('should validate phone numbers of the right length (10)', function() {
    var result = fonz.validate('17701234432');
    expect(result).to.equal(true);
  });
  it('should validate correct phone numbers with funky characters', function() {
    var result = fonz.validate('+1 (770) 123-4432 oops//www.google.com');
    expect(result).to.equal(true);
  });
  it('should not validate phone numbers with bad area codes', function() {
    var result = fonz.validate('1-991-893-1233');
    expect(result).to.equal(false);
  });
  it('should not validate phone numbers with bad exchange codes', function() {
    var result = fonz.validate('310 911 4432');
    expect(result).to.equal(false);
  });
  it('should not validate fictitious phone numbers', function() {
    var result = fonz.validate('+ 1 949 555 0101');
    expect(result).to.equal(false);
  });
  it('should not validate directory assistance phone numbers', function() {
    var result = fonz.validate('(352) 555-1212');
    expect(result).to.equal(false);
  });
  it('should not validate national use phone numbers', function() {
    var result = fonz.validate('5345554334');
    expect(result).to.equal(false);
  });
  it('should validate phone numbers that are not strings', function() {
    var result = fonz.validate(17731345611);
    expect(result).to.equal(true);
  });
  it('should validate phone numbers that are weird objects', function() {
    var result = fonz.validate([Number(1), '-310', '442-', 9981, NaN]);
    expect(result).to.equal(true);
  });
});
