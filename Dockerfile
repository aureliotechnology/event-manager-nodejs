# Use uma imagem oficial do Node baseada no Alpine para uma imagem mais leve
FROM node:18-alpine

# Define o diretório de trabalho no container
WORKDIR /usr/src/app

# Copia os arquivos de dependências para aproveitar o cache do Docker
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Compila o código TypeScript para JavaScript
RUN npm run build

# Exponha a porta que a aplicação usa (ajuste se necessário)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
