FROM node:lts AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS runtime
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

# Копирование SSL сертификата и закрытого ключа
COPY ./nginx/ssl/certificate.crt /etc/nginx/ssl/
COPY ./nginx/ssl/private.key /etc/nginx/ssl/

# Указание на использование SSL в конфигурации Nginx
# RUN sed -i '/listen 80;/a listen 443 ssl;' /etc/nginx/nginx.conf
# RUN sed -i '/listen 443 ssl;/a ssl_certificate /etc/nginx/ssl/certificate.crt;' /etc/nginx/nginx.conf
# RUN sed -i '/ssl_certificate/a ssl_certificate_key /etc/nginx/ssl/private.key;' /etc/nginx/nginx.conf

EXPOSE 443