# Imagem base
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia o package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante da aplicação
COPY . .

# Compila se estiver usando TypeScript
RUN npm run build

# Exponha a porta (ajuste conforme necessário)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
