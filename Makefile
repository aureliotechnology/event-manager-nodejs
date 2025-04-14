.PHONY: install start test build lint docker-build docker-up docker-down docker-restart docker-test

# Instala as dependências do projeto
install:
	npm install

# Inicia a aplicação em modo de desenvolvimento
start:
	npm run start:dev

# Executa os testes
test:
	npm run test

# Realiza o build da aplicação
build:
	npm run build

# Executa o lint (se configurado)
lint:
	npm run lint

# Constrói as imagens definidas no docker-compose.yml
docker-build:
	docker-compose build

# Sobe os containers em modo detach (em background)
up:
	docker-compose up --build -d

# Para e remove os containers
down:
	docker-compose down

# Reinicia os containers: para e depois sobe novamente
docker-restart: down up

# Executa os testes dentro do container Docker
docker-test:
	docker exec -it event-manager-nodejs-app-1 npm test
