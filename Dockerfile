# Imagem base com PHP 8.2 e Apache
FROM php:8.2-apache

# Instala as extensões do PHP necessárias para o Laravel
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    git \
    && docker-php-ext-install \
    pdo_mysql \
    zip

# Habilita o mod_rewrite do Apache para o Laravel
RUN a2enmod rewrite

# Instala o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Define o diretório de trabalho para onde seu app vai ficar
WORKDIR /var/www/html

# Copia o seu código fonte para dentro da imagem
COPY . /var/www/html


# Cria o arquivo .env a partir do .env.example
RUN cp .env.example .env
# Instala as dependências do Composer (excluindo as de desenvolvimento)
RUN composer install --no-dev --optimize-autoloader

# Altera a propriedade do diretório para o usuário do Apache
RUN chown -R www-data:www-data /var/www/html

# Define ServerName para suprimir a mensagem de aviso do Apache
RUN echo 'ServerName localhost' >> /etc/apache2/apache2.conf

# Configura o DocumentRoot do Apache para o diretório public do Laravel
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Expõe a porta 80
EXPOSE 80

# Inicia o Apache em primeiro plano
CMD ["apache2-foreground"]
