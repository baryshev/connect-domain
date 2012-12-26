(function () {
	'use strict';
	var domain = require('domain');

	module.exports = function (handler) {
		return function domainMiddleware(req, res, next) {
			var reqDomain = domain.create();

			res.on('close', function () {
				reqDomain.dispose();
			});

			reqDomain.on('error', function (err) {
				if (typeof handler === 'function') {
					handler(err, req, res, next);
				} else {
					next(err);
				}
			});

			reqDomain.run(next);
		};
	};
}());
