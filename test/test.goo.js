var assert = require('assert'),
  Goo = require('../dist/goo.js');

describe('Goo', function() {

  describe('Add', function() {

    var addGoo = new Goo(function add(numbers) {
      console.log(numbers);
      return numbers.reduce(function(sum, number) {
        return sum + number;
      }, 0);
    });

    it('should returns the sum of its arguments', function(done) {
      addGoo.do([1, 2, 3]).then(function(sum) {
        assert.equal(6, sum);
        done();
      });
    });

    it('should returns the sum of its arguments plus one', function(done) {
      addGoo.before(function(numbers) {
        numbers.push(1);
        return numbers;
      });

      addGoo.do([1, 2, 3]).then(function(sum) {
        assert.equal(7, sum);
        done();
      });
    });

    it('should returns the sum of its arguments plus one then multiply it by 2', function(done) {
      addGoo.before(function(numbers) {
        numbers.push(1);
        return numbers;
      });

      addGoo.after(function(sum) {
        return sum * 2;
      });

      addGoo.do([1, 2, 3]).then(function(sum) {
        assert.equal(14, sum);
        done();
      });
    });
  });
});
