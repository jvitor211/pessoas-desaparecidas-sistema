# Usar uma imagem base do Node.js
FROM node:20-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json do projeto
COPY pessoas-desaparecidas-app/package*.json ./

# Instalar todas as dependências (incluindo devDependencies para build)
RUN npm ci

# Copiar o código fonte do projeto
COPY pessoas-desaparecidas-app/ .

# Build da aplicação
RUN npm run build

# Limpar dependências de desenvolvimento para reduzir tamanho
RUN npm prune --production

# Usar nginx para servir a aplicação
FROM nginx:alpine

# Remover configuração padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar os arquivos buildados
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração customizada do nginx
COPY pessoas-desaparecidas-app/nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta 80
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]
