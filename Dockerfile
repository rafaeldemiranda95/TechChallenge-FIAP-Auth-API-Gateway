# Usando a imagem do PHP 8.2 com Apache como base
FROM php:8.2-apache

# Instalando pacotes necessários, incluindo ferramentas para compilação
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libz-dev \
    libpng-dev \
    libonig-dev \
    libsodium-dev \
    autoconf \
    g++ \
    make \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install mbstring zip gd pdo_mysql sodium

# Instalando Composer globalmente
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instalando a extensão gRPC
RUN pecl install grpc && docker-php-ext-enable grpc

# Copiando o aplicativo para o container
WORKDIR /var/www/html
COPY . /var/www/html

# Instalando dependências do projeto com Composer
RUN composer install --no-dev --optimize-autoloader

# Ajustando permissões
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Habilitando mod_rewrite para o Apache
RUN a2enmod rewrite

# Configurando o Apache para servir o diretório public do Laravel
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

EXPOSE 80

CMD ["apache2-foreground"]
