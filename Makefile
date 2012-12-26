TESTS = test/*.test.js
REPORTER = spec
TIMEOUT = 1000
JSCOVERAGE = ./node_modules/jscover/bin/jscover

install:
	@npm install

test: install
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(TESTS)

test-cov: lib-cov
	@CONNECT_DOMAIN_COV=1 $(MAKE) test
	@CONNECT_DOMAIN_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov: install
	@rm -rf $@
	@$(JSCOVERAGE) lib $@

.PHONY: test-cov test lib-cov
