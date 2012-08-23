[![build status](https://secure.travis-ci.org/baryshev/connect-domain.png)](http://travis-ci.org/baryshev/connect-domain)
# About 

Asynchronous error handler for Connect

# Installation

	npm install connect-domain

# Usage

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