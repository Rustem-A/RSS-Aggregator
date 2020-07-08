deploy:
	cd dist/; surge --domain rss_aggregator.surge.sh

dev:
	webpack-dev-server --inline --hot

install:
	npm install

test:
	npm test

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

push:
	git push -u origin master