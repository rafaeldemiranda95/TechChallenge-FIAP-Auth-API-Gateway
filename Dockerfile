# FROM composer:latest as composer

# FROM php:8.2-apache

# RUN apt-get update && apt-get install -y \
#     libzip-dev \
#     zip \
#     git \
#     libonig-dev \
#     libsodium-dev \
#     libgrpc-dev \
#     autoconf \
#     g++ \
#     make \
#     && apt-get clean && rm -rf /var/lib/apt/lists/* \
#     && docker-php-ext-install \
#     pdo_mysql \
#     zip \
#     sodium

# RUN pecl install grpc \
#     && docker-php-ext-enable grpc

# RUN a2enmod rewrite

# COPY --from=composer /usr/bin/composer /usr/bin/composer

# WORKDIR /var/www/html

# COPY . /var/www/html

# RUN composer install --no-dev --optimize-autoloader && \
#     chown -R www-data:www-data /var/www/html && \
#     chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# RUN echo 'ServerName localhost' >> /etc/apache2/apache2.conf
# RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# EXPOSE 80

# CMD ["apache2-foreground"]


FROM composer:latest as composer

FROM php:8.2-apache

# Atualiza os pacotes e instala as dependências necessárias, excluindo php-dev e php-pear
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    git \
    libonig-dev \
    libsodium-dev \
    libssl-dev \
    autoconf \
    zlib1g-dev \
    g++ \
    libgrpc-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* 

# Instalação e ativação das extensões PHP
RUN docker-php-ext-install pdo_mysql zip sodium

# Instalação e ativação da extensão gRPC
RUN pecl install grpc \
    && docker-php-ext-enable grpc

# Instalação e ativação da extensão Protobuf
RUN pecl install protobuf \
    && docker-php-ext-enable protobuf

RUN a2enmod rewrite

COPY --from=composer /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . /var/www/html

# Instala as dependências do projeto via Composer, ajusta permissões
RUN composer install --no-dev --optimize-autoloader \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Configura o nome do servidor e ajusta o DocumentRoot
RUN echo 'ServerName localhost' >> /etc/apache2/apache2.conf \
    && sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

EXPOSE 80

CMD ["apache2-foreground"]
