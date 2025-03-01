.PHONY: install build start test
CONTAINER_NAME = event-manager-nodejs-app

install:
	npm install

tsoa:
	npm run tsoa:spec && npm run tsoa:routes

app-build:
	npm run build

start:
	npm start

test:
	npm run test

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

shell:
	docker exec -it event-manager-nodejs-app bash
