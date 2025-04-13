.PHONY: lint test build run

lint:
	yarn lint

test:
	yarn test:unit:ci

build:
	yarn build

run:
	yarn dev
