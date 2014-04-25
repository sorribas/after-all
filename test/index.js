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

  it('should pass the arguments to the original callbacks', function(done) {
    var next = afterAll(function() {
      done();
    });

    (next(function(a) { a.should.eql(2)}))(2);
    (next(function(b) { b.should.eql('hi')}))('hi');
  });

  it('should work if the callback is not passed', function(done) {
    var next = afterAll(function() {
      done();
    });

    setTimeout(next(), 300);
  });

  it('should throw an error if the "next" function is called after the final callback is called', function(done) {
    var next = afterAll(function() {});
    next()();

    process.nextTick(function() {
      try {
        next();
      } catch(e) {
        done();
      }
    });
  });

  it('should call the callback if the "next" function is never called in the same tick', function(done) {
    var next = afterAll(done);
    process.nextTick(function() {});
  });

  it('should catch errors and pass it to the final callback', function(done) {
    var next = afterAll(function(err) {
      err.should.be.ok;
      done();
    });

    var n1 = next();
    var n2 = next();

    setTimeout(function() {
      n1(new Error('Some error'));
    }, 100);
    setTimeout(n2, 10000);

  });


  it('should only call the final callback once in the case of an error', function(done) {
    var count = 0;
    var next = afterAll(function() {
      (++count === 1).should.be.ok;
      done();
    });

    var n1 = next();
    var n2 = next();
    var n3 = next();

    n1();
    n2(new Error('Oops!'));
    n3(new Error('Oops!'));

  });

  it('should not require the final callback', function(done) {
    var next = afterAll();

    var n1 = next();
    var n2 = next();
    var n3 = next();

    n1();
    n2();
    n3();

    setTimeout(done, 250);

  });

});
