FROM wpdevenv/php:7.4

VOLUME [ "/var/www/html" ]

RUN set -eux; \
	version="6.0"; \
	\
	curl -o wordpress.tar.gz -fL "https://wordpress.org/wordpress-$version.tar.gz"; \
	\
# upstream tarballs include ./wordpress/ so this gives us /usr/src/wordpress
	tar -xzf wordpress.tar.gz -C /usr/src/; \
	cp -a /usr/src/wordpress/. /var/www/html/; \
	rm wordpress.tar.gz; \
	rm -R /usr/src/wordpress; \
	\
# https://wordpress.org/support/article/htaccess/
	[ ! -e /var/www/html/.htaccess ]; \
	{ \
		echo '# BEGIN WordPress'; \
		echo ''; \
		echo 'RewriteEngine On'; \
		echo 'RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]'; \
		echo 'RewriteBase /'; \
		echo 'RewriteRule ^index\.php$ - [L]'; \
		echo 'RewriteCond %{REQUEST_FILENAME} !-f'; \
		echo 'RewriteCond %{REQUEST_FILENAME} !-d'; \
		echo 'RewriteRule . /index.php [L]'; \
		echo ''; \
		echo '# END WordPress'; \
	} > /var/www/html/.htaccess; \
	\
	chown -R www-data:www-data wp-content; \
	rm -R wp-content/plugins/*; \
	chmod -R 777 wp-content


#env
COPY wp-config.php /var/www/html/

ARG USER_UID=1000
ARG USER_GID=$USER_UID
ARG WP_PATH

# Create the user
RUN groupadd --gid $USER_GID vscode \
	&& useradd -s /bin/bash --uid $USER_UID --gid $USER_GID -m vscode \
	&& usermod -a -G www-data vscode \
	&& usermod -a -G sudo vscode \
	&& echo "vscode ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/vscode

RUN ln -s /workspace/release $WP_PATH

RUN chown -R vscode:www-data /var/www/html

USER vscode

ENTRYPOINT ["apache2-foreground"]

