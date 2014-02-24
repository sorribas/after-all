# after-all

[![build status](https://secure.travis-ci.org/sorribas/after-all.png)](http://travis-ci.org/sorribas/after-all)

Call several asynchronous functions and invoke a callback 'after all' of them are done.

## Installation

You can install it with npm.

```
npm install after-all
```

## Simple example

```js
var afterAll = require('after-all');
next = afterAll(done);

setTimeout(next(function() {
  console.log('Step two.');
}), 500);

setTimeout(next(function() {
  console.log('Step one.');
}), 100);

function done() {
  console.log("Yay we're done!");
}
```

## More complex example and sample use case

Imagine you have to create a dashboard page which has a list of customers
a list products, the total amount of sales and some more information.

Now, the queries to get this information are independent, yet we tend to wait for
one to be finished to start the next. We may be able to increase the performance
by starting some of this queries at the same time and waiting for the callbacks.

We can use after-all to do something like this.

```js

app.get('/dashboard.json', function(req, res) {
  var resp = {};
  var next = afterAll(function() {
    res.end(resp);
  });

  db.findCustomers(next(function(err, docs) {
    resp.customers = docs;
  }));

  db.findProducts(next(function(err, docs) {
    resp.products = docs;
  }));

  db.findTodaySalesAmount(next(function(err, amount) {
    resp.todaySales = amount;
  }));

  db.findLastMonthSalesAmount(next(function(err, amount) {
    resp.lastMonthSales = amount;
  }));
});
```
## License

MIT
