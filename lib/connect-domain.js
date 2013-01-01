(function () {
	'use strict';
	var domain = require('domain');

	module.exports = function () {
		return function domainMiddleware(req, res, next) {
			var reqDomain = domain.create();

			res.on('close', function () {
				reqDomain.dispose();
			});

			reqDomain.on('error', next);

			reqDomain.run(next);
		};
	};
}());
