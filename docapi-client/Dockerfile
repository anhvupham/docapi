FROM nginx

RUN apt-get update -y

RUN apt-get install nano curl wget -y

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && \
    apt-get install -y nodejs

RUN npm install -g angular-cli

COPY nginx.conf /etc/nginx/nginx.conf

ENV DIR /var/www

WORKDIR $DIR

ADD ./package.json $DIR/package.json

RUN npm install

ADD . $DIR

RUN ng build -target production

CMD nginx