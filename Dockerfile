# Uso de multi-stage builds para dependências
FROM composer:latest as composer

# Imagem base
FROM php:8.2-apache

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    git \
    && apt-get clean && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install \
    pdo_mysql \
    zip

# Habilitar mod_rewrite para o Apache
RUN a2enmod rewrite

# Copiar o Composer do estágio de build anterior
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Definir diretório de trabalho
WORKDIR /var/www/html

COPY . /var/www/html

# Instalar dependências do Composer, ajustar permissões e otimizar autoloader
RUN composer install --no-dev --optimize-autoloader && \
    chown -R www-data:www-data /var/www/html && \
    chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Configurar ServerName para evitar avisos no Apache
RUN echo 'ServerName localhost' >> /etc/apache2/apache2.conf

# Direcionar Apache para servir a pasta public
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Expõe a porta 80
EXPOSE 80

CMD ["apache2-foreground"]
