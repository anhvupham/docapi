FROM nginx

RUN apt-get update -y

RUN apt-get install nano curl wget xz-utils -y

RUN mkdir /nodejs && wget https://nodejs.org/dist/v6.9.3/node-v6.9.3-linux-x64.tar.xz && tar xf node-v6.9.3-linux-x64.tar.xz -C /nodejs

ENV PATH $PATH:/nodejs/node-v6.9.3-linux-x64/bin

# Uncomment this if behind-a-proxy
#RUN npm config set proxy http://$http_proxy -g && \
#    npm config set https_proxy http://$https_proxy

RUN npm install -g angular-cli

COPY nginx.conf /etc/nginx/nginx.conf

ENV DIR /var/www

WORKDIR $DIR

ADD ./package.json $DIR/package.json

RUN npm install

ADD . $DIR

RUN ng build -target production

CMD nginx
