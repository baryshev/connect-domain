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
				if (handler && typeof handler === 'function') {
					handler(err, req, res);
				}
			});

			reqDomain.enter();
			next();
		};
	};
}());
