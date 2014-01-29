var afterAll = require('../index');
require('should');

describe('after-all', function() {
  it('should call the callback "after all" the functions are done', function(done) {
    var a,b,c,d;
    var next = afterAll(function() {
      a.should.eql(2);
      b.should.eql(4);
      c.should.eql(6);
      d.should.eql(8);
      done();
    });

    setTimeout(next(function() {
      a = 2;
    }, 400));

    setTimeout(next(function() {
      b = 4;
    }, 100));

    setTimeout(next(function() {
      c = 6;
    }, 300));

    setTimeout(next(function() {
      d = 8;
    }, 200));
  });

  it('should work with non-asynchronous functions', function(done) {
    var a,b,c,d;
    var next = afterAll(function() {
      a.should.eql(2);
      b.should.eql(4);
      c.should.eql(6);
      d.should.eql(8);
      done();
    });

    (next(function() { a = 2; }))();

    setTimeout(next(function() {
      b = 4;
    }, 100));

    setTimeout(next(function() {
      c = 6;
    }, 300));

    setTimeout(next(function() {
      d = 8;
    }, 200));
  });
});
