module.exports = function(afterAllCb) {
  
  var calls = 0;

  return function next(cb) {
    calls++;

    return function thecallback() {
      var args = arguments;
      process.nextTick(function() {
        if (cb) cb.apply(null, args);
        if (--calls === 0) afterAllCb();
      });
    }
  }
};
