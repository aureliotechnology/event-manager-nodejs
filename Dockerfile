# Usando a imagem base do Node.js 18 (LTS) em sua variante alpine para uma imagem mais enxuta
FROM node:18-alpine

# Define o diretório de trabalho na imagem
WORKDIR /app

# Copia os arquivos de dependências e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o restante dos arquivos da aplicação para dentro do container
COPY . .

# Compila a aplicação (assumindo que você tenha um script "build" no package.json)
RUN npm run build

# Expõe a porta na qual a aplicação irá rodar (por padrão, 3000)
EXPOSE 3000

# Inicia a aplicação
CMD ["npm", "run", "start"]

