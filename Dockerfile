# Use uma imagem do Composer como estágio de build para instalar dependências
FROM composer:latest as composer

# Usa a imagem do PHP com Apache
FROM php:8.2-apache

# Atualiza os pacotes e instala as dependências necessárias
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    git \
    libonig-dev \
    libsodium-dev \
    libgrpc-dev \
    autoconf \
    g++ \
    make \
    zlib1g-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install \
    pdo_mysql \
    zip \
    sodium

# Instala a extensão gRPC
RUN pecl install grpc \
    && docker-php-ext-enable grpc

# Habilita o mod_rewrite para o Apache
RUN a2enmod rewrite

# Copia o Composer para a imagem
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Define o diretório de trabalho
WORKDIR /var/www/html

# Copia os arquivos da aplicação para o diretório de trabalho
COPY . /var/www/html

# Instala as dependências do projeto, ajusta permissões
RUN composer install --no-dev --optimize-autoloader \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Configura o nome do servidor e ajusta o DocumentRoot
RUN echo 'ServerName localhost' >> /etc/apache2/apache2.conf \
    && sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Expõe a porta 80
EXPOSE 80

# Define o comando padrão para executar quando o container iniciar
CMD ["apache2-foreground"]
