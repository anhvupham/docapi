FROM ubuntu

RUN apt-get update -y

RUN apt-get install nano curl wget -y

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && \
    apt-get install -y nodejs

RUN npm install -g sails forever

ENV DIR /var/www

WORKDIR $DIR

ADD ./package.json $DIR/package.json

RUN npm install

ADD . $DIR

CMD chmod 777 wait-for-it.sh && ./wait-for-it.sh mongodb:27017 -- sails lift
