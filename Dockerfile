# Estágio 1: Construir o aplicativo
FROM node:14-alpine as builder

# Definir diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar arquivos de pacote e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o resto dos arquivos do aplicativo
COPY . .

# Construir o aplicativo para produção
RUN npm run build

# Estágio 2: Executar o aplicativo
FROM node:14-alpine

WORKDIR /usr/src/app

# Copiar dependências de produção
COPY --from=builder /usr/src/app/node_modules ./node_modules
# Copiar build de produção
COPY --from=builder /usr/src/app/dist ./dist

# Expor a porta em que o aplicativo será acessível
EXPOSE 80

# Comando para executar o aplicativo
CMD ["node", "dist/main"]
