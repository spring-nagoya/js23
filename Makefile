FILEPATH=task/js23

build:
	docker-compose build

up: build
	docker-compose up -d

down:
	docker-compose down

npmi:
	cd ${FILEPATH} && npm install

run: npmi
	node ${FILEPATH}/app.js

.PHONY: rundb down