module.exports = function(afterAllCb) {
  
  var errorMessage ='"next" function called after the final callback.'+
    ' Make sure all the calls to "next" are on the same tick';
  var calls = 0;
  var done = false;

  process.nextTick(function() {
    if (calls === 0) {
      done = true;
      afterAllCb();
    }
  });

  return function next(cb) {
    if (done) throw new Error(errorMessage);
    calls++;

    return function thecallback() {
      var args = arguments;
      process.nextTick(function() {
        if (cb) cb.apply(null, args);
        if (--calls === 0) {
          done = true;
          afterAllCb();
        }
      });
    };
  };
};
