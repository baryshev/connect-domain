# About 

Asynchronous error handler for Connect

# Installation

	npm install connect-domain

# Usage

## Passing asynchronous errors to default connect error handler

```js
var
	connect = require('connect'),
	connectDomain = require('connect-domain');

var app = connect()
	.use(connectDomain())
	.use(function(req, res){
		if (Math.random() > 0.5) {
			throw new Error('Simple error');
		}
		setTimeout(function() {
			if (Math.random() > 0.5) {
				throw new Error('Asynchronous error from timeout');
			} else {
				res.end('Hello from Connect!');
			}
		}, 1000);
	})
	.use(function(err, req, res, next) {
		res.end(err.message);
	});

app.listen(3000);
```

## Custom error handler

```js
var
	connect = require('connect'),
	connectDomain = require('connect-domain');

var app = connect()
	.use(connectDomain(function(err, req, res) {
		res.end(err.message);
	}))
	.use(function(req, res){
		setTimeout(function() {
			if (Math.random() > 0.5) {
				throw new Error('Error from timeout');
			} else {
				res.end('Hello from Connect!');
			}
		}, 1000);
	});

app.listen(3000);
```