(function () {
	'use strict';
	var domain = require('domain');

	module.exports = function (handler) {
		return function (req, res, next) {
			var reqDomain = domain.create();

			reqDomain.on('error', function (err) {
				res.on('close', function () {
					reqDomain.dispose();
				});

				if (typeof handler === 'function') {
					handler(err, req, res, next);
				} else {
					next(err);
				}
			});

			reqDomain.enter();
			next();
		};
	};
}());
