.PHONY: docker-build docker-up docker-down docker-shell

# Constrói a imagem usando o docker-compose
build:
	docker-compose build

# Levanta os containers em modo detach
up:
	docker-compose up -d

# Para e remove os containers
down:
	docker-compose down

# Abre um shell no container da aplicação
shell:
	docker exec -it event-manager-nodejs-app sh
