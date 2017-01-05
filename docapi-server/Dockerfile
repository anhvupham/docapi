FROM node

# Uncomment this if behind-a-proxy
#RUN npm config set https-proxy http://$https_proxy -g && \
#    npm config set proxy http://$http_proxy -g && \
#    npm install -g sails

ENV DIR /var/www

WORKDIR $DIR

ADD ./package.json $DIR/package.json

RUN npm install

ADD . $DIR

CMD chmod 777 wait-for-it.sh && ./wait-for-it.sh mongodb:27017 -- sails lift
