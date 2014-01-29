module.exports = function(afterAllCb) {
  
  var calls = 0;

  return function next(cb) {
    calls++;

    return function thecallback(err) {
      process.nextTick(function() {
        cb.apply(null, arguments);
        if (--calls === 0) afterAllCb();
      });
    }
  }
};
